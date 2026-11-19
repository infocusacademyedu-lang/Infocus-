import React, { useState } from 'react';
import { CheckCircle2, ExternalLink, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';

export const ContactPage: React.FC = () => {
  const { settings, courses, submitEnquiry } = useAcademy();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [courseInterest, setCourseInterest] = useState('Class 11 Science Program');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || phone.trim().length < 10) {
      setError('Please enter your full name and a valid 10-digit phone number.');
      return;
    }
    submitEnquiry({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || 'Not provided',
      courseInterest,
      message: message.trim() || 'Admission enquiry from Contact page.',
    });
    setSent(true);
    setError('');
  };

  const mapsQueryUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'INFOCUS ACADEMY B-20 J-3 Market DDA Flats Kalkaji New Delhi 110019'
  )}`;

  const whatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
    `Hello INFOCUS ACADEMY, I would like to enquire about ${courseInterest}.`
  )}`;

  return (
    <div className="bg-[#F5F7FA] min-h-screen">
      <section className="bg-[#10233F] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#D6AF62]">
            Admissions &amp; Centre Desk
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold">
            Contact INFOCUS ACADEMY
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
            Visit our Kalkaji study centre in New Delhi or reach out for Classes 9–12, Biology, Chemistry, NEET, JEE, and CUET admissions.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Contact Card & Kalkaji Map Placeholder */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <h2 className="font-display text-xl font-bold text-[#10233F]">
                {settings.academyName}
              </h2>
              <p className="text-xs text-slate-500">Established {settings.establishedYear}</p>
            </div>

            <div className="space-y-4 text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#10233F] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#10233F]">Study Centre Address</p>
                  <p className="mt-0.5 leading-relaxed">{settings.address}</p>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <p className="font-semibold text-[#10233F]">Phone Numbers</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {settings.phones.map((ph) => (
                    <a
                      key={ph}
                      href={`tel:+91${ph}`}
                      className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-slate-300 text-sm font-semibold text-[#10233F] hover:bg-slate-50 font-mono-tabular"
                    >
                      <Phone className="w-4 h-4 text-[#D6AF62]" />
                      {ph}
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#16A34A] text-white text-sm font-semibold hover:bg-green-700"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Map Placeholder Card */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="bg-[#EAF2FB] p-6 space-y-3 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#10233F]">
                  Location Map · Kalkaji, New Delhi
                </span>
                <span className="text-xs text-slate-600 font-mono-tabular">PIN 110019</span>
              </div>
              <div className="h-44 rounded-xl bg-white border border-slate-200 flex flex-col items-center justify-center p-5 text-center space-y-2">
                <MapPin className="w-8 h-8 text-[#10233F]" />
                <p className="font-display text-sm font-bold text-[#10233F]">
                  B-20, J-3 Market, DDA Flats, Kalkaji
                </p>
                <p className="text-xs text-slate-500">New Delhi – 110019, India</p>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <span className="text-xs text-slate-600">Google Maps Navigation</span>
              <a
                href={mapsQueryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#10233F] hover:text-[#D6AF62]"
              >
                Get Directions <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Right: Admission Enquiry Form */}
        <div className="lg:col-span-7">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10">
            {sent ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-green-50 text-[#16A34A] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h2 className="font-display text-2xl font-bold text-[#10233F]">
                  Admission Enquiry Submitted
                </h2>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you, {name}. Your enquiry for <strong className="text-[#10233F]">{courseInterest}</strong> has been saved. You may also call 8851008500 or 8802196760 for immediate assistance.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setName('');
                    setPhone('');
                    setEmail('');
                    setMessage('');
                  }}
                  className="px-5 py-2.5 rounded-lg bg-[#10233F] text-white text-sm font-semibold cursor-pointer"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <h2 className="font-display text-2xl font-bold text-[#10233F]">
                    Admission Enquiry Form
                  </h2>
                  <p className="text-sm text-slate-600">
                    Share your academic goals and our team will help you choose the right batch.
                  </p>
                </div>

                {error && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#10233F] mb-1.5">
                      Student Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full name"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#10233F]"
                      required
                    />
                  </div>
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
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#10233F] mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#10233F]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#10233F] mb-1.5">
                      Course / Class
                    </label>
                    <select
                      value={courseInterest}
                      onChange={(e) => setCourseInterest(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm bg-white focus:outline-none focus:border-[#10233F]"
                    >
                      {courses.map((c) => (
                        <option key={c.id} value={c.title}>
                          {c.title}
                        </option>
                      ))}
                      <option value="Class 10 Foundation Program">
                        Class 10 Foundation Program
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#10233F] mb-1.5">
                    Message / Academic Query
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask about batch timings, Biology / Chemistry classes, or online portal access..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#10233F]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 rounded-lg bg-[#10233F] text-white text-sm font-semibold hover:bg-[#091526] cursor-pointer"
                >
                  Send Enquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
