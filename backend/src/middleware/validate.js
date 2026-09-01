export const validateBody = (schema) => (req, res, next) => {
  try {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errorMsg = result.error.errors.map((e) => e.message).join(', ');
      return res.status(400).json({
        success: false,
        message: errorMsg,
        errors: result.error.flatten().fieldErrors
      });
    }
    req.body = result.data;
    next();
  } catch (err) {
    next(err);
  }
};
