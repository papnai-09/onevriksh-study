'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Calendar, Clock, ArrowRight, User, Tag, Sparkles, BookOpen } from 'lucide-react';
import { blogs } from '@/data/blogs';

const categories = ['All', 'Digital Marketing', 'Career Guide', 'Languages'];

export default function BlogIndexPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');

  const filteredBlogs = useMemo(() => {
    return blogs.filter((b) => {
      const matchCat = selectedCat === 'All' || b.category.toLowerCase() === selectedCat.toLowerCase();
      const q = searchQuery.trim().toLowerCase();
      const matchQuery =
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.excerpt.toLowerCase().includes(q) ||
        b.tags?.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchQuery;
    });
  }, [searchQuery, selectedCat]);

  const featuredBlog = blogs.find((b) => b.featured) || blogs[0];

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="simple-hero" style={{ padding: '52px 0', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <span className="eyebrow light" style={{ marginBottom: '12px' }}>
            ONEVRIKSH STUDY INSIGHTS
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', lineHeight: 1.15, margin: '8px 0 16px', color: 'var(--ink)', maxWidth: '820px', fontWeight: 700 }}>
            Guides, Industry Trends &amp; Career Insights
          </h1>
          <p style={{ fontSize: '1.08rem', color: 'var(--muted)', lineHeight: 1.65, maxWidth: '780px', margin: '0 0 24px' }}>
            Expert articles on performance marketing, career roadmaps, language certifications, and classroom training updates from Central Delhi.
          </p>
        </div>
      </section>

      {/* 2. MAIN BLOG BODY */}
      <section className="section" style={{ background: 'var(--surface-2)', padding: '52px 0' }}>
        <div className="container">
          {/* SEARCH & FILTER CONTROLS */}
          <div className="catalog-tools" style={{ marginBottom: '36px' }}>
            <label className="search-box">
              <Search size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search blogs, topics or tags..."
              />
            </label>
            <div className="category-tabs" aria-label="Filter by category">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={selectedCat === cat ? 'active' : ''}
                  onClick={() => setSelectedCat(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* FEATURED POST (ONLY WHEN NO FILTER/SEARCH) */}
          {!searchQuery && selectedCat === 'All' && featuredBlog && (
            <div style={{ marginBottom: '44px' }}>
              <span className="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                <Sparkles size={14} /> Featured Article
              </span>
              <article style={{
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '0'
              }}>
                <div style={{ position: 'relative', minHeight: '300px', width: '100%' }}>
                  <Image
                    src={featuredBlog.image}
                    alt={featuredBlog.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <span style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    background: 'rgba(15, 23, 42, 0.92)',
                    color: '#fff',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em'
                  }}>
                    {featuredBlog.category}
                  </span>
                </div>

                <div style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', gap: '14px', color: 'var(--muted)', fontSize: '0.78rem', marginBottom: '12px', alignItems: 'center' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <Calendar size={14} /> {featuredBlog.publishedAt}
                    </span>
                    <span>•</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <Clock size={14} /> {featuredBlog.readTime}
                    </span>
                  </div>

                  <h2 style={{ fontSize: 'clamp(1.25rem, 2.2vw, 1.65rem)', margin: '0 0 14px', color: 'var(--ink)', fontWeight: 700, lineHeight: 1.3 }}>
                    <Link href={`/blog/${featuredBlog.slug}`} style={{ color: 'inherit' }}>
                      {featuredBlog.title}
                    </Link>
                  </h2>

                  <p style={{ fontSize: '0.94rem', color: 'var(--muted)', lineHeight: 1.65, margin: '0 0 22px' }}>
                    {featuredBlog.excerpt}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--line)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#0F172A', color: '#fff', display: 'grid', placeItems: 'center', fontSize: '0.75rem', fontWeight: 700 }}>
                        {featuredBlog.author.name.charAt(0)}
                      </div>
                      <div>
                        <strong style={{ display: 'block', fontSize: '0.8rem', color: 'var(--ink)' }}>{featuredBlog.author.name}</strong>
                        <small style={{ color: 'var(--muted)', fontSize: '0.68rem' }}>{featuredBlog.author.role}</small>
                      </div>
                    </div>

                    <Link
                      href={`/blog/${featuredBlog.slug}`}
                      className="button button-primary"
                      style={{ height: '38px', fontSize: '0.82rem', padding: '0 16px' }}
                    >
                      <span>Read Article</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          )}

          {/* BLOG GRID */}
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.3rem', margin: '0 0 20px', color: 'var(--ink)', fontWeight: 700 }}>
              {selectedCat === 'All' ? 'All Articles' : `${selectedCat} Articles`} ({filteredBlogs.length})
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '24px'
            }}>
              {filteredBlogs.map((post) => (
                <article
                  key={post.slug}
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--line)',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease'
                  }}
                >
                  <Link href={`/blog/${post.slug}`} style={{ display: 'block', height: '200px', position: 'relative', width: '100%' }}>
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                    <span style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: 'rgba(255, 255, 255, 0.95)',
                      color: '#0F172A',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
                    }}>
                      {post.category}
                    </span>
                  </Link>

                  <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ display: 'flex', gap: '10px', color: 'var(--muted)', fontSize: '0.74rem', marginBottom: '10px', alignItems: 'center' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={13} /> {post.publishedAt}
                      </span>
                      <span>•</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={13} /> {post.readTime}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.08rem', margin: '0 0 10px', color: 'var(--ink)', fontWeight: 700, lineHeight: 1.35 }}>
                      <Link href={`/blog/${post.slug}`} style={{ color: 'inherit' }}>
                        {post.title}
                      </Link>
                    </h3>

                    <p style={{ fontSize: '0.86rem', color: 'var(--muted)', lineHeight: 1.6, flex: 1, margin: '0 0 18px' }}>
                      {post.excerpt}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px', borderTop: '1px solid var(--line)' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 600 }}>
                        By {post.author.name}
                      </span>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-link"
                        style={{ fontSize: '0.8rem' }}
                      >
                        <span>Read More</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filteredBlogs.length === 0 && (
              <div className="empty-state" style={{ background: 'var(--surface)', borderRadius: '10px', border: '1px solid var(--line)' }}>
                <Search size={32} />
                <h2>No articles found</h2>
                <p>Try searching for different keywords or select another category.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
