import React, { useState } from 'react';
import { 
  Play, 
  Square, 
  FileText, 
  Download, 
  Trash2,
  Filter,
  Search,
  Video,
  Clock,
  Users
} from 'lucide-react';
import { useRecording } from '../../contexts/RecordingContext';
import { Link } from 'react-router-dom';
import StartRecordingModal from './StartRecordingModal';

export default function RecordingsPage() {
  const { recordings, currentRecording, stopRecording, deleteRecording } = useRecording();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showStartModal, setShowStartModal] = useState(false);

  const filteredRecordings = recordings.filter(recording => {
    const matchesSearch = recording.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recording.subject?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || recording.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'processing': return 'bg-yellow-100 text-yellow-700';
      case 'recording': return 'bg-red-100 text-red-700';
      case 'failed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Recordings</h1>
          <p className="text-gray-600">Manage your class recordings and transcripts</p>
        </div>
        <button
          onClick={() => setShowStartModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
        >
          <Play className="h-5 w-5" />
          <span>Start Recording</span>
        </button>
      </div>

      {/* Current Recording Status */}
      {currentRecording && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
              <div>
                <h3 className="text-lg font-semibold text-red-900">Recording in Progress</h3>
                <p className="text-red-700">{currentRecording.title}</p>
              </div>
            </div>
            <button
              onClick={stopRecording}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
            >
              <Square className="h-4 w-4" />
              <span>Stop Recording</span>
            </button>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search recordings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="processing">Processing</option>
              <option value="recording">Recording</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Recordings List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {filteredRecordings.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredRecordings.map((recording) => (
              <div key={recording.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Video className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{recording.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{recording.duration ? formatDuration(recording.duration) : 'In progress'}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{recording.participants.join(', ')}</span>
                        </div>
                        <span>{formatDate(recording.date)}</span>
                        {recording.subject && (
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                            {recording.subject}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(recording.status)}`}>
                      {recording.status}
                    </span>
                    
                    <div className="flex items-center space-x-2">
                      {recording.transcript && (
                        <Link
                          to={`/dashboard/transcripts/${recording.id}`}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Transcript"
                        >
                          <FileText className="h-5 w-5" />
                        </Link>
                      )}
                      <button
                        className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Download"
                      >
                        <Download className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => deleteRecording(recording.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Video className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No recordings found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Start your first recording session to see it here'
              }
            </p>
            {!searchTerm && statusFilter === 'all' && (
              <button
                onClick={() => setShowStartModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Start Your First Recording
              </button>
            )}
          </div>
        )}
      </div>

      <StartRecordingModal 
        isOpen={showStartModal}
        onClose={() => setShowStartModal(false)}
      />
    </div>
  );
}