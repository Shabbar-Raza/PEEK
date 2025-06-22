import React from 'react';
import { 
  Mic, 
  BarChart3, 
  FileText, 
  Activity, 
  Mail, 
  Video,
  Brain,
  Clock,
  TrendingUp
} from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Video,
      title: 'Real-time Class Monitoring',
      description: 'Seamlessly integrates with Zoom, Google Meet, and other platforms to monitor sessions in real-time.',
      color: 'blue'
    },
    {
      icon: Mic,
      title: 'Speech Analysis',
      description: 'Advanced AI analyzes student-tutor interactions, measuring participation and communication patterns.',
      color: 'purple'
    },
    {
      icon: Brain,
      title: 'Topic Extraction',
      description: 'Automatically identifies and categorizes topics covered during sessions with 98% accuracy.',
      color: 'green'
    },
    {
      icon: Activity,
      title: 'Engagement Metrics',
      description: 'Track student attention, participation levels, and learning momentum throughout each session.',
      color: 'orange'
    },
    {
      icon: FileText,
      title: 'Automated Reports',
      description: 'Generate comprehensive session summaries and progress reports automatically after each class.',
      color: 'teal'
    },
    {
      icon: Mail,
      title: 'Parent Notifications',
      description: 'Keep parents informed with automated updates on their child\'s learning progress and achievements.',
      color: 'pink'
    },
    {
      icon: Clock,
      title: 'Session Analytics',
      description: 'Detailed breakdown of class duration, speaking time distribution, and learning pace analysis.',
      color: 'indigo'
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Long-term performance trends and improvement tracking across multiple subjects and time periods.',
      color: 'red'
    },
    {
      icon: BarChart3,
      title: 'Performance Dashboard',
      description: 'Intuitive dashboard displaying key metrics, insights, and actionable recommendations for improvement.',
      color: 'emerald'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: { bg: string; icon: string; border: string } } = {
      blue: { bg: 'bg-blue-50', icon: 'text-blue-600', border: 'border-blue-200' },
      purple: { bg: 'bg-purple-50', icon: 'text-purple-600', border: 'border-purple-200' },
      green: { bg: 'bg-green-50', icon: 'text-green-600', border: 'border-green-200' },
      orange: { bg: 'bg-orange-50', icon: 'text-orange-600', border: 'border-orange-200' },
      teal: { bg: 'bg-teal-50', icon: 'text-teal-600', border: 'border-teal-200' },
      pink: { bg: 'bg-pink-50', icon: 'text-pink-600', border: 'border-pink-200' },
      indigo: { bg: 'bg-indigo-50', icon: 'text-indigo-600', border: 'border-indigo-200' },
      red: { bg: 'bg-red-50', icon: 'text-red-600', border: 'border-red-200' },
      emerald: { bg: 'bg-emerald-50', icon: 'text-emerald-600', border: 'border-emerald-200' }
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Modern Tutoring
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered platform provides comprehensive insights and analytics 
            to enhance the online tutoring experience for students, tutors, and parents.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const colors = getColorClasses(feature.color);
            const Icon = feature.icon;
            
            return (
              <div 
                key={index}
                className={`p-6 rounded-xl border-2 ${colors.border} ${colors.bg} hover:shadow-lg transition-all duration-300 hover:scale-105`}
              >
                <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center mb-4 border ${colors.border}`}>
                  <Icon className={`h-6 w-6 ${colors.icon}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Tutoring?</h3>
            <p className="text-blue-100 mb-6">
              Join hundreds of tutors and parents who are already using TutorScope AI 
              to enhance their educational experience.
            </p>
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
              Start Your Free Trial Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}