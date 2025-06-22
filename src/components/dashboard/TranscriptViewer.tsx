import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Download, 
  Search, 
  Play, 
  Pause,
  User,
  Clock,
  Tag,
  FileText,
  BarChart3
} from 'lucide-react';
import { useRecording } from '../../contexts/RecordingContext';

export default function TranscriptViewer() {
  const { id } = useParams<{ id: string }>();
  const { getRecording } = useRecording();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpeaker, setSelectedSpeaker] = useState<string>('all');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const recording = id ? getRecording(id) : null;
  const transcript = recording?.transcript;

  if (!recording || !transcript) {
    return (
      <div className="text-center py-12">
        <FileText className="h-16 w-16 mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Transcript not found</h3>
        <Link 
          to="/dashboard/transcripts"
          className="text-blue-600 hover:underline"
        >
          Back to Transcripts
        </Link>
      </div>
    );
  }

  const speakers = Array.from(new Set(transcript.segments.map(s => s.speaker)));
  
  const filteredSegments = transcript.segments.filter(segment => {
    const matchesSearch = segment.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         segment.speaker.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpeaker = selectedSpeaker === 'all' || segment.speaker === selectedSpeaker;
    return matchesSearch && matchesSpeaker;
  });

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSpeakerColor = (speaker: string) => {
    const colors = {
      'Tutor': 'bg-blue-100 text-blue-800 border-blue-200',
      'Student': 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[speaker as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const jumpToTime = (timestamp: number) => {
    setCurrentTime(timestamp);
    // In a real implementation, this would control audio/video playback
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/dashboard/transcripts"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{recording.title}</h1>
            <p className="text-gray-600">{formatDate(recording.date)}</p>
          </div>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors">
          <Download className="h-4 w-4" />
          <span>Download</span>
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Transcript */}
        <div className="lg:col-span-2 space-y-6">
          {/* Controls */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search transcript..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
              <select
                value={selectedSpeaker}
                onChange={(e) => setSelectedSpeaker(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                <option value="all">All Speakers</option>
                {speakers.map(speaker => (
                  <option key={speaker} value={speaker}>{speaker}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Transcript Content */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Transcript</h3>
              <p className="text-sm text-gray-600">{filteredSegments.length} segments</p>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {filteredSegments.map((segment) => (
                <div 
                  key={segment.id} 
                  className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start space-x-4">
                    <button
                      onClick={() => jumpToTime(segment.timestamp)}
                      className="flex-shrink-0 text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      {formatTime(segment.timestamp)}
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSpeakerColor(segment.speaker)}`}>
                          {segment.speaker}
                        </span>
                        <span className="text-xs text-gray-500">
                          {Math.round(segment.confidence * 100)}% confidence
                        </span>
                      </div>
                      <p className="text-gray-900 leading-relaxed">
                        {searchTerm ? (
                          segment.text.split(new RegExp(`(${searchTerm})`, 'gi')).map((part, index) =>
                            part.toLowerCase() === searchTerm.toLowerCase() ? (
                              <mark key={index} className="bg-yellow-200">{part}</mark>
                            ) : part
                          )
                        ) : (
                          segment.text
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Summary */}
          {transcript.summary && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Summary</span>
              </h3>
              <p className="text-gray-700 leading-relaxed">{transcript.summary}</p>
            </div>
          )}

          {/* Topics */}
          {transcript.topics && transcript.topics.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Tag className="h-5 w-5" />
                <span>Topics Covered</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {transcript.topics.map((topic, index) => (
                  <span 
                    key={index}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Analytics */}
          {recording.analytics && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Session Analytics</span>
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Engagement</span>
                    <span className="text-sm font-medium">{recording.analytics.engagement}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${recording.analytics.engagement}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Speaking Time</h4>
                  {Object.entries(recording.analytics.speakingTimeDistribution).map(([speaker, percentage]) => (
                    <div key={speaker} className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">{speaker}</span>
                      <span className="text-sm font-medium">{percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Recording Info */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Recording Info</span>
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Duration</span>
                <span className="font-medium">{Math.floor((recording.duration || 0) / 60)}m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Participants</span>
                <span className="font-medium">{recording.participants.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Generated</span>
                <span className="font-medium">
                  {new Date(transcript.generatedAt).toLocaleDateString()}
                </span>
              </div>
              {recording.subject && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Subject</span>
                  <span className="font-medium">{recording.subject}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}