import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Compass,
  GraduationCap,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  UserCheck,
} from 'lucide-react';
import { CourseCard } from '../../components/CourseCard';
import { FAQAccordion } from '../../components/FAQAccordion';
import { SafeImage } from '../../components/SafeImage';
import { useAcademy } from '../../context/AcademyContext';
import {
  ENROLLMENT_FAQS,
  FACULTY_PROFILE,
  IMG_HERO,
  PORTAL_FAQS,
  PUBLIC_FAQS,
} from '../../data/academyData';
import { CourseCategory } from '../../types/academy';

const FILTER_CATEGORIES: ('All Courses' | CourseCategory)[] = [
  'All Courses',
  'Class 9',
  'Class 10',
  'Class 11',
  'Class 12',
  'NEET',
  'JEE',
  'CUET',
];

const WHY_PILLARS = [
  {
    index: '01',
    title: 'Concept-Based Learning',
    detail: 'Every topic begins from first principles so students understand the logic behind formulas and biological systems.',
  },
  {
    index: '02',
    title: 'Smart Board Teaching',
    detail: 'Visual diagrams, reaction pathways, and structured derivations presented with clarity during instruction.',
  },
  {
    index: '03',
    title: 'Personal Attention',
    detail: 'Focused batch guidance that notices individual pacing and encourages every learner to participate.',
  },
  {
    index: '04',
    title: 'Student-Friendly Faculty',
    detail: 'Approachable mentorship where students feel comfortable asking foundational or advanced questions.',
  },
  {
    index: '05',
    title: 'Regular Unit Tests',
    detail: 'Topic-level and unit-wise assessments designed to build exam steadiness without unnecessary pressure.',
  },
  {
    index: '06',
    title: 'Doubt-Clearing Support',
    detail: 'Dedicated sessions and online doubt threads to resolve conceptual gaps before moving to the next module.',
  },
  {
    index: '07',
    title: 'Structured Revision',
    detail: 'Planned chapter recaps, formula sheets, and summary notes ahead of school and entrance assessments.',
  },
  {
    index: '08',
    title: 'Academic Guidance',
    detail: 'Balanced study planning across school boards, NEET, JEE foundation, and CUET preparation.',
  },
];

