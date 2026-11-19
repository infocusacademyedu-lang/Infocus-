import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Bookmark,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileText,
  Lock,
  Maximize2,
  Pause,
  Play,
  SlidersHorizontal,
  Subtitles,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';
import { Course, LessonItem } from '../../types/academy';

interface ClassroomViewProps {
  courseSlug?: string;
}

export const ClassroomView: React.FC<ClassroomViewProps> = ({ courseSlug }) => {
  const {
    courses,
    resources,
    questions,
    completedLessons,
    savedLessons,
    toggleLessonComplete,
    toggleSaveLesson,
    recordLessonVisit,
    isEnrolledInCourse,
    navigate,
  } = useAcademy();

  const activeCourse: Course = useMemo(() => {
    if (courseSlug) {
      const found = courses.find((c) => c.slug === courseSlug);
      if (found) return found;
    }
    return courses[0];
  }, [courses, courseSlug]);

  const flatLessons = useMemo(() => {
    const list: { moduleId: string; moduleTitle: string; subject: string; lesson: LessonItem }[] = [];
    activeCourse.modules.forEach((m) => {
      m.lessons.forEach((l) => {
        list.push({
          moduleId: m.id,
          moduleTitle: `${m.moduleNumber}: ${m.title}`,
          subject: m.subject,
          lesson: l,
        });
      });
    });
    return list;
  }, [activeCourse]);

  const [selectedLessonId, setSelectedLessonId] = useState<string>(
    flatLessons[0]?.lesson.id ?? ''
  );
  const [openModuleIds, setOpenModuleIds] = useState<string[]>(() =>
    activeCourse.modules.map((m) => m.id)
  );
  const [activeTab, setActiveTab] = useState<'description' | 'notes' | 'resources' | 'questions'>(
    'description'
  );
  const [mobileCurriculumOpen, setMobileCurriculumOpen] = useState(false);

  // Interactive Player Controls State
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(18);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [speed, setSpeed] = useState('1x');
  const [quality, setQuality] = useState('720p');
  const [subtitlesOn, setSubtitlesOn] = useState(true);
  const playerContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (flatLessons.length > 0 && !flatLessons.some((f) => f.lesson.id === selectedLessonId)) {
      setSelectedLessonId(flatLessons[0].lesson.id);
    }
    setOpenModuleIds(activeCourse.modules.map((m) => m.id));
  }, [activeCourse, flatLessons, selectedLessonId]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : Math.min(100, p + 0.5)));
    }, 500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentIdx = flatLessons.findIndex((f) => f.lesson.id === selectedLessonId);
  const currentEntry = flatLessons[currentIdx] ?? flatLessons[0];
  const enrolled = isEnrolledInCourse(activeCourse.id);
  const isUnlocked = enrolled || currentEntry?.lesson.isFreePreview;

  useEffect(() => {
    if (currentEntry && isUnlocked) {
      recordLessonVisit(currentEntry.lesson.id);
    }
  }, [currentEntry?.lesson.id]);

  const handleToggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  const courseResources = resources.filter((r) => r.courseId === activeCourse.id);
  const courseQuestions = questions.filter((q) => q.courseId === activeCourse.id);

  if (!currentEntry) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-3">
        <h1 className="font-display text-xl font-bold text-[#10233F]">No Lessons Configured Yet</h1>
        <p className="text-sm text-slate-600">
          Faculty or Admin can add modules and lessons to this course.
        </p>
      </div>
    );
  }

  const isCompleted = completedLessons.includes(currentEntry.lesson.id);
  const isSaved = savedLessons.includes(currentEntry.lesson.id);

  return (
    <div className="space-y-5">
      {/* Top Course Switcher & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-slate-200 rounded-2xl p-4">
        <div className="min-w-0">
          <p className="text-xs text-slate-500 truncate">
            {activeCourse.title} · {currentEntry.moduleTitle}
          </p>
          <h1 className="font-display text-lg sm:text-xl font-bold text-[#10233F] truncate">
            {currentEntry.lesson.title}
          </h1>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <select
            aria-label="Switch course in classroom"
            value={activeCourse.slug}
            onChange={(e) => navigate(`/student/classroom/${e.target.value}`)}
            className="px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm bg-white text-[#10233F] font-medium"
          >
            {courses.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.title}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => setMobileCurriculumOpen((v) => !v)}
            className="xl:hidden px-3 py-2 rounded-lg bg-[#EAF2FB] text-[#10233F] text-xs font-semibold inline-flex items-center gap-1.5"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Curriculum
          </button>
        </div>
      </div>

      {/* Main Grid: Player Left + Curriculum Sidebar Right */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Video & Lesson Content Area */}
        <div className="xl:col-span-8 space-y-5">
          <div
            ref={playerContainerRef}
            className="bg-[#091526] rounded-2xl overflow-hidden border border-slate-800 text-white"
          >
            {isUnlocked ? (
              <div className="relative aspect-video flex flex-col justify-between p-5 sm:p-8 bg-gradient-to-br from-[#10233F] via-[#091526] to-[#091526]">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>
                    {currentEntry.subject} · {currentEntry.lesson.durationLabel}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleSaveLesson(currentEntry.lesson.id)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs cursor-pointer ${
                      isSaved ? 'bg-[#D6AF62] text-[#091526] font-semibold' : 'bg-white/10 text-white'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    {isSaved ? 'Saved' : 'Save'}
                  </button>
                </div>

                {/* Central Concept Board Display */}
                <div className="my-auto text-center max-w-xl mx-auto space-y-3">
                  <p className="text-[11px] uppercase tracking-widest text-[#D6AF62] font-semibold">
                    Sample Lecture Player Preview
                  </p>
                  <h2 className="font-display text-xl sm:text-2xl font-bold">
                    {currentEntry.lesson.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {currentEntry.lesson.description}
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsPlaying((p) => !p)}
                    className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D6AF62] text-[#091526] text-xs sm:text-sm font-bold hover:bg-[#c59d52] cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {isPlaying ? 'Pause Lecture Preview' : 'Play Lecture Preview'}
                  </button>
                </div>

                {subtitlesOn && (
                  <div className="text-center mb-2">
                    <span className="inline-block bg-black/65 px-3 py-1 rounded text-xs text-slate-100">
                      [Captions]: Understanding foundational principles before solving numerical or MCQ exercises.
                    </span>
                  </div>
                )}

                {/* Player Control Bar */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={progress}
                    onChange={(e) => setProgress(Number(e.target.value))}
                    aria-label="Playback progress"
                    className="w-full accent-[#D6AF62] cursor-pointer"
                  />
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setIsPlaying((p) => !p)}
                        className="p-1.5 rounded hover:bg-white/10 cursor-pointer"
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => setMuted((m) => !m)}
                        className="p-1.5 rounded hover:bg-white/10 cursor-pointer"
                        aria-label={muted ? 'Unmute' : 'Mute'}
                      >
                        {muted || volume === 0 ? (
                          <VolumeX className="w-4 h-4" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                      </button>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={muted ? 0 : volume}
                        onChange={(e) => {
                          setMuted(false);
                          setVolume(Number(e.target.value));
                        }}
                        aria-label="Volume"
                        className="w-16 accent-[#D6AF62] hidden sm:block cursor-pointer"
                      />
                      <span className="font-mono-tabular text-slate-300">
                        {Math.round(progress)}%
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={speed}
                        onChange={(e) => setSpeed(e.target.value)}
                        aria-label="Playback speed"
                        className="bg-white/10 text-white rounded px-2 py-1 text-xs cursor-pointer"
                      >
                        {['0.75x', '1x', '1.25x', '1.5x', '2x'].map((sp) => (
                          <option key={sp} value={sp} className="text-[#10233F]">
                            {sp}
                          </option>
                        ))}
                      </select>

                      <select
                        value={quality}
                        onChange={(e) => setQuality(e.target.value)}
                        aria-label="Video quality"
                        className="bg-white/10 text-white rounded px-2 py-1 text-xs cursor-pointer"
                      >
                        {['Auto', '1080p', '720p', '480p'].map((q) => (
                          <option key={q} value={q} className="text-[#10233F]">
                            {q}
                          </option>
                        ))}
                      </select>

                      <button
                        type="button"
                        onClick={() => setSubtitlesOn((s) => !s)}
                        className={`p-1.5 rounded cursor-pointer ${
                          subtitlesOn ? 'bg-[#D6AF62] text-[#091526]' : 'hover:bg-white/10'
                        }`}
                        aria-label="Toggle subtitles"
                      >
                        <Subtitles className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={handleToggleFullscreen}
                        className="p-1.5 rounded hover:bg-white/10 cursor-pointer"
                        aria-label="Fullscreen"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="aspect-video flex flex-col items-center justify-center p-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
                  <Lock className="w-7 h-7 text-[#D6AF62]" />
                </div>
                <div className="space-y-1.5 max-w-md">
                  <h2 className="font-display text-xl font-bold">
                    Enroll in this course to unlock complete learning access.
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300">
                    This lesson is reserved for enrolled students. Free preview lessons remain accessible in the curriculum sidebar.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate(`/checkout/${activeCourse.slug}`)}
                  className="px-6 py-2.5 rounded-lg bg-[#D6AF62] text-[#091526] text-sm font-bold hover:bg-[#c59d52] cursor-pointer"
                >
                  Explore Enrollment
                </button>
              </div>
            )}
          </div>

          {/* Lesson Navigation & Completion Bar */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentIdx <= 0}
                onClick={() =>
                  currentIdx > 0 && setSelectedLessonId(flatLessons[currentIdx - 1].lesson.id)
                }
                className="inline-flex items-center gap-1 px-3.5 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm font-medium text-[#10233F] disabled:opacity-40 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous Lesson
              </button>
              <button
                type="button"
                disabled={currentIdx >= flatLessons.length - 1}
                onClick={() =>
                  currentIdx < flatLessons.length - 1 &&
                  setSelectedLessonId(flatLessons[currentIdx + 1].lesson.id)
                }
                className="inline-flex items-center gap-1 px-3.5 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm font-medium text-[#10233F] disabled:opacity-40 cursor-pointer"
              >
                Next Lesson
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              disabled={!isUnlocked}
              onClick={() => toggleLessonComplete(currentEntry.lesson.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold cursor-pointer disabled:opacity-40 ${
                isCompleted
                  ? 'bg-green-50 text-[#16A34A] border border-green-200'
                  : 'bg-[#10233F] text-white hover:bg-[#091526]'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {isCompleted ? 'Lesson Completed' : 'Mark Lesson Complete'}
            </button>
          </div>

          {/* Below-Video Tabs */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="flex border-b border-slate-200 overflow-x-auto">
              {[
                { id: 'description', label: 'Lesson Description' },
                { id: 'notes', label: 'Notes' },
                { id: 'resources', label: 'Resources' },
                { id: 'questions', label: 'Questions' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() =>
                    setActiveTab(t.id as 'description' | 'notes' | 'resources' | 'questions')
                  }
                  className={`px-5 py-3.5 text-xs sm:text-sm font-semibold whitespace-nowrap border-b-2 cursor-pointer ${
                    activeTab === t.id
                      ? 'border-[#10233F] text-[#10233F]'
                      : 'border-transparent text-slate-500 hover:text-[#10233F]'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="p-6 text-sm text-slate-700 leading-relaxed">
              {activeTab === 'description' && (
                <div className="space-y-3">
                  <h3 className="font-display text-base font-bold text-[#10233F]">
                    {currentEntry.lesson.title}
                  </h3>
                  <p>{currentEntry.lesson.description}</p>
                  <p className="text-xs text-slate-500">
                    Note: Lessons marked as Sample Structure represent placeholder curriculum structure until official academy recordings are uploaded by faculty.
                  </p>
                </div>
              )}

              {activeTab === 'notes' && (
                <div className="space-y-3">
                  <p className="font-semibold text-[#10233F]">Structured Concept Summary</p>
                  <p>
                    Focus on core definitions, diagram relationships, and NCERT concept checkpoints for{' '}
                    <strong>{currentEntry.lesson.title}</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate('/student/materials')}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#10233F] underline cursor-pointer"
                  >
                    Open All Study Materials &amp; Notes
                  </button>
                </div>
              )}

              {activeTab === 'resources' && (
                <div className="space-y-3">
                  {courseResources.length === 0 ? (
                    <p className="text-slate-500">No resources attached to this program yet.</p>
                  ) : (
                    courseResources.map((r) => (
                      <div
                        key={r.id}
                        className="p-3.5 rounded-xl bg-[#F5F7FA] flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-[#10233F]" />
                          <div>
                            <p className="font-semibold text-[#10233F] text-sm">{r.title}</p>
                            <p className="text-xs text-slate-500">
                              {r.category} · {r.fileType}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => navigate('/student/materials')}
                          className="text-xs font-semibold text-[#10233F] hover:underline cursor-pointer"
                        >
                          Open
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'questions' && (
                <div className="space-y-3">
                  <p>
                    {courseQuestions.length} sample practice question(s) linked to{' '}
                    <strong>{activeCourse.title}</strong>.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => navigate('/student/practice')}
                      className="px-4 py-2 rounded-lg bg-[#10233F] text-white text-xs font-semibold cursor-pointer"
                    >
                      Practice Chapter MCQs
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate('/student/doubts')}
                      className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-[#10233F] cursor-pointer"
                    >
                      Ask a Doubt
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Curriculum Sidebar (Desktop always visible; Mobile collapsible) */}
        <aside
          className={`xl:col-span-4 bg-white border border-slate-200 rounded-2xl overflow-hidden ${
            mobileCurriculumOpen ? 'block' : 'hidden xl:block'
          }`}
        >
          <div className="px-5 py-4 bg-[#10233F] text-white flex items-center justify-between">
            <div>
              <h2 className="font-display text-sm font-bold">Course Curriculum</h2>
              <p className="text-[11px] text-slate-300 font-mono-tabular">
                {completedLessons.filter((id) => flatLessons.some((f) => f.lesson.id === id)).length}/
                {flatLessons.length} completed
              </p>
            </div>
          </div>

          <div className="divide-y divide-slate-200 max-h-[680px] overflow-y-auto">
            {activeCourse.modules.map((mod) => {
              const isOpen = openModuleIds.includes(mod.id);
              return (
                <div key={mod.id}>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenModuleIds((prev) =>
                        prev.includes(mod.id) ? prev.filter((i) => i !== mod.id) : [...prev, mod.id]
                      )
                    }
                    className="w-full px-4 py-3.5 text-left bg-[#F5F7FA] hover:bg-slate-100 flex items-center justify-between gap-2 cursor-pointer"
                  >
                    <div>
                      <p className="text-[11px] font-semibold text-[#D6AF62]">
                        {mod.moduleNumber} · {mod.subject}
                      </p>
                      <p className="font-display text-sm font-bold text-[#10233F]">{mod.title}</p>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="divide-y divide-slate-100">
                      {mod.lessons.map((les) => {
                        const active = les.id === currentEntry.lesson.id;
                        const done = completedLessons.includes(les.id);
                        const canOpen = enrolled || les.isFreePreview;
                        return (
                          <button
                            key={les.id}
                            type="button"
                            onClick={() => {
                              setSelectedLessonId(les.id);
                              setMobileCurriculumOpen(false);
                            }}
                            className={`w-full px-4 py-3 text-left flex items-start gap-3 transition-colors cursor-pointer ${
                              active ? 'bg-[#EAF2FB]' : 'hover:bg-slate-50'
                            }`}
                          >
                            {done ? (
                              <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                            ) : canOpen ? (
                              <Play className="w-4 h-4 text-[#10233F] shrink-0 mt-0.5" />
                            ) : (
                              <Lock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                            )}
                            <div className="min-w-0 flex-1">
                              <p
                                className={`text-xs sm:text-sm leading-snug ${
                                  active ? 'font-bold text-[#10233F]' : 'font-medium text-slate-700'
                                }`}
                              >
                                {les.title}
                              </p>
                              <p className="text-[11px] text-slate-500 mt-0.5">
                                {les.isFreePreview && !enrolled
                                  ? 'Free Preview'
                                  : canOpen
                                  ? les.durationLabel
                                  : 'Locked · Enroll to Unlock'}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>
      </div>
    </div>
  );
};
