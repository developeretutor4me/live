import React from 'react';
import { Home, LogOut, AlertCircle } from 'lucide-react';
import { signOut } from 'next-auth/react';

const ErrorPageLoader = ({ error }: { error: string }) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center z-50">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
          {/* Error Icon */}
          <div className="mb-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-10 h-10 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
            <p className="text-gray-600 mb-6">{error}</p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Home className="w-5 h-5" />
              <span>Go to Home</span>
            </button>

            <button
              onClick={() => signOut({ callbackUrl: '/signin' })}
              className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>

          {/* Help Text */}
          <p className="text-sm text-gray-500 mt-6">
            If the problem persists, please contact support
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPageLoader;
