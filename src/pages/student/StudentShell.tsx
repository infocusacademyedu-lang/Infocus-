import React, { useState } from 'react';
import {
  Award,
  BarChart3,
  Bell,
  BookOpen,
  ClipboardCheck,
  FileText,
  Globe,
  HelpCircle,
  Home,
  LogOut,
  Menu,
  PlaySquare,
  User,
  X,
} from 'lucide-react';
import { AcademyLogo } from '../../components/Logo';
import { useAcademy } from '../../context/AcademyContext';

interface StudentShellProps {
  children: React.ReactNode;
}

const STUDENT_NAV = [
  { label: 'Dashboard', route: '/student', icon: Home },
  { label: 'My Courses', route: '/student/courses', icon: BookOpen },
  { label: 'Classroom', route: '/student/classroom', icon: PlaySquare },
  { label: 'Study Materials', route: '/student/materials', icon: FileText },
  { label: 'Practice MCQs', route: '/student/practice', icon: Award },
  { label: 'Online Tests', route: '/student/tests', icon: ClipboardCheck },
  { label: 'My Progress', route: '/student/progress', icon: BarChart3 },
  { label: 'Doubt Support', route: '/student/doubts', icon: HelpCircle },
  { label: 'Notifications', route: '/student/notifications', icon: Bell },
  { label: 'My Profile', route: '/student/profile', icon: User },
];

export const StudentShell: React.FC<StudentShellProps> = ({ children }) => {
  const { route, navigate, authUser, notifications, logout, loginAsRole } = useAcademy();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const isRouteActive = (target: string) => {
    if (target === '/student') return route === '/student';
    return route === target || route.startsWith(target + '/');
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col lg:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:shrink-0 bg-[#10233F] text-white border-r border-slate-800 sticky top-0 h-screen">
        <div className="p-5 border-b border-white/10">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-left cursor-pointer"
          >
            <AcademyLogo variant="light" />
          </button>
          <p className="text-[11px] text-[#D6AF62] mt-2 font-medium">
            Student Learning Portal
          </p>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1" aria-label="Student Portal Navigation">
          {STUDENT_NAV.map((item) => {
            const Icon = item.icon;
            const active = isRouteActive(item.route);
            return (
              <button
                key={item.route}
                type="button"
                onClick={() => navigate(item.route)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  active
                    ? 'bg-white text-[#10233F] font-semibold'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </span>
                {item.route === '/student/notifications' && unreadCount > 0 && (
                  <span className="text-xs font-mono-tabular px-1.5 py-0.5 rounded bg-[#D6AF62] text-[#091526] font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-white/10 cursor-pointer"
          >
            <Globe className="w-4 h-4 text-[#D6AF62]" />
            Public Website
          </button>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => loginAsRole('teacher')}
              className="flex-1 py-1.5 px-2 rounded bg-white/10 hover:bg-white/15 text-[11px] text-slate-200 cursor-pointer"
            >
              Teacher View
            </button>
            <button
              type="button"
              onClick={() => loginAsRole('admin')}
              className="flex-1 py-1.5 px-2 rounded bg-white/10 hover:bg-white/15 text-[11px] text-slate-200 cursor-pointer"
            >
              Admin View
            </button>
          </div>
          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-red-300 hover:bg-red-500/10 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Column */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-0">
        {/* Top Workspace Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileNavOpen((v) => !v)}
              className="lg:hidden w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-[#10233F]"
              aria-label="Open student navigation"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="min-w-0">
              <p className="text-xs text-slate-500 truncate">
                INFOCUS ACADEMY · Student Workspace
              </p>
              <p className="font-display text-sm font-bold text-[#10233F] truncate">
                {authUser?.name ?? 'Student Preview'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => navigate('/student/notifications')}
              className="relative p-2 rounded-lg border border-slate-200 text-slate-600 hover:text-[#10233F] hover:bg-slate-50 cursor-pointer"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D6AF62] text-[#091526] text-[10px] font-bold flex items-center justify-center font-mono-tabular">
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate('/courses')}
              className="hidden sm:inline-flex px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-[#10233F] hover:bg-slate-50 cursor-pointer"
            >
              Browse Courses
            </button>
          </div>
        </header>

        {/* Mobile Drawer Menu */}
        {mobileNavOpen && (
          <div className="lg:hidden bg-[#10233F] text-white px-4 py-4 space-y-1 border-b border-slate-800">
            {STUDENT_NAV.map((item) => {
              const Icon = item.icon;
              const active = isRouteActive(item.route);
              return (
                <button
                  key={item.route}
                  type="button"
                  onClick={() => {
                    setMobileNavOpen(false);
                    navigate(item.route);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium ${
                    active ? 'bg-white text-[#10233F] font-semibold' : 'text-slate-200'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </span>
                </button>
              );
            })}
            <div className="pt-3 border-t border-white/15 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileNavOpen(false);
                  navigate('/');
                }}
                className="px-3 py-2 rounded bg-white/10 text-xs"
              >
                Public Site
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileNavOpen(false);
                  loginAsRole('teacher');
                }}
                className="px-3 py-2 rounded bg-white/10 text-xs"
              >
                Teacher View
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileNavOpen(false);
                  loginAsRole('admin');
                }}
                className="px-3 py-2 rounded bg-white/10 text-xs"
              >
                Admin View
              </button>
            </div>
          </div>
        )}

        {/* Main Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Mobile Bottom App Navigation */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-200 grid grid-cols-5 h-16"
        aria-label="Student Mobile Navigation"
      >
        {[
          { label: 'Home', route: '/student', icon: Home },
          { label: 'Class', route: '/student/classroom', icon: PlaySquare },
          { label: 'Practice', route: '/student/practice', icon: Award },
          { label: 'Tests', route: '/student/tests', icon: ClipboardCheck },
          { label: 'Profile', route: '/student/profile', icon: User },
        ].map((item) => {
          const Icon = item.icon;
          const active = isRouteActive(item.route);
          return (
            <button
              key={item.route}
              type="button"
              onClick={() => navigate(item.route)}
              className={`flex flex-col items-center justify-center gap-1 text-[11px] font-medium ${
                active ? 'text-[#10233F] font-bold' : 'text-slate-500'
              }`}
            >
              <Icon className={`w-4 h-4 ${active ? 'text-[#D6AF62]' : ''}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
