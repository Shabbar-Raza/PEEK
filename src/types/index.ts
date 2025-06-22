export interface User {
  id: string;
  name: string;
  email: string;
  role: 'parent' | 'tutor' | 'student';
  avatar?: string;
}

export interface Recording {
  id: string;
  title: string;
  duration: number;
  date: string;
  status: 'recording' | 'processing' | 'completed' | 'failed';
  participants: string[];
  subject?: string;
  transcript?: Transcript;
  analytics?: Analytics;
  studentAudioBlob?: Blob;
  tutorAudioBlob?: Blob;
}

export interface Transcript {
  id: string;
  recordingId: string;
  segments: TranscriptSegment[];
  summary?: string;
  topics?: string[];
  generatedAt: string;
}

export interface TranscriptSegment {
  id: string;
  speaker: string;
  text: string;
  timestamp: number;
  confidence: number;
}

export interface Analytics {
  engagement: number;
  speakingTimeDistribution: { [speaker: string]: number };
  topicsDiscussed: string[];
  keyMoments: KeyMoment[];
}

export interface KeyMoment {
  timestamp: number;
  type: 'question' | 'explanation' | 'breakthrough' | 'confusion';
  description: string;
}