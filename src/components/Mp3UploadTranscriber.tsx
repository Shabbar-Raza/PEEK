import React, { useState } from 'react';
import { TranscriptSegment } from '../types';
import { useRecording } from '../contexts/RecordingContext';

export default function Mp3UploadTranscriber() {
  const [segments, setSegments] = useState<TranscriptSegment[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { transcribeWithAssemblyAI } = useRecording();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setSegments(null);
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const segments = await transcribeWithAssemblyAI(file);
      setSegments(segments);
    } catch {
      setError('Transcription failed.');
    }
    setLoading(false);
  };

  return (
    <div style={{ margin: '2rem 0' }}>
      <h2>Upload MP3 and Transcribe</h2>
      <input type="file" accept=".mp3,audio/mp3,audio/mpeg" onChange={handleFileChange} />
      {loading && <p>Transcribing...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {segments && (
        <div>
          <h3>Transcript</h3>
          {segments.length === 0 && <p>No speech detected.</p>}
          {segments.map(seg => (
            <div key={seg.id} style={{ marginBottom: 8 }}>
              <b>{seg.speaker}:</b> {seg.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 