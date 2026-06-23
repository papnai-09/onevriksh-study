const cacheStore = {};

export function cacheMiddleware(durationSeconds = 60) {
  return (req, res, next) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    const key = req.originalUrl || req.url;
    const cached = cacheStore[key];
    const now = Date.now();

    if (cached && cached.expiresAt > now) {
      res.setHeader('X-Cache', 'HIT');
      return res.json(cached.data);
    }

    // Intercept res.json
    const originalJson = res.json;
    res.json = function(body) {
      cacheStore[key] = {
        data: body,
        expiresAt: Date.now() + durationSeconds * 1000,
      };
      res.setHeader('X-Cache', 'MISS');
      return originalJson.call(this, body);
    };

    next();
  };
}
