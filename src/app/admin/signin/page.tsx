'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Lock, Mail, Shield, ArrowRight } from 'lucide-react';
import adminLogo from '../../../../public/etutorAdminLogo.svg';

const AdminSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  const { data: session, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();

  // Redirect if already authenticated as admin
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role === 'admin') {
      router.push('/admin');
    }
  }, [status, session, router]);

  const validateForm = () => {
    const newErrors = { email: '', password: '' };
    let isValid = true;

    // Email validation
    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        role: 'admin',
        redirect: false,
      });

      if (result?.error) {
        toast({
          title: 'Authentication Failed',
          description: 'Invalid email or password. Please check your credentials and try again.',
          variant: 'destructive',
        });
      } else if (result?.ok) {
        toast({
          title: 'Welcome Back!',
          description: 'Successfully signed in to Admin Dashboard',
        });
        router.push('/admin');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const clearError = (field: 'email' | 'password') => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8558F9] via-[#9B6EFF] to-[#B085FF] flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-md w-full">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-2xl inline-block transform hover:scale-105 transition-transform duration-300">
            <Image src={adminLogo} alt="eTutor4Me Admin" className="w-48 h-auto mx-auto" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">Admin Portal</h1>
          <p className="text-white/80 text-lg">Secure access to eTutor4Me management dashboard</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-[#8558F9] to-[#B085FF] p-3 rounded-full shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 ml-3">Admin Sign In</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value);
                    clearError('email');
                  }}
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-[#8558F9] focus:border-transparent transition-all duration-200 ${
                    errors.email
                      ? 'border-red-500 bg-red-50 focus:ring-red-500'
                      : 'border-gray-200 hover:border-gray-300 focus:border-[#8558F9]'
                  }`}
                  placeholder="admin@etutor4me.com"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value);
                    clearError('password');
                  }}
                  className={`w-full pl-10 pr-12 py-3 border-2 rounded-lg focus:ring-2 focus:ring-[#8558F9] focus:border-transparent transition-all duration-200 ${
                    errors.password
                      ? 'border-red-500 bg-red-50 focus:ring-red-500'
                      : 'border-gray-200 hover:border-gray-300 focus:border-[#8558F9]'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#8558F9] to-[#B085FF] text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-[#7047E8] hover:to-[#A073FF] hover:shadow-xl hover:shadow-[#8558F9]/30 transform hover:scale-[1.02] transition-all duration-300 ease-in-out active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none flex items-center justify-center gap-3 group"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing In...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  Access Admin Dashboard
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <div className="flex items-start">
              <Shield className="w-5 h-5 text-[#8558F9] mt-0.5 mr-3 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-semibold text-gray-800 mb-1">Security Notice</p>
                <p className="text-gray-600 leading-relaxed">
                  This is a secure administrative portal. All login attempts are monitored and
                  logged. Unauthorized access attempts will be reported.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-white/70 text-sm">
          <p className="flex items-center justify-center">
            <span className="w-2 h-2 bg-white/50 rounded-full mr-2"></span>
            &copy; 2024 eTutor4Me. All rights reserved.
            <span className="w-2 h-2 bg-white/50 rounded-full ml-2"></span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminSignIn;
