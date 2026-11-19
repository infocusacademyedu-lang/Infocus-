import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { CourseCard } from '../../components/CourseCard';
import { useAcademy } from '../../context/AcademyContext';
import { AccessType, CourseCategory } from '../../types/academy';

const CATEGORIES: ('All Courses' | CourseCategory)[] = [
  'All Courses',
  'Class 9',
  'Class 10',
  'Class 11',
  'Class 12',
  'NEET',
  'JEE',
  'CUET',
];

export const CoursesMarketplacePage: React.FC = () => {
  const { courses, openEnquiryModal } = useAcademy();
  const [category, setCategory] = useState<'All Courses' | CourseCategory>('All Courses');
  const [accessFilter, setAccessFilter] = useState<'All' | AccessType>('All');
  const [query, setQuery] = useState('');

  const visibleCourses = useMemo(() => {
    return courses.filter((c) => {
      if (!c.published) return false;
      const catOk = category === 'All Courses' || c.categories.includes(category);
      const accessOk = accessFilter === 'All' || c.accessType === accessFilter;
      const q = query.trim().toLowerCase();
      const searchOk =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.subjects.some((s) => s.toLowerCase().includes(q)) ||
        c.shortDescription.toLowerCase().includes(q);
      return catOk && accessOk && searchOk;
    });
  }, [courses, category, accessFilter, query]);

  return (
    <div className="bg-[#F5F7FA] min-h-screen">
      <section className="bg-[#10233F] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#D6AF62]">
              INFOCUS ACADEMY Course Marketplace
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
              Explore Courses. Find Your Focus.
            </h1>
            <p className="text-sm sm:text-base text-slate-300">
              Choose the right academic program for Classes 9–12, Biology &amp; Chemistry, NEET, JEE Foundation, and CUET preparation.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openEnquiryModal()}
            className="px-5 py-3 rounded-lg bg-[#D6AF62] text-[#091526] text-sm font-bold hover:bg-[#c59d52] shrink-0 cursor-pointer"
          >
            Request Admission Guidance
          </button>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Filter & Search Bar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by subject, class, or exam (Biology, Chemistry, NEET...)"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#10233F]"
              />
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="access-select" className="text-xs font-semibold text-slate-600">
                Access:
              </label>
              <select
                id="access-select"
                value={accessFilter}
                onChange={(e) => setAccessFilter(e.target.value as 'All' | AccessType)}
                className="px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white text-[#10233F]"
              >
                <option value="All">All Access Types</option>
                <option value="Free Preview Available">Free Preview Available</option>
                <option value="Enrolment Required">Enrolment Required</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pt-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 cursor-pointer ${
                  category === cat
                    ? 'bg-[#10233F] text-white'
                    : 'bg-[#F5F7FA] text-slate-700 hover:bg-slate-200/70'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-600">
          <span>
            Showing <strong className="text-[#10233F] font-mono-tabular">{visibleCourses.length}</strong>{' '}
            {visibleCourses.length === 1 ? 'program' : 'programs'}
          </span>
          <span>Kalkaji Classroom &amp; Online LMS Supported</span>
        </div>

        {visibleCourses.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-3">
            <h2 className="font-display text-lg font-bold text-[#10233F]">
              No programs matched your filters
            </h2>
            <p className="text-sm text-slate-600">
              Reset filters to view all INFOCUS ACADEMY courses.
            </p>
            <button
              type="button"
              onClick={() => {
                setCategory('All Courses');
                setAccessFilter('All');
                setQuery('');
              }}
              className="px-4 py-2 rounded-lg bg-[#10233F] text-white text-sm font-medium cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                targetSlugOverride={
                  category === 'Class 10' && course.slug === 'class-9' ? 'class-10' : undefined
                }
                titleOverride={
                  category === 'Class 10' && course.slug === 'class-9'
                    ? 'Class 10 Foundation Program (Math & Science)'
                    : undefined
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
