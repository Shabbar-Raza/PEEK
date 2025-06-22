import React from 'react';
import { 
  Plug, 
  Play, 
  BarChart3, 
  RefreshCw, 
  Mail,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: Plug,
      title: 'Easy Integration',
      description: 'Connect your existing video platform (Zoom, Google Meet, etc.) in just a few clicks.',
      details: [
        'One-click platform connection',
        'Secure OAuth authentication',
        'No software installation required'
      ]
    },
    {
      icon: Play,
      title: 'Background Recording',
      description: 'Our AI monitors your sessions in the background without interrupting the learning flow.',
      details: [
        'Automatic session detection',
        'Privacy-first recording',
        'Zero impact on video quality'
      ]
    },
    {
      icon: BarChart3,
      title: 'AI Analytics Generation',
      description: 'Advanced algorithms analyze speech patterns, engagement, and learning progress in real-time.',
      details: [
        'Real-time speech analysis',
        'Engagement level tracking',
        'Topic identification and tagging'
      ]
    },
    {
      icon: RefreshCw,
      title: 'Dashboard Updates',
      description: 'Your personalized dashboard updates instantly with comprehensive insights and metrics.',
      details: [
        'Live metric updates',
        'Interactive progress charts',
        'Customizable view preferences'
      ]
    },
    {
      icon: Mail,
      title: 'Automated Reporting',
      description: 'Detailed reports are automatically sent to parents and stakeholders after each session.',
      details: [
        'Comprehensive session summaries',
        'Progress trend analysis',
        'Actionable improvement suggestions'
      ]
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            How TutorScope AI Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our seamless five-step process transforms your tutoring sessions into 
            actionable insights without disrupting the learning experience.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;
            
            return (
              <div key={index} className="relative">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-px h-12 bg-gradient-to-b from-blue-600 to-purple-600 hidden lg:block"></div>
                )}
                
                <div className={`grid lg:grid-cols-2 gap-12 items-center ${isEven ? '' : 'lg:grid-flow-col-dense'}`}>
                  {/* Content */}
                  <div className={`space-y-6 ${isEven ? '' : 'lg:col-start-2'}`}>
                    <div className="flex items-center space-x-4">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                        {index + 1}
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-lg text-gray-600 mb-6">
                        {step.description}
                      </p>
                      
                      <ul className="space-y-3">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-center space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                            <span className="text-gray-700">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Visual */}
                  <div className={`${isEven ? '' : 'lg:col-start-1'}`}>
                    <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100">
                      <div className="space-y-4">
                        {/* Step-specific visuals */}
                        {index === 0 && (
                          <div className="grid grid-cols-3 gap-4">
                            <div className="bg-blue-100 p-4 rounded-lg text-center">
                              <div className="w-8 h-8 bg-blue-600 rounded mx-auto mb-2"></div>
                              <p className="text-xs text-gray-600">Zoom</p>
                            </div>
                            <div className="bg-green-100 p-4 rounded-lg text-center">
                              <div className="w-8 h-8 bg-green-600 rounded mx-auto mb-2"></div>
                              <p className="text-xs text-gray-600">Meet</p>
                            </div>
                            <div className="bg-purple-100 p-4 rounded-lg text-center">
                              <div className="w-8 h-8 bg-purple-600 rounded mx-auto mb-2"></div>
                              <p className="text-xs text-gray-600">Teams</p>
                            </div>
                          </div>
                        )}
                        
                        {index === 1 && (
                          <div className="relative bg-gray-900 rounded-lg p-4 h-32">
                            <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs">
                              REC
                            </div>
                            <div className="flex items-center justify-center h-full text-white text-sm">
                              Session in Progress
                            </div>
                          </div>
                        )}
                        
                        {index === 2 && (
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full w-3/4"></div>
                              </div>
                              <span className="text-sm text-gray-600">75%</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="w-3 h-3 bg-green-600 rounded-full animate-pulse"></div>
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div className="bg-green-600 h-2 rounded-full w-1/2"></div>
                              </div>
                              <span className="text-sm text-gray-600">50%</span>
                            </div>
                          </div>
                        )}
                        
                        {index === 3 && (
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-blue-50 p-3 rounded-lg text-center">
                              <div className="text-2xl font-bold text-blue-600">89%</div>
                              <div className="text-xs text-gray-600">Engagement</div>
                            </div>
                            <div className="bg-green-50 p-3 rounded-lg text-center">
                              <div className="text-2xl font-bold text-green-600">12m</div>
                              <div className="text-xs text-gray-600">Speaking</div>
                            </div>
                          </div>
                        )}
                        
                        {index === 4 && (
                          <div className="space-y-3">
                            <div className="bg-gray-100 p-3 rounded-lg">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Session Report</span>
                                <ArrowRight className="h-4 w-4 text-gray-400" />
                              </div>
                            </div>
                            <div className="bg-blue-50 p-3 rounded-lg">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Parent Email</span>
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}