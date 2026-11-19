import React from 'react';
import { MapPin, Phone } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { AcademyLogo } from './Logo';

export const Footer: React.FC = () => {
  const { navigate, settings, loginAsRole } = useAcademy();

  return (
    <footer className="bg-white text-[#10233F] border-t-2 border-[#10233F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 items-start">
          {/* Brand & Taglines */}
          <div className="space-y-4">
            <AcademyLogo variant="dark" size="lg" />
            <p className="text-sm text-[#10233F] font-semibold leading-relaxed">
              {settings.mainTagline}
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              {settings.secondaryTagline} Established{' '}
              <span className="text-[#10233F] font-bold font-mono-tabular">
                {settings.establishedYear}
              </span>{' '}
              in Kalkaji, New Delhi.
            </p>
          </div>

          {/* Academic Programs */}
          <div>
            <h3 className="font-display text-sm font-bold text-[#10233F] tracking-wide mb-4 pb-2 border-b border-[#D6AF62]">
              Academic Programs
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Class 11 Science (Biology & Chemistry)', to: '/courses/class-11' },
                { label: 'Class 12 Science (Biology & Chemistry)', to: '/courses/class-12' },
                { label: 'NEET Preparation Program', to: '/courses/neet' },
                { label: 'JEE Foundation & Preparation', to: '/courses/jee' },
                { label: 'CUET Preparation Program', to: '/courses/cuet' },
                { label: 'Classes 9 & 10 Foundation', to: '/courses/class-9' },
              ].map((item) => (
                <li key={item.to}>
                  <button
                    type="button"
                    onClick={() => navigate(item.to)}
                    className="text-slate-700 hover:text-[#10233F] hover:underline font-medium transition-colors text-left cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Learning Portals */}
          <div>
            <h3 className="font-display text-sm font-bold text-[#10233F] tracking-wide mb-4 pb-2 border-b border-[#D6AF62]">
              Learning Platform
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-slate-700 hover:text-[#10233F] hover:underline font-medium transition-colors cursor-pointer"
                >
                  Student Login &amp; Registration
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => loginAsRole('student')}
                  className="text-slate-700 hover:text-[#10233F] hover:underline font-medium transition-colors cursor-pointer"
                >
                  Student Dashboard (Preview)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => loginAsRole('teacher')}
                  className="text-slate-700 hover:text-[#10233F] hover:underline font-medium transition-colors cursor-pointer"
                >
                  Teacher / Faculty Dashboard
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => loginAsRole('admin')}
                  className="text-slate-700 hover:text-[#10233F] hover:underline font-medium transition-colors cursor-pointer"
                >
                  Admin Management Console
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/faculty')}
                  className="text-slate-700 hover:text-[#10233F] hover:underline font-medium transition-colors cursor-pointer"
                >
                  About Jaidev Roy (JDR Sir)
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="rounded-2xl bg-[#EAF2FB] border border-blue-200 p-5 space-y-3.5 text-sm">
            <h3 className="font-display text-sm font-bold text-[#10233F] tracking-wide">
              Kalkaji Study Centre
            </h3>
            <div className="flex items-start gap-2.5 text-slate-700">
              <MapPin className="w-4 h-4 text-[#10233F] shrink-0 mt-0.5" />
              <span className="leading-relaxed">{settings.address}</span>
            </div>
            <div className="space-y-2 pt-1">
              {settings.phones.map((ph) => (
                <a
                  key={ph}
                  href={`tel:+91${ph}`}
                  className="flex items-center gap-2.5 text-[#10233F] font-semibold hover:underline transition-colors font-mono-tabular"
                >
                  <Phone className="w-4 h-4 text-[#10233F] shrink-0" />
                  <span>+91 {ph}</span>
                </a>
              ))}
            </div>
            <button
              type="button"
              onClick={() => navigate('/contact')}
              className="w-full mt-1 py-2.5 px-3.5 rounded-lg bg-[#10233F] text-white text-xs font-bold hover:bg-[#091526] transition-colors cursor-pointer"
            >
              Get Directions &amp; Enquire
            </button>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <p>
            © {new Date().getFullYear()}{' '}
            <span className="text-[#10233F] font-semibold">{settings.academyName}</span>, Kalkaji, New Delhi. Established{' '}
            {settings.establishedYear}.
          </p>
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => navigate('/courses')}
              className="text-slate-700 hover:text-[#10233F] font-medium transition-colors cursor-pointer"
            >
              Course Catalog
            </button>
            <button
              type="button"
              onClick={() => navigate('/contact')}
              className="text-slate-700 hover:text-[#10233F] font-medium transition-colors cursor-pointer"
            >
              Admissions Support
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
