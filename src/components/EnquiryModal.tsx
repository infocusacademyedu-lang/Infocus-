import React, { useEffect, useState } from 'react';
import { CheckCircle2, MessageCircle, X } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';

export const EnquiryModal: React.FC = () => {
  const {
    enquiryModalCourse,
    closeEnquiryModal,
    courses,
    submitEnquiry,
    settings,
  } = useAcademy();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [courseInterest, setCourseInterest] = useState('Class 11 Science Program');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (enquiryModalCourse) {
      setCourseInterest(enquiryModalCourse);
      setSubmitted(false);
      setError('');
    }
  }, [enquiryModalCourse]);

  if (!enquiryModalCourse) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || phone.trim().length < 10) {
      setError('Please enter your full name and a valid 10-digit phone number.');
      return;
    }
    if (email.trim() && !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    submitEnquiry({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || 'Not provided',
      courseInterest,
      message: message.trim() || 'Requested admission & batch details.',
    });
    setSubmitted(true);
    setError('');
  };

  const whatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
    `Hello INFOCUS ACADEMY, I would like to enquire about ${courseInterest}. My name is ${
      name || 'a prospective student'
    }.`
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#091526]/65 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
    >
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg overflow-hidden shadow-xl">
        <div className="px-6 py-4 bg-[#10233F] text-white flex items-center justify-between">
          <div>
            <h2 id="enquiry-modal-title" className="font-display text-lg font-bold">
              Admission &amp; Course Enquiry
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              INFOCUS ACADEMY · Kalkaji, New Delhi
            </p>
          </div>
          <button
            type="button"
            onClick={closeEnquiryModal}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10"
            aria-label="Close enquiry dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-12 h-12 rounded-full bg-green-50 text-[#16A34A] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#10233F]">
                Enquiry Recorded
              </h3>
              <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                Thank you, {name}. Your enquiry for <strong className="text-[#10233F]">{courseInterest}</strong> has been saved in the platform workspace. You can also reach our Kalkaji centre directly on phone or WhatsApp.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#16A34A] text-white text-sm font-semibold hover:bg-green-700"
                >
                  <MessageCircle className="w-4 h-4" />
                  Continue on WhatsApp
                </a>
                <button
                  type="button"
                  onClick={closeEnquiryModal}
                  className="px-5 py-2.5 rounded-lg border border-slate-300 text-sm font-medium text-[#10233F] hover:bg-slate-50"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#10233F] mb-1.5">
                  Student Full Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter student name"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#10233F]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#10233F] mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-mono-tabular focus:outline-none focus:border-[#10233F]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#10233F] mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Optional email"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#10233F]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#10233F] mb-1.5">
                  Program / Course Interest
                </label>
                <select
                  value={courseInterest}
                  onChange={(e) => setCourseInterest(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm bg-white focus:outline-none focus:border-[#10233F]"
                >
                  <option value="General Admission Enquiry">General Admission Enquiry</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.title}>
                      {c.title}
                    </option>
                  ))}
                  <option value="Class 10 Mathematics & Science">
                    Class 10 Mathematics &amp; Science
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#10233F] mb-1.5">
                  Questions or Preferred Batch Timing
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your class, subjects (Biology / Chemistry / Maths), or questions..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#10233F]"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 text-sm font-medium text-[#10233F] hover:bg-slate-50"
                >
                  <MessageCircle className="w-4 h-4 text-[#16A34A]" />
                  WhatsApp Direct
                </a>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-[#10233F] text-white text-sm font-semibold hover:bg-[#091526] transition-colors cursor-pointer"
                >
                  Submit Enquiry
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
