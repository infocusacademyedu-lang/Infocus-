import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  INITIAL_COURSES,
  INITIAL_DEMO_USERS,
  INITIAL_DOUBTS,
  INITIAL_ENQUIRIES,
  INITIAL_ENROLLMENTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_PAYMENTS,
  INITIAL_QUESTIONS,
  INITIAL_RESOURCES,
  INITIAL_SETTINGS,
  INITIAL_TEST_ATTEMPTS,
  INITIAL_TESTS,
} from '../data/academyData';
import {
  AcademySettings,
  AcademyTest,
  AdmissionEnquiry,
  Course,
  CourseModule,
  DoubtItem,
  EnrollmentRecord,
  LessonItem,
  NotificationItem,
  PaymentRecord,
  PracticeQuestion,
  StudyResource,
  TestAttempt,
  UserProfile,
  UserRole,
} from '../types/academy';

interface AcademyContextValue {
  route: string;
  navigate: (to: string) => void;
  authUser: UserProfile | null;
  users: UserProfile[];
  courses: Course[];
  resources: StudyResource[];
  questions: PracticeQuestion[];
  tests: AcademyTest[];
  testAttempts: TestAttempt[];
  enrollments: EnrollmentRecord[];
  payments: PaymentRecord[];
  doubts: DoubtItem[];
  notifications: NotificationItem[];
  enquiries: AdmissionEnquiry[];
  settings: AcademySettings;
  completedLessons: string[];
  savedLessons: string[];
  recentLessons: string[];
  enquiryModalCourse: string | null;
  openEnquiryModal: (courseName?: string) => void;
  closeEnquiryModal: () => void;
  loginWithCredentials: (identifier: string, password: string) => { ok: boolean; error?: string };
  loginAsRole: (role: UserRole) => void;
  registerStudent: (payload: {
    name: string;
    phone: string;
    email: string;
    password: string;
  }) => { ok: boolean; error?: string };
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  toggleLessonComplete: (lessonId: string) => void;
  toggleSaveLesson: (lessonId: string) => void;
  recordLessonVisit: (lessonId: string) => void;
  isEnrolledInCourse: (courseId: string) => boolean;
  createCheckoutOrder: (payload: {
    course: Course;
    studentName: string;
    studentEmail: string;
    studentPhone: string;
    paymentMethod: string;
    outcome: 'Pending' | 'Successful' | 'Failed';
  }) => { payment: PaymentRecord; enrollment?: EnrollmentRecord };
  submitTestAttempt: (attempt: TestAttempt) => void;
  submitDoubt: (payload: {
    courseId: string;
    courseTitle: string;
    subject: string;
    chapter: string;
    question: string;
    description: string;
    attachmentName?: string;
  }) => void;
  replyToDoubt: (doubtId: string, replyText: string, status: 'Answered' | 'Resolved') => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  submitEnquiry: (payload: {
    name: string;
    phone: string;
    email: string;
    courseInterest: string;
    message: string;
  }) => void;
  updateEnquiryStatus: (id: string, status: AdmissionEnquiry['status']) => void;
  addCourse: (course: Course) => void;
  updateCourse: (courseId: string, updates: Partial<Course>) => void;
  deleteCourse: (courseId: string) => void;
  addModuleToCourse: (courseId: string, module: CourseModule) => void;
  addLessonToModule: (courseId: string, moduleId: string, lesson: LessonItem) => void;
  addResource: (resource: StudyResource) => void;
  addQuestion: (question: PracticeQuestion) => void;
  addTest: (test: AcademyTest) => void;
  updateEnrollmentStatus: (id: string, status: EnrollmentRecord['status']) => void;
  updatePaymentStatus: (id: string, status: PaymentRecord['status']) => void;
  publishAnnouncement: (title: string, message: string) => void;
  updateSettings: (updates: Partial<AcademySettings>) => void;
  resetPrototypeData: () => void;
}

const STORAGE_KEY = 'infocus_academy_state_v1';

const AcademyContext = createContext<AcademyContextValue | null>(null);

