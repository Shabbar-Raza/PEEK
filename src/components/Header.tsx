import React, { useState } from 'react';
import { Brain, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './auth/AuthModal';

interface HeaderProps {
  onSignupClick?: () => void;
}

export default function Header({ onSignupClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'signup' }>({
    isOpen: false,
    mode: 'login'
  });
  const { user } = useAuth();

  const handleSignupClick = () => {
    if (onSignupClick) {
      onSignupClick();
    } else {
      setAuthModal({ isOpen: true, mode: 'signup' });
    }
  };

  const handleLoginClick = () => {
    setAuthModal({ isOpen: true, mode: 'login' });
  };

  // If user is logged in, redirect to dashboard
  if (user) {
    window.location.href = '/dashboard';
    return null;
  }

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">TutorScope AI</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                How It Works
              </a>
              <a href="#dashboard" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Analytics
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Pricing
              </a>
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={handleLoginClick}
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Log In
              </button>
              <button
                onClick={handleSignupClick}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
              >
                Start Free Trial
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
              <nav className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                  Features
                </a>
                <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                  How It Works
                </a>
                <a href="#dashboard" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                  Analytics
                </a>
                <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                  Pricing
                </a>
                <div className="flex flex-col space-y-2 pt-4">
                  <button 
                    onClick={handleLoginClick}
                    className="text-gray-600 hover:text-blue-600 transition-colors font-medium text-left"
                  >
                    Log In
                  </button>
                  <button
                    onClick={handleSignupClick}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                  >
                    Start Free Trial
                  </button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      <AuthModal 
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal({ ...authModal, isOpen: false })}
        initialMode={authModal.mode}
      />
    </>
  );
}