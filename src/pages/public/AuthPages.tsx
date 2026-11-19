import React, { useState } from 'react';
import { CheckCircle2, Eye, EyeOff, KeyRound, ShieldCheck } from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';

interface AuthPagesProps {
  mode: 'login' | 'signup';
}

export const AuthPages: React.FC<AuthPagesProps> = ({ mode }) => {
  const { navigate, loginWithCredentials, registerStudent, loginAsRole } = useAcademy();
  const [view, setView] = useState<'login' | 'signup' | 'forgot' | 'otp' | 'reset'>(mode);

  // Login state
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPass, setShowPass] = useState(false);

  // Signup state
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [signupPass, setSignupPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  // Recovery state
  const [recoveryTarget, setRecoveryTarget] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [newPass, setNewPass] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [error, setError] = useState('');

  React.useEffect(() => {
    setView(mode);
    setError('');
    setStatusMessage('');
  }, [mode]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const res = loginWithCredentials(identifier, password);
    if (!res.ok) {
      setError(res.error || 'Unable to sign in.');
      return;
    }
    navigate('/student');
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (signupPass !== confirmPass) {
      setError('Password and Confirm Password do not match.');
      return;
    }
    const res = registerStudent({
      name: fullName,
      phone,
      email,
      password: signupPass,
    });
    if (!res.ok) {
      setError(res.error || 'Please check your registration details.');
      return;
    }
    navigate('/student');
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recoveryTarget.trim()) {
      setError('Enter your registered email or phone number.');
      return;
    }
    setError('');
    setStatusMessage(
      `Prototype OTP verification screen ready for ${recoveryTarget}. Enter any 6-digit sample code (e.g. 123456) to preview reset flow.`
    );
    setView('otp');
  };

  const handleOtpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpInput.trim().length < 4) {
      setError('Enter the verification code.');
      return;
    }
    setError('');
    setView('reset');
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass.length < 6) {
      setError('New password must be at least 6 characters.');
      return;
    }
    setError('');
    setStatusMessage('Password updated in prototype flow. You may now sign in.');
    setView('login');
  };

  return (
    <div className="bg-[#F5F7FA] min-h-[82vh] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Auth Card */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h1 className="font-display text-2xl font-bold text-[#10233F]">
                {view === 'login' && 'Student & Portal Sign In'}
                {view === 'signup' && 'Create Student Account'}
                {view === 'forgot' && 'Forgot Password'}
                {view === 'otp' && 'OTP Verification'}
                {view === 'reset' && 'Reset Password'}
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                INFOCUS ACADEMY Digital Learning Ecosystem
              </p>
            </div>
            {(view === 'login' || view === 'signup') && (
              <button
                type="button"
                onClick={() => navigate(view === 'login' ? '/signup' : '/login')}
                className="text-xs font-semibold text-[#10233F] hover:underline cursor-pointer"
              >
                {view === 'login' ? 'Create Account' : 'Sign In Instead'}
              </button>
            )}
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
              {error}
            </div>
          )}

          {statusMessage && (
            <div className="p-3 rounded-lg bg-[#EAF2FB] border border-blue-200 text-xs text-[#10233F] flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
              <span>{statusMessage}</span>
            </div>
          )}

          {view === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#10233F] mb-1.5">
                  Phone Number or Email Address
                </label>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Enter phone or email"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#10233F]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#10233F] mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full px-3.5 py-2.5 pr-10 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#10233F]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                    aria-label={showPass ? 'Hide password' : 'Show password'}
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="inline-flex items-center gap-2 text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300"
                  />
                  Remember Me
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setError('');
                    setView('forgot');
                  }}
                  className="font-semibold text-[#10233F] hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-[#10233F] text-white text-sm font-semibold hover:bg-[#091526] cursor-pointer"
              >
                Sign In to Learning Portal
              </button>
            </form>
          )}

          {view === 'signup' && (
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#10233F] mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Student full name"
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
                    placeholder="10-digit phone"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-mono-tabular focus:outline-none focus:border-[#10233F]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#10233F] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#10233F]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#10233F] mb-1.5">
                    Password *
                  </label>
                  <input
                    type="password"
                    value={signupPass}
                    onChange={(e) => setSignupPass(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#10233F]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#10233F] mb-1.5">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#10233F]"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-[#10233F] text-white text-sm font-semibold hover:bg-[#091526] cursor-pointer"
              >
                Create Student Account
              </button>
            </form>
          )}

          {view === 'forgot' && (
            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <p className="text-sm text-slate-600">
                Enter your registered phone number or email address to initiate password recovery.
              </p>
              <input
                type="text"
                value={recoveryTarget}
                onChange={(e) => setRecoveryTarget(e.target.value)}
                placeholder="Phone or email address"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm"
                required
              />
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-[#10233F] text-white text-sm font-semibold cursor-pointer"
                >
                  Send Verification Code
                </button>
                <button
                  type="button"
                  onClick={() => setView('login')}
                  className="px-4 py-2.5 rounded-lg border border-slate-300 text-sm font-medium text-slate-700 cursor-pointer"
                >
                  Back to Login
                </button>
              </div>
            </form>
          )}

          {view === 'otp' && (
            <form onSubmit={handleOtpVerify} className="space-y-4">
              <p className="text-sm text-slate-600">
                Enter the 6-digit verification code sent to <strong>{recoveryTarget}</strong>.
              </p>
              <input
                type="text"
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value)}
                placeholder="Enter OTP code"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-mono-tabular tracking-widest"
                required
              />
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-[#10233F] text-white text-sm font-semibold cursor-pointer"
              >
                Verify OTP
              </button>
            </form>
          )}

          {view === 'reset' && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <label className="block text-xs font-semibold text-[#10233F]">
                New Password
              </label>
              <input
                type="password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm"
                required
              />
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-[#10233F] text-white text-sm font-semibold cursor-pointer"
              >
                Update Password
              </button>
            </form>
          )}
        </div>

        {/* Right: Role-Based Prototype Preview Access */}
        <div className="lg:col-span-5 bg-[#10233F] text-white rounded-2xl p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-2 text-[#D6AF62] text-xs font-semibold uppercase tracking-wider">
            <KeyRound className="w-4 h-4" />
            Prototype Portal Access
          </div>
          <h2 className="font-display text-xl font-bold">
            Explore Role-Based Dashboards
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Preview the complete INFOCUS ACADEMY LMS ecosystem across Student, Faculty, and Admin roles using clearly marked demo accounts.
          </p>

          <div className="space-y-3 pt-1">
            <button
              type="button"
              onClick={() => loginAsRole('student')}
              className="w-full text-left p-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 transition-colors cursor-pointer"
            >
              <p className="text-sm font-bold text-white">Demo Student Dashboard</p>
              <p className="text-xs text-slate-300 mt-0.5">
                Classroom, notes, MCQ practice, tests, progress &amp; doubt support
              </p>
            </button>

            <button
              type="button"
              onClick={() => loginAsRole('teacher')}
              className="w-full text-left p-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 transition-colors cursor-pointer"
            >
              <p className="text-sm font-bold text-white">Teacher Dashboard (JDR Sir)</p>
              <p className="text-xs text-slate-300 mt-0.5">
                Modules, lessons, study material upload, tests &amp; student doubts
              </p>
            </button>

            <button
              type="button"
              onClick={() => loginAsRole('admin')}
              className="w-full text-left p-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 transition-colors cursor-pointer"
            >
              <p className="text-sm font-bold text-white">Admin Management Console</p>
              <p className="text-xs text-slate-300 mt-0.5">
                Courses, pricing config, enrollments, payments, enquiries &amp; settings
              </p>
            </button>
          </div>

          <div className="pt-2 flex items-start gap-2 text-xs text-slate-300 border-t border-white/15">
            <ShieldCheck className="w-4 h-4 text-[#D6AF62] shrink-0 mt-0.5" />
            <span>
              Passwords are never displayed or stored in plain view. Role permissions separate student, faculty, and admin workspaces.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