function getInitialRoute(): string {
  const hash = window.location.hash.replace(/^#/, '');
  return hash || '/';
}

export const AcademyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [route, setRoute] = useState<string>(getInitialRoute);
  const [enquiryModalCourse, setEnquiryModalCourse] = useState<string | null>(null);

  const loadPersisted = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };

  const persisted = loadPersisted();

  const [users, setUsers] = useState<UserProfile[]>(persisted?.users ?? INITIAL_DEMO_USERS);
  const [authUser, setAuthUser] = useState<UserProfile | null>(persisted?.authUser ?? null);
  const [courses, setCourses] = useState<Course[]>(persisted?.courses ?? INITIAL_COURSES);
  const [resources, setResources] = useState<StudyResource[]>(
    persisted?.resources ?? INITIAL_RESOURCES
  );
  const [questions, setQuestions] = useState<PracticeQuestion[]>(
    persisted?.questions ?? INITIAL_QUESTIONS
  );
  const [tests, setTests] = useState<AcademyTest[]>(persisted?.tests ?? INITIAL_TESTS);
  const [testAttempts, setTestAttempts] = useState<TestAttempt[]>(
    persisted?.testAttempts ?? INITIAL_TEST_ATTEMPTS
  );
  const [enrollments, setEnrollments] = useState<EnrollmentRecord[]>(
    persisted?.enrollments ?? INITIAL_ENROLLMENTS
  );
  const [payments, setPayments] = useState<PaymentRecord[]>(
    persisted?.payments ?? INITIAL_PAYMENTS
  );
  const [doubts, setDoubts] = useState<DoubtItem[]>(persisted?.doubts ?? INITIAL_DOUBTS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(
    persisted?.notifications ?? INITIAL_NOTIFICATIONS
  );
  const [enquiries, setEnquiries] = useState<AdmissionEnquiry[]>(
    persisted?.enquiries ?? INITIAL_ENQUIRIES
  );
  const [settings, setSettings] = useState<AcademySettings>(
    persisted?.settings ?? INITIAL_SETTINGS
  );
  const [completedLessons, setCompletedLessons] = useState<string[]>(
    persisted?.completedLessons ?? ['les-c11-1-1']
  );
  const [savedLessons, setSavedLessons] = useState<string[]>(
    persisted?.savedLessons ?? ['les-c11-1-1', 'les-c11-4-1']
  );
  const [recentLessons, setRecentLessons] = useState<string[]>(
    persisted?.recentLessons ?? ['les-c11-1-1', 'les-c11-1-2']
  );

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          users,
          authUser,
          courses,
          resources,
          questions,
          tests,
          testAttempts,
          enrollments,
          payments,
          doubts,
          notifications,
          enquiries,
          settings,
          completedLessons,
          savedLessons,
          recentLessons,
        })
      );
    } catch {
      // Ignore storage quota issues
    }
  }, [
    users,
    authUser,
    courses,
    resources,
    questions,
    tests,
    testAttempts,
    enrollments,
    payments,
    doubts,
    notifications,
    enquiries,
    settings,
    completedLessons,
    savedLessons,
    recentLessons,
  ]);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(window.location.hash.replace(/^#/, '') || '/');
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    // Dynamic SEO document title & meta description per route
    const cleanRoute = route.split('?')[0];
    let title =
      'INFOCUS ACADEMY | Biology, Chemistry, NEET, JEE & CUET Coaching in Kalkaji, New Delhi';
    let desc =
      'INFOCUS ACADEMY in Kalkaji, New Delhi offers concept-based learning for Classes 9–12, Biology and Chemistry by Jaidev Roy (JDR Sir), NEET, JEE, and CUET preparation.';

    if (cleanRoute === '/courses') {
      title = 'All Courses | INFOCUS ACADEMY Kalkaji, New Delhi';
    } else if (cleanRoute.startsWith('/courses/')) {
      const slug = cleanRoute.replace('/courses/', '');
      const matched =
        slug === 'class-10'
          ? courses.find((c) => c.slug === 'class-9')
          : courses.find((c) => c.slug === slug);
      if (matched) {
        title =
          slug === 'class-10'
            ? 'Class 10 Mathematics and Science Coaching in Kalkaji | INFOCUS ACADEMY'
            : matched.seoTitle;
        desc = matched.seoDescription;
      }
    } else if (cleanRoute === '/faculty') {
      title = 'Jaidev Roy (JDR Sir) — Biology & Chemistry Faculty | INFOCUS ACADEMY';
    } else if (cleanRoute === '/contact') {
      title = 'Contact & Admission Enquiry — INFOCUS ACADEMY Kalkaji, New Delhi';
    } else if (cleanRoute.startsWith('/student')) {
      title = 'Student Learning Portal | INFOCUS ACADEMY';
    } else if (cleanRoute.startsWith('/teacher')) {
      title = 'Faculty Dashboard | INFOCUS ACADEMY';
    } else if (cleanRoute.startsWith('/admin')) {
      title = 'Admin Management Console | INFOCUS ACADEMY';
    }

    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', desc);
  }, [route, courses]);

  const navigate = (to: string) => {
    const normalized = to.startsWith('/') ? to : `/${to}`;
    window.location.hash = normalized;
    setRoute(normalized);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openEnquiryModal = (courseName?: string) => {
    setEnquiryModalCourse(courseName ?? 'General Admission Enquiry');
  };

  const closeEnquiryModal = () => setEnquiryModalCourse(null);

  const loginWithCredentials = (identifier: string, password: string) => {
    const trimmed = identifier.trim().toLowerCase();
    if (!trimmed || password.trim().length < 4) {
      return { ok: false, error: 'Please enter a valid phone/email and password (min 4 characters).' };
    }
    const existing = users.find(
      (u) => u.email.toLowerCase() === trimmed || u.phone.toLowerCase() === trimmed
    );
    if (existing) {
      setAuthUser(existing);
      return { ok: true };
    }
    const created: UserProfile = {
      id: `user-${Date.now()}`,
      name: trimmed.includes('@') ? trimmed.split('@')[0] : `Student (${trimmed})`,
      email: trimmed.includes('@') ? trimmed : `${trimmed}@student.infocusacademy.example`,
      phone: /^\d+$/.test(trimmed) ? trimmed : '9800000000',
      role: 'student',
      accountStatus: 'Active',
      joinedAt: new Date().toLocaleDateString('en-IN'),
      isPrototypeDemo: true,
    };
    setUsers((prev) => [created, ...prev]);
    setAuthUser(created);
    return { ok: true };
  };

  const loginAsRole = (role: UserRole) => {
    const matched = users.find((u) => u.role === role) ?? INITIAL_DEMO_USERS.find((u) => u.role === role)!;
    setAuthUser(matched);
    if (role === 'student') navigate('/student');
    else if (role === 'teacher') navigate('/teacher');
    else navigate('/admin');
  };

  const registerStudent = (payload: {
    name: string;
    phone: string;
    email: string;
    password: string;
  }) => {
    if (!payload.name.trim() || !payload.phone.trim() || !payload.email.trim()) {
      return { ok: false, error: 'All required fields must be completed.' };
    }
    if (payload.password.length < 6) {
      return { ok: false, error: 'Password must be at least 6 characters.' };
    }
    const newStudent: UserProfile = {
      id: `student-${Date.now()}`,
      name: payload.name.trim(),
      phone: payload.phone.trim(),
      email: payload.email.trim(),
      role: 'student',
      accountStatus: 'Active',
      joinedAt: new Date().toLocaleDateString('en-IN'),
      learningGoal: 'Academic Preparation',
    };
    setUsers((prev) => [newStudent, ...prev]);
    setAuthUser(newStudent);
    return { ok: true };
  };

  const logout = () => {
    setAuthUser(null);
    navigate('/');
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!authUser) return;
    const updated = { ...authUser, ...updates };
    setAuthUser(updated);
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
  };

  const toggleLessonComplete = (lessonId: string) => {
    setCompletedLessons((prev) =>
      prev.includes(lessonId) ? prev.filter((id) => id !== lessonId) : [...prev, lessonId]
    );
  };

  const toggleSaveLesson = (lessonId: string) => {
    setSavedLessons((prev) =>
      prev.includes(lessonId) ? prev.filter((id) => id !== lessonId) : [...prev, lessonId]
    );
  };

  const recordLessonVisit = (lessonId: string) => {
    setRecentLessons((prev) => [lessonId, ...prev.filter((id) => id !== lessonId)].slice(0, 8));
  };

  const isEnrolledInCourse = (courseId: string) => {
    if (!authUser) return false;
    if (authUser.role === 'teacher' || authUser.role === 'admin') return true;
    return enrollments.some(
      (e) =>
        (e.studentId === authUser.id || e.studentEmail === authUser.email) &&
        e.courseId === courseId &&
        e.status === 'Active'
    );
  };

  const createCheckoutOrder = (payload: {
    course: Course;
    studentName: string;
    studentEmail: string;
    studentPhone: string;
    paymentMethod: string;
    outcome: 'Pending' | 'Successful' | 'Failed';
  }) => {
    const baseFee = payload.course.configuredFee;
    const discFee = payload.course.discountFee;
    const finalAmount = discFee ?? baseFee;
    const payment: PaymentRecord = {
      id: `pay-${Date.now()}`,
      studentName: payload.studentName,
      studentEmail: payload.studentEmail,
      studentPhone: payload.studentPhone,
      courseId: payload.course.id,
      courseTitle: payload.course.title,
      amount: baseFee,
      discountAmount: baseFee && discFee ? baseFee - discFee : null,
      finalAmount,
      method: payload.paymentMethod,
      status: payload.outcome,
      gatewayMode:
        payload.paymentMethod.includes('Razorpay')
          ? 'Razorpay Integration Ready'
          : 'Center Admission Request',
      createdAt: new Date().toLocaleString('en-IN'),
      referenceCode: `IFA-${Math.floor(100000 + Math.random() * 900000)}`,
    };
    setPayments((prev) => [payment, ...prev]);

    let enrollment: EnrollmentRecord | undefined;
    if (payload.outcome !== 'Failed') {
      enrollment = {
        id: `enr-${Date.now()}`,
        studentId: authUser?.id ?? `guest-${Date.now()}`,
        studentName: payload.studentName,
        studentEmail: payload.studentEmail,
        studentPhone: payload.studentPhone,
        courseId: payload.course.id,
        courseTitle: payload.course.title,
        status: payload.outcome === 'Successful' ? 'Active' : 'Pending Verification',
        enrolledAt: new Date().toLocaleDateString('en-IN'),
        paymentId: payment.id,
      };
      setEnrollments((prev) => [enrollment!, ...prev]);
      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          type: 'New Course',
          title:
            payload.outcome === 'Successful'
              ? `Enrolled in ${payload.course.title}`
              : `Admission Request Recorded: ${payload.course.title}`,
          message:
            payload.outcome === 'Successful'
              ? 'Your course access is now active in My Courses.'
              : 'Your request is pending verification by INFOCUS ACADEMY.',
          createdAt: 'Just now',
          read: false,
          targetRoute: '/student/courses',
        },
        ...prev,
      ]);
    }
    return { payment, enrollment };
  };

  const submitTestAttempt = (attempt: TestAttempt) => {
    setTestAttempts((prev) => [attempt, ...prev]);
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        type: 'Test Result',
        title: `Test Completed: ${attempt.testTitle}`,
        message: `Accuracy ${attempt.accuracyPercent}% (${attempt.correct}/${attempt.totalQuestions} correct). Review your answers anytime.`,
        createdAt: 'Just now',
        read: false,
        targetRoute: '/student/tests',
      },
      ...prev,
    ]);
  };

  const submitDoubt = (payload: {
    courseId: string;
    courseTitle: string;
    subject: string;
    chapter: string;
    question: string;
    description: string;
    attachmentName?: string;
  }) => {
    const newDoubt: DoubtItem = {
      id: `dbt-${Date.now()}`,
      studentId: authUser?.id ?? 'user-student-demo',
      studentName: authUser?.name ?? 'Student',
      ...payload,
      status: 'Pending',
      createdAt: new Date().toLocaleString('en-IN'),
    };
    setDoubts((prev) => [newDoubt, ...prev]);
  };

  const replyToDoubt = (doubtId: string, replyText: string, status: 'Answered' | 'Resolved') => {
    setDoubts((prev) =>
      prev.map((d) =>
        d.id === doubtId
          ? {
              ...d,
              status,
              reply: {
                authorName: authUser?.name ?? 'Jaidev Roy (JDR Sir)',
                authorRole: authUser?.role === 'admin' ? 'Academy Admin' : 'Faculty',
                message: replyText,
                repliedAt: new Date().toLocaleString('en-IN'),
              },
            }
          : d
      )
    );
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        type: 'Doubt Answered',
        title: 'Faculty Replied to Your Doubt',
        message: replyText.slice(0, 90) + (replyText.length > 90 ? '...' : ''),
        createdAt: 'Just now',
        read: false,
        targetRoute: '/student/doubts',
      },
      ...prev,
    ]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const submitEnquiry = (payload: {
    name: string;
    phone: string;
    email: string;
    courseInterest: string;
    message: string;
  }) => {
    const item: AdmissionEnquiry = {
      id: `enq-${Date.now()}`,
      ...payload,
      createdAt: new Date().toLocaleString('en-IN'),
      status: 'New',
    };
    setEnquiries((prev) => [item, ...prev]);
  };

  const updateEnquiryStatus = (id: string, status: AdmissionEnquiry['status']) => {
    setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
  };

  const addCourse = (course: Course) => {
    setCourses((prev) => [course, ...prev]);
  };

  const updateCourse = (courseId: string, updates: Partial<Course>) => {
    setCourses((prev) => prev.map((c) => (c.id === courseId ? { ...c, ...updates } : c)));
  };

  const deleteCourse = (courseId: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== courseId));
  };

  const addModuleToCourse = (courseId: string, module: CourseModule) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, modules: [...c.modules, module] } : c))
    );
  };

  const addLessonToModule = (courseId: string, moduleId: string, lesson: LessonItem) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === courseId
          ? {
              ...c,
              modules: c.modules.map((m) =>
                m.id === moduleId ? { ...m, lessons: [...m.lessons, lesson] } : m
              ),
            }
          : c
      )
    );
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        type: 'New Lesson',
        title: `New Lesson Added: ${lesson.title}`,
        message: 'A new lesson is now listed in your course curriculum.',
        createdAt: 'Just now',
        read: false,
        targetRoute: '/student/classroom',
      },
      ...prev,
    ]);
  };

  const addResource = (resource: StudyResource) => {
    setResources((prev) => [resource, ...prev]);
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        type: 'Study Material Added',
        title: `New Resource: ${resource.title}`,
        message: `${resource.category} added for ${resource.courseTitle}.`,
        createdAt: 'Just now',
        read: false,
        targetRoute: '/student/materials',
      },
      ...prev,
    ]);
  };

  const addQuestion = (question: PracticeQuestion) => {
    setQuestions((prev) => [question, ...prev]);
  };

  const addTest = (test: AcademyTest) => {
    setTests((prev) => [test, ...prev]);
  };

  const updateEnrollmentStatus = (id: string, status: EnrollmentRecord['status']) => {
    setEnrollments((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
  };

  const updatePaymentStatus = (id: string, status: PaymentRecord['status']) => {
    setPayments((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
  };

  const publishAnnouncement = (title: string, message: string) => {
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        type: 'Course Announcement',
        title,
        message,
        createdAt: 'Just now',
        read: false,
      },
      ...prev,
    ]);
  };

  const updateSettings = (updates: Partial<AcademySettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  const resetPrototypeData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUsers(INITIAL_DEMO_USERS);
    setAuthUser(null);
    setCourses(INITIAL_COURSES);
    setResources(INITIAL_RESOURCES);
    setQuestions(INITIAL_QUESTIONS);
    setTests(INITIAL_TESTS);
    setTestAttempts(INITIAL_TEST_ATTEMPTS);
    setEnrollments(INITIAL_ENROLLMENTS);
    setPayments(INITIAL_PAYMENTS);
    setDoubts(INITIAL_DOUBTS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setEnquiries(INITIAL_ENQUIRIES);
    setSettings(INITIAL_SETTINGS);
    setCompletedLessons(['les-c11-1-1']);
    setSavedLessons(['les-c11-1-1', 'les-c11-4-1']);
    setRecentLessons(['les-c11-1-1', 'les-c11-1-2']);
  };

  return (
    <AcademyContext.Provider
      value={{
        route,
        navigate,
        authUser,
        users,
        courses,
        resources,
        questions,
        tests,
        testAttempts,
        enrollments,
        payments,
        doubts,
        notifications,
        enquiries,
        settings,
        completedLessons,
        savedLessons,
        recentLessons,
        enquiryModalCourse,
        openEnquiryModal,
        closeEnquiryModal,
        loginWithCredentials,
        loginAsRole,
        registerStudent,
        logout,
        updateProfile,
        toggleLessonComplete,
        toggleSaveLesson,
        recordLessonVisit,
        isEnrolledInCourse,
        createCheckoutOrder,
        submitTestAttempt,
        submitDoubt,
        replyToDoubt,
        markNotificationRead,
        markAllNotificationsRead,
        submitEnquiry,
        updateEnquiryStatus,
        addCourse,
        updateCourse,
        deleteCourse,
        addModuleToCourse,
        addLessonToModule,
        addResource,
        addQuestion,
        addTest,
        updateEnrollmentStatus,
        updatePaymentStatus,
        publishAnnouncement,
        updateSettings,
        resetPrototypeData,
      }}
    >
      {children}
    </AcademyContext.Provider>
  );
};

export function useAcademy(): AcademyContextValue {
  const ctx = useContext(AcademyContext);
  if (!ctx) throw new Error('useAcademy must be used inside AcademyProvider');
  return ctx;
}
