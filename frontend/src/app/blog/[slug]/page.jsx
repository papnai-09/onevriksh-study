import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  Share2,
  MapPin,
  CheckCircle2,
  BookOpen,
  Sparkles,
  Phone,
  Mail,
  Award,
  Users
} from 'lucide-react';
import { blogs } from '@/data/blogs';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogs.find((b) => b.slug === slug);
  if (!post) return { title: 'Blog | ONEVRIKSH Study' };
  return {
    title: `${post.title} | ONEVRIKSH Study`,
    description: post.excerpt
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = blogs.find((b) => b.slug === slug);
  if (!post) notFound();

  const relatedBlogs = blogs.filter((b) => b.slug !== slug).slice(0, 2);

  return (
    <>
      {/* ARTICLE HEADER / HERO */}
      <section className="simple-hero" style={{ padding: '48px 0 36px', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <div style={{ marginBottom: '20px' }}>
            <Link
              href="/blog"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.82rem',
                color: 'var(--muted)',
                fontWeight: 600
              }}
            >
              <ArrowLeft size={15} /> Back to all articles
            </Link>
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#FDF2F4', color: '#EE2C3C', padding: '4px 12px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px' }}>
            {post.category}
          </div>

          <h1 style={{ fontSize: 'clamp(1.85rem, 3.5vw, 2.75rem)', lineHeight: 1.2, margin: '8px 0 18px', color: 'var(--ink)', maxWidth: '900px', fontWeight: 700 }}>
            {post.title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', color: 'var(--muted)', fontSize: '0.82rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#0F172A', color: '#fff', display: 'grid', placeItems: 'center', fontSize: '0.7rem', fontWeight: 700 }}>
                {post.author.name.charAt(0)}
              </div>
              <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{post.author.name}</span>
              <span>({post.author.role})</span>
            </div>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <Calendar size={14} /> {post.publishedAt}
            </span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <Clock size={14} /> {post.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* ARTICLE BODY & SIDEBAR */}
      <section className="section" style={{ background: 'var(--surface)', padding: '48px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: '56px', alignItems: 'start' }}>
          {/* MAIN ARTICLE CONTENT */}
          <article style={{ minWidth: 0 }}>
            {/* FEATURED BANNER IMAGE */}
            <div style={{ position: 'relative', height: '400px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--line)', marginBottom: '36px' }}>
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 800px"
                style={{ objectFit: 'cover' }}
              />
            </div>

            {/* FORMATTED ARTICLE CONTENT */}
            <div
              className="blog-prose"
              style={{
                fontSize: '1rem',
                lineHeight: 1.8,
                color: '#1E293B'
              }}
            >
              {/* Parse and render markdown sections */}
              {post.content.split('\n\n').map((paragraph, idx) => {
                const trimmed = paragraph.trim();
                if (!trimmed) return null;

                if (trimmed.startsWith('## ')) {
                  return (
                    <h2
                      key={idx}
                      style={{
                        fontSize: '1.45rem',
                        fontWeight: 700,
                        color: '#0F172A',
                        margin: '36px 0 16px',
                        borderLeft: '4px solid #EE2C3C',
                        paddingLeft: '14px',
                        lineHeight: 1.3
                      }}
                    >
                      {trimmed.replace('## ', '')}
                    </h2>
                  );
                }

                if (trimmed.startsWith('### ')) {
                  return (
                    <h3
                      key={idx}
                      style={{
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        color: '#0F172A',
                        margin: '28px 0 12px',
                        lineHeight: 1.35
                      }}
                    >
                      {trimmed.replace('### ', '')}
                    </h3>
                  );
                }

                if (trimmed === '---') {
                  return (
                    <hr
                      key={idx}
                      style={{
                        border: 0,
                        borderTop: '1px solid var(--line)',
                        margin: '32px 0'
                      }}
                    />
                  );
                }

                if (trimmed.startsWith('* ')) {
                  const items = trimmed.split('\n').filter((l) => l.trim().startsWith('* '));
                  return (
                    <ul
                      key={idx}
                      style={{
                        margin: '16px 0 24px',
                        paddingLeft: '22px',
                        display: 'grid',
                        gap: '10px'
                      }}
                    >
                      {items.map((item, iIdx) => {
                        const text = item.replace('* ', '');
                        return (
                          <li key={iIdx} style={{ color: '#334155', fontSize: '0.94rem' }}>
                            {text.includes('**') ? (
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                }}
                              />
                            ) : (
                              text
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  );
                }

                return (
                  <p
                    key={idx}
                    style={{
                      margin: '0 0 20px',
                      color: '#334155',
                      fontSize: '0.96rem',
                      lineHeight: 1.75
                    }}
                    dangerouslySetInnerHTML={{
                      __html: trimmed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    }}
                  />
                );
              })}
            </div>

            {/* TAGS ROW */}
            {post.tags && (
              <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid var(--line)', display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink)' }}>Tags:</span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      background: 'var(--surface-2)',
                      border: '1px solid var(--line)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '0.74rem',
                      color: 'var(--muted)',
                      fontWeight: 500
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* AUTHOR BIO CARD */}
            <div style={{ marginTop: '36px', background: 'var(--surface-2)', border: '1px solid var(--line)', borderRadius: '10px', padding: '24px', display: 'flex', gap: '18px', alignItems: 'center' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#0F172A', color: '#fff', display: 'grid', placeItems: 'center', fontSize: '1.2rem', fontWeight: 700, flexShrink: 0 }}>
                {post.author.name.charAt(0)}
              </div>
              <div>
                <strong style={{ fontSize: '0.98rem', color: 'var(--ink)', display: 'block', marginBottom: '4px' }}>
                  Written by {post.author.name}
                </strong>
                <p style={{ fontSize: '0.82rem', color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>
                  {post.author.role} at ONEVRIKSH Study. Guiding learners in New Delhi with practical frameworks in performance marketing, search rankings, and campaign optimization.
                </p>
              </div>
            </div>
          </article>

          {/* SIDEBAR CTA & COURSE LINKS */}
          <aside style={{ position: 'sticky', top: '100px', display: 'grid', gap: '24px' }}>
            {/* ENROLLMENT & DEMO CARD */}
            <div style={{ background: '#0F172A', color: '#fff', borderRadius: '12px', padding: '28px 24px', boxShadow: 'var(--shadow)' }}>
              <span style={{ color: '#EE2C3C', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '8px' }}>
                CENTRAL DELHI ADMISSIONS
              </span>
              <h3 style={{ fontSize: '1.18rem', margin: '0 0 10px', color: '#fff', fontWeight: 700 }}>
                Learn at Connaught Place
              </h3>
              <p style={{ color: '#94A3B8', fontSize: '0.84rem', lineHeight: 1.6, margin: '0 0 20px' }}>
                Join small-batch, practical offline training at B-14, Connaught Place (5 mins from Rajiv Chowk Metro).
              </p>
              <Link
                href="/demo"
                className="button button-primary button-wide"
                style={{ background: '#EE2C3C', borderColor: '#EE2C3C', color: '#fff', marginBottom: '12px', height: '44px', fontWeight: 650 }}
              >
                Book Free Offline Demo
              </Link>
              <Link
                href="/digital-marketing-course"
                className="button button-ghost button-wide"
                style={{ background: 'transparent', borderColor: '#334155', color: '#fff', height: '42px', fontSize: '0.82rem' }}
              >
                Explore Digital Marketing
              </Link>
            </div>

            {/* CENTRE HIGHLIGHTS */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '10px', padding: '22px', boxShadow: 'var(--shadow-sm)' }}>
              <h4 style={{ fontSize: '0.92rem', color: 'var(--ink)', margin: '0 0 14px', fontWeight: 700 }}>
                Connaught Place Centre Info
              </h4>
              <div style={{ display: 'grid', gap: '12px', fontSize: '0.8rem', color: 'var(--muted)' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <MapPin size={16} style={{ color: '#EE2C3C', flexShrink: 0, marginTop: '2px' }} />
                  <span>B-14, Connaught Place, New Delhi, 110001 (Gate No. 6)</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <Phone size={15} style={{ color: '#EE2C3C', flexShrink: 0 }} />
                  <a href="tel:+918700536553" style={{ color: 'var(--ink)', fontWeight: 600 }}>+91 87005 36553</a>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <Users size={15} style={{ color: '#EE2C3C', flexShrink: 0 }} />
                  <span>Max 15-20 Students/Batch</span>
                </div>
              </div>
            </div>

            {/* RELATED ARTICLES */}
            {relatedBlogs.length > 0 && (
              <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '10px', padding: '22px', boxShadow: 'var(--shadow-sm)' }}>
                <h4 style={{ fontSize: '0.92rem', color: 'var(--ink)', margin: '0 0 14px', fontWeight: 700 }}>
                  More from Study Insights
                </h4>
                <div style={{ display: 'grid', gap: '16px' }}>
                  {relatedBlogs.map((r) => (
                    <Link key={r.slug} href={`/blog/${r.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
                      <span style={{ fontSize: '0.7rem', color: '#EE2C3C', fontWeight: 700, textTransform: 'uppercase' }}>{r.category}</span>
                      <strong style={{ display: 'block', fontSize: '0.84rem', color: 'var(--ink)', margin: '3px 0 2px', lineHeight: 1.35 }}>{r.shortTitle || r.title}</strong>
                      <small style={{ color: 'var(--muted)', fontSize: '0.72rem' }}>{r.readTime}</small>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
