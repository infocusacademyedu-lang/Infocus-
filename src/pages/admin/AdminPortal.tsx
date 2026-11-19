import React, { useState } from 'react';
import {
  Bell,
  BookOpen,
  CreditCard,
  FileText,
  FolderTree,
  Globe,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Menu,
  Plus,
  Settings,
  Trash2,
  UserCheck,
  Users,
  Video,
  X,
} from 'lucide-react';
import { AcademyLogo } from '../../components/Logo';
import { useAcademy } from '../../context/AcademyContext';
import { FACULTY_PROFILE, IMG_BIO } from '../../data/academyData';
import { Course, CourseCategory } from '../../types/academy';

type AdminTab =
  | 'overview'
  | 'courses'
  | 'categories'
  | 'students'
  | 'teachers'
  | 'enrollments'
  | 'payments'
  | 'materials'
  | 'videos'
  | 'tests'
  | 'questions'
  | 'doubts'
  | 'announcements'
  | 'website'
  | 'settings';

const ADMIN_NAV: { id: AdminTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'courses', label: 'Courses', icon: BookOpen },
  { id: 'categories', label: 'Course Categories', icon: FolderTree },
  { id: 'students', label: 'Students', icon: Users },
  { id: 'teachers', label: 'Teachers', icon: UserCheck },
  { id: 'enrollments', label: 'Enrollments', icon: FileText },
  { id: 'payments', label: 'Payments', icon: CreditCard },
  { id: 'materials', label: 'Study Materials', icon: FileText },
  { id: 'videos', label: 'Video Lectures', icon: Video },
  { id: 'tests', label: 'Tests', icon: FileText },
  { id: 'questions', label: 'Practice Questions', icon: HelpCircle },
  { id: 'doubts', label: 'Doubt Management', icon: HelpCircle },
  { id: 'announcements', label: 'Announcements', icon: Megaphone },
  { id: 'website', label: 'Website Content', icon: Globe },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const AdminPortal: React.FC = () => {
  const {
    courses,
    users,
    enrollments,
    payments,
    enquiries,
    resources,
    questions,
    tests,
    doubts,
    settings,
    navigate,
    logout,
    loginAsRole,
    addCourse,
    updateCourse,
    deleteCourse,
    updateEnrollmentStatus,
    updatePaymentStatus,
    updateEnquiryStatus,
    publishAnnouncement,
    updateSettings,
    replyToDoubt,
    resetPrototypeData,
  } = useAcademy();

  const [tab, setTab] = useState<AdminTab>('overview');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notice, setNotice] = useState('');

  // Create/Edit Course Form
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseCategory, setNewCourseCategory] = useState<CourseCategory>('Class 11');
  const [newCourseSubjects, setNewCourseSubjects] = useState('Biology, Chemistry');
  const [newCourseDesc, setNewCourseDesc] = useState('');
  const [newCourseFee, setNewCourseFee] = useState('');
  const [newCourseDiscount, setNewCourseDiscount] = useState('');
  const [newCourseDuration, setNewCourseDuration] = useState('Academic Session');

  // Announcement Form
  const [annTitle, setAnnTitle] = useState('');
  const [annMessage, setAnnMessage] = useState('');

  // Website & Settings state
  const [siteTagline, setSiteTagline] = useState(settings.mainTagline);
  const [siteSecondary, setSiteSecondary] = useState(settings.secondaryTagline);
  const [siteAddress, setSiteAddress] = useState(settings.address);
  const [razorpayReady, setRazorpayReady] = useState(settings.razorpayConfigured);

  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});

  const flash = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(''), 4000);
  };

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseTitle.trim()) return;
    const slug = newCourseTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    const feeNum = newCourseFee ? Number(newCourseFee) : null;
    const discNum = newCourseDiscount ? Number(newCourseDiscount) : null;
    const created: Course = {
      id: `course-${Date.now()}`,
      slug: `${slug}-${Date.now().toString().slice(-3)}`,
      title: newCourseTitle.trim(),
      subtitle: 'Structured Concept-Based Learning',
      categories: [newCourseCategory],
      primaryCategory: newCourseCategory,
      classOrExam: newCourseCategory,
      subjects: newCourseSubjects.split(',').map((s) => s.trim()).filter(Boolean),
      shortDescription: newCourseDesc.trim() || 'Configured academic program at INFOCUS ACADEMY.',
      fullDescription: newCourseDesc.trim() || 'Configured academic program at INFOCUS ACADEMY.',
      whoIsItFor: [`Students enrolled in ${newCourseCategory}`],
      highlights: ['Concept-based teaching', 'Doubt support', 'Structured practice'],
      learningObjectives: ['Build strong subject clarity and confidence'],
      facultyVerified: false,
      accessType: 'Enrolment Required',
      configuredFee: feeNum,
      discountFee: discNum,
      durationLabel: newCourseDuration,
      published: true,
      thumbnail: IMG_BIO,
      seoTitle: `${newCourseTitle.trim()} | INFOCUS ACADEMY Kalkaji`,
      seoDescription: newCourseDesc.trim() || 'Academic coaching program at INFOCUS ACADEMY.',
      modules: [],
      faqs: [],
    };
    addCourse(created);
    setNewCourseTitle('');
    setNewCourseDesc('');
    setNewCourseFee('');
    setNewCourseDiscount('');
    flash('New course created and published to Marketplace.');
  };

  const studentUsers = users.filter((u) => u.role === 'student');

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col lg:flex-row">
      {/* Admin Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:shrink-0 bg-[#091526] text-white sticky top-0 h-screen">
        <div className="p-5 border-b border-white/10">
          <button type="button" onClick={() => navigate('/')} className="cursor-pointer">
            <AcademyLogo variant="light" />
          </button>
          <p className="text-[11px] text-[#D6AF62] mt-2 font-semibold">
            Academy Admin Console
          </p>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          {ADMIN_NAV.map((item) => {
            const Icon = item.icon;
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium cursor-pointer ${
                  active ? 'bg-white text-[#10233F] font-semibold' : 'text-slate-300 hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10 space-y-2">
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => loginAsRole('student')}
              className="flex-1 py-1.5 px-2 rounded bg-white/10 text-[11px] text-slate-200 cursor-pointer"
            >
              Student View
            </button>
            <button
              type="button"
              onClick={() => loginAsRole('teacher')}
              className="flex-1 py-1.5 px-2 rounded bg-white/10 text-[11px] text-slate-200 cursor-pointer"
            >
              Teacher View
            </button>
          </div>
          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-red-300 hover:bg-red-500/10 cursor-pointer"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Column */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenu((v) => !v)}
              className="lg:hidden p-2 rounded-lg border border-slate-200"
              aria-label="Toggle admin menu"
            >
              {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div>
              <p className="text-xs text-slate-500">INFOCUS ACADEMY Management</p>
              <p className="font-display text-sm font-bold text-[#10233F]">
                Admin Dashboard (Prototype Workspace)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-[#10233F] hover:bg-slate-50 cursor-pointer"
          >
            View Public Website
          </button>
        </header>

        {mobileMenu && (
          <div className="lg:hidden bg-[#091526] text-white p-4 grid grid-cols-2 gap-1.5">
            {ADMIN_NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setTab(item.id);
                  setMobileMenu(false);
                }}
                className={`text-left px-3 py-2 rounded-lg text-xs ${
                  tab === item.id ? 'bg-white text-[#10233F] font-semibold' : 'text-slate-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}

        <main className="p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto space-y-6">
          {notice && (
            <div className="p-3.5 rounded-xl bg-green-50 border border-green-200 text-sm text-[#16A34A] font-medium">
              {notice}
            </div>
          )}

          {/* OVERVIEW */}
          {tab === 'overview' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h1 className="font-display text-2xl font-bold text-[#10233F]">
                    Academy Administration Overview
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Prototype Workspace Metrics — reflects live records created inside this prototype session.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Prototype Students', val: studentUsers.length },
                  { label: 'Total Courses', val: courses.length },
                  { label: 'Active Enrollments', val: enrollments.filter((e) => e.status === 'Active').length },
                  { label: 'Admission Enquiries', val: enquiries.length },
                ].map((k) => (
                  <div key={k.label} className="bg-white border border-slate-200 rounded-2xl p-5">
                    <p className="text-xs text-slate-500">{k.label}</p>
                    <p className="font-display text-2xl font-bold text-[#10233F] font-mono-tabular mt-1">
                      {k.val}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* New Enquiries */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
                  <h2 className="font-display text-lg font-bold text-[#10233F]">
                    Recent Admission Enquiries
                  </h2>
                  <div className="divide-y divide-slate-100">
                    {enquiries.slice(0, 5).map((enq) => (
                      <div key={enq.id} className="py-3 flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-[#10233F]">{enq.name}</p>
                          <p className="text-xs text-slate-500">
                            {enq.courseInterest} · <span className="font-mono-tabular">{enq.phone}</span>
                          </p>
                          <p className="text-xs text-slate-600 mt-1">{enq.message}</p>
                        </div>
                        <select
                          value={enq.status}
                          onChange={(e) =>
                            updateEnquiryStatus(enq.id, e.target.value as 'New' | 'Contacted' | 'Closed')
                          }
                          className="text-xs border border-slate-300 rounded px-2 py-1 bg-white"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Registrations & Activity */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
                  <h2 className="font-display text-lg font-bold text-[#10233F]">
                    Recent Student Registrations
                  </h2>
                  <div className="divide-y divide-slate-100">
                    {studentUsers.map((u) => (
                      <div key={u.id} className="py-3 flex items-center justify-between text-sm">
                        <div>
                          <p className="font-semibold text-[#10233F]">{u.name}</p>
                          <p className="text-xs text-slate-500">
                            {u.email} · {u.phone}
                          </p>
                        </div>
                        <span className="text-xs font-semibold text-[#16A34A]">
                          {u.accountStatus}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* COURSE MANAGEMENT */}
          {tab === 'courses' && (
            <div className="space-y-6">
              <form
                onSubmit={handleCreateCourse}
                className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4"
              >
                <div className="flex items-center gap-2">
                  <Plus className="w-5 h-5 text-[#D6AF62]" />
                  <h1 className="font-display text-xl font-bold text-[#10233F]">
                    Create &amp; Configure Course
                  </h1>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    value={newCourseTitle}
                    onChange={(e) => setNewCourseTitle(e.target.value)}
                    placeholder="Course Name"
                    className="px-3 py-2 rounded-lg border border-slate-300 text-sm"
                    required
                  />
                  <select
                    value={newCourseCategory}
                    onChange={(e) => setNewCourseCategory(e.target.value as CourseCategory)}
                    className="px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
                  >
                    {['Class 9', 'Class 10', 'Class 11', 'Class 12', 'NEET', 'JEE', 'CUET'].map(
                      (c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      )
                    )}
                  </select>
                  <input
                    type="text"
                    value={newCourseSubjects}
                    onChange={(e) => setNewCourseSubjects(e.target.value)}
                    placeholder="Subjects (comma separated)"
                    className="px-3 py-2 rounded-lg border border-slate-300 text-sm"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="number"
                    value={newCourseFee}
                    onChange={(e) => setNewCourseFee(e.target.value)}
                    placeholder="Course Price ₹ (optional)"
                    className="px-3 py-2 rounded-lg border border-slate-300 text-sm font-mono-tabular"
                  />
                  <input
                    type="number"
                    value={newCourseDiscount}
                    onChange={(e) => setNewCourseDiscount(e.target.value)}
                    placeholder="Discount Price ₹ (optional)"
                    className="px-3 py-2 rounded-lg border border-slate-300 text-sm font-mono-tabular"
                  />
                  <input
                    type="text"
                    value={newCourseDuration}
                    onChange={(e) => setNewCourseDuration(e.target.value)}
                    placeholder="Duration"
                    className="px-3 py-2 rounded-lg border border-slate-300 text-sm"
                  />
                </div>
                <textarea
                  rows={2}
                  value={newCourseDesc}
                  onChange={(e) => setNewCourseDesc(e.target.value)}
                  placeholder="Course description..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-[#10233F] text-white text-sm font-semibold cursor-pointer"
                >
                  Create &amp; Publish Course
                </button>
              </form>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
                <h2 className="font-display text-lg font-bold text-[#10233F]">
                  Manage Existing Courses ({courses.length})
                </h2>
                <div className="divide-y divide-slate-200">
                  {courses.map((c) => (
                    <div
                      key={c.id}
                      className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div>
                        <p className="text-xs text-slate-500">
                          {c.classOrExam} · {c.subjects.join(', ')}
                        </p>
                        <h3 className="font-display text-base font-bold text-[#10233F]">
                          {c.title}
                        </h3>
                        <p className="text-xs text-slate-600 font-mono-tabular mt-0.5">
                          Fee:{' '}
                          {c.configuredFee !== null
                            ? `₹${c.configuredFee.toLocaleString('en-IN')}`
                            : 'On Enquiry'}{' '}
                          · Status: {c.published ? 'Published' : 'Unpublished'}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <input
                          type="number"
                          placeholder="Set ₹ Fee"
                          defaultValue={c.configuredFee ?? ''}
                          onBlur={(e) => {
                            const v = e.target.value ? Number(e.target.value) : null;
                            updateCourse(c.id, { configuredFee: v });
                            flash(`Updated configured fee for ${c.title}.`);
                          }}
                          className="w-28 px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-mono-tabular"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            updateCourse(c.id, { published: !c.published });
                            flash(
                              `${c.title} ${c.published ? 'unpublished' : 'published'}.`
                            );
                          }}
                          className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-[#10233F] cursor-pointer"
                        >
                          {c.published ? 'Unpublish' : 'Publish'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            deleteCourse(c.id);
                            flash(`Deleted ${c.title}.`);
                          }}
                          className="p-2 rounded-lg text-red-600 hover:bg-red-50 cursor-pointer"
                          aria-label={`Delete ${c.title}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === 'categories' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
              <h1 className="font-display text-xl font-bold text-[#10233F]">Course Categories</h1>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {(['Class 9', 'Class 10', 'Class 11', 'Class 12', 'NEET', 'JEE', 'CUET'] as CourseCategory[]).map(
                  (cat) => {
                    const count = courses.filter((c) => c.categories.includes(cat)).length;
                    return (
                      <div key={cat} className="p-4 rounded-xl bg-[#F5F7FA] border border-slate-200">
                        <p className="font-display text-base font-bold text-[#10233F]">{cat}</p>
                        <p className="text-xs text-slate-500 font-mono-tabular mt-1">
                          {count} program(s)
                        </p>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          )}

          {tab === 'students' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
              <h1 className="font-display text-xl font-bold text-[#10233F]">Student Management</h1>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-slate-200 text-xs text-slate-500">
                    <tr>
                      <th className="py-2 pr-4">Name</th>
                      <th className="py-2 pr-4">Phone</th>
                      <th className="py-2 pr-4">Email</th>
                      <th className="py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {studentUsers.map((u) => (
                      <tr key={u.id}>
                        <td className="py-3 pr-4 font-semibold text-[#10233F]">{u.name}</td>
                        <td className="py-3 pr-4 font-mono-tabular">{u.phone}</td>
                        <td className="py-3 pr-4 text-slate-600">{u.email}</td>
                        <td className="py-3 text-xs font-semibold text-[#16A34A]">
                          {u.accountStatus}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === 'teachers' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3">
              <h1 className="font-display text-xl font-bold text-[#10233F]">
                Verified Academy Faculty
              </h1>
              <div className="p-5 rounded-xl bg-[#F5F7FA] border border-slate-200 space-y-1">
                <p className="font-display text-lg font-bold text-[#10233F]">
                  {FACULTY_PROFILE.name} ({FACULTY_PROFILE.alias})
                </p>
                <p className="text-sm text-slate-600">
                  {FACULTY_PROFILE.qualifications.join(' · ')}
                </p>
                <p className="text-xs text-slate-500">
                  {FACULTY_PROFILE.experience} · {FACULTY_PROFILE.subjects.join(', ')} (
                  {FACULTY_PROFILE.classes})
                </p>
              </div>
            </div>
          )}

          {tab === 'enrollments' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
              <h1 className="font-display text-xl font-bold text-[#10233F]">
                Enrollment Management
              </h1>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-slate-200 text-xs text-slate-500">
                    <tr>
                      <th className="py-2 pr-4">Student</th>
                      <th className="py-2 pr-4">Course</th>
                      <th className="py-2 pr-4">Date</th>
                      <th className="py-2">Status Control</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {enrollments.map((enr) => (
                      <tr key={enr.id}>
                        <td className="py-3 pr-4">
                          <p className="font-semibold text-[#10233F]">{enr.studentName}</p>
                          <p className="text-xs text-slate-500">{enr.studentPhone}</p>
                        </td>
                        <td className="py-3 pr-4">{enr.courseTitle}</td>
                        <td className="py-3 pr-4 text-xs text-slate-500">{enr.enrolledAt}</td>
                        <td className="py-3">
                          <select
                            value={enr.status}
                            onChange={(e) => {
                              updateEnrollmentStatus(
                                enr.id,
                                e.target.value as 'Active' | 'Pending Verification' | 'Suspended'
                              );
                              flash('Enrollment status updated.');
                            }}
                            className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                          >
                            <option value="Active">Active</option>
                            <option value="Pending Verification">Pending Verification</option>
                            <option value="Suspended">Suspended</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === 'payments' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h1 className="font-display text-xl font-bold text-[#10233F]">
                    Payment Records (Razorpay Ready)
                  </h1>
                  <p className="text-xs text-slate-500">
                    No card numbers are stored. Payment records track configurable gateway or centre admissions.
                  </p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-slate-200 text-xs text-slate-500">
                    <tr>
                      <th className="py-2 pr-4">Reference</th>
                      <th className="py-2 pr-4">Student</th>
                      <th className="py-2 pr-4">Course</th>
                      <th className="py-2 pr-4">Amount</th>
                      <th className="py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {payments.map((p) => (
                      <tr key={p.id}>
                        <td className="py-3 pr-4 font-mono-tabular text-xs font-semibold">
                          {p.referenceCode}
                        </td>
                        <td className="py-3 pr-4">{p.studentName}</td>
                        <td className="py-3 pr-4">{p.courseTitle}</td>
                        <td className="py-3 pr-4 font-mono-tabular">
                          {p.finalAmount !== null
                            ? `₹${p.finalAmount.toLocaleString('en-IN')}`
                            : 'Configured by Academy'}
                        </td>
                        <td className="py-3">
                          <select
                            value={p.status}
                            onChange={(e) => {
                              updatePaymentStatus(
                                p.id,
                                e.target.value as 'Pending' | 'Successful' | 'Failed'
                              );
                              flash('Payment status updated.');
                            }}
                            className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Successful">Successful</option>
                            <option value="Failed">Failed</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {(tab === 'materials' || tab === 'videos' || tab === 'tests' || tab === 'questions') && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="font-display text-xl font-bold text-[#10233F]">
                    {tab === 'materials' && `Study Materials (${resources.length})`}
                    {tab === 'videos' && 'Video Lecture Library'}
                    {tab === 'tests' && `Online Tests (${tests.length})`}
                    {tab === 'questions' && `Practice Question Bank (${questions.length})`}
                  </h1>
                  <p className="text-xs text-slate-500">
                    Use the Faculty Dashboard upload tools to add new videos, notes, MCQs, or tests.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => loginAsRole('teacher')}
                  className="px-4 py-2 rounded-lg bg-[#10233F] text-white text-xs font-semibold cursor-pointer self-start"
                >
                  Open Content Upload Tools
                </button>
              </div>
              <div className="text-sm text-slate-600 space-y-2">
                {tab === 'materials' &&
                  resources.map((r) => (
                    <div key={r.id} className="p-3 rounded-xl bg-[#F5F7FA] flex justify-between">
                      <span className="font-medium text-[#10233F]">{r.title}</span>
                      <span className="text-xs text-slate-500">{r.category}</span>
                    </div>
                  ))}
                {tab === 'videos' &&
                  courses.map((c) => (
                    <div key={c.id} className="p-3 rounded-xl bg-[#F5F7FA] flex justify-between">
                      <span className="font-medium text-[#10233F]">{c.title}</span>
                      <span className="text-xs font-mono-tabular text-slate-500">
                        {c.modules.reduce((a, m) => a + m.lessons.length, 0)} lesson slots
                      </span>
                    </div>
                  ))}
                {tab === 'tests' &&
                  tests.map((t) => (
                    <div key={t.id} className="p-3 rounded-xl bg-[#F5F7FA] flex justify-between">
                      <span className="font-medium text-[#10233F]">{t.title}</span>
                      <span className="text-xs text-slate-500">{t.status}</span>
                    </div>
                  ))}
                {tab === 'questions' &&
                  questions.map((q) => (
                    <div key={q.id} className="p-3 rounded-xl bg-[#F5F7FA]">
                      <p className="font-medium text-[#10233F]">{q.question}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        {q.subject} · {q.chapter}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {tab === 'doubts' && (
            <div className="space-y-4">
              <h1 className="font-display text-xl font-bold text-[#10233F]">
                Admin Doubt Management
              </h1>
              {doubts.map((d) => (
                <div key={d.id} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>
                      {d.studentName} · {d.courseTitle}
                    </span>
                    <span className="font-semibold text-[#10233F]">{d.status}</span>
                  </div>
                  <h2 className="font-display text-base font-bold text-[#10233F]">{d.question}</h2>
                  <p className="text-sm text-slate-600">{d.description}</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={replyDrafts[d.id] ?? ''}
                      onChange={(e) =>
                        setReplyDrafts((p) => ({ ...p, [d.id]: e.target.value }))
                      }
                      placeholder="Reply or resolve doubt..."
                      className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const txt = replyDrafts[d.id];
                        if (!txt?.trim()) return;
                        replyToDoubt(d.id, txt.trim(), 'Resolved');
                        setReplyDrafts((p) => ({ ...p, [d.id]: '' }));
                        flash('Doubt marked Resolved.');
                      }}
                      className="px-4 py-2 rounded-lg bg-[#10233F] text-white text-xs font-semibold cursor-pointer"
                    >
                      Resolve
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'announcements' && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!annTitle.trim() || !annMessage.trim()) return;
                publishAnnouncement(annTitle.trim(), annMessage.trim());
                setAnnTitle('');
                setAnnMessage('');
                flash('Announcement pushed to Student Notifications.');
              }}
              className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 max-w-xl"
            >
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#D6AF62]" />
                <h1 className="font-display text-xl font-bold text-[#10233F]">
                  Broadcast Academy Announcement
                </h1>
              </div>
              <input
                type="text"
                value={annTitle}
                onChange={(e) => setAnnTitle(e.target.value)}
                placeholder="Announcement Title"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm"
                required
              />
              <textarea
                rows={3}
                value={annMessage}
                onChange={(e) => setAnnMessage(e.target.value)}
                placeholder="Message for students..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm"
                required
              />
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-[#10233F] text-white text-sm font-semibold cursor-pointer"
              >
                Publish Announcement
              </button>
            </form>
          )}

          {(tab === 'website' || tab === 'settings') && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 max-w-2xl">
              <h1 className="font-display text-xl font-bold text-[#10233F]">
                {tab === 'website' ? 'Website Content Configuration' : 'Platform & Payment Settings'}
              </h1>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#10233F] mb-1">
                    Main Tagline
                  </label>
                  <input
                    type="text"
                    value={siteTagline}
                    onChange={(e) => setSiteTagline(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#10233F] mb-1">
                    Secondary Tagline
                  </label>
                  <input
                    type="text"
                    value={siteSecondary}
                    onChange={(e) => setSiteSecondary(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#10233F] mb-1">
                    Centre Address
                  </label>
                  <input
                    type="text"
                    value={siteAddress}
                    onChange={(e) => setSiteAddress(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm"
                  />
                </div>
                <label className="inline-flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={razorpayReady}
                    onChange={(e) => setRazorpayReady(e.target.checked)}
                  />
                  Mark Razorpay Gateway Integration Active
                </label>
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    updateSettings({
                      mainTagline: siteTagline,
                      secondaryTagline: siteSecondary,
                      address: siteAddress,
                      razorpayConfigured: razorpayReady,
                    });
                    flash('Academy settings saved.');
                  }}
                  className="px-6 py-2.5 rounded-lg bg-[#10233F] text-white text-sm font-semibold cursor-pointer"
                >
                  Save Settings
                </button>
                <button
                  type="button"
                  onClick={() => {
                    resetPrototypeData();
                    flash('Prototype workspace reset to default initial state.');
                  }}
                  className="px-4 py-2.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 cursor-pointer"
                >
                  Reset Prototype Demo Data
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
