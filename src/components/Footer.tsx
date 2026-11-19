import React from 'react';
import { MapPin, Phone } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { AcademyLogo } from './Logo';

export const Footer: React.FC = () => {
  const { navigate, settings, loginAsRole } = useAcademy();

  return (
    <footer className="bg-[#091526] text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand & Taglines */}
          <div className="space-y-4">
            <AcademyLogo variant="light" size="lg" />
            <p className="text-sm text-white font-medium leading-relaxed">
              {settings.mainTagline}
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              {settings.secondaryTagline} Established {settings.establishedYear} in Kalkaji, New Delhi.
            </p>
          </div>

          {/* Academic Programs */}
          <div>
            <h3 className="font-display text-sm font-semibold text-white mb-4">
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
                    className="text-slate-300 hover:text-[#D6AF62] transition-colors text-left cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Learning Portals */}
          <div>
            <h3 className="font-display text-sm font-semibold text-white mb-4">
              Learning Platform
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-slate-300 hover:text-[#D6AF62] transition-colors cursor-pointer"
                >
                  Student Login &amp; Registration
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => loginAsRole('student')}
                  className="text-slate-300 hover:text-[#D6AF62] transition-colors cursor-pointer"
                >
                  Student Dashboard (Preview)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => loginAsRole('teacher')}
                  className="text-slate-300 hover:text-[#D6AF62] transition-colors cursor-pointer"
                >
                  Teacher / Faculty Dashboard
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => loginAsRole('admin')}
                  className="text-slate-300 hover:text-[#D6AF62] transition-colors cursor-pointer"
                >
                  Admin Management Console
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/faculty')}
                  className="text-slate-300 hover:text-[#D6AF62] transition-colors cursor-pointer"
                >
                  About Jaidev Roy (JDR Sir)
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3 text-sm">
            <h3 className="font-display text-sm font-semibold text-white mb-4">
              Kalkaji Study Centre
            </h3>
            <div className="flex items-start gap-2.5 text-slate-300">
              <MapPin className="w-4 h-4 text-[#D6AF62] shrink-0 mt-0.5" />
              <span>{settings.address}</span>
            </div>
            <div className="space-y-1.5 pt-1">
              {settings.phones.map((ph) => (
                <a
                  key={ph}
                  href={`tel:+91${ph}`}
                  className="flex items-center gap-2.5 text-slate-300 hover:text-[#D6AF62] font-mono-tabular"
                >
                  <Phone className="w-4 h-4 text-[#D6AF62] shrink-0" />
                  <span>+91 {ph}</span>
                </a>
              ))}
            </div>
            <button
              type="button"
              onClick={() => navigate('/contact')}
              className="mt-2 inline-block text-sm font-medium text-[#D6AF62] hover:underline cursor-pointer"
            >
              Get Directions &amp; Enquire
            </button>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} {settings.academyName}, Kalkaji, New Delhi. Established{' '}
            {settings.establishedYear}.
          </p>
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => navigate('/courses')}
              className="hover:text-white cursor-pointer"
            >
              Course Catalog
            </button>
            <button
              type="button"
              onClick={() => navigate('/contact')}
              className="hover:text-white cursor-pointer"
            >
              Admissions Support
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
