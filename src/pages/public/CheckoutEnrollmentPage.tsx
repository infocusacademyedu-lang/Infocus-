import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  CreditCard,
  ShieldCheck,
} from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';
import { PaymentRecord } from '../../types/academy';

interface CheckoutEnrollmentPageProps {
  courseSlug: string;
}

export const CheckoutEnrollmentPage: React.FC<CheckoutEnrollmentPageProps> = ({
  courseSlug,
}) => {
  const {
    courses,
    authUser,
    navigate,
    createCheckoutOrder,
    settings,
    openEnquiryModal,
  } = useAcademy();

  const course =
    courseSlug === 'class-10'
      ? courses.find((c) => c.slug === 'class-9')
      : courses.find((c) => c.slug === courseSlug) ?? courses[0];

  const [studentName, setStudentName] = useState(authUser?.name ?? '');
  const [studentEmail, setStudentEmail] = useState(authUser?.email ?? '');
  const [studentPhone, setStudentPhone] = useState(authUser?.phone ?? '');
  const [paymentMethod, setPaymentMethod] = useState('Razorpay (Integration Ready)');
  const [orderResult, setOrderResult] = useState<{
    payment: PaymentRecord;
    enrolled: boolean;
  } | null>(null);
  const [error, setError] = useState('');

  if (!course) return null;

  const baseFee = course.configuredFee;
  const discountFee = course.discountFee;
  const finalAmount = discountFee ?? baseFee;

  const handleCheckout = (outcome: 'Pending' | 'Successful' | 'Failed') => {
    if (!studentName.trim() || !studentEmail.includes('@') || studentPhone.trim().length < 10) {
      setError('Please enter valid student name, email, and 10-digit phone number.');
      return;
    }
    setError('');
    const res = createCheckoutOrder({
      course,
      studentName: studentName.trim(),
      studentEmail: studentEmail.trim(),
      studentPhone: studentPhone.trim(),
      paymentMethod,
      outcome,
    });
    setOrderResult({
      payment: res.payment,
      enrolled: Boolean(res.enrollment && res.enrollment.status === 'Active'),
    });
  };

  if (orderResult) {
    const { payment, enrolled } = orderResult;
    return (
      <div className="bg-[#F5F7FA] min-h-[82vh] py-12 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 space-y-6">
          <div className="flex items-start gap-4">
            {payment.status === 'Successful' && (
              <div className="w-12 h-12 rounded-full bg-green-50 text-[#16A34A] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-7 h-7" />
              </div>
            )}
            {payment.status === 'Pending' && (
              <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Clock className="w-7 h-7" />
              </div>
            )}
            {payment.status === 'Failed' && (
              <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                <AlertCircle className="w-7 h-7" />
              </div>
            )}

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Status: {payment.status}
              </p>
              <h1 className="font-display text-2xl font-bold text-[#10233F] mt-1">
                {payment.status === 'Successful' && 'Enrollment Confirmed (Prototype Mode)'}
                {payment.status === 'Pending' && 'Admission & Payment Pending Verification'}
                {payment.status === 'Failed' && 'Payment Attempt Failed'}
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                {payment.status === 'Successful' &&
                  'The selected course is now unlocked inside your Student Dashboard.'}
                {payment.status === 'Pending' &&
                  'Your admission request is recorded. Our Kalkaji team or Razorpay webhook will verify fee confirmation.'}
                {payment.status === 'Failed' &&
                  'No charges were made. You can retry enrollment or submit a centre admission request.'}
              </p>
            </div>
          </div>

          <div className="bg-[#F5F7FA] border border-slate-200 rounded-xl p-5 space-y-3 text-sm">
            <h2 className="font-display text-sm font-bold text-[#10233F] uppercase tracking-wide">
              Order &amp; Receipt Summary
            </h2>
            <div className="grid grid-cols-2 gap-y-2 text-xs sm:text-sm">
              <span className="text-slate-500">Reference ID</span>
              <span className="font-mono-tabular font-semibold text-[#10233F] text-right">
                {payment.referenceCode}
              </span>
              <span className="text-slate-500">Course</span>
              <span className="font-semibold text-[#10233F] text-right">{payment.courseTitle}</span>
              <span className="text-slate-500">Student</span>
              <span className="font-medium text-[#10233F] text-right">{payment.studentName}</span>
              <span className="text-slate-500">Payment Method</span>
              <span className="font-medium text-[#10233F] text-right">{payment.method}</span>
              <span className="text-slate-500">Final Amount</span>
              <span className="font-mono-tabular font-bold text-[#10233F] text-right">
                {payment.finalAmount !== null
                  ? `₹${payment.finalAmount.toLocaleString('en-IN')}`
                  : 'Configured by Academy'}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {enrolled ? (
              <button
                type="button"
                onClick={() => navigate('/student/courses')}
                className="px-6 py-3 rounded-lg bg-[#10233F] text-white text-sm font-semibold hover:bg-[#091526] cursor-pointer"
              >
                Open My Courses in Student Dashboard
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setOrderResult(null)}
                className="px-6 py-3 rounded-lg bg-[#10233F] text-white text-sm font-semibold cursor-pointer"
              >
                Return to Checkout
              </button>
            )}
            <button
              type="button"
              onClick={() => navigate('/courses')}
              className="px-5 py-3 rounded-lg border border-slate-300 text-sm font-semibold text-[#10233F] cursor-pointer"
            >
              Browse Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F7FA] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <button
          type="button"
          onClick={() => navigate(`/courses/${course.slug}`)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#10233F] hover:underline cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to {course.title}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Checkout Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <h1 className="font-display text-2xl font-bold text-[#10233F]">
                Course Enrollment &amp; Checkout
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Review your student details and select a configurable enrollment pathway.
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#10233F] mb-1.5">
                  Student Name *
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Full name"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#10233F] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#10233F] mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    placeholder="10-digit mobile"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-mono-tabular"
                  />
                </div>
              </div>
            </div>

            {/* Configurable Payment Method */}
            <div className="space-y-3 pt-2 border-t border-slate-200">
              <h2 className="font-display text-sm font-bold text-[#10233F]">
                Configurable Payment &amp; Admission Method
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Razorpay (Integration Ready)',
                  'Centre Admission (Kalkaji Desk)',
                  'UPI / NetBanking (Gateway)',
                ].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium cursor-pointer ${
                      paymentMethod === method
                        ? 'border-[#10233F] bg-[#EAF2FB] text-[#10233F] font-semibold'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>

              <div className="p-3.5 rounded-xl bg-[#F5F7FA] border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#10233F] shrink-0 mt-0.5" />
                <span>
                  Security Notice: Card details are never collected or stored directly by INFOCUS ACADEMY. Online payments use secure third-party gateway integration (e.g. Razorpay) when enabled by the Academy Admin.
                </span>
              </div>
            </div>

            {/* Honest Prototype State Actions */}
            <div className="space-y-3 pt-2 border-t border-slate-200">
              <p className="text-xs font-semibold text-slate-500">
                Checkout State Controls ({settings.razorpayConfigured ? 'Gateway Active' : 'Prototype Mode — No Real Charge'})
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => handleCheckout('Pending')}
                  className="flex-1 py-3 px-4 rounded-lg bg-[#10233F] text-white text-sm font-semibold hover:bg-[#091526] cursor-pointer"
                >
                  Submit Admission / Pending Request
                </button>
                <button
                  type="button"
                  onClick={() => handleCheckout('Successful')}
                  className="flex-1 py-3 px-4 rounded-lg bg-[#16A34A] text-white text-sm font-semibold hover:bg-green-700 cursor-pointer"
                >
                  Test Confirmed Unlock (Demo)
                </button>
              </div>
              <button
                type="button"
                onClick={() => handleCheckout('Failed')}
                className="text-xs text-slate-500 hover:text-red-600 underline cursor-pointer"
              >
                Simulate Failed Payment State
              </button>
            </div>
          </div>

          {/* Right Order Summary */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#D6AF62] uppercase tracking-wider">
              <CreditCard className="w-4 h-4" />
              Enrollment Summary
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-[#10233F]">{course.title}</h2>
              <p className="text-xs text-slate-500 mt-1">
                {course.classOrExam} · {course.subjects.join(' · ')}
              </p>
            </div>

            <div className="border-t border-b border-slate-200 py-4 space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Configured Course Fee</span>
                <span className="font-mono-tabular font-medium text-[#10233F]">
                  {baseFee !== null ? `₹${baseFee.toLocaleString('en-IN')}` : 'Not Set (On Enquiry)'}
                </span>
              </div>
              {baseFee !== null && discountFee !== null && (
                <div className="flex justify-between text-[#16A34A]">
                  <span>Configured Discount</span>
                  <span className="font-mono-tabular">
                    -₹{(baseFee - discountFee).toLocaleString('en-IN')}
                  </span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-slate-100 font-bold text-[#10233F]">
                <span>Final Payable Amount</span>
                <span className="font-mono-tabular">
                  {finalAmount !== null
                    ? `₹${finalAmount.toLocaleString('en-IN')}`
                    : 'Confirmed by Academy'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => openEnquiryModal(course.title)}
              className="w-full py-2.5 px-4 rounded-lg border border-slate-300 text-xs font-semibold text-[#10233F] hover:bg-slate-50 cursor-pointer"
            >
              Need Fee Details First? Request Call Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
