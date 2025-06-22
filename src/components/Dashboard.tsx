import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Users, 
  Brain,
  Star,
  Calendar,
  Award
} from 'lucide-react';

export default function Dashboard() {
  const metrics = [
    { label: 'Total Sessions', value: '24', change: '+12%', icon: Calendar, color: 'blue' },
    { label: 'Avg Engagement', value: '87%', change: '+5%', icon: Star, color: 'green' },
    { label: 'Speaking Time', value: '18m', change: '+3m', icon: Clock, color: 'purple' },
    { label: 'Topics Covered', value: '15', change: '+8', icon: Brain, color: 'orange' }
  ];

  const recentSessions = [
    { subject: 'Mathematics', duration: '45m', engagement: 92, topics: ['Algebra', 'Equations'] },
    { subject: 'Physics', duration: '60m', engagement: 78, topics: ['Mechanics', 'Forces'] },
    { subject: 'Chemistry', duration: '30m', engagement: 85, topics: ['Atoms', 'Bonding'] }
  ];

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: { bg: string; text: string; border: string } } = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
      green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
      orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200' }
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <section id="dashboard" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Analytics Dashboard Preview
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get comprehensive insights into student performance, engagement patterns, 
            and learning progress with our intuitive analytics dashboard.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Dashboard Container */}
          <div className="bg-gray-50 rounded-2xl p-8 shadow-2xl border border-gray-200">
            {/* Dashboard Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Student Analytics</h3>
                <p className="text-gray-600">Sarah Johnson - Math Tutoring</p>
              </div>
              <div className="flex items-center space-x-3">
                <select className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm">
                  <option>Last 30 days</option>
                  <option>Last 7 days</option>
                  <option>Last 90 days</option>
                </select>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Active
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {metrics.map((metric, index) => {
                const Icon = metric.icon;
                const colors = getColorClasses(metric.color);
                
                return (
                  <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-2 rounded-lg ${colors.bg}`}>
                        <Icon className={`h-5 w-5 ${colors.text}`} />
                      </div>
                      <div className="flex items-center space-x-1 text-green-600 text-sm">
                        <TrendingUp className="h-3 w-3" />
                        <span>{metric.change}</span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {metric.value}
                    </div>
                    <div className="text-sm text-gray-600">
                      {metric.label}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Engagement Chart */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-lg font-semibold text-gray-900">Weekly Engagement</h4>
                  <BarChart3 className="h-5 w-5 text-gray-400" />
                </div>
                <div className="space-y-4">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => {
                    const engagement = [85, 92, 78, 88, 95][index];
                    return (
                      <div key={day} className="flex items-center space-x-3">
                        <div className="w-8 text-sm text-gray-600">{day}</div>
                        <div className="flex-1 bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${engagement}%` }}
                          ></div>
                        </div>
                        <div className="w-12 text-sm font-medium text-gray-900">{engagement}%</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Sessions */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-lg font-semibold text-gray-900">Recent Sessions</h4>
                  <Users className="h-5 w-5 text-gray-400" />
                </div>
                <div className="space-y-4">
                  {recentSessions.map((session, index) => (
                    <div key={index} className="border border-gray-100 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-gray-900">{session.subject}</div>
                        <div className="text-sm text-gray-600">{session.duration}</div>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-sm text-gray-600">Engagement</div>
                        <div className="text-sm font-medium text-gray-900">{session.engagement}%</div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {session.topics.map((topic, topicIndex) => (
                          <span 
                            key={topicIndex} 
                            className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Performance Insights */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 p-2 rounded-lg flex-shrink-0">
                  <Award className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">AI Insights</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Student shows 15% improvement in problem-solving speed over the last month</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Engagement is highest during interactive problem-solving sessions</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Recommend focusing on algebra fundamentals in upcoming sessions</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}