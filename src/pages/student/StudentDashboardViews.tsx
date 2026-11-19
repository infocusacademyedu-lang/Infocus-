import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  Bell,
  Bookmark,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  Download,
  FileText,
  HelpCircle,
  Lock,
  PlayCircle,
  Search,
  Send,
  X,
} from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';
import { ResourceCategory, StudyResource } from '../../types/academy';

export const StudentOverview: React.FC = () => {
  const {
    authUser,
    courses,
    enrollments,
    completedLessons,
    savedLessons,
    recentLessons,
    tests,
    doubts,
    notifications,
    navigate,
    isEnrolledInCourse,
  } = useAcademy();

  const enrolledCourses = courses.filter((c) => isEnrolledInCourse(c.id));

  const allLessonsFlat = useMemo(() => {
    const items: { id: string; title: string; courseSlug: string; courseTitle: string }[] = [];
    courses.forEach((c) =>
      c.modules.forEach((m) =>
        m.lessons.forEach((l) =>
          items.push({ id: l.id, title: l.title, courseSlug: c.slug, courseTitle: c.title })
        )
      )
    );
    return items;
  }, [courses]);

  const recentLessonObjects = recentLessons
    .map((id) => allLessonsFlat.find((l) => l.id === id))
    .filter(Boolean);

  const savedLessonObjects = savedLessons
    .map((id) => allLessonsFlat.find((l) => l.id === id))
    .filter(Boolean);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-[#10233F] text-white rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          {authUser?.isPrototypeDemo && (
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#D6AF62]">
              Prototype LMS Preview · Sample Student Workspace
            </p>
          )}
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold">
            Welcome Back, {authUser?.name ?? 'Student'}
          </h1>
          <p className="text-sm sm:text-base text-slate-300">
            Continue learning and stay focused on your goals.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 shrink-0">
          <button
            type="button"
            onClick={() =>
              navigate(
                enrolledCourses[0]
                  ? `/student/classroom/${enrolledCourses[0].slug}`
                  : '/student/classroom'
              )
            }
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#D6AF62] text-[#091526] text-sm font-bold hover:bg-[#c59d52] cursor-pointer"
          >
            <PlayCircle className="w-4 h-4" />
            Continue Learning
          </button>
          <button
            type="button"
            onClick={() => navigate('/student/practice')}
            className="px-4 py-3 rounded-lg border border-white/25 text-white text-sm font-semibold hover:bg-white/10 cursor-pointer"
          >
            Practice MCQs
          </button>
        </div>
      </div>

      {/* Quick Access Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <p className="text-xs text-slate-500">Active Enrolled Courses</p>
          <p className="font-display text-2xl font-bold text-[#10233F] font-mono-tabular mt-1">
            {enrolledCourses.length}
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <p className="text-xs text-slate-500">Lessons Completed</p>
          <p className="font-display text-2xl font-bold text-[#10233F] font-mono-tabular mt-1">
            {completedLessons.length}
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <p className="text-xs text-slate-500">Pending Doubts</p>
          <p className="font-display text-2xl font-bold text-[#10233F] font-mono-tabular mt-1">
            {doubts.filter((d) => d.status === 'Pending').length}
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <p className="text-xs text-slate-500">Unread Notifications</p>
          <p className="font-display text-2xl font-bold text-[#10233F] font-mono-tabular mt-1">
            {notifications.filter((n) => !n.read).length}
          </p>
        </div>
      </div>

      {/* My Courses Progress + Upcoming Tests */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-[#10233F]">My Courses</h2>
            <button
              type="button"
              onClick={() => navigate('/student/courses')}
              className="text-xs font-semibold text-[#10233F] hover:underline cursor-pointer"
            >
              View All
            </button>
          </div>

          {enrolledCourses.length === 0 ? (
            <div className="p-6 rounded-xl bg-[#F5F7FA] text-center space-y-3">
              <p className="text-sm text-slate-600">
                You do not have an active enrolled course yet.
              </p>
              <button
                type="button"
                onClick={() => navigate('/courses')}
                className="px-4 py-2 rounded-lg bg-[#10233F] text-white text-xs font-semibold cursor-pointer"
              >
                Explore Course Catalog
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {enrolledCourses.map((c) => {
                const total = c.modules.reduce((a, m) => a + m.lessons.length, 0);
                const done = c.modules.reduce(
                  (a, m) => a + m.lessons.filter((l) => completedLessons.includes(l.id)).length,
                  0
                );
                const pct = total > 0 ? Math.round((done / total) * 100) : 0;
                const remainingModules = c.modules.filter((m) =>
                  m.lessons.some((l) => !completedLessons.includes(l.id))
                ).length;

                return (
                  <div
                    key={c.id}
                    className="p-4 rounded-xl border border-slate-200 bg-[#F5F7FA] space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <p className="text-xs text-slate-500">
                          {c.classOrExam} · {c.subjects.join(' & ')}
                        </p>
                        <h3 className="font-display text-base font-bold text-[#10233F]">
                          {c.title}
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => navigate(`/student/classroom/${c.slug}`)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#10233F] text-white text-xs font-semibold self-start cursor-pointer"
                      >
                        Resume <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs text-slate-600 font-mono-tabular">
                        <span>
                          {done}/{total} lessons completed · {remainingModules} modules remaining
                        </span>
                        <span className="font-bold text-[#10233F]">{pct}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                        <div
                          className="h-full bg-[#16A34A] rounded-full transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="lg:col-span-5 space-y-6">
          {/* Upcoming Tests */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-[#10233F]">
                Tests &amp; Practice
              </h2>
              <button
                type="button"
                onClick={() => navigate('/student/tests')}
                className="text-xs font-semibold text-[#10233F] hover:underline cursor-pointer"
              >
                Open Tests
              </button>
            </div>
            <div className="space-y-3">
              {tests.slice(0, 3).map((t) => (
                <div
                  key={t.id}
                  className="p-3.5 rounded-xl bg-[#F5F7FA] flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-[#10233F] truncate">{t.title}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {t.subject} · {t.status}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('/student/tests')}
                    className="text-xs font-semibold text-[#10233F] shrink-0 hover:underline cursor-pointer"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Study Reminder */}
          <div className="bg-[#EAF2FB] border border-blue-200/80 rounded-2xl p-5 space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-[#10233F]">
              Daily Study Reminder
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              Review one concept lesson, read its summary sheet, and solve 5 chapter-wise MCQs to keep your fundamentals sharp.
            </p>
          </div>
        </div>
      </div>

      {/* Recently Viewed & Saved Lessons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
          <h2 className="font-display text-base font-bold text-[#10233F]">
            Recently Viewed Lessons
          </h2>
          {recentLessonObjects.length === 0 ? (
            <p className="text-sm text-slate-500">No lessons viewed yet.</p>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentLessonObjects.slice(0, 4).map((l) => (
                <button
                  key={l!.id}
                  type="button"
                  onClick={() => navigate(`/student/classroom/${l!.courseSlug}`)}
                  className="w-full py-2.5 text-left flex items-center justify-between gap-3 hover:text-[#D6AF62] cursor-pointer"
                >
                  <div>
                    <p className="text-sm font-medium text-[#10233F]">{l!.title}</p>
                    <p className="text-xs text-slate-500">{l!.courseTitle}</p>
                  </div>
                  <PlayCircle className="w-4 h-4 text-slate-400 shrink-0" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
          <h2 className="font-display text-base font-bold text-[#10233F]">Saved Lessons</h2>
          {savedLessonObjects.length === 0 ? (
            <p className="text-sm text-slate-500">
              Bookmark lessons inside the Classroom for quick revision.
            </p>
          ) : (
            <div className="divide-y divide-slate-100">
              {savedLessonObjects.slice(0, 4).map((l) => (
                <button
                  key={l!.id}
                  type="button"
                  onClick={() => navigate(`/student/classroom/${l!.courseSlug}`)}
                  className="w-full py-2.5 text-left flex items-center justify-between gap-3 cursor-pointer"
                >
                  <div>
                    <p className="text-sm font-medium text-[#10233F]">{l!.title}</p>
                    <p className="text-xs text-slate-500">{l!.courseTitle}</p>
                  </div>
                  <Bookmark className="w-4 h-4 text-[#D6AF62] shrink-0" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {enrollments.length > 0 && (
        <p className="text-xs text-slate-500">
          Prototype Preview Note: Sample curriculum items, test templates, and demo progress are shown until official batch content is uploaded by INFOCUS ACADEMY.
        </p>
      )}
    </div>
  );
};

export const MyCoursesView: React.FC = () => {
  const { courses, isEnrolledInCourse, completedLessons, navigate } = useAcademy();

  const enrolled = courses.filter((c) => isEnrolledInCourse(c.id));
  const explore = courses.filter((c) => !isEnrolledInCourse(c.id));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-[#10233F]">My Courses</h1>
        <p className="text-sm text-slate-600">
          Access your enrolled programs or preview free introductory lessons in other tracks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {enrolled.map((c) => {
          const total = c.modules.reduce((a, m) => a + m.lessons.length, 0);
          const done = c.modules.reduce(
            (a, m) => a + m.lessons.filter((l) => completedLessons.includes(l.id)).length,
            0
          );
          const pct = total > 0 ? Math.round((done / total) * 100) : 0;
          return (
            <div
              key={c.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-[#16A34A]">Enrolled · Active</p>
                  <h2 className="font-display text-xl font-bold text-[#10233F] mt-1">
                    {c.title}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">{c.subjects.join(' · ')}</p>
                </div>
                <BookOpen className="w-6 h-6 text-[#10233F] shrink-0" />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-600 font-mono-tabular">
                  <span>
                    {done} / {total} lessons
                  </span>
                  <span>{pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full bg-[#16A34A]" style={{ width: `${pct}%` }} />
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate(`/student/classroom/${c.slug}`)}
                className="w-full py-2.5 rounded-lg bg-[#10233F] text-white text-sm font-semibold hover:bg-[#091526] cursor-pointer"
              >
                Open Learning Classroom
              </button>
            </div>
          );
        })}
      </div>

      {explore.length > 0 && (
        <div className="space-y-4">
          <h2 className="font-display text-lg font-bold text-[#10233F]">
            Explore Additional Programs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {explore.map((c) => (
              <div
                key={c.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between space-y-4"
              >
                <div>
                  <p className="text-xs text-slate-500">{c.classOrExam}</p>
                  <h3 className="font-display text-base font-bold text-[#10233F] mt-1">
                    {c.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                    {c.shortDescription}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => navigate(`/student/classroom/${c.slug}`)}
                    className="flex-1 py-2 px-3 rounded-lg border border-slate-300 text-xs font-semibold text-[#10233F] cursor-pointer"
                  >
                    Free Preview
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(`/checkout/${c.slug}`)}
                    className="flex-1 py-2 px-3 rounded-lg bg-[#10233F] text-white text-xs font-semibold cursor-pointer"
                  >
                    Enroll
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const RESOURCE_CATEGORIES: ('All' | ResourceCategory)[] = [
  'All',
  'Class Notes',
  'PDF Notes',
  'Chapter Summary',
  'Practice Worksheets',
  'Important Questions',
  'Revision Notes',
  'Formula Sheets',
  'Study Resources',
];

export const StudyMaterialsView: React.FC = () => {
  const { resources, courses, isEnrolledInCourse, navigate } = useAcademy();
  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('All');
  const [subjectFilter, setSubjectFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState<'All' | ResourceCategory>('All');
  const [previewResource, setPreviewResource] = useState<StudyResource | null>(null);

  const filtered = resources.filter((r) => {
    const cOk = courseFilter === 'All' || r.courseId === courseFilter;
    const sOk = subjectFilter === 'All' || r.subject === subjectFilter;
    const catOk = categoryFilter === 'All' || r.category === categoryFilter;
    const q = search.trim().toLowerCase();
    const qOk =
      !q ||
      r.title.toLowerCase().includes(q) ||
      r.chapter.toLowerCase().includes(q) ||
      r.subject.toLowerCase().includes(q);
    return cOk && sOk && catOk && qOk;
  });

  const handleDownloadText = (res: StudyResource) => {
    const content = `INFOCUS ACADEMY — ${res.title}\nCourse: ${res.courseTitle}\nSubject: ${res.subject}\nChapter: ${res.chapter}\nCategory: ${res.category}\n\n${res.summaryText}\n`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${res.title.replace(/[^a-z0-9]+/gi, '_').toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-[#10233F]">
          Study Materials &amp; Notes
        </h1>
        <p className="text-sm text-slate-600">
          Organize chapter summaries, PDF notes, worksheets, and formula sheets. Restricted materials unlock upon course enrollment.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search notes or chapters..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-sm"
            />
          </div>
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
          >
            <option value="All">All Courses</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
          >
            <option value="All">All Subjects</option>
            <option value="Biology">Biology</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Mathematics">Mathematics</option>
          </select>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {RESOURCE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-[#10233F] text-white'
                  : 'bg-[#F5F7FA] text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((r) => {
          const unlocked = !r.restricted || isEnrolledInCourse(r.courseId);
          return (
            <div
              key={r.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{r.category}</span>
                  <span className="font-mono-tabular font-semibold text-[#10233F]">
                    {r.fileType}
                  </span>
                </div>
                <h2 className="font-display text-base font-bold text-[#10233F]">{r.title}</h2>
                <p className="text-xs text-slate-500">
                  {r.courseTitle} · {r.chapter}
                </p>
                <p className="text-xs text-slate-400">Added: {r.dateAdded}</p>
              </div>

              {unlocked ? (
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setPreviewResource(r)}
                    className="flex-1 py-2 px-3 rounded-lg bg-[#10233F] text-white text-xs font-semibold cursor-pointer"
                  >
                    Open Notes
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownloadText(r)}
                    className="inline-flex items-center justify-center px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-[#10233F] cursor-pointer"
                    aria-label={`Download ${r.title}`}
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    const c = courses.find((cr) => cr.id === r.courseId);
                    navigate(`/checkout/${c?.slug ?? 'class-11'}`);
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  Enroll to Unlock Resource
                </button>
              )}
            </div>
          );
        })}
      </div>

      {previewResource && (
        <div className="fixed inset-0 z-50 bg-[#091526]/65 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-4 border border-slate-200">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-[#D6AF62]">
                  {previewResource.category} · {previewResource.subject}
                </p>
                <h3 className="font-display text-xl font-bold text-[#10233F] mt-1">
                  {previewResource.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewResource(null)}
                className="p-2 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-500">
              {previewResource.courseTitle} · {previewResource.chapter}
            </p>
            <div className="p-4 rounded-xl bg-[#F5F7FA] text-sm text-slate-700 leading-relaxed">
              {previewResource.summaryText}
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => handleDownloadText(previewResource)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#10233F] text-white text-xs font-semibold cursor-pointer"
              >
                <Download className="w-4 h-4" /> Download Copy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const ProgressView: React.FC = () => {
  const { courses, completedLessons, testAttempts, isEnrolledInCourse, navigate } = useAcademy();
  const enrolledCourses = courses.filter((c) => isEnrolledInCourse(c.id));

  const totalLessons = enrolledCourses.reduce(
    (acc, c) => acc + c.modules.reduce((ma, m) => ma + m.lessons.length, 0),
    0
  );
  const completedCount = enrolledCourses.reduce(
    (acc, c) =>
      acc +
      c.modules.reduce(
        (ma, m) => ma + m.lessons.filter((l) => completedLessons.includes(l.id)).length,
        0
      ),
    0
  );
  const overallPct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const avgAccuracy =
    testAttempts.length > 0
      ? Math.round(
          testAttempts.reduce((acc, t) => acc + t.accuracyPercent, 0) / testAttempts.length
        )
      : null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-[#10233F]">
          Student Progress &amp; Learning Journey
        </h1>
        <p className="text-sm text-slate-600">
          Track completed lessons, chapter milestones, and recorded test activity without misleading comparisons.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <p className="text-xs text-slate-500">Overall Course Progress</p>
          <p className="font-display text-2xl font-bold text-[#10233F] font-mono-tabular mt-1">
            {overallPct}%
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <p className="text-xs text-slate-500">Completed Lessons</p>
          <p className="font-display text-2xl font-bold text-[#16A34A] font-mono-tabular mt-1">
            {completedCount}
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <p className="text-xs text-slate-500">Pending Lessons</p>
          <p className="font-display text-2xl font-bold text-[#10233F] font-mono-tabular mt-1">
            {Math.max(0, totalLessons - completedCount)}
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <p className="text-xs text-slate-500">Recorded Test Accuracy</p>
          <p className="font-display text-2xl font-bold text-[#10233F] font-mono-tabular mt-1">
            {avgAccuracy !== null ? `${avgAccuracy}%` : 'No Tests Yet'}
          </p>
        </div>
      </div>

      {/* Your Learning Journey */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="font-display text-lg font-bold text-[#10233F]">
            Your Learning Journey
          </h2>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => navigate('/student/classroom')}
              className="px-4 py-2 rounded-lg bg-[#10233F] text-white text-xs font-semibold cursor-pointer"
            >
              Continue Learning
            </button>
            <button
              type="button"
              onClick={() => navigate('/student/materials')}
              className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-[#10233F] cursor-pointer"
            >
              Revise Weak Topics
            </button>
            <button
              type="button"
              onClick={() => navigate('/student/practice')}
              className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-[#10233F] cursor-pointer"
            >
              Practice Again
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {enrolledCourses.map((c) => (
            <div key={c.id} className="space-y-3">
              <h3 className="text-sm font-bold text-[#10233F]">{c.title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {c.modules.map((m) => {
                  const done = m.lessons.filter((l) => completedLessons.includes(l.id)).length;
                  const pct = m.lessons.length
                    ? Math.round((done / m.lessons.length) * 100)
                    : 0;
                  return (
                    <div
                      key={m.id}
                      className="p-4 rounded-xl bg-[#F5F7FA] border border-slate-200 space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-[#10233F]">
                          {m.moduleNumber}: {m.title}
                        </span>
                        <span className="font-mono-tabular text-slate-600">
                          {done}/{m.lessons.length}
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                        <div className="h-full bg-[#10233F]" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Test History Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
        <h2 className="font-display text-lg font-bold text-[#10233F]">Test History</h2>
        {testAttempts.length === 0 ? (
          <div className="p-6 rounded-xl bg-[#F5F7FA] text-center space-y-2">
            <p className="text-sm text-slate-600">
              No online test attempts recorded yet. Complete a practice test to view accuracy metrics here.
            </p>
            <button
              type="button"
              onClick={() => navigate('/student/tests')}
              className="px-4 py-2 rounded-lg bg-[#10233F] text-white text-xs font-semibold cursor-pointer"
            >
              Take a Practice Test
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 text-xs text-slate-500">
                <tr>
                  <th className="py-2 pr-4">Assessment</th>
                  <th className="py-2 pr-4">Score</th>
                  <th className="py-2 pr-4">Accuracy</th>
                  <th className="py-2">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {testAttempts.map((t) => (
                  <tr key={t.id}>
                    <td className="py-3 pr-4 font-medium text-[#10233F]">{t.testTitle}</td>
                    <td className="py-3 pr-4 font-mono-tabular">
                      {t.correct}/{t.totalQuestions}
                    </td>
                    <td className="py-3 pr-4 font-mono-tabular">{t.accuracyPercent}%</td>
                    <td className="py-3 text-xs text-slate-500">{t.submittedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export const DoubtsView: React.FC = () => {
  const { doubts, courses, submitDoubt } = useAcademy();
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Answered' | 'Resolved'>('All');
  const [courseId, setCourseId] = useState(courses[0]?.id ?? '');
  const [subject, setSubject] = useState('Biology');
  const [chapter, setChapter] = useState('');
  const [question, setQuestion] = useState('');
  const [description, setDescription] = useState('');
  const [attachmentName, setAttachmentName] = useState('');
  const [submittedNotice, setSubmittedNotice] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !description.trim()) return;
    const c = courses.find((cr) => cr.id === courseId);
    submitDoubt({
      courseId,
      courseTitle: c?.title ?? 'Academic Program',
      subject,
      chapter: chapter.trim() || 'General Concept',
      question: question.trim(),
      description: description.trim(),
      attachmentName: attachmentName.trim() || undefined,
    });
    setQuestion('');
    setDescription('');
    setChapter('');
    setAttachmentName('');
    setSubmittedNotice(true);
  };

  const visibleDoubts = doubts.filter((d) => filter === 'All' || d.status === filter);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
        <div>
          <h1 className="font-display text-xl font-bold text-[#10233F]">Ask an Academic Doubt</h1>
          <p className="text-xs text-slate-500 mt-1">
            Submitted doubts appear in the Teacher &amp; Admin doubt queue for faculty response.
          </p>
        </div>

        {submittedNotice && (
          <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-xs text-[#16A34A]">
            Doubt submitted! Status: Pending faculty review.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-[#10233F] mb-1">Course</label>
            <select
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
            >
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#10233F] mb-1">Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
              >
                <option value="Biology">Biology</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#10233F] mb-1">Chapter</label>
              <input
                type="text"
                value={chapter}
                onChange={(e) => setChapter(e.target.value)}
                placeholder="e.g. The Living World"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#10233F] mb-1">
              Question Title *
            </label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Summarize your doubt..."
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#10233F] mb-1">
              Detailed Description *
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain where you got stuck..."
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#10233F] mb-1">
              Attachment Reference (Optional Placeholder)
            </label>
            <input
              type="file"
              onChange={(e) => setAttachmentName(e.target.files?.[0]?.name ?? '')}
              className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-[#EAF2FB] file:text-[#10233F] file:font-semibold"
            />
          </div>
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#10233F] text-white text-sm font-semibold cursor-pointer"
          >
            <Send className="w-4 h-4" />
            Submit Doubt
          </button>
        </form>
      </div>

      <div className="lg:col-span-7 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-lg font-bold text-[#10233F]">My Doubts</h2>
          <div className="flex gap-1.5">
            {(['All', 'Pending', 'Answered', 'Resolved'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                  filter === tab
                    ? 'bg-[#10233F] text-white'
                    : 'bg-white border border-slate-200 text-slate-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {visibleDoubts.map((d) => (
            <div
              key={d.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">
                  {d.courseTitle} · {d.subject} · {d.chapter}
                </span>
                <span
                  className={`font-semibold ${
                    d.status === 'Pending'
                      ? 'text-amber-700'
                      : 'text-[#16A34A]'
                  }`}
                >
                  {d.status}
                </span>
              </div>
              <h3 className="font-display text-base font-bold text-[#10233F]">{d.question}</h3>
              <p className="text-sm text-slate-600">{d.description}</p>
              {d.attachmentName && (
                <p className="text-xs text-slate-500">Attachment: {d.attachmentName}</p>
              )}

              {d.reply ? (
                <div className="p-4 rounded-xl bg-[#EAF2FB] space-y-1">
                  <p className="text-xs font-bold text-[#10233F]">
                    {d.reply.authorName} ({d.reply.authorRole}) · {d.reply.repliedAt}
                  </p>
                  <p className="text-sm text-slate-700">{d.reply.message}</p>
                </div>
              ) : (
                <p className="text-xs text-slate-500 pt-1 border-t border-slate-100">
                  Awaiting faculty response. Switch to Teacher View to test replying in real time.
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const NotificationsView: React.FC = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead, navigate } = useAcademy();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-[#10233F]">Notifications</h1>
          <p className="text-sm text-slate-600">
            Updates on courses, lessons, study materials, test results, and doubt replies.
          </p>
        </div>
        <button
          type="button"
          onClick={markAllNotificationsRead}
          className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-[#10233F] bg-white cursor-pointer self-start"
        >
          Mark All as Read
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-200 overflow-hidden">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              n.read ? 'bg-white' : 'bg-[#EAF2FB]/60'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Bell className="w-3.5 h-3.5 text-[#D6AF62]" />
                <span className="font-semibold text-[#10233F]">{n.type}</span>
                <span>·</span>
                <span>{n.createdAt}</span>
                {!n.read && <span className="text-[#16A34A] font-bold">· Unread</span>}
              </div>
              <h2 className="font-display text-sm sm:text-base font-bold text-[#10233F]">
                {n.title}
              </h2>
              <p className="text-sm text-slate-600">{n.message}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {!n.read && (
                <button
                  type="button"
                  onClick={() => markNotificationRead(n.id)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-[#10233F] bg-white cursor-pointer"
                >
                  Mark Read
                </button>
              )}
              {n.targetRoute && (
                <button
                  type="button"
                  onClick={() => {
                    markNotificationRead(n.id);
                    navigate(n.targetRoute!);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#10233F] text-white text-xs font-semibold cursor-pointer"
                >
                  Open
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const StudentProfileView: React.FC = () => {
  const { authUser, updateProfile, courses, isEnrolledInCourse, navigate, logout } = useAcademy();
  const [name, setName] = useState(authUser?.name ?? '');
  const [phone, setPhone] = useState(authUser?.phone ?? '');
  const [learningGoal, setLearningGoal] = useState(authUser?.learningGoal ?? 'Biology & Chemistry');
  const [savedMsg, setSavedMsg] = useState('');
  const [passMsg, setPassMsg] = useState('');

  const enrolled = courses.filter((c) => isEnrolledInCourse(c.id));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, phone, learningGoal });
    setSavedMsg('Profile details updated.');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-display text-2xl font-bold text-[#10233F]">Student Profile</h1>
        <p className="text-sm text-slate-600">
          Manage your account information, enrolled programs, and learning preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <form
          onSubmit={handleSave}
          className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4"
        >
          <h2 className="font-display text-lg font-bold text-[#10233F]">Account Details</h2>
          {savedMsg && (
            <p className="text-xs text-[#16A34A] font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> {savedMsg}
            </p>
          )}
          <div>
            <label className="block text-xs font-semibold text-[#10233F] mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#10233F] mb-1">Email</label>
            <input
              type="email"
              value={authUser?.email ?? ''}
              disabled
              className="w-full px-3.5 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#10233F] mb-1">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm font-mono-tabular"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#10233F] mb-1">
              Learning Preference / Target
            </label>
            <input
              type="text"
              value={learningGoal}
              onChange={(e) => setLearningGoal(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg bg-[#10233F] text-white text-sm font-semibold cursor-pointer"
          >
            Save Profile
          </button>
        </form>

        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <h2 className="font-display text-lg font-bold text-[#10233F]">Enrolled Courses</h2>
            {enrolled.length === 0 ? (
              <p className="text-sm text-slate-500">No active enrollments yet.</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {enrolled.map((c) => (
                  <li
                    key={c.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#F5F7FA]"
                  >
                    <span className="font-medium text-[#10233F]">{c.title}</span>
                    <button
                      type="button"
                      onClick={() => navigate(`/student/classroom/${c.slug}`)}
                      className="text-xs font-semibold text-[#10233F] hover:underline cursor-pointer"
                    >
                      Open
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3">
            <h2 className="font-display text-lg font-bold text-[#10233F]">Security Actions</h2>
            {passMsg && <p className="text-xs text-[#16A34A]">{passMsg}</p>}
            <button
              type="button"
              onClick={() =>
                setPassMsg('Password reset confirmation sent in prototype security flow.')
              }
              className="w-full py-2.5 px-4 rounded-lg border border-slate-300 text-xs font-semibold text-[#10233F] text-left cursor-pointer"
            >
              Change Password
            </button>
            <button
              type="button"
              onClick={logout}
              className="w-full py-2.5 px-4 rounded-lg bg-red-50 text-red-700 text-xs font-semibold text-left cursor-pointer"
            >
              Logout from Portal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
