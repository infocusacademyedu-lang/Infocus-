import React from 'react';
import { EnquiryModal } from './components/EnquiryModal';
import { Footer } from './components/Footer';
import { PublicHeader } from './components/Header';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { AcademyProvider, useAcademy } from './context/AcademyContext';
import { AdminPortal } from './pages/admin/AdminPortal';
import { AuthPages } from './pages/public/AuthPages';
import { CheckoutEnrollmentPage } from './pages/public/CheckoutEnrollmentPage';
import { ContactPage } from './pages/public/ContactPage';
import { CourseDetailPage } from './pages/public/CourseDetailPage';
import { CoursesMarketplacePage } from './pages/public/CoursesMarketplacePage';
import { FacultyPage } from './pages/public/FacultyPage';
import { HomePage } from './pages/public/HomePage';
import { ClassroomView } from './pages/student/ClassroomView';
import { PracticeView, TestsView } from './pages/student/PracticeAndTestsView';
import {
  DoubtsView,
  MyCoursesView,
  NotificationsView,
  ProgressView,
  StudentOverview,
  StudentProfileView,
  StudyMaterialsView,
} from './pages/student/StudentDashboardViews';
import { StudentShell } from './pages/student/StudentShell';
import { TeacherPortal } from './pages/teacher/TeacherPortal';

const PlatformRouter: React.FC = () => {
  const { route } = useAcademy();
  const cleanRoute = route.split('?')[0];

  // Teacher LMS Portal
  if (cleanRoute.startsWith('/teacher')) {
    return <TeacherPortal />;
  }

  // Admin LMS Console
  if (cleanRoute.startsWith('/admin')) {
    return <AdminPortal />;
  }

  // Student LMS Portal
  if (cleanRoute.startsWith('/student')) {
    let studentPage: React.ReactNode = <StudentOverview />;

    if (cleanRoute === '/student/courses') {
      studentPage = <MyCoursesView />;
    } else if (cleanRoute.startsWith('/student/classroom')) {
      const slug = cleanRoute.replace('/student/classroom', '').replace(/^\//, '');
      studentPage = <ClassroomView courseSlug={slug || undefined} />;
    } else if (cleanRoute === '/student/materials') {
      studentPage = <StudyMaterialsView />;
    } else if (cleanRoute === '/student/practice') {
      studentPage = <PracticeView />;
    } else if (cleanRoute === '/student/tests') {
      studentPage = <TestsView />;
    } else if (cleanRoute === '/student/progress') {
      studentPage = <ProgressView />;
    } else if (cleanRoute === '/student/doubts') {
      studentPage = <DoubtsView />;
    } else if (cleanRoute === '/student/notifications') {
      studentPage = <NotificationsView />;
    } else if (cleanRoute === '/student/profile') {
      studentPage = <StudentProfileView />;
    }

    return <StudentShell>{studentPage}</StudentShell>;
  }

  // Public Website Shell
  let publicView: React.ReactNode = <HomePage />;

  if (cleanRoute === '/courses') {
    publicView = <CoursesMarketplacePage />;
  } else if (cleanRoute.startsWith('/courses/')) {
    const slug = cleanRoute.replace('/courses/', '');
    publicView = <CourseDetailPage slug={slug} />;
  } else if (cleanRoute === '/faculty') {
    publicView = <FacultyPage />;
  } else if (cleanRoute === '/contact') {
    publicView = <ContactPage />;
  } else if (cleanRoute === '/login') {
    publicView = <AuthPages mode="login" />;
  } else if (cleanRoute === '/signup') {
    publicView = <AuthPages mode="signup" />;
  } else if (cleanRoute.startsWith('/checkout/')) {
    const slug = cleanRoute.replace('/checkout/', '');
    publicView = <CheckoutEnrollmentPage courseSlug={slug} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
      <PublicHeader />
      <main className="flex-1">{publicView}</main>
      <Footer />
      <WhatsAppFloat />
      <EnquiryModal />
    </div>
  );
};

export function App() {
  return (
    <AcademyProvider>
      <PlatformRouter />
    </AcademyProvider>
  );
}

export default App;
