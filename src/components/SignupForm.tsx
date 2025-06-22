import React, { useState } from 'react';
import { 
  User, 
  GraduationCap, 
  Users, 
  Check, 
  X,
  Star,
  Shield,
  Zap,
  Mail,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface SignupFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin?: () => void;
}

export default function SignupForm({ isOpen, onClose, onSwitchToLogin }: SignupFormProps) {
  const [selectedRole, setSelectedRole] = useState<'parent' | 'tutor' | 'student' | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'professional' | 'enterprise'>('professional');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    organization: '',
    platform: 'zoom'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { signup, isLoading } = useAuth();

  const roles = [
    {
      id: 'parent' as const,
      title: 'Parent',
      description: 'Monitor your child\'s tutoring progress',
      icon: User,
      features: ['Session monitoring', 'Progress reports', 'Parent notifications']
    },
    {
      id: 'tutor' as const,
      title: 'Tutor',
      description: 'Enhance your teaching with AI insights',
      icon: GraduationCap,
      features: ['Student analytics', 'Performance tracking', 'Session insights']
    },
    {
      id: 'student' as const,
      title: 'Student',
      description: 'Track your learning journey',
      icon: Users,
      features: ['Progress tracking', 'Goal setting', 'Achievement badges']
    }
  ];

  const plans = [
    {
      id: 'starter' as const,
      name: 'Starter',
      price: '$9',
      period: '/month',
      description: 'Perfect for individual tutors',
      features: [
        '5 sessions per month',
        'Basic analytics',
        'Email reports',
        'Standard support'
      ],
      limitations: ['Limited integrations'],
      icon: Zap,
      popular: false
    },
    {
      id: 'professional' as const,
      name: 'Professional',
      price: '$29',
      period: '/month',
      description: 'Ideal for tutoring centers',
      features: [
        'Unlimited sessions',
        'Advanced analytics',
        'Real-time insights',
        'Priority support',
        'All integrations',
        'Custom reports'
      ],
      limitations: [],
      icon: Star,
      popular: true
    },
    {
      id: 'enterprise' as const,
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large organizations',
      features: [
        'Everything in Professional',
        'Custom integrations',
        'Dedicated support',
        'Advanced security',
        'API access',
        'Training included'
      ],
      limitations: [],
      icon: Shield,
      popular: false
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) {
      setError('Please select your role');
      return;
    }

    setError('');
    try {
      await signup({
        ...formData,
        role: selectedRole
      });
      onClose();
    } catch (err) {
      setError('Failed to create account. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Start Your Free Trial</h2>
              <p className="text-gray-600">Choose your role and plan to get started</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-6 w-6 text-gray-400" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Role Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">I am a...</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {roles.map((role) => {
                const Icon = role.icon;
                const isSelected = selectedRole === role.id;
                
                return (
                  <div
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      isSelected 
                        ? 'border-blue-600 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`p-2 rounded-lg ${isSelected ? 'bg-blue-600' : 'bg-gray-100'}`}>
                        <Icon className={`h-5 w-5 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{role.title}</h4>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{role.description}</p>
                    <ul className="space-y-1">
                      {role.features.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                          <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Plan Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Your Plan</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {plans.map((plan) => {
                const Icon = plan.icon;
                const isSelected = selectedPlan === plan.id;
                
                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all ${
                      isSelected 
                        ? 'border-blue-600 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-300 bg-white'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Most Popular
                        </span>
                      </div>
                    )}
                    
                    <div className="text-center mb-4">
                      <div className={`inline-flex p-3 rounded-lg mb-3 ${isSelected ? 'bg-blue-600' : 'bg-gray-100'}`}>
                        <Icon className={`h-6 w-6 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                      </div>
                      <h4 className="text-xl font-bold text-gray-900">{plan.name}</h4>
                      <div className="mt-2">
                        <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                        <span className="text-gray-600">{plan.period}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{plan.description}</p>
                    </div>
                    
                    <ul className="space-y-3 mb-4">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                      {plan.limitations.map((limitation, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <X className="h-4 w-4 text-red-400 flex-shrink-0" />
                          <span className="text-sm text-gray-500">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Organization (Optional)
              </label>
              <input
                type="text"
                value={formData.organization}
                onChange={(e) => setFormData(prev => ({ ...prev, organization: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Your school or tutoring center"
              />
            </div>
          </div>

          {/* Terms and CTA */}
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <input type="checkbox" className="mt-1" required />
              <label className="text-sm text-gray-600">
                I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and{' '}
                <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
              </label>
            </div>
            
            <button
              type="submit"
              disabled={!selectedRole || isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 text-white py-3 rounded-lg font-semibold text-lg transition-all"
            >
              {isLoading ? 'Creating Account...' : 'Start My 14-Day Free Trial'}
            </button>
            
            <p className="text-center text-sm text-gray-500">
              No credit card required • Cancel anytime • Full access during trial
            </p>

            {onSwitchToLogin && (
              <div className="text-center">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Sign in here
                  </button>
                </p>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}