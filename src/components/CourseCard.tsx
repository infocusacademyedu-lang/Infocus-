import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { Course } from '../types/academy';
import { SafeImage } from './SafeImage';

interface CourseCardProps {
  course: Course;
  targetSlugOverride?: string;
  titleOverride?: string;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  targetSlugOverride,
  titleOverride,
}) => {
  const { navigate, openEnquiryModal } = useAcademy();
  const slug = targetSlugOverride ?? course.slug;
  const displayTitle = titleOverride ?? course.title;

  return (
    <article className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between transition-colors duration-150 hover:border-[#10233F]/40">
      <div>
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          <SafeImage
            src={course.thumbnail}
            alt={`${displayTitle} thumbnail`}
            className="w-full h-full object-cover"
            fallbackTitle={displayTitle}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#091526]/75 via-[#091526]/15 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white/95 font-medium">
            <span>{course.classOrExam}</span>
            <span className="text-[#D6AF62]">{course.accessType}</span>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-1.5">
            <p className="text-xs font-medium text-[#64748B]">
              {course.subjects.join(' · ')}
            </p>
            <h3 className="font-display text-xl font-bold text-[#10233F] leading-snug">
              {displayTitle}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
              {course.shortDescription}
            </p>
          </div>

          <ul className="space-y-1.5 pt-1 border-t border-slate-100">
            {course.highlights.slice(0, 4).map((hl) => (
              <li key={hl} className="flex items-start gap-2 text-xs text-slate-700">
                <Check className="w-3.5 h-3.5 text-[#16A34A] shrink-0 mt-0.5" />
                <span>{hl}</span>
              </li>
            ))}
          </ul>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <div className="text-slate-600">
              {course.facultyVerified && course.facultyName ? (
                <span>
                  Faculty: <strong className="text-[#10233F]">{course.facultyName}</strong>
                </span>
              ) : (
                <span>{course.primaryCategory} Program</span>
              )}
            </div>
            <div className="font-mono-tabular font-semibold text-[#10233F]">
              {course.configuredFee !== null
                ? `₹${(course.discountFee ?? course.configuredFee).toLocaleString('en-IN')}`
                : 'Fee on Enquiry'}
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 pt-2 flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(`/courses/${slug}`)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#10233F] text-white text-sm font-semibold hover:bg-[#091526] transition-colors whitespace-nowrap cursor-pointer"
        >
          View Course
          <ArrowRight className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => openEnquiryModal(displayTitle)}
          className="px-4 py-2.5 rounded-lg border border-slate-300 text-sm font-medium text-[#10233F] hover:bg-slate-50 transition-colors whitespace-nowrap cursor-pointer"
        >
          Enquire
        </button>
      </div>
    </article>
  );
};
