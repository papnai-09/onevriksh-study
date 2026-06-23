'use client';

import { Search, SlidersHorizontal } from 'lucide-react';
import { useMemo, useState } from 'react';
import { CourseCard } from '@/components/CourseCard';
import { courses } from '@/data/site';

const categories = ['All', ...new Set(courses.map((course) => course.category))];

export default function CoursesPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const filtered = useMemo(() => courses.filter((course) =>
    (category === 'All' || course.category === category) &&
    course.title.toLowerCase().includes(query.toLowerCase())
  ), [query, category]);

  return (
    <>
      <section className="catalog-hero">
        <div className="container"><span className="eyebrow light">Explore programs</span><h1>Find the skill that moves you forward.</h1><p>Practical, trainer-led courses with projects, personal guidance and career support.</p></div>
      </section>
      <section className="section catalog-section">
        <div className="container">
          <div className="catalog-tools">
            <label className="search-box"><Search size={19}/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search courses" /></label>
            <div className="category-tabs" aria-label="Filter by category">
              <SlidersHorizontal size={18} />
              {categories.map((item)=><button key={item} className={item===category?'active':''} onClick={()=>setCategory(item)}>{item}</button>)}
            </div>
          </div>
          <div className="catalog-count"><strong>{filtered.length} programs</strong><span>Offline classes in Connaught Place, New Delhi</span></div>
          <div className="course-grid">{filtered.map((course)=><CourseCard key={course.slug} course={course}/>)}</div>
          {!filtered.length && <div className="empty-state"><Search/><h2>No matching courses</h2><p>Try another course name or category.</p></div>}
        </div>
      </section>
    </>
  );
}
