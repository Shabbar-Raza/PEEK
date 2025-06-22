import React from 'react';
import { Play, BarChart3, Users, Shield } from 'lucide-react';

interface HeroProps {
  onSignupClick: () => void;
}

export default function Hero({ onSignupClick }: HeroProps) {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                AI-Powered
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                  Tuition Analytics
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Transform your online tutoring with intelligent class monitoring, 
                real-time engagement analysis, and automated reporting. Get deeper 
                insights into student progress and tutor effectiveness.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-green-600" />
                <span>COPPA Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-blue-600" />
                <span>500+ Tutors</span>
              </div>
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4 text-purple-600" />
                <span>98% Accuracy</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onSignupClick}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
              >
                Start Your Free Trial
              </button>
              <button className="border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center space-x-2">
                <Play className="h-5 w-5" />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>

          {/* Visual Demo */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-6 space-y-4">
              {/* Mock Video Call Interface */}
              <div className="bg-gray-900 rounded-lg p-4 relative overflow-hidden">
                <div className="grid grid-cols-2 gap-2 h-40">
                  <div className="bg-blue-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-600 rounded-full mx-auto mb-2"></div>
                      <p className="text-xs text-gray-600">Tutor</p>
                    </div>
                  </div>
                  <div className="bg-green-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-600 rounded-full mx-auto mb-2"></div>
                      <p className="text-xs text-gray-600">Student</p>
                    </div>
                  </div>
                </div>
                
                {/* AI Analysis Overlay */}
                <div className="absolute top-2 right-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>AI Analyzing</span>
                </div>
              </div>

              {/* Real-time Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">92%</div>
                  <div className="text-xs text-gray-600">Engagement</div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">15min</div>
                  <div className="text-xs text-gray-600">Speaking Time</div>
                </div>
              </div>

              {/* Topic Tags */}
              <div className="flex flex-wrap gap-2">
                <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">Algebra</span>
                <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs">Equations</span>
                <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded-full text-xs">Problem Solving</span>
              </div>
            </div>

            {/* Floating AI Badge */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              Powered by AI
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}