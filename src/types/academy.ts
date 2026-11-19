export type UserRole = 'student' | 'teacher' | 'admin';

export type CourseCategory =
  | 'Class 9'
  | 'Class 10'
  | 'Class 11'
  | 'Class 12'
  | 'NEET'
  | 'JEE'
  | 'CUET';

export type ResourceCategory =
  | 'Class Notes'
  | 'PDF Notes'
  | 'Chapter Summary'
  | 'Practice Worksheets'
  | 'Important Questions'
  | 'Revision Notes'
  | 'Formula Sheets'
  | 'Study Resources';

export type AccessType = 'Free Preview Available' | 'Enrolment Required' | 'Open Foundation';

export interface LessonItem {
  id: string;
  title: string;
  description: string;
  durationLabel: string;
  isFreePreview: boolean;
  hasVideo: boolean;
  hasNotes: boolean;
  hasPractice: boolean;
  isSampleStructure?: boolean;
  videoTitle?: string;
}

export interface CourseModule {
  id: string;
  moduleNumber: string;
  title: string;
  subject: string;
  description: string;
  lessons: LessonItem[];
}

export interface CourseFAQ {
  question: string;
  answer: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  categories: CourseCategory[];
  primaryCategory: CourseCategory;
  classOrExam: string;
  subjects: string[];
  shortDescription: string;
  fullDescription: string;
  whoIsItFor: string[];
  highlights: string[];
  learningObjectives: string[];
  facultyVerified: boolean;
  facultyName?: string;
  facultyRole?: string;
  facultyQualifications?: string;
  accessType: AccessType;
  configuredFee: number | null;
  discountFee: number | null;
  durationLabel: string;
  published: boolean;
  thumbnail: string;
  seoTitle: string;
  seoDescription: string;
  modules: CourseModule[];
  faqs: CourseFAQ[];
}

export interface StudyResource {
  id: string;
  title: string;
  courseId: string;
  courseTitle: string;
  subject: string;
  chapter: string;
  category: ResourceCategory;
  fileType: 'PDF' | 'Worksheet' | 'Summary';
  dateAdded: string;
  restricted: boolean;
  summaryText: string;
  isSample?: boolean;
}

export interface PracticeQuestion {
  id: string;
  courseId: string;
  subject: string;
  chapter: string;
  category:
    | 'Chapter-wise MCQs'
    | 'Topic Practice'
    | 'Quick Quiz'
    | 'Practice Sets'
    | 'Revision Questions';
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
  isSample?: boolean;
}

export interface AcademyTest {
  id: string;
  title: string;
  courseId: string;
  courseTitle: string;
  subject: string;
  durationMinutes: number | null;
  questionIds: string[];
  status: 'Available' | 'Upcoming' | 'Practice';
  scheduledDate?: string;
  passingRuleNote: string;
  isConfigurableSample?: boolean;
}

export interface TestAttempt {
  id: string;
  testId: string;
  testTitle: string;
  courseId: string;
  subject: string;
  submittedAt: string;
  answers: Record<string, number>;
  markedForReview: string[];
  totalQuestions: number;
  attempted: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  accuracyPercent: number;
}

export interface DoubtItem {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseTitle: string;
  subject: string;
  chapter: string;
  question: string;
  description: string;
  attachmentName?: string;
  status: 'Pending' | 'Answered' | 'Resolved';
  createdAt: string;
  reply?: {
    authorName: string;
    authorRole: string;
    message: string;
    repliedAt: string;
  };
}

export interface NotificationItem {
  id: string;
  type:
    | 'New Course'
    | 'New Lesson'
    | 'Upcoming Test'
    | 'Study Material Added'
    | 'Test Result'
    | 'Doubt Answered'
    | 'Course Announcement';
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  targetRoute?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  accountStatus: 'Active' | 'Pending';
  joinedAt: string;
  learningGoal?: string;
  isPrototypeDemo?: boolean;
}

export interface EnrollmentRecord {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  courseId: string;
  courseTitle: string;
  status: 'Active' | 'Pending Verification' | 'Suspended';
  enrolledAt: string;
  paymentId?: string;
}

export interface PaymentRecord {
  id: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  courseId: string;
  courseTitle: string;
  amount: number | null;
  discountAmount: number | null;
  finalAmount: number | null;
  method: string;
  status: 'Pending' | 'Successful' | 'Failed';
  gatewayMode: 'Razorpay Integration Ready' | 'Center Admission Request';
  createdAt: string;
  referenceCode: string;
}

export interface AdmissionEnquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  courseInterest: string;
  message: string;
  createdAt: string;
  status: 'New' | 'Contacted' | 'Closed';
}

export interface AcademySettings {
  academyName: string;
  mainTagline: string;
  secondaryTagline: string;
  establishedYear: string;
  address: string;
  phones: string[];
  razorpayConfigured: boolean;
  whatsappNumber: string;
  showPrototypeBanner: boolean;
}
