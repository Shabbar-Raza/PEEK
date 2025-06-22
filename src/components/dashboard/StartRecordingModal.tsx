import React, { useState } from 'react';
import { X, Video, Mic, Users } from 'lucide-react';
import { useRecording } from '../../contexts/RecordingContext';

interface StartRecordingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StartRecordingModal({ isOpen, onClose }: StartRecordingModalProps) {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [platform, setPlatform] = useState('zoom');
  const [isStarting, setIsStarting] = useState(false);
  const { startRecording } = useRecording();

  const handleStart = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsStarting(true);
    try {
      await startRecording(title, subject || undefined);
      onClose();
      // Reset form
      setTitle('');
      setSubject('');
      setPlatform('zoom');
    } catch (error) {
      console.error('Failed to start recording:', error);
    } finally {
      setIsStarting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Start New Recording</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>

        <form onSubmit={handleStart} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Session Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="e.g., Math Tutoring - Algebra Basics"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject (Optional)
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="e.g., Mathematics, Physics, English"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Platform
            </label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            >
              <option value="zoom">Zoom</option>
              <option value="meet">Google Meet</option>
              <option value="teams">Microsoft Teams</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Recording Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Recording Information</h4>
            <div className="space-y-2 text-sm text-blue-800">
              <div className="flex items-center space-x-2">
                <Video className="h-4 w-4" />
                <span>Video and audio will be recorded</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mic className="h-4 w-4" />
                <span>AI will analyze speech patterns</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>All participants will be notified</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim() || isStarting}
              className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
            >
              {isStarting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Starting...</span>
                </>
              ) : (
                <>
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  <span>Start Recording</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}