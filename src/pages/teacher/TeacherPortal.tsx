import React, { useState } from 'react';
import {
  BarChart3,
  BookOpen,
  ClipboardCheck,
  FileText,
  Globe,
  HelpCircle,
  Home,
  Layers,
  LogOut,
  Menu,
  Plus,
  Upload,
  User,
  Video,
  X,
} from 'lucide-react';
import { AcademyLogo } from '../../components/Logo';
import { useAcademy } from '../../context/AcademyContext';
import { FACULTY_PROFILE } from '../../data/academyData';
import { ResourceCategory } from '../../types/academy';

type TeacherTab =
  | 'dashboard'
  | 'courses'
  | 'chapters'
  | 'videos'
  | 'materials'
  | 'questions'
  | 'tests'
  | 'doubts'
  | 'progress'
  | 'profile';

const TEACHER_NAV: { id: TeacherTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'courses', label: 'My Courses', icon: BookOpen },
  { id: 'chapters', label: 'Manage Chapters', icon: Layers },
  { id: 'videos', label: 'Video Lessons', icon: Video },
  { id: 'materials', label: 'Study Materials', icon: FileText },
  { id: 'questions', label: 'Practice Questions', icon: HelpCircle },
  { id: 'tests', label: 'Tests & Quizzes', icon: ClipboardCheck },
  { id: 'doubts', label: 'Student Doubts', icon: HelpCircle },
  { id: 'progress', label: 'Student Progress', icon: BarChart3 },
  { id: 'profile', label: 'Profile', icon: User },
];

