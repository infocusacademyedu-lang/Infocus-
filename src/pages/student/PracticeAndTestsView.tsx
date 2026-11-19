import React, { useEffect, useMemo, useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Flag,
  HelpCircle,
  RotateCcw,
  XCircle,
} from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';
import { AcademyTest, TestAttempt } from '../../types/academy';

const PRACTICE_CATEGORIES = [
  'All',
  'Chapter-wise MCQs',
  'Topic Practice',
  'Quick Quiz',
  'Practice Sets',
  'Revision Questions',
] as const;

export const PracticeView: React.FC = () => {
  const { questions, courses } = useAcademy();
  const [category, setCategory] = useState<string>('All');
  const [subjectFilter, setSubjectFilter] = useState<string>('All');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submittedIds, setSubmittedIds] = useState<string[]>([]);
  const [reviewIds, setReviewIds] = useState<string[]>([]);
  const [showSummary, setShowSummary] = useState(false);

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const catOk = category === 'All' || q.category === category;
      const subOk = subjectFilter === 'All' || q.subject === subjectFilter;
      return catOk && subOk;
    });
  }, [questions, category, subjectFilter]);

  const currentQ = filteredQuestions[currentIdx] ?? filteredQuestions[0];

  const resetSession = () => {
    setSelectedAnswers({});
    setSubmittedIds([]);
    setReviewIds([]);
    setCurrentIdx(0);
    setShowSummary(false);
  };

  if (!currentQ) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-3">
        <h1 className="font-display text-xl font-bold text-[#10233F]">
          No Practice Questions Match This Filter
        </h1>
        <button
          type="button"
          onClick={() => {
            setCategory('All');
            setSubjectFilter('All');
          }}
          className="px-4 py-2 rounded-lg bg-[#10233F] text-white text-sm font-semibold cursor-pointer"
        >
          Show All Sample Questions
        </button>
      </div>
    );
  }

  const total = filteredQuestions.length;
  const attempted = submittedIds.filter((id) =>
    filteredQuestions.some((q) => q.id === id)
  ).length;
  const correct = filteredQuestions.filter(
    (q) => submittedIds.includes(q.id) && selectedAnswers[q.id] === q.correctIndex
  ).length;
  const incorrect = attempted - correct;
  const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;

  if (showSummary) {
    return (
      <div className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#D6AF62]">
                Practice Session Summary
              </p>
              <h1 className="font-display text-2xl font-bold text-[#10233F] mt-1">
                Practice Performance Overview
              </h1>
            </div>
            <button
              type="button"
              onClick={resetSession}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#10233F] text-white text-sm font-semibold cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Practice Again
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: 'Total Questions', val: total },
              { label: 'Attempted', val: attempted },
              { label: 'Correct', val: correct },
              { label: 'Incorrect', val: incorrect },
              { label: 'Unattempted', val: total - attempted },
              { label: 'Accuracy', val: `${accuracy}%` },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-xl bg-[#F5F7FA] border border-slate-200"
              >
                <p className="text-xs text-slate-500">{stat.label}</p>
                <p className="font-display text-2xl font-bold text-[#10233F] font-mono-tabular mt-1">
                  {stat.val}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const isSubmitted = submittedIds.includes(currentQ.id);
  const chosen = selectedAnswers[currentQ.id];
  const isMarked = reviewIds.includes(currentQ.id);
  const courseName = courses.find((c) => c.id === currentQ.courseId)?.title ?? 'Science Program';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-[#10233F]">
            Online MCQ Practice
          </h1>
          <p className="text-sm text-slate-600">
            Sample practice question bank — submit answers to view step-by-step explanations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={subjectFilter}
            onChange={(e) => {
              setSubjectFilter(e.target.value);
              setCurrentIdx(0);
            }}
            aria-label="Filter by subject"
            className="px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs sm:text-sm text-[#10233F]"
          >
            <option value="All">All Subjects</option>
            <option value="Biology">Biology</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Mathematics">Mathematics</option>
          </select>

          <button
            type="button"
            onClick={() => setShowSummary(true)}
            className="px-4 py-2 rounded-lg bg-[#EAF2FB] text-[#10233F] text-xs sm:text-sm font-semibold cursor-pointer"
          >
            View Summary
          </button>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {PRACTICE_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => {
              setCategory(cat);
              setCurrentIdx(0);
            }}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer ${
              category === cat
                ? 'bg-[#10233F] text-white'
                : 'bg-white text-slate-700 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Practice Question Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4 text-xs text-slate-500">
          <span>
            Question <strong className="text-[#10233F] font-mono-tabular">{currentIdx + 1}</strong> of{' '}
            <span className="font-mono-tabular">{total}</span> · {currentQ.subject} ·{' '}
            {currentQ.chapter}
          </span>
          <span>{courseName}</span>
        </div>

        <h2 className="font-display text-lg sm:text-xl font-bold text-[#10233F] leading-snug">
          {currentQ.question}
        </h2>

        <div className="space-y-3">
          {currentQ.options.map((opt, idx) => {
            const isSelected = chosen === idx;
            const isCorrect = idx === currentQ.correctIndex;
            let style = 'border-slate-200 bg-white hover:border-[#10233F]/50 text-[#10233F]';
            if (isSubmitted) {
              if (isCorrect) style = 'border-[#16A34A] bg-green-50 text-[#10233F] font-semibold';
              else if (isSelected && !isCorrect)
                style = 'border-red-500 bg-red-50 text-red-800';
            } else if (isSelected) {
              style = 'border-[#10233F] bg-[#EAF2FB] text-[#10233F] font-semibold';
            }

            return (
              <button
                key={opt}
                type="button"
                disabled={isSubmitted}
                onClick={() =>
                  setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: idx }))
                }
                className={`w-full text-left p-4 rounded-xl border text-sm flex items-center justify-between gap-3 transition-colors cursor-pointer ${style}`}
              >
                <span>
                  <span className="font-mono-tabular font-bold mr-3">
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  {opt}
                </span>
                {isSubmitted && isCorrect && (
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                )}
                {isSubmitted && isSelected && !isCorrect && (
                  <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {isSubmitted && currentQ.explanation && (
          <div className="p-4 rounded-xl bg-[#EAF2FB] border border-blue-200/80 text-sm text-[#10233F] space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-[#10233F]">
              Concept Explanation
            </p>
            <p className="text-slate-700 leading-relaxed">{currentQ.explanation}</p>
          </div>
        )}

        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
              className="px-4 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm font-medium text-[#10233F] disabled:opacity-40 cursor-pointer"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() =>
                setReviewIds((prev) =>
                  prev.includes(currentQ.id)
                    ? prev.filter((id) => id !== currentQ.id)
                    : [...prev, currentQ.id]
                )
              }
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border text-xs sm:text-sm font-medium cursor-pointer ${
                isMarked
                  ? 'border-[#D6AF62] bg-amber-50 text-[#10233F]'
                  : 'border-slate-300 text-slate-600'
              }`}
            >
              <Flag className="w-3.5 h-3.5" />
              {isMarked ? 'Marked' : 'Mark for Review'}
            </button>
          </div>

          <div className="flex items-center gap-2">
            {!isSubmitted && (
              <button
                type="button"
                disabled={chosen === undefined}
                onClick={() => setSubmittedIds((prev) => [...prev, currentQ.id])}
                className="px-5 py-2 rounded-lg bg-[#16A34A] text-white text-xs sm:text-sm font-semibold disabled:opacity-40 cursor-pointer"
              >
                Submit Answer
              </button>
            )}
            {currentIdx < total - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentIdx((i) => Math.min(total - 1, i + 1))}
                className="px-5 py-2 rounded-lg bg-[#10233F] text-white text-xs sm:text-sm font-semibold cursor-pointer"
              >
                Next Question
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowSummary(true)}
                className="px-5 py-2 rounded-lg bg-[#10233F] text-white text-xs sm:text-sm font-semibold cursor-pointer"
              >
                Finish &amp; View Results
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const TestsView: React.FC = () => {
  const { tests, questions, testAttempts, submitTestAttempt } = useAcademy();
  const [filterTab, setFilterTab] = useState<'All' | 'Available' | 'Upcoming' | 'Practice' | 'Completed'>('All');
  const [activeTest, setActiveTest] = useState<AcademyTest | null>(null);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [reviewMarks, setReviewMarks] = useState<string[]>([]);
  const [secondsLeft, setSecondsLeft] = useState(900);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [viewingAttempt, setViewingAttempt] = useState<TestAttempt | null>(null);

  const activeQuestions = useMemo(() => {
    if (!activeTest) return [];
    const list = activeTest.questionIds
      .map((id) => questions.find((q) => q.id === id))
      .filter(Boolean);
    return list.length > 0 ? list : questions.slice(0, 3);
  }, [activeTest, questions]);

  useEffect(() => {
    if (!activeTest || activeTest.durationMinutes === null) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [activeTest]);

  const startTest = (test: AcademyTest) => {
    setActiveTest(test);
    setQIndex(0);
    setAnswers({});
    setReviewMarks([]);
    setSecondsLeft((test.durationMinutes ?? 15) * 60);
    setConfirmOpen(false);
    setViewingAttempt(null);
  };

  const finalizeSubmit = () => {
    if (!activeTest) return;
    const total = activeQuestions.length;
    let attempted = 0;
    let correct = 0;
    activeQuestions.forEach((q) => {
      if (!q) return;
      if (answers[q.id] !== undefined) {
        attempted += 1;
        if (answers[q.id] === q.correctIndex) correct += 1;
      }
    });
    const incorrect = attempted - correct;
    const unanswered = total - attempted;
    const accuracyPercent = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;

    const attempt: TestAttempt = {
      id: `att-${Date.now()}`,
      testId: activeTest.id,
      testTitle: activeTest.title,
      courseId: activeTest.courseId,
      subject: activeTest.subject,
      submittedAt: new Date().toLocaleString('en-IN'),
      answers,
      markedForReview: reviewMarks,
      totalQuestions: total,
      attempted,
      correct,
      incorrect,
      unanswered,
      accuracyPercent,
    };

    submitTestAttempt(attempt);
    setActiveTest(null);
    setConfirmOpen(false);
    setViewingAttempt(attempt);
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Active Exam Screen
  if (activeTest && activeQuestions.length > 0) {
    const currentQ = activeQuestions[qIndex]!;
    return (
      <div className="space-y-6">
        <div className="bg-[#10233F] text-white rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs text-[#D6AF62] font-semibold">{activeTest.courseTitle}</p>
            <h1 className="font-display text-lg font-bold">{activeTest.title}</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/10 font-mono-tabular text-sm font-bold">
              <Clock className="w-4 h-4 text-[#D6AF62]" />
              {formatTime(secondsLeft)}
            </div>
            <button
              type="button"
              onClick={() => setConfirmOpen(true)}
              className="px-4 py-2 rounded-lg bg-[#D6AF62] text-[#091526] text-xs sm:text-sm font-bold cursor-pointer"
            >
              Submit Test
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Question Area */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-3">
              <span>
                Question <strong className="text-[#10233F] font-mono-tabular">{qIndex + 1}</strong> /{' '}
                <span className="font-mono-tabular">{activeQuestions.length}</span>
              </span>
              <span>{currentQ.subject}</span>
            </div>

            <h2 className="font-display text-lg font-bold text-[#10233F]">
              {currentQ.question}
            </h2>

            <div className="space-y-3">
              {currentQ.options.map((opt, idx) => {
                const selected = answers[currentQ.id] === idx;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setAnswers((p) => ({ ...p, [currentQ.id]: idx }))}
                    className={`w-full text-left p-4 rounded-xl border text-sm transition-colors cursor-pointer ${
                      selected
                        ? 'border-[#10233F] bg-[#EAF2FB] text-[#10233F] font-semibold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <span className="font-mono-tabular font-bold mr-3">
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={qIndex === 0}
                  onClick={() => setQIndex((i) => i - 1)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-[#10233F] disabled:opacity-40 cursor-pointer"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setReviewMarks((prev) =>
                      prev.includes(currentQ.id)
                        ? prev.filter((id) => id !== currentQ.id)
                        : [...prev, currentQ.id]
                    )
                  }
                  className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-[#10233F] cursor-pointer"
                >
                  {reviewMarks.includes(currentQ.id) ? 'Unmark Review' : 'Mark for Review'}
                </button>
              </div>

              <button
                type="button"
                onClick={() =>
                  qIndex < activeQuestions.length - 1
                    ? setQIndex((i) => i + 1)
                    : setConfirmOpen(true)
                }
                className="px-5 py-2 rounded-lg bg-[#10233F] text-white text-xs font-semibold cursor-pointer"
              >
                {qIndex < activeQuestions.length - 1 ? 'Save & Next' : 'Review & Submit'}
              </button>
            </div>
          </div>

          {/* Question Palette */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
            <h3 className="font-display text-sm font-bold text-[#10233F]">Question Palette</h3>
            <div className="grid grid-cols-5 gap-2">
              {activeQuestions.map((q, i) => {
                if (!q) return null;
                const isAns = answers[q.id] !== undefined;
                const isRev = reviewMarks.includes(q.id);
                const isCurr = i === qIndex;
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setQIndex(i)}
                    className={`h-10 rounded-lg text-xs font-mono-tabular font-bold border cursor-pointer ${
                      isCurr
                        ? 'border-[#10233F] ring-2 ring-[#D6AF62]'
                        : 'border-slate-200'
                    } ${
                      isRev
                        ? 'bg-amber-100 text-amber-900'
                        : isAns
                        ? 'bg-[#16A34A] text-white'
                        : 'bg-[#F5F7FA] text-slate-700'
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
            <div className="text-[11px] text-slate-600 space-y-1 pt-2 border-t border-slate-100">
              <p>Green: Saved Answer · Amber: Marked for Review · Gray: Unanswered</p>
            </div>
          </div>
        </div>

        {/* Submission Confirmation Dialog */}
        {confirmOpen && (
          <div className="fixed inset-0 z-50 bg-[#091526]/65 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 border border-slate-200">
              <h3 className="font-display text-xl font-bold text-[#10233F]">
                Confirm Test Submission
              </h3>
              <p className="text-sm text-slate-600">
                You have answered{' '}
                <strong className="font-mono-tabular text-[#10233F]">
                  {Object.keys(answers).length}
                </strong>{' '}
                out of{' '}
                <strong className="font-mono-tabular text-[#10233F]">
                  {activeQuestions.length}
                </strong>{' '}
                questions. Are you ready to submit?
              </p>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setConfirmOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-sm font-medium cursor-pointer"
                >
                  Continue Test
                </button>
                <button
                  type="button"
                  onClick={finalizeSubmit}
                  className="px-5 py-2 rounded-lg bg-[#10233F] text-white text-sm font-semibold cursor-pointer"
                >
                  Submit Final Answers
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Test Result & Question Review Screen
  if (viewingAttempt) {
    const relatedTest = tests.find((t) => t.id === viewingAttempt.testId);
    const reviewQuestions =
      relatedTest?.questionIds.map((id) => questions.find((q) => q.id === id)).filter(Boolean) ??
      [];

    return (
      <div className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#D6AF62]">
                Test Results &amp; Analysis
              </p>
              <h1 className="font-display text-2xl font-bold text-[#10233F] mt-1">
                {viewingAttempt.testTitle}
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Submitted: {viewingAttempt.submittedAt}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setViewingAttempt(null)}
              className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-[#10233F] cursor-pointer"
            >
              Back to All Tests
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {[
              { label: 'Score', val: `${viewingAttempt.correct}/${viewingAttempt.totalQuestions}` },
              { label: 'Accuracy', val: `${viewingAttempt.accuracyPercent}%` },
              { label: 'Correct', val: viewingAttempt.correct },
              { label: 'Incorrect', val: viewingAttempt.incorrect },
              { label: 'Unanswered', val: viewingAttempt.unanswered },
            ].map((stat) => (
              <div key={stat.label} className="p-4 rounded-xl bg-[#F5F7FA] border border-slate-200">
                <p className="text-xs text-slate-500">{stat.label}</p>
                <p className="font-display text-2xl font-bold text-[#10233F] font-mono-tabular mt-1">
                  {stat.val}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="font-display text-lg font-bold text-[#10233F]">Question Review</h2>
          {reviewQuestions.map((q, idx) => {
            if (!q) return null;
            const userAns = viewingAttempt.answers[q.id];
            const isCorrect = userAns === q.correctIndex;
            return (
              <div
                key={q.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-500">
                    Q{idx + 1} · {q.subject}
                  </span>
                  <span
                    className={`font-semibold ${
                      userAns === undefined
                        ? 'text-slate-500'
                        : isCorrect
                        ? 'text-[#16A34A]'
                        : 'text-red-600'
                    }`}
                  >
                    {userAns === undefined ? 'Unanswered' : isCorrect ? 'Correct' : 'Incorrect'}
                  </span>
                </div>
                <p className="font-semibold text-sm text-[#10233F]">{q.question}</p>
                <div className="text-xs space-y-1 text-slate-600">
                  <p>
                    Your Answer:{' '}
                    <strong>
                      {userAns !== undefined ? q.options[userAns] : 'Not Attempted'}
                    </strong>
                  </p>
                  <p className="text-[#16A34A]">
                    Correct Answer: <strong>{q.options[q.correctIndex]}</strong>
                  </p>
                </div>
                {q.explanation && (
                  <p className="text-xs text-slate-600 bg-[#F5F7FA] p-3 rounded-lg">
                    {q.explanation}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Test Dashboard
  const filteredTests = tests.filter((t) => {
    if (filterTab === 'All') return true;
    if (filterTab === 'Completed') return testAttempts.some((a) => a.testId === t.id);
    return t.status === filterTab;
  });

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="font-display text-2xl font-bold text-[#10233F]">
          Online Tests &amp; Mock Assessments
        </h1>
        <p className="text-sm text-slate-600">
          All test durations, schedules, and marking rules are configurable by INFOCUS ACADEMY faculty.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {(['All', 'Available', 'Practice', 'Upcoming', 'Completed'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setFilterTab(tab)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer ${
              filterTab === tab
                ? 'bg-[#10233F] text-white'
                : 'bg-white border border-slate-200 text-slate-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTests.map((t) => {
          const pastAttempt = testAttempts.find((a) => a.testId === t.id);
          return (
            <div
              key={t.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{t.subject}</span>
                  <span className="font-semibold text-[#10233F]">{t.status}</span>
                </div>
                <h2 className="font-display text-lg font-bold text-[#10233F]">{t.title}</h2>
                <p className="text-xs text-slate-500">{t.courseTitle}</p>
                <div className="pt-2 text-xs text-slate-600 space-y-1 font-mono-tabular">
                  <p>
                    Duration:{' '}
                    {t.durationMinutes !== null ? `${t.durationMinutes} mins (Configurable)` : 'TBA'}
                  </p>
                  <p>Questions: {t.questionIds.length} sample items</p>
                </div>
                <p className="text-[11px] text-slate-500 pt-1">{t.passingRuleNote}</p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                {t.status !== 'Upcoming' ? (
                  <button
                    type="button"
                    onClick={() => startTest(t)}
                    className="flex-1 py-2.5 px-4 rounded-lg bg-[#10233F] text-white text-xs sm:text-sm font-semibold hover:bg-[#091526] cursor-pointer"
                  >
                    Start Test
                  </button>
                ) : (
                  <span className="flex-1 py-2.5 px-4 rounded-lg bg-slate-100 text-slate-500 text-xs font-semibold text-center">
                    {t.scheduledDate || 'Scheduled by Academy'}
                  </span>
                )}
                {pastAttempt && (
                  <button
                    type="button"
                    onClick={() => setViewingAttempt(pastAttempt)}
                    className="py-2.5 px-3 rounded-lg border border-slate-300 text-xs font-semibold text-[#10233F] cursor-pointer"
                  >
                    Result
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {testAttempts.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
          <h2 className="font-display text-lg font-bold text-[#10233F]">Recent Test History</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 text-xs text-slate-500">
                <tr>
                  <th className="py-2.5 pr-4">Test</th>
                  <th className="py-2.5 pr-4">Score</th>
                  <th className="py-2.5 pr-4">Accuracy</th>
                  <th className="py-2.5 pr-4">Submitted</th>
                  <th className="py-2.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {testAttempts.map((att) => (
                  <tr key={att.id}>
                    <td className="py-3 pr-4 font-medium text-[#10233F]">{att.testTitle}</td>
                    <td className="py-3 pr-4 font-mono-tabular">
                      {att.correct}/{att.totalQuestions}
                    </td>
                    <td className="py-3 pr-4 font-mono-tabular">{att.accuracyPercent}%</td>
                    <td className="py-3 pr-4 text-xs text-slate-500">{att.submittedAt}</td>
                    <td className="py-3 text-right">
                      <button
                        type="button"
                        onClick={() => setViewingAttempt(att)}
                        className="text-xs font-semibold text-[#10233F] hover:underline cursor-pointer"
                      >
                        Review Answers
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