export const HomePage: React.FC = () => {
  const { courses, navigate, openEnquiryModal, settings, authUser, loginAsRole } = useAcademy();
  const [selectedFilter, setSelectedFilter] = useState<'All Courses' | CourseCategory>('All Courses');
  const [searchQuery, setSearchQuery] = useState('');
  const [faqTab, setFaqTab] = useState<'public' | 'portal' | 'enrollment'>('public');

  const publishedCourses = useMemo(() => courses.filter((c) => c.published), [courses]);

  const filteredCourses = useMemo(() => {
    return publishedCourses.filter((c) => {
      const matchesCat =
        selectedFilter === 'All Courses' || c.categories.includes(selectedFilter);
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.subjects.some((s) => s.toLowerCase().includes(q)) ||
        c.classOrExam.toLowerCase().includes(q) ||
        c.shortDescription.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [publishedCourses, selectedFilter, searchQuery]);

  const activeFaqItems =
    faqTab === 'public' ? PUBLIC_FAQS : faqTab === 'portal' ? PORTAL_FAQS : ENROLLMENT_FAQS;

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <p className="text-xs sm:text-sm font-semibold tracking-wide text-[#10233F] uppercase">
                Kalkaji, New Delhi · Est. {settings.establishedYear}
              </p>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.35rem] font-extrabold text-[#10233F] leading-[1.1] tracking-tight text-balance">
                Learn with Focus.
                <br />
                Prepare with Confidence.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Discover concept-based learning, structured academic preparation, and student-focused guidance designed to help you understand better, practice consistently, and move towards your academic goals.
              </p>

              <p className="text-sm font-medium text-[#10233F] bg-[#EAF2FB] inline-block px-4 py-2 rounded-lg">
                Classes 9–12 · Biology · Chemistry · NEET · JEE · CUET
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
                <button
                  type="button"
                  onClick={() => navigate('/courses')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#10233F] text-white text-sm font-semibold hover:bg-[#091526] transition-colors cursor-pointer"
                >
                  Explore Courses
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    authUser ? navigate('/student') : navigate('/signup')
                  }
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-slate-300 text-[#10233F] text-sm font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Start Your Learning Journey
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 aspect-[16/10]">
                <SafeImage
                  src={IMG_HERO}
                  alt="Student studying Biology and Chemistry at INFOCUS ACADEMY"
                  className="w-full h-full object-cover"
                  fallbackTitle="INFOCUS ACADEMY — Concept-Based Science Learning"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#091526]/65 via-transparent to-transparent" />

                {/* Clean floating academic focus labels */}
                <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-2.5">
                  {[
                    'Concept-Based Learning',
                    'Personal Attention',
                    'Structured Preparation',
                    'Smart Learning',
                  ].map((label) => (
                    <div
                      key={label}
                      className="bg-white/95 backdrop-blur-xs text-[#10233F] px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 border border-white/60"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D6AF62] shrink-0" />
                      <span className="truncate">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST & ACADEMY OVERVIEW (CONFIRMED CREDENTIALS ONLY) */}
      <section className="bg-[#10233F] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/15">
            <div className="pt-2 sm:pt-0 sm:pr-6">
              <p className="text-xs text-[#D6AF62] font-semibold uppercase tracking-wider">
                Established
              </p>
              <p className="font-display text-2xl font-bold mt-1 font-mono-tabular">2015</p>
              <p className="text-xs text-slate-300 mt-1">Kalkaji, New Delhi</p>
            </div>
            <div className="pt-4 sm:pt-0 sm:px-6">
              <p className="text-xs text-[#D6AF62] font-semibold uppercase tracking-wider">
                Teaching Experience
              </p>
              <p className="font-display text-2xl font-bold mt-1">10+ Years</p>
              <p className="text-xs text-slate-300 mt-1">Focused academic mentorship</p>
            </div>
            <div className="pt-4 sm:pt-0 sm:px-6">
              <p className="text-xs text-[#D6AF62] font-semibold uppercase tracking-wider">
                Main Faculty
              </p>
              <p className="font-display text-xl font-bold mt-1">Jaidev Roy (JDR Sir)</p>
              <p className="text-xs text-slate-300 mt-1">B.Sc. &amp; M.Sc. — University of Delhi</p>
            </div>
            <div className="pt-4 sm:pt-0 sm:pl-6">
              <p className="text-xs text-[#D6AF62] font-semibold uppercase tracking-wider">
                Core Subjects
              </p>
              <p className="font-display text-xl font-bold mt-1">Biology &amp; Chemistry</p>
              <p className="text-xs text-slate-300 mt-1">Classes 11 &amp; 12 · Entrance Prep</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COURSE MARKETPLACE */}
      <section className="py-16 bg-[#F5F7FA]" id="courses-marketplace">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#10233F] tracking-tight text-balance">
                Explore Courses. Find Your Focus.
              </h2>
              <p className="text-base text-slate-600">
                Choose the right academic program for your class, subjects, and competitive examination goals.
              </p>
            </div>

            <div className="relative w-full lg:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Biology, Class 11, NEET..."
                aria-label="Search courses"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white border border-slate-300 text-sm focus:outline-none focus:border-[#10233F]"
              />
            </div>
          </div>

          {/* Interactive Filter Controls */}
          <div
            className="flex items-center gap-2 overflow-x-auto pb-2"
            role="tablist"
            aria-label="Course category filters"
          >
            {FILTER_CATEGORIES.map((cat) => {
              const active = selectedFilter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedFilter(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#10233F] text-white'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-[#10233F]/40'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {filteredCourses.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-3">
              <p className="font-display text-lg font-semibold text-[#10233F]">
                No matching programs found
              </p>
              <p className="text-sm text-slate-600">
                Try clearing your search or selecting All Courses.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedFilter('All Courses');
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-lg bg-[#10233F] text-white text-sm font-medium"
              >
                Show All Courses
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  targetSlugOverride={
                    selectedFilter === 'Class 10' && course.slug === 'class-9'
                      ? 'class-10'
                      : undefined
                  }
                  titleOverride={
                    selectedFilter === 'Class 10' && course.slug === 'class-9'
                      ? 'Class 10 Foundation Program (Math & Science)'
                      : undefined
                  }
                />
              ))}
            </div>
          )}

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#EAF2FB] border border-blue-200/70 rounded-2xl p-6">
            <div className="space-y-1">
              <h3 className="font-display text-lg font-bold text-[#10233F]">
                Not sure which program fits your academic schedule?
              </h3>
              <p className="text-sm text-slate-700">
                Explore all courses or preview the interactive Student, Teacher, and Admin LMS portals.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => loginAsRole('student')}
                className="px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-sm font-semibold text-[#10233F] hover:bg-slate-50 cursor-pointer"
              >
                Preview Student LMS
              </button>
              <button
                type="button"
                onClick={() => openEnquiryModal()}
                className="px-5 py-2.5 rounded-lg bg-[#10233F] text-white text-sm font-semibold hover:bg-[#091526] cursor-pointer"
              >
                Speak with Counsellor
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY INFOCUS ACADEMY — ASYMMETRIC EDITORIAL LAYOUT */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#D6AF62]">
                Academic Philosophy
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#10233F] tracking-tight text-balance">
                Focused Learning. Stronger Understanding.
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                At INFOCUS ACADEMY, learning is about understanding concepts clearly, developing academic confidence, and building a strong foundation for the future.
              </p>
              <div className="pt-2 space-y-3 border-t border-slate-200">
                <p className="text-sm font-semibold text-[#10233F]">
                  “{settings.mainTagline}”
                </p>
                <p className="text-sm text-slate-600">
                  “{settings.secondaryTagline}”
                </p>
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => navigate('/courses')}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#10233F] hover:text-[#D6AF62] transition-colors cursor-pointer"
                >
                  Browse All Programs <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 divide-y divide-slate-200 border-t border-b border-slate-200">
              {WHY_PILLARS.map((item) => (
                <div
                  key={item.index}
                  className="py-5 grid grid-cols-12 gap-4 items-start"
                >
                  <span className="col-span-2 sm:col-span-1 font-mono-tabular text-sm font-semibold text-[#D6AF62]">
                    {item.index}.
                  </span>
                  <div className="col-span-10 sm:col-span-11 space-y-1">
                    <h3 className="font-display text-base font-bold text-[#10233F]">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. ABOUT FACULTY — JAIDEV ROY (JDR SIR) */}
      <section className="py-16 bg-[#EAF2FB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            {/* Large Dignified Portrait Placeholder */}
            <div className="lg:col-span-5 bg-[#F5F7FA] border-b lg:border-b-0 lg:border-r border-slate-200 text-[#10233F] p-8 sm:p-10 flex flex-col justify-between min-h-[320px]">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#10233F]">
                  Faculty Profile
                </p>
                <p className="text-xs text-slate-500">Portrait Placeholder</p>
              </div>

              <div className="my-8 flex flex-col items-center justify-center text-center">
                <div className="w-28 h-28 rounded-full border-2 border-[#D6AF62] bg-[#10233F] flex items-center justify-center font-display text-3xl font-extrabold text-[#D6AF62] shadow-sm">
                  JDR
                </div>
                <p className="mt-4 font-display text-xl font-bold text-[#10233F]">
                  {FACULTY_PROFILE.name}
                </p>
                <p className="text-sm text-[#64748B] font-medium">
                  Known as {FACULTY_PROFILE.alias}
                </p>
              </div>

              <div className="border-t border-slate-200 pt-4 text-xs text-slate-600 flex flex-wrap gap-x-3 gap-y-1 justify-center">
                <span>B.Sc. — University of Delhi</span>
                <span>·</span>
                <span>M.Sc. — University of Delhi</span>
              </div>
            </div>

            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                  {FACULTY_PROFILE.experience} · {FACULTY_PROFILE.classes}
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#10233F]">
                  Meet Jaidev Roy (JDR Sir)
                </h2>
                <p className="text-sm font-medium text-[#10233F]">
                  Subjects Taught: {FACULTY_PROFILE.subjects.join(' & ')}
                </p>
              </div>

              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>{FACULTY_PROFILE.bio}</p>
                <p>{FACULTY_PROFILE.approach}</p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => navigate('/faculty')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#10233F] text-white text-sm font-semibold hover:bg-[#091526] cursor-pointer"
                >
                  Read Full Faculty Profile
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => openEnquiryModal('Biology & Chemistry with JDR Sir')}
                  className="px-5 py-2.5 rounded-lg border border-slate-300 text-sm font-medium text-[#10233F] hover:bg-slate-50 cursor-pointer"
                >
                  Enquire About Classes
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INTEGRATED ONLINE LEARNING ECOSYSTEM PREVIEW */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#D6AF62]">
              Complete Digital Learning Ecosystem
            </p>
            <h2 className="font-display text-3xl font-bold text-[#10233F] text-balance">
              One Unified Platform for Students, Faculty &amp; Academy Administration
            </h2>
            <p className="text-base text-slate-600">
              Continue classroom preparation online with structured modules, study notes, chapter-wise MCQ practice, online tests, and doubt resolution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#F5F7FA] border border-slate-200 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <GraduationCap className="w-7 h-7 text-[#10233F]" />
                <h3 className="font-display text-lg font-bold text-[#10233F]">
                  Student Learning Portal
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Access video classroom lessons, downloadable study notes, chapter-wise MCQ practice, mock tests, progress tracking, and doubt support.
                </p>
              </div>
              <button
                type="button"
                onClick={() => loginAsRole('student')}
                className="w-full py-2.5 px-4 rounded-lg bg-[#10233F] text-white text-sm font-semibold hover:bg-[#091526] cursor-pointer"
              >
                Launch Student Preview
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-[#F5F7FA] border border-slate-200 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <BookOpen className="w-7 h-7 text-[#10233F]" />
                <h3 className="font-display text-lg font-bold text-[#10233F]">
                  Teacher &amp; Faculty Portal
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Create modules and lessons, upload study materials, add practice questions, configure tests, review student progress, and answer doubts.
                </p>
              </div>
              <button
                type="button"
                onClick={() => loginAsRole('teacher')}
                className="w-full py-2.5 px-4 rounded-lg border border-slate-300 bg-white text-[#10233F] text-sm font-semibold hover:bg-slate-50 cursor-pointer"
              >
                Launch Faculty Preview
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-[#F5F7FA] border border-slate-200 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <UserCheck className="w-7 h-7 text-[#10233F]" />
                <h3 className="font-display text-lg font-bold text-[#10233F]">
                  Academy Admin Console
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Manage courses, fees, enrollments, payment records, student accounts, announcements, and website settings from one workspace.
                </p>
              </div>
              <button
                type="button"
                onClick={() => loginAsRole('admin')}
                className="w-full py-2.5 px-4 rounded-lg border border-slate-300 bg-white text-[#10233F] text-sm font-semibold hover:bg-slate-50 cursor-pointer"
              >
                Launch Admin Preview
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ & KALKAJI CONTACT SECTION */}
      <section className="py-16 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#10233F]">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-slate-600">
                Clear answers about programs, the student learning portal, and enrollment.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                { id: 'public', label: 'Public Website' },
                { id: 'portal', label: 'Student Portal' },
                { id: 'enrollment', label: 'Enrollment & Payment' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFaqTab(tab.id as 'public' | 'portal' | 'enrollment')}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold cursor-pointer ${
                    faqTab === tab.id
                      ? 'bg-[#10233F] text-white'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <FAQAccordion items={activeFaqItems} />
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white border border-slate-200 text-[#10233F] rounded-2xl p-8 space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#D6AF62]">
                  Visit or Contact Us
                </p>
                <h3 className="font-display text-2xl font-bold text-[#10233F]">
                  INFOCUS ACADEMY — Kalkaji
                </h3>
                <p className="text-sm text-slate-600">
                  Connect directly for batch schedules, course details, or academic counselling.
                </p>
              </div>

              <div className="space-y-4 text-sm border-t border-slate-200 pt-5">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#10233F] shrink-0 mt-0.5" />
                  <span className="text-slate-700">{settings.address}</span>
                </div>
                <div className="space-y-2">
                  {settings.phones.map((ph) => (
                    <a
                      key={ph}
                      href={`tel:+91${ph}`}
                      className="flex items-center gap-3 text-[#10233F] font-semibold hover:text-[#D6AF62] font-mono-tabular"
                    >
                      <Phone className="w-4 h-4 text-[#D6AF62] shrink-0" />
                      <span>+91 {ph}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => openEnquiryModal()}
                  className="py-3 px-4 rounded-lg bg-[#10233F] text-white text-sm font-bold hover:bg-[#091526] cursor-pointer"
                >
                  Admission Enquiry
                </button>
                <a
                  href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                    'Hello INFOCUS ACADEMY, I would like admission details for classes in Kalkaji.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#16A34A] text-white text-sm font-semibold hover:bg-green-700"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>

              <button
                type="button"
                onClick={() => navigate('/contact')}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-slate-300 text-xs font-semibold text-[#10233F] hover:bg-slate-50 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-[#D6AF62]" />
                View Centre Map &amp; Directions
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