export const TeacherPortal: React.FC = () => {
  const {
    courses,
    resources,
    questions,
    tests,
    doubts,
    enrollments,
    authUser,
    navigate,
    logout,
    loginAsRole,
    addModuleToCourse,
    addLessonToModule,
    addResource,
    addQuestion,
    addTest,
    replyToDoubt,
  } = useAcademy();

  const [tab, setTab] = useState<TeacherTab>('dashboard');
  const [mobileMenu, setMobileMenu] = useState(false);

  // Module/Lesson forms
  const [selCourseId, setSelCourseId] = useState(courses[0]?.id ?? '');
  const [modNum, setModNum] = useState('Module 05');
  const [modTitle, setModTitle] = useState('');
  const [modSubject, setModSubject] = useState('Biology');
  const [modDesc, setModDesc] = useState('');

  const [selModuleId, setSelModuleId] = useState(courses[0]?.modules[0]?.id ?? '');
  const [lesTitle, setLesTitle] = useState('');
  const [lesDesc, setLesDesc] = useState('');
  const [lesPreview, setLesPreview] = useState(false);
  const [videoFileName, setVideoFileName] = useState('');

  // Material upload form
  const [resTitle, setResTitle] = useState('');
  const [resCourseId, setResCourseId] = useState(courses[0]?.id ?? '');
  const [resSubject, setResSubject] = useState('Biology');
  const [resChapter, setResChapter] = useState('');
  const [resCat, setResCat] = useState<ResourceCategory>('PDF Notes');
  const [resSummary, setResSummary] = useState('');
  const [resFileName, setResFileName] = useState('');

  // Question & Test forms
  const [qCourseId, setQCourseId] = useState(courses[0]?.id ?? '');
  const [qSubject, setQSubject] = useState('Biology');
  const [qChapter, setQChapter] = useState('');
  const [qText, setQText] = useState('');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [correctIdx, setCorrectIdx] = useState(0);
  const [qExp, setQExp] = useState('');

  const [testTitle, setTestTitle] = useState('');
  const [testCourseId, setTestCourseId] = useState(courses[0]?.id ?? '');
  const [testSubject, setTestSubject] = useState('Biology & Chemistry');
  const [testDuration, setTestDuration] = useState('20');

  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [feedbackBanner, setFeedbackBanner] = useState('');

  const selectedCourseObj = courses.find((c) => c.id === selCourseId) ?? courses[0];

  const notifyAction = (msg: string) => {
    setFeedbackBanner(msg);
    setTimeout(() => setFeedbackBanner(''), 4000);
  };

  const handleAddModule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modTitle.trim()) return;
    addModuleToCourse(selCourseId, {
      id: `mod-${Date.now()}`,
      moduleNumber: modNum,
      title: modTitle.trim(),
      subject: modSubject,
      description: modDesc.trim() || 'Faculty-added curriculum module.',
      lessons: [],
    });
    setModTitle('');
    setModDesc('');
    notifyAction('New module added to course curriculum.');
  };

  const handleAddLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lesTitle.trim() || !selModuleId) return;
    addLessonToModule(selCourseId, selModuleId, {
      id: `les-${Date.now()}`,
      title: lesTitle.trim(),
      description: lesDesc.trim() || 'Concept lesson uploaded by faculty.',
      durationLabel: videoFileName ? `Video (${videoFileName})` : 'Configured Lesson',
      isFreePreview: lesPreview,
      hasVideo: true,
      hasNotes: true,
      hasPractice: true,
      videoTitle: lesTitle.trim(),
    });
    setLesTitle('');
    setLesDesc('');
    setVideoFileName('');
    notifyAction('Lesson published to Student Classroom & Course Curriculum.');
  };

  const handleAddResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resTitle.trim()) return;
    const c = courses.find((cr) => cr.id === resCourseId);
    addResource({
      id: `res-${Date.now()}`,
      title: resTitle.trim(),
      courseId: resCourseId,
      courseTitle: c?.title ?? 'Science Program',
      subject: resSubject,
      chapter: resChapter.trim() || 'General Chapter',
      category: resCat,
      fileType: resCat.includes('Worksheet') ? 'Worksheet' : 'PDF',
      dateAdded: new Date().toLocaleDateString('en-IN'),
      restricted: true,
      summaryText:
        resSummary.trim() || `Study material uploaded (${resFileName || 'PDF Document'}).`,
    });
    setResTitle('');
    setResChapter('');
    setResSummary('');
    setResFileName('');
    notifyAction('Study material uploaded and visible to enrolled students.');
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qText.trim() || !optA.trim() || !optB.trim()) return;
    addQuestion({
      id: `q-${Date.now()}`,
      courseId: qCourseId,
      subject: qSubject,
      chapter: qChapter.trim() || 'Concept Practice',
      category: 'Chapter-wise MCQs',
      question: qText.trim(),
      options: [optA.trim(), optB.trim(), optC.trim() || 'None of the above', optD.trim() || 'All of the above'],
      correctIndex: correctIdx,
      explanation: qExp.trim() || undefined,
    });
    setQText('');
    setOptA('');
    setOptB('');
    setOptC('');
    setOptD('');
    setQExp('');
    notifyAction('Practice MCQ added to Question Bank.');
  };

  const handleCreateTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testTitle.trim()) return;
    const c = courses.find((cr) => cr.id === testCourseId);
    const matchingQs = questions.filter((q) => q.courseId === testCourseId).slice(0, 5);
    addTest({
      id: `test-${Date.now()}`,
      title: testTitle.trim(),
      courseId: testCourseId,
      courseTitle: c?.title ?? 'Science Program',
      subject: testSubject,
      durationMinutes: Number(testDuration) || 20,
      questionIds: (matchingQs.length > 0 ? matchingQs : questions.slice(0, 3)).map((q) => q.id),
      status: 'Available',
      passingRuleNote: 'Created by faculty via Teacher Dashboard.',
    });
    setTestTitle('');
    notifyAction('Online test published to Student Tests dashboard.');
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:shrink-0 bg-[#091526] text-white sticky top-0 h-screen">
        <div className="p-5 border-b border-white/10">
          <button type="button" onClick={() => navigate('/')} className="cursor-pointer">
            <AcademyLogo variant="light" />
          </button>
          <p className="text-[11px] text-[#D6AF62] mt-2 font-semibold">
            Faculty / Teacher Portal
          </p>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {TEACHER_NAV.map((item) => {
            const Icon = item.icon;
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium cursor-pointer ${
                  active ? 'bg-white text-[#10233F] font-semibold' : 'text-slate-300 hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
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
              onClick={() => loginAsRole('admin')}
              className="flex-1 py-1.5 px-2 rounded bg-white/10 text-[11px] text-slate-200 cursor-pointer"
            >
              Admin View
            </button>
          </div>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-300 hover:bg-white/10 cursor-pointer"
          >
            <Globe className="w-4 h-4 text-[#D6AF62]" />
            Public Website
          </button>
          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-red-300 hover:bg-red-500/10 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenu((v) => !v)}
              className="lg:hidden p-2 rounded-lg border border-slate-200"
              aria-label="Toggle faculty menu"
            >
              {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div>
              <p className="text-xs text-slate-500">Role-Based Faculty Console</p>
              <p className="font-display text-sm font-bold text-[#10233F]">
                {authUser?.name ?? FACULTY_PROFILE.name}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setTab('doubts')}
            className="px-3.5 py-2 rounded-lg bg-[#EAF2FB] text-[#10233F] text-xs font-semibold cursor-pointer"
          >
            Pending Doubts ({doubts.filter((d) => d.status === 'Pending').length})
          </button>
        </header>

        {mobileMenu && (
          <div className="lg:hidden bg-[#091526] text-white p-4 space-y-1">
            {TEACHER_NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setTab(item.id);
                  setMobileMenu(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                  tab === item.id ? 'bg-white text-[#10233F] font-semibold' : 'text-slate-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}

        <main className="p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto space-y-6">
          {feedbackBanner && (
            <div className="p-3.5 rounded-xl bg-green-50 border border-green-200 text-sm text-[#16A34A] font-medium">
              {feedbackBanner}
            </div>
          )}

          {tab === 'dashboard' && (
            <div className="space-y-6">
              <div>
                <h1 className="font-display text-2xl font-bold text-[#10233F]">
                  Faculty Content &amp; Academic Dashboard
                </h1>
                <p className="text-sm text-slate-600">
                  Manage curriculum modules, lecture videos, PDF study notes, practice banks, tests, and student doubts.
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Active Courses', val: courses.length },
                  { label: 'Study Materials', val: resources.length },
                  { label: 'Practice Questions', val: questions.length },
                  { label: 'Student Doubts', val: doubts.length },
                ].map((k) => (
                  <div key={k.label} className="bg-white border border-slate-200 rounded-2xl p-5">
                    <p className="text-xs text-slate-500">{k.label}</p>
                    <p className="font-display text-2xl font-bold text-[#10233F] font-mono-tabular mt-1">
                      {k.val}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => setTab('chapters')}
                  className="p-5 rounded-2xl bg-white border border-slate-200 text-left hover:border-[#10233F] cursor-pointer space-y-1"
                >
                  <Plus className="w-5 h-5 text-[#D6AF62]" />
                  <h2 className="font-display text-base font-bold text-[#10233F]">
                    Add Module or Lesson
                  </h2>
                  <p className="text-xs text-slate-600">Update course curriculum structure.</p>
                </button>
                <button
                  type="button"
                  onClick={() => setTab('materials')}
                  className="p-5 rounded-2xl bg-white border border-slate-200 text-left hover:border-[#10233F] cursor-pointer space-y-1"
                >
                  <Upload className="w-5 h-5 text-[#D6AF62]" />
                  <h2 className="font-display text-base font-bold text-[#10233F]">
                    Upload PDF Notes
                  </h2>
                  <p className="text-xs text-slate-600">Publish notes and revision sheets.</p>
                </button>
                <button
                  type="button"
                  onClick={() => setTab('doubts')}
                  className="p-5 rounded-2xl bg-white border border-slate-200 text-left hover:border-[#10233F] cursor-pointer space-y-1"
                >
                  <HelpCircle className="w-5 h-5 text-[#D6AF62]" />
                  <h2 className="font-display text-base font-bold text-[#10233F]">
                    Answer Student Doubts
                  </h2>
                  <p className="text-xs text-slate-600">Respond to conceptual questions.</p>
                </button>
              </div>
            </div>
          )}

          {tab === 'courses' && (
            <div className="space-y-4">
              <h1 className="font-display text-2xl font-bold text-[#10233F]">My Courses</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses.map((c) => (
                  <div key={c.id} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2">
                    <p className="text-xs text-slate-500">{c.classOrExam}</p>
                    <h2 className="font-display text-lg font-bold text-[#10233F]">{c.title}</h2>
                    <p className="text-xs text-slate-600">
                      {c.modules.length} modules ·{' '}
                      {c.modules.reduce((a, m) => a + m.lessons.length, 0)} lessons
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSelCourseId(c.id);
                        setTab('chapters');
                      }}
                      className="text-xs font-semibold text-[#10233F] underline cursor-pointer"
                    >
                      Manage Curriculum
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(tab === 'chapters' || tab === 'videos') && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <form
                onSubmit={handleAddModule}
                className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4"
              >
                <h2 className="font-display text-lg font-bold text-[#10233F]">
                  Create Course Module / Chapter
                </h2>
                <select
                  value={selCourseId}
                  onChange={(e) => setSelCourseId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={modNum}
                    onChange={(e) => setModNum(e.target.value)}
                    placeholder="Module 05"
                    className="px-3 py-2 rounded-lg border border-slate-300 text-sm"
                  />
                  <input
                    type="text"
                    value={modSubject}
                    onChange={(e) => setModSubject(e.target.value)}
                    placeholder="Subject"
                    className="px-3 py-2 rounded-lg border border-slate-300 text-sm"
                  />
                </div>
                <input
                  type="text"
                  value={modTitle}
                  onChange={(e) => setModTitle(e.target.value)}
                  placeholder="Chapter / Module Title"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                  required
                />
                <textarea
                  rows={2}
                  value={modDesc}
                  onChange={(e) => setModDesc(e.target.value)}
                  placeholder="Chapter description..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-[#10233F] text-white text-sm font-semibold cursor-pointer"
                >
                  Add Module
                </button>
              </form>

              <form
                onSubmit={handleAddLesson}
                className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4"
              >
                <h2 className="font-display text-lg font-bold text-[#10233F]">
                  Add Lesson &amp; Upload Video
                </h2>
                <select
                  value={selModuleId}
                  onChange={(e) => setSelModuleId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
                >
                  {selectedCourseObj?.modules.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.moduleNumber}: {m.title}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={lesTitle}
                  onChange={(e) => setLesTitle(e.target.value)}
                  placeholder="Lesson Title"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                  required
                />
                <textarea
                  rows={2}
                  value={lesDesc}
                  onChange={(e) => setLesDesc(e.target.value)}
                  placeholder="Lesson overview..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                />
                <div className="p-3 rounded-xl bg-[#F5F7FA] border border-dashed border-slate-300 text-xs">
                  <label className="block font-semibold text-[#10233F] mb-1">
                    Lecture Video File (MP4 / Recorded Class)
                  </label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setVideoFileName(e.target.files?.[0]?.name ?? '')}
                  />
                  {videoFileName && (
                    <p className="mt-1 text-[#16A34A] font-medium">Selected: {videoFileName}</p>
                  )}
                </div>
                <label className="inline-flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={lesPreview}
                    onChange={(e) => setLesPreview(e.target.checked)}
                  />
                  Allow as Free Preview lesson
                </label>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-[#10233F] text-white text-sm font-semibold cursor-pointer"
                >
                  Publish Lesson
                </button>
              </form>
            </div>
          )}

          {tab === 'materials' && (
            <form
              onSubmit={handleAddResource}
              className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 max-w-2xl"
            >
              <h1 className="font-display text-xl font-bold text-[#10233F]">
                Upload Study Material / PDF Notes
              </h1>
              <input
                type="text"
                value={resTitle}
                onChange={(e) => setResTitle(e.target.value)}
                placeholder="Resource Title (e.g. Thermodynamics Formula Sheet)"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm"
                required
              />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <select
                  value={resCourseId}
                  onChange={(e) => setResCourseId(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={resSubject}
                  onChange={(e) => setResSubject(e.target.value)}
                  placeholder="Subject"
                  className="px-3 py-2 rounded-lg border border-slate-300 text-sm"
                />
                <select
                  value={resCat}
                  onChange={(e) => setResCat(e.target.value as ResourceCategory)}
                  className="px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
                >
                  <option value="PDF Notes">PDF Notes</option>
                  <option value="Class Notes">Class Notes</option>
                  <option value="Chapter Summary">Chapter Summary</option>
                  <option value="Practice Worksheets">Practice Worksheets</option>
                  <option value="Formula Sheets">Formula Sheets</option>
                </select>
              </div>
              <input
                type="text"
                value={resChapter}
                onChange={(e) => setResChapter(e.target.value)}
                placeholder="Chapter Name"
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm"
              />
              <textarea
                rows={3}
                value={resSummary}
                onChange={(e) => setResSummary(e.target.value)}
                placeholder="Resource notes or summary..."
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm"
              />
              <div className="p-3 rounded-xl bg-[#F5F7FA] border border-dashed border-slate-300 text-xs">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setResFileName(e.target.files?.[0]?.name ?? '')}
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-[#10233F] text-white text-sm font-semibold cursor-pointer"
              >
                Upload Study Material
              </button>
            </form>
          )}

          {tab === 'questions' && (
            <form
              onSubmit={handleAddQuestion}
              className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 max-w-2xl"
            >
              <h1 className="font-display text-xl font-bold text-[#10233F]">
                Add Practice Question to Question Bank
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <select
                  value={qCourseId}
                  onChange={(e) => setQCourseId(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={qSubject}
                  onChange={(e) => setQSubject(e.target.value)}
                  placeholder="Subject"
                  className="px-3 py-2 rounded-lg border border-slate-300 text-sm"
                />
                <input
                  type="text"
                  value={qChapter}
                  onChange={(e) => setQChapter(e.target.value)}
                  placeholder="Chapter"
                  className="px-3 py-2 rounded-lg border border-slate-300 text-sm"
                />
              </div>
              <textarea
                rows={2}
                value={qText}
                onChange={(e) => setQText(e.target.value)}
                placeholder="Question prompt..."
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                required
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={optA}
                  onChange={(e) => setOptA(e.target.value)}
                  placeholder="Option A"
                  className="px-3 py-2 rounded-lg border border-slate-300 text-sm"
                  required
                />
                <input
                  type="text"
                  value={optB}
                  onChange={(e) => setOptB(e.target.value)}
                  placeholder="Option B"
                  className="px-3 py-2 rounded-lg border border-slate-300 text-sm"
                  required
                />
                <input
                  type="text"
                  value={optC}
                  onChange={(e) => setOptC(e.target.value)}
                  placeholder="Option C"
                  className="px-3 py-2 rounded-lg border border-slate-300 text-sm"
                />
                <input
                  type="text"
                  value={optD}
                  onChange={(e) => setOptD(e.target.value)}
                  placeholder="Option D"
                  className="px-3 py-2 rounded-lg border border-slate-300 text-sm"
                />
              </div>
              <select
                value={correctIdx}
                onChange={(e) => setCorrectIdx(Number(e.target.value))}
                className="px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
              >
                <option value={0}>Correct Option: A</option>
                <option value={1}>Correct Option: B</option>
                <option value={2}>Correct Option: C</option>
                <option value={3}>Correct Option: D</option>
              </select>
              <textarea
                rows={2}
                value={qExp}
                onChange={(e) => setQExp(e.target.value)}
                placeholder="Concept explanation (optional)..."
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
              />
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-[#10233F] text-white text-sm font-semibold cursor-pointer"
              >
                Save Practice Question
              </button>
            </form>
          )}

          {tab === 'tests' && (
            <div className="space-y-6">
              <form
                onSubmit={handleCreateTest}
                className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 max-w-2xl"
              >
                <h1 className="font-display text-xl font-bold text-[#10233F]">
                  Create Configurable Online Test
                </h1>
                <input
                  type="text"
                  value={testTitle}
                  onChange={(e) => setTestTitle(e.target.value)}
                  placeholder="Test Title (e.g. Unit Test 02: Chemical Bonding)"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm"
                  required
                />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <select
                    value={testCourseId}
                    onChange={(e) => setTestCourseId(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
                  >
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={testSubject}
                    onChange={(e) => setTestSubject(e.target.value)}
                    placeholder="Subject"
                    className="px-3 py-2 rounded-lg border border-slate-300 text-sm"
                  />
                  <input
                    type="number"
                    value={testDuration}
                    onChange={(e) => setTestDuration(e.target.value)}
                    placeholder="Duration (mins)"
                    className="px-3 py-2 rounded-lg border border-slate-300 text-sm font-mono-tabular"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-[#10233F] text-white text-sm font-semibold cursor-pointer"
                >
                  Publish Configurable Test
                </button>
              </form>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3">
                <h2 className="font-display text-base font-bold text-[#10233F]">
                  Configured Tests ({tests.length})
                </h2>
                {tests.map((t) => (
                  <div
                    key={t.id}
                    className="p-3.5 rounded-xl bg-[#F5F7FA] flex items-center justify-between text-sm"
                  >
                    <div>
                      <p className="font-semibold text-[#10233F]">{t.title}</p>
                      <p className="text-xs text-slate-500">
                        {t.courseTitle} · {t.durationMinutes ?? 'TBA'} mins
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-[#10233F]">{t.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'doubts' && (
            <div className="space-y-4">
              <h1 className="font-display text-2xl font-bold text-[#10233F]">
                Respond to Student Doubts
              </h1>
              {doubts.map((d) => (
                <div key={d.id} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>
                      {d.studentName} · {d.courseTitle} · {d.subject}
                    </span>
                    <span className="font-semibold text-[#10233F]">{d.status}</span>
                  </div>
                  <h2 className="font-display text-base font-bold text-[#10233F]">{d.question}</h2>
                  <p className="text-sm text-slate-600">{d.description}</p>
                  {d.reply && (
                    <div className="p-3 rounded-xl bg-[#EAF2FB] text-sm text-[#10233F]">
                      <strong>Your Reply:</strong> {d.reply.message}
                    </div>
                  )}
                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <input
                      type="text"
                      value={replyDrafts[d.id] ?? ''}
                      onChange={(e) =>
                        setReplyDrafts((p) => ({ ...p, [d.id]: e.target.value }))
                      }
                      placeholder="Write concept explanation for student..."
                      className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const txt = replyDrafts[d.id];
                        if (!txt?.trim()) return;
                        replyToDoubt(d.id, txt.trim(), 'Answered');
                        setReplyDrafts((p) => ({ ...p, [d.id]: '' }));
                        notifyAction('Reply sent to student Doubt Support & Notifications.');
                      }}
                      className="px-4 py-2 rounded-lg bg-[#10233F] text-white text-xs font-semibold cursor-pointer"
                    >
                      Send Reply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'progress' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
              <h1 className="font-display text-xl font-bold text-[#10233F]">
                Enrolled Student Roster (Prototype Workspace)
              </h1>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-slate-200 text-xs text-slate-500">
                    <tr>
                      <th className="py-2 pr-4">Student</th>
                      <th className="py-2 pr-4">Course</th>
                      <th className="py-2 pr-4">Status</th>
                      <th className="py-2">Enrolled</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {enrollments.map((e) => (
                      <tr key={e.id}>
                        <td className="py-3 pr-4 font-medium text-[#10233F]">{e.studentName}</td>
                        <td className="py-3 pr-4">{e.courseTitle}</td>
                        <td className="py-3 pr-4 text-xs font-semibold text-[#16A34A]">
                          {e.status}
                        </td>
                        <td className="py-3 text-xs text-slate-500">{e.enrolledAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === 'profile' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 max-w-xl">
              <h1 className="font-display text-xl font-bold text-[#10233F]">
                {FACULTY_PROFILE.name} ({FACULTY_PROFILE.alias})
              </h1>
              <p className="text-sm text-slate-600">{FACULTY_PROFILE.qualifications.join(' · ')}</p>
              <p className="text-sm text-slate-600">
                {FACULTY_PROFILE.experience} · {FACULTY_PROFILE.subjects.join(' & ')}
              </p>
              <p className="text-sm text-slate-600 leading-relaxed pt-2">{FACULTY_PROFILE.bio}</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
