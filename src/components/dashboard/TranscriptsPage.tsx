import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Eye,
  Clock,
  User,
  Tag
} from 'lucide-react';
import { useRecording } from '../../contexts/RecordingContext';
import { Link } from 'react-router-dom';
import Mp3UploadTranscriber from '../Mp3UploadTranscriber';

export default function TranscriptsPage() {
  const { recordings } = useRecording();
  const [searchTerm, setSearchTerm] = useState('');

  const transcriptRecordings = recordings.filter(r => r.transcript);
  
  const filteredTranscripts = transcriptRecordings.filter(recording => {
    const transcript = recording.transcript!;
    const matchesSearch = recording.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transcript.summary?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transcript.topics?.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Transcripts</h1>
        <p className="text-gray-600">View and manage your session transcripts</p>
      </div>

      {/* MP3 Upload and Transcribe */}
      <Mp3UploadTranscriber />

      {/* Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search transcripts, topics, or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent">
              <option>All Subjects</option>
              <option>Mathematics</option>
              <option>Physics</option>
              <option>Chemistry</option>
              <option>English</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transcripts List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {filteredTranscripts.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredTranscripts.map((recording) => {
              const transcript = recording.transcript!;
              return (
                <div key={recording.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="bg-green-100 p-3 rounded-lg flex-shrink-0">
                        <FileText className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {recording.title}
                        </h3>
                        
                        {transcript.summary && (
                          <p className="text-gray-600 mb-3 line-clamp-2">
                            {transcript.summary}
                          </p>
                        )}
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{formatDuration(recording.duration || 0)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>{transcript.segments.length} segments</span>
                          </div>
                          <span>{formatDate(recording.date)}</span>
                        </div>
                        
                        {transcript.topics && transcript.topics.length > 0 && (
                          <div className="flex items-center space-x-2 mb-3">
                            <Tag className="h-4 w-4 text-gray-400" />
                            <div className="flex flex-wrap gap-2">
                              {transcript.topics.slice(0, 3).map((topic, index) => (
                                <span 
                                  key={index}
                                  className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs"
                                >
                                  {topic}
                                </span>
                              ))}
                              {transcript.topics.length > 3 && (
                                <span className="text-gray-500 text-xs">
                                  +{transcript.topics.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 flex-shrink-0 ml-4">
                      <Link
                        to={`/dashboard/transcripts/${recording.id}`}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Transcript"
                      >
                        <Eye className="h-5 w-5" />
                      </Link>
                      <button
                        className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Download"
                      >
                        <Download className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No transcripts found</h3>
            <p className="text-gray-600">
              {searchTerm 
                ? 'Try adjusting your search criteria'
                : 'Transcripts will appear here after your recordings are processed'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}