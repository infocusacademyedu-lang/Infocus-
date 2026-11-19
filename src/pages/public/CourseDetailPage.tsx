import React, { useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  FileText,
  HelpCircle,
  Lock,
  MessageCircle,
  PlayCircle,
} from 'lucide-react';
import { FAQAccordion } from '../../components/FAQAccordion';
import { SafeImage } from '../../components/SafeImage';
import { useAcademy } from '../../context/AcademyContext';

interface CourseDetailPageProps {
  slug: string;
}

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ slug }) => {
  const {
    courses,
    navigate,
    openEnquiryModal,
    settings,
    isEnrolledInCourse,
    completedLessons,
  } = useAcademy();

  const isClass10Alias = slug === 'class-10';
  const course = isClass10Alias
    ? courses.find((c) => c.slug === 'class-9')
    : courses.find((c) => c.slug === slug);

  const [openModuleIds, setOpenModuleIds] = useState<string[]>(() =>
    course?.modules.length ? [course.modules[0].id] : []
  );

  if (!course) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-display text-2xl font-bold text-[#10233F]">Course Not Found</h1>
        <p className="text-sm text-slate-600">
          The requested course could not be located in the current catalog.
        </p>
        <button
          type="button"
          onClick={() => navigate('/courses')}
          className="px-5 py-2.5 rounded-lg bg-[#10233F] text-white text-sm font-semibold cursor-pointer"
        >
          Back to All Courses
        </button>
      </div>
    );
  }

  const displayTitle = isClass10Alias
    ? 'Class 10 Foundation Program (Mathematics & Science)'
    : course.title;

  const enrolled = isEnrolledInCourse(course.id);

  const toggleModule = (modId: string) => {
    setOpenModuleIds((prev) =>
      prev.includes(modId) ? prev.filter((id) => id !== modId) : [...prev, modId]
    );
  };

  const whatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
    `Hello INFOCUS ACADEMY, I want to enquire about ${displayTitle}.`
  )}`;

  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);

  return (
    <div className="bg-[#F5F7FA] pb-24 md:pb-12">
      {/* Dark Navy Course Banner */}
      <section className="bg-[#10233F] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <button
            type="button"
            onClick={() => navigate('/courses')}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All Courses
          </button>

          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#D6AF62]">
              {isClass10Alias ? 'Class 10 · Mathematics & Science' : `${course.classOrExam} · ${course.subjects.join(' · ')}`}
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-balance">
              {displayTitle}
            </h1>
            <p className="text-base sm:text-lg text-[#D6AF62] font-medium">
              {course.subtitle}
            </p>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {course.fullDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content + Desktop Sticky Panel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Course Overview & Who This Is For */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="font-display text-xl font-bold text-[#10233F] mb-3">
                  Who This Course Is For
                </h2>
                <ul className="space-y-2.5">
                  {course.whoIsItFor.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <h2 className="font-display text-xl font-bold text-[#10233F] mb-3">
                  Learning Objectives &amp; Academic Features
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.learningObjectives.map((obj) => (
                    <div
                      key={obj}
                      className="p-3.5 rounded-xl bg-[#F5F7FA] text-sm text-slate-700 flex items-start gap-2.5"
                    >
                      <BookOpen className="w-4 h-4 text-[#10233F] shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <h3 className="font-display text-base font-bold text-[#10233F] mb-3">
                  Key Program Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {course.highlights.map((hl) => (
                    <div key={hl} className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#D6AF62] shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Expandable Curriculum Accordion */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="font-display text-xl font-bold text-[#10233F]">
                    Course Curriculum Structure
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    {course.modules.length} modules · {totalLessons} lessons · Expand chapters to inspect topics
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate(`/student/classroom/${course.slug}`)}
                  className="text-xs font-semibold text-[#10233F] hover:underline self-start sm:self-auto cursor-pointer"
                >
                  Open in Learning Classroom
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-[#EAF2FB] text-xs text-[#10233F] leading-relaxed">
                <strong>Curriculum Transparency Notice:</strong> The modules and lessons below represent a sample curriculum structure in the platform preview until official academy lectures and batch notes are published via the Admin / Faculty dashboard.
              </div>

              <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden">
                {course.modules.map((mod) => {
                  const isOpen = openModuleIds.includes(mod.id);
                  return (
                    <div key={mod.id} className="bg-white">
                      <button
                        type="button"
                        onClick={() => toggleModule(mod.id)}
                        className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50 cursor-pointer"
                      >
                        <div>
                          <p className="text-xs font-semibold text-[#D6AF62]">
                            {mod.moduleNumber} · {mod.subject}
                          </p>
                          <h3 className="font-display text-base font-bold text-[#10233F] mt-0.5">
                            {mod.title}
                          </h3>
                          <p className="text-xs text-slate-500 mt-0.5">{mod.description}</p>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                            isOpen ? 'rotate-180 text-[#10233F]' : ''
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="bg-[#F5F7FA] px-5 py-3 divide-y divide-slate-200 border-t border-slate-200">
                          {mod.lessons.map((les) => {
                            const unlocked = enrolled || les.isFreePreview;
                            const done = completedLessons.includes(les.id);
                            return (
                              <div
                                key={les.id}
                                className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                              >
                                <div className="flex items-start gap-3">
                                  {unlocked ? (
                                    <PlayCircle className="w-4 h-4 text-[#10233F] shrink-0 mt-0.5" />
                                  ) : (
                                    <Lock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                                  )}
                                  <div>
                                    <p className="text-sm font-medium text-[#10233F]">
                                      {les.title}
                                      {done && (
                                        <span className="ml-2 text-xs text-[#16A34A] font-semibold">
                                          · Completed
                                        </span>
                                      )}
                                    </p>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                      {les.hasVideo ? 'Video Lesson' : 'Reading'}
                                      {les.hasNotes ? ' · Notes' : ''}
                                      {les.hasPractice ? ' · Practice MCQs' : ''}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-3 pl-7 sm:pl-0">
                                  {les.isFreePreview && !enrolled ? (
                                    <button
                                      type="button"
                                      onClick={() => navigate(`/student/classroom/${course.slug}`)}
                                      className="text-xs font-semibold text-[#16A34A] hover:underline cursor-pointer"
                                    >
                                      Free Preview
                                    </button>
                                  ) : unlocked ? (
                                    <button
                                      type="button"
                                      onClick={() => navigate(`/student/classroom/${course.slug}`)}
                                      className="text-xs font-semibold text-[#10233F] hover:underline cursor-pointer"
                                    >
                                      Open Lesson
                                    </button>
                                  ) : (
                                    <span className="text-xs text-slate-500">Enrolment Required</span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Practice & Revision Support */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-sm font-bold text-[#10233F]">
                  <FileText className="w-4 h-4 text-[#D6AF62]" />
                  Study Materials &amp; Revision Support
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Includes chapter summaries, PDF notes, formula sheets, and structured revision checkpoints organized inside the Student Dashboard.
                </p>
              </div>
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-sm font-bold text-[#10233F]">
                  <HelpCircle className="w-4 h-4 text-[#D6AF62]" />
                  MCQ Practice &amp; Configurable Tests
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Practice chapter-wise MCQs with concept explanations and attempt unit tests configured by the faculty.
                </p>
              </div>
            </div>

            {/* Faculty Info — Strictly when verified */}
            {course.facultyVerified && course.facultyName && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="space-y-1.5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#D6AF62]">
                    Verified Course Faculty
                  </p>
                  <h2 className="font-display text-xl font-bold text-[#10233F]">
                    {course.facultyName}
                  </h2>
                  <p className="text-sm text-slate-600">{course.facultyQualifications}</p>
                  <p className="text-sm text-slate-600 pt-1">
                    Teaches Biology &amp; Chemistry with simple explanations, practical examples, and individual attention.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/faculty')}
                  className="px-4 py-2.5 rounded-lg border border-slate-300 text-sm font-semibold text-[#10233F] hover:bg-slate-50 shrink-0 cursor-pointer"
                >
                  View Faculty Profile
                </button>
              </div>
            )}

            {/* Course FAQs */}
            {course.faqs.length > 0 && (
              <div className="space-y-4">
                <h2 className="font-display text-xl font-bold text-[#10233F]">
                  Program Questions
                </h2>
                <FAQAccordion items={course.faqs} />
              </div>
            )}
          </div>

          {/* Right Sticky Course Information Panel (Desktop) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <div className="aspect-[4/3] bg-slate-100">
                <SafeImage
                  src={course.thumbnail}
                  alt={displayTitle}
                  className="w-full h-full object-cover"
                  fallbackTitle={displayTitle}
                />
              </div>

              <div className="p-6 space-y-5">
                <div className="flex items-baseline justify-between border-b border-slate-100 pb-4">
                  <div>
                    <p className="text-xs text-slate-500">Program Fee</p>
                    <p className="font-display text-2xl font-extrabold text-[#10233F] font-mono-tabular mt-0.5">
                      {course.configuredFee !== null
                        ? `₹${(course.discountFee ?? course.configuredFee).toLocaleString('en-IN')}`
                        : 'On Enquiry'}
                    </p>
                  </div>
                  <span className="text-xs font-medium text-[#16A34A]">
                    {enrolled ? 'Enrolled' : course.accessType}
                  </span>
                </div>

                <dl className="space-y-2.5 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">Class / Exam</dt>
                    <dd className="font-medium text-[#10233F] text-right">{course.classOrExam}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">Subjects</dt>
                    <dd className="font-medium text-[#10233F] text-right">
                      {course.subjects.join(', ')}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">Duration</dt>
                    <dd className="font-medium text-[#10233F] text-right">{course.durationLabel}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">Mode</dt>
                    <dd className="font-medium text-[#10233F] text-right">
                      Kalkaji Centre + Online LMS
                    </dd>
                  </div>
                </dl>

                <div className="space-y-2.5 pt-2">
                  {enrolled ? (
                    <button
                      type="button"
                      onClick={() => navigate(`/student/classroom/${course.slug}`)}
                      className="w-full py-3 px-4 rounded-lg bg-[#16A34A] text-white text-sm font-semibold hover:bg-green-700 cursor-pointer"
                    >
                      Go to Course Classroom
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => navigate(`/checkout/${course.slug}`)}
                      className="w-full py-3 px-4 rounded-lg bg-[#10233F] text-white text-sm font-semibold hover:bg-[#091526] cursor-pointer"
                    >
                      Enroll Now
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => openEnquiryModal(displayTitle)}
                    className="w-full py-2.5 px-4 rounded-lg border border-slate-300 text-sm font-semibold text-[#10233F] hover:bg-slate-50 cursor-pointer"
                  >
                    Enquire About Admission
                  </button>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#EAF2FB] text-[#10233F] text-sm font-semibold hover:bg-blue-100"
                  >
                    <MessageCircle className="w-4 h-4 text-[#16A34A]" />
                    WhatsApp About This Course
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile Sticky Bottom CTA Bar (<= 15% mobile height) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-200 px-4 py-2.5 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => openEnquiryModal(displayTitle)}
          className="flex-1 py-2.5 px-3 rounded-lg border border-[#10233F] text-[#10233F] text-xs font-semibold truncate"
        >
          Enquire About Course
        </button>
        <button
          type="button"
          onClick={() =>
            enrolled
              ? navigate(`/student/classroom/${course.slug}`)
              : navigate(`/checkout/${course.slug}`)
          }
          className="flex-1 py-2.5 px-3 rounded-lg bg-[#10233F] text-white text-xs font-semibold"
        >
          {enrolled ? 'Open Classroom' : 'Enroll Now'}
        </button>
      </div>
    </div>
  );
};
