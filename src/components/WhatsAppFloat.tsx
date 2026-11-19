import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';

export const WhatsAppFloat: React.FC = () => {
  const { route, courses, settings } = useAcademy();

  // Only show on public website routes
  if (
    route.startsWith('/student') ||
    route.startsWith('/teacher') ||
    route.startsWith('/admin')
  ) {
    return null;
  }

  let contextLabel = 'INFOCUS ACADEMY programs';
  if (route.startsWith('/courses/')) {
    const slug = route.replace('/courses/', '');
    if (slug === 'class-10') contextLabel = 'Class 10 Mathematics & Science Foundation';
    else {
      const course = courses.find((c) => c.slug === slug);
      if (course) contextLabel = course.title;
    }
  } else if (route === '/faculty') {
    contextLabel = 'Biology & Chemistry classes with JDR Sir';
  }

  const message = encodeURIComponent(
    `Hello INFOCUS ACADEMY (Kalkaji), I would like to know more about ${contextLabel}.`
  );
  const href = `https://wa.me/${settings.whatsappNumber}?text=${message}`;
  const isCourseDetail = route.startsWith('/courses/');

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`WhatsApp enquiry about ${contextLabel}`}
      className={`fixed right-4 z-30 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#16A34A] text-white text-sm font-semibold shadow-lg hover:bg-green-700 transition-transform duration-150 hover:scale-[1.02] ${
        isCourseDetail ? 'bottom-20 md:bottom-6' : 'bottom-5'
      }`}
    >
      <MessageCircle className="w-4 h-4 shrink-0" />
      <span className="hidden sm:inline whitespace-nowrap">WhatsApp Enquiry</span>
    </a>
  );
};
