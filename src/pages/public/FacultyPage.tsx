import React from 'react';
import { ArrowRight, BookOpen, CheckCircle2, GraduationCap } from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';
import { FACULTY_PROFILE } from '../../data/academyData';

export const FacultyPage: React.FC = () => {
  const { navigate, openEnquiryModal, courses } = useAcademy();
  const jdrCourses = courses.filter((c) => c.facultyVerified);

  return (
    <div className="bg-[#F5F7FA] min-h-screen">
      <section className="bg-[#10233F] text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#D6AF62]">
            Faculty Profile · INFOCUS ACADEMY
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold mt-2">
            {FACULTY_PROFILE.name} ({FACULTY_PROFILE.alias})
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl">
            {FACULTY_PROFILE.experience} · {FACULTY_PROFILE.classes} ·{' '}
            {FACULTY_PROFILE.subjects.join(' & ')}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Large Portrait Placeholder */}
          <div className="lg:col-span-5 bg-[#EAF2FB] border-b lg:border-b-0 lg:border-r border-slate-200 text-[#10233F] p-10 flex flex-col justify-between min-h-[400px]">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span className="font-semibold text-[#10233F]">Main Faculty</span>
              <span className="font-medium">Portrait Placeholder</span>
            </div>

            <div className="my-10 flex flex-col items-center text-center">
              <div className="w-36 h-36 rounded-full border-2 border-[#D6AF62] bg-[#10233F] flex items-center justify-center font-display text-4xl font-extrabold text-[#D6AF62] shadow-sm">
                JDR
              </div>
              <h2 className="font-display text-2xl font-bold mt-5 text-[#10233F]">
                {FACULTY_PROFILE.name}
              </h2>
              <p className="text-sm text-[#64748B] font-semibold mt-1">{FACULTY_PROFILE.alias}</p>
            </div>

            <div className="border-t border-slate-200 pt-4 space-y-1 text-xs text-slate-700 text-center">
              {FACULTY_PROFILE.qualifications.map((q) => (
                <p key={q}>{q}</p>
              ))}
            </div>
          </div>

          {/* Verified Credentials & Teaching Philosophy */}
          <div className="lg:col-span-7 p-8 sm:p-12 space-y-6">
            <div className="space-y-3">
              <h2 className="font-display text-2xl font-bold text-[#10233F]">
                Teaching Philosophy &amp; Academic Guidance
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">{FACULTY_PROFILE.bio}</p>
              <p className="text-base text-slate-600 leading-relaxed">
                {FACULTY_PROFILE.approach}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
              <div className="p-4 rounded-xl bg-[#F5F7FA] space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#64748B] uppercase">
                  <GraduationCap className="w-4 h-4 text-[#10233F]" />
                  Qualifications
                </div>
                <p className="text-sm font-semibold text-[#10233F]">
                  B.Sc. &amp; M.Sc. — University of Delhi
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#F5F7FA] space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#64748B] uppercase">
                  <BookOpen className="w-4 h-4 text-[#10233F]" />
                  Teaching Focus
                </div>
                <p className="text-sm font-semibold text-[#10233F]">
                  Biology &amp; Chemistry (Classes 11 &amp; 12)
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              <h3 className="font-display text-sm font-bold text-[#10233F] uppercase tracking-wide">
                Classroom Principles
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-slate-700">
                {[
                  'Simple explanations of complex topics',
                  'Concept-based science teaching',
                  'Practical, relatable examples',
                  'Patience & individual attention',
                  'Open question-friendly environment',
                  'Strong foundational clarity',
                ].map((pt) => (
                  <li key={pt} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => openEnquiryModal('Classes with Jaidev Roy (JDR Sir)')}
                className="px-6 py-3 rounded-lg bg-[#10233F] text-white text-sm font-semibold hover:bg-[#091526] cursor-pointer"
              >
                Enquire About Classes
              </button>
              <button
                type="button"
                onClick={() => navigate('/courses')}
                className="px-5 py-3 rounded-lg border border-slate-300 text-sm font-semibold text-[#10233F] hover:bg-slate-50 cursor-pointer"
              >
                View Programs
              </button>
            </div>
          </div>
        </div>

        {/* Courses Taught */}
        <div className="space-y-5">
          <h2 className="font-display text-2xl font-bold text-[#10233F]">
            Programs Guided by JDR Sir
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jdrCourses.map((c) => (
              <div
                key={c.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <p className="text-xs font-medium text-[#64748B]">
                    {c.classOrExam} · {c.subjects.join(' · ')}
                  </p>
                  <h3 className="font-display text-lg font-bold text-[#10233F]">{c.title}</h3>
                  <p className="text-sm text-slate-600">{c.shortDescription}</p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate(`/courses/${c.slug}`)}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#10233F] hover:text-[#D6AF62] cursor-pointer"
                >
                  Explore Program <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
