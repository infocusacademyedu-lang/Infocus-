import React, { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { AcademyLogo } from './Logo';

export const PublicHeader: React.FC = () => {
  const { route, navigate, authUser, openEnquiryModal } = useAcademy();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return route === '/';
    return route === path || route.startsWith(path + '/');
  };

  const navLinkClass = (path: string) =>
    `text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 py-1 border-b-2 ${
      isActive(path)
        ? 'text-[#10233F] border-[#D6AF62]'
        : 'text-slate-600 border-transparent hover:text-[#10233F] hover:border-slate-300'
    }`;

  const go = (to: string) => {
    setMobileOpen(false);
    setProgramsOpen(false);
    navigate(to);
  };

  const portalRoute =
    authUser?.role === 'admin'
      ? '/admin'
      : authUser?.role === 'teacher'
      ? '/teacher'
      : '/student';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Left: Brand Logo */}
        <button
          type="button"
          onClick={() => go('/')}
          className="focus-visible:outline-2 focus-visible:outline-[#10233F] rounded-md text-left shrink-0 cursor-pointer"
          aria-label="INFOCUS ACADEMY Home"
        >
          <AcademyLogo variant="dark" />
        </button>

        {/* Center: Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-5" aria-label="Primary Navigation">
          <button type="button" onClick={() => go('/')} className={navLinkClass('/')}>
            Home
          </button>
          <button type="button" onClick={() => go('/courses')} className={navLinkClass('/courses')}>
            Courses
          </button>
          <button
            type="button"
            onClick={() => go('/courses/class-11')}
            className={navLinkClass('/courses/class-11')}
          >
            Class 11
          </button>
          <button
            type="button"
            onClick={() => go('/courses/class-12')}
            className={navLinkClass('/courses/class-12')}
          >
            Class 12
          </button>
          <button
            type="button"
            onClick={() => go('/courses/neet')}
            className={navLinkClass('/courses/neet')}
          >
            NEET
          </button>
          <button
            type="button"
            onClick={() => go('/courses/jee')}
            className={navLinkClass('/courses/jee')}
          >
            JEE
          </button>
          <button
            type="button"
            onClick={() => go('/courses/cuet')}
            className={navLinkClass('/courses/cuet')}
          >
            CUET
          </button>
          <button type="button" onClick={() => go('/faculty')} className={navLinkClass('/faculty')}>
            About JDR Sir
          </button>
          <button type="button" onClick={() => go('/contact')} className={navLinkClass('/contact')}>
            Contact
          </button>
        </nav>

        {/* Tablet Navigation (md to xl) */}
        <nav className="hidden md:flex xl:hidden items-center gap-5" aria-label="Tablet Navigation">
          <button type="button" onClick={() => go('/')} className={navLinkClass('/')}>
            Home
          </button>
          <div className="relative">
            <button
              type="button"
              onClick={() => setProgramsOpen((v) => !v)}
              className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-[#10233F] whitespace-nowrap shrink-0 py-1"
            >
              Programs <ChevronDown className="w-4 h-4" />
            </button>
            {programsOpen && (
              <div className="absolute left-0 top-full mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50">
                {[
                  { label: 'All Courses', to: '/courses' },
                  { label: 'Class 9 Foundation', to: '/courses/class-9' },
                  { label: 'Class 10 Foundation', to: '/courses/class-10' },
                  { label: 'Class 11 Science', to: '/courses/class-11' },
                  { label: 'Class 12 Science', to: '/courses/class-12' },
                  { label: 'NEET Preparation', to: '/courses/neet' },
                  { label: 'JEE Foundation', to: '/courses/jee' },
                  { label: 'CUET Preparation', to: '/courses/cuet' },
                ].map((item) => (
                  <button
                    key={item.to}
                    type="button"
                    onClick={() => go(item.to)}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-[#EAF2FB] hover:text-[#10233F]"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button type="button" onClick={() => go('/faculty')} className={navLinkClass('/faculty')}>
            About JDR Sir
          </button>
          <button type="button" onClick={() => go('/contact')} className={navLinkClass('/contact')}>
            Contact
          </button>
        </nav>

        {/* Right: Auth & Enquiry Actions */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {authUser ? (
            <button
              type="button"
              onClick={() => go(portalRoute)}
              className="px-4 py-2 text-sm font-medium text-[#10233F] border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {authUser.role === 'admin'
                ? 'Admin Console'
                : authUser.role === 'teacher'
                ? 'Teacher Portal'
                : 'Student Portal'}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => go('/login')}
              className="px-4 py-2 text-sm font-medium text-[#10233F] border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Login
            </button>
          )}
          <button
            type="button"
            onClick={() => openEnquiryModal()}
            className="px-4 py-2 text-sm font-semibold text-white bg-[#10233F] hover:bg-[#091526] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Join / Enquire
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-slate-200 text-[#10233F] hover:bg-slate-50"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-1 max-h-[82vh] overflow-y-auto">
          {[
            { label: 'Home', to: '/' },
            { label: 'All Courses', to: '/courses' },
            { label: 'Class 9 Foundation', to: '/courses/class-9' },
            { label: 'Class 10 Foundation', to: '/courses/class-10' },
            { label: 'Class 11 Biology & Chemistry', to: '/courses/class-11' },
            { label: 'Class 12 Biology & Chemistry', to: '/courses/class-12' },
            { label: 'NEET Preparation', to: '/courses/neet' },
            { label: 'JEE Foundation & Prep', to: '/courses/jee' },
            { label: 'CUET Preparation', to: '/courses/cuet' },
            { label: 'About JDR Sir', to: '/faculty' },
            { label: 'Contact & Kalkaji Centre', to: '/contact' },
          ].map((item) => (
            <button
              key={item.to}
              type="button"
              onClick={() => go(item.to)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                isActive(item.to)
                  ? 'bg-[#EAF2FB] text-[#10233F] font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 mt-3 border-t border-slate-200 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => go(authUser ? portalRoute : '/login')}
              className="py-2.5 px-3 text-sm font-medium text-[#10233F] border border-slate-300 rounded-lg text-center"
            >
              {authUser ? 'Open Portal' : 'Login'}
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                openEnquiryModal();
              }}
              className="py-2.5 px-3 text-sm font-semibold text-white bg-[#10233F] rounded-lg text-center"
            >
              Join / Enquire
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
