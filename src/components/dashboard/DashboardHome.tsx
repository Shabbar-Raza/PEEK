import React from 'react';
import { 
  Play, 
  Clock, 
  FileText, 
  TrendingUp,
  Calendar,
  Users,
  Video
} from 'lucide-react';
import { useRecording } from '../../contexts/RecordingContext';
import { useAuth } from '../../contexts/AuthContext';

export default function DashboardHome() {
  const { recordings, currentRecording, isTranscribing } = useRecording();
  const { user } = useAuth();

  const stats = [
    {
      label: 'Total Recordings',
      value: recordings.length.toString(),
      change: '+12%',
      icon: Video,
      color: 'blue'
    },
    {
      label: 'Hours Recorded',
      value: Math.floor(recordings.reduce((acc, r) => acc + (r.duration || 0), 0) / 3600).toString(),
      change: '+8%',
      icon: Clock,
      color: 'green'
    },
    {
      label: 'Transcripts Generated',
      value: recordings.filter(r => r.transcript).length.toString(),
      change: '+15%',
      icon: FileText,
      color: 'purple'
    },
    {
      label: 'Avg Engagement',
      value: '87%',
      change: '+3%',
      icon: TrendingUp,
      color: 'orange'
    }
  ];

  const recentRecordings = recordings.slice(0, 5);

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: { bg: string; text: string; border: string } } = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
      green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
      orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200' }
    };
    return colorMap[color] || colorMap.blue;
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-blue-100 text-lg">
          {currentRecording 
            ? 'You have an active recording session running.'
            : isTranscribing
            ? 'Processing your recording...'
            : 'Ready to start your next tutoring session?'
          }
        </p>
        {currentRecording && (
          <div className="mt-4 bg-white bg-opacity-20 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="font-medium">Recording: {currentRecording.title}</span>
            </div>
          </div>
        )}
        {isTranscribing && (
          <div className="mt-4 bg-white bg-opacity-20 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span className="font-medium">Processing recording with AssemblyAI...</span>
            </div>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colors = getColorClasses(stat.color);
          
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${colors.bg}`}>
                  <Icon className={`h-6 w-6 ${colors.text}`} />
                </div>
                <div className="flex items-center space-x-1 text-green-600 text-sm">
                  <TrendingUp className="h-3 w-3" />
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Recordings */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Recordings</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {recentRecordings.length > 0 ? (
              recentRecordings.map((recording) => (
                <div key={recording.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      recording.status === 'completed' ? 'bg-green-100' :
                      recording.status === 'processing' ? 'bg-yellow-100' :
                      recording.status === 'recording' ? 'bg-red-100' : 'bg-gray-100'
                    }`}>
                      <Video className={`h-4 w-4 ${
                        recording.status === 'completed' ? 'text-green-600' :
                        recording.status === 'processing' ? 'text-yellow-600' :
                        recording.status === 'recording' ? 'text-red-600' : 'text-gray-600'
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{recording.title}</p>
                      <p className="text-sm text-gray-600">
                        {formatDate(recording.date)} • {recording.duration ? formatDuration(recording.duration) : 'In progress'}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    recording.status === 'completed' ? 'bg-green-100 text-green-700' :
                    recording.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                    recording.status === 'recording' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {recording.status}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Video className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No recordings yet</p>
                <p className="text-sm">Start your first recording session</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
          
          <div className="space-y-4">
            <button 
              disabled={isTranscribing}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white p-4 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2"
            >
              {isTranscribing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Play className="h-5 w-5" />
                  <span>Start New Recording</span>
                </>
              )}
            </button>
            
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-gray-50 hover:bg-gray-100 text-gray-700 p-4 rounded-lg font-medium transition-colors flex flex-col items-center space-y-2">
                <FileText className="h-6 w-6" />
                <span className="text-sm">View Transcripts</span>
              </button>
              <button className="bg-gray-50 hover:bg-gray-100 text-gray-700 p-4 rounded-lg font-medium transition-colors flex flex-col items-center space-y-2">
                <Calendar className="h-6 w-6" />
                <span className="text-sm">Schedule Session</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}