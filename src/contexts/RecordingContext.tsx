import React, { createContext, useContext, useState, useRef } from 'react';
import { Recording, TranscriptSegment } from '../types';

interface RecordingContextType {
  recordings: Recording[];
  currentRecording: Recording | null;
  isTranscribing: boolean;
  startRecording: (title: string, subject?: string) => Promise<void>;
  stopRecording: () => Promise<void>;
  getRecording: (id: string) => Recording | undefined;
  deleteRecording: (id: string) => void;
  transcribeWithAssemblyAI: (audioBlob: Blob) => Promise<TranscriptSegment[]>;
}

const RecordingContext = createContext<RecordingContextType | undefined>(undefined);

export function useRecording() {
  const context = useContext(RecordingContext);
  if (context === undefined) {
    throw new Error('useRecording must be used within a RecordingProvider');
  }
  return context;
}

export function RecordingProvider({ children }: { children: React.ReactNode }) {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [currentRecording, setCurrentRecording] = useState<Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [lastAudioBlob, setLastAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [micLevel, setMicLevel] = useState(0);
  const [tabLevel, setTabLevel] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const micAnalyserRef = useRef<AnalyserNode | null>(null);
  const tabAnalyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const tabStreamRef = useRef<MediaStream | null>(null);

  const transcribeWithAssemblyAI = async (audioBlob: Blob): Promise<TranscriptSegment[]> => {
    const apiKey = '230e179728ff4cc68653b659ad898256';
    const baseUrl = 'https://api.assemblyai.com';
  
    try {
      // 1. Upload the audio file
      console.log('Uploading audio file...');
      const uploadResponse = await fetch(`${baseUrl}/v2/upload`, {
        method: 'POST',
        headers: { 
          'authorization': apiKey,
          'content-type': 'audio/webm'
        },
        body: audioBlob
      });
  
      if (!uploadResponse.ok) {
        const error = await uploadResponse.json();
        throw new Error(`Upload failed: ${JSON.stringify(error)}`);
      }
  
      const { upload_url } = await uploadResponse.json();
      if (!upload_url) {
        throw new Error('No upload URL returned from AssemblyAI');
      }
      console.log('Audio uploaded successfully:', upload_url);
  
      // 2. Start transcription
      console.log('Starting transcription...');
      const transcriptResponse = await fetch(`${baseUrl}/v2/transcript`, {
        method: 'POST',
        headers: {
          'authorization': apiKey,
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          audio_url: upload_url,
          speaker_labels: true,
          speech_model: "universal" // Added this from the API docs
        })
      });
  
      if (!transcriptResponse.ok) {
        const error = await transcriptResponse.json();
        throw new Error(`Transcription request failed: ${JSON.stringify(error)}`);
      }
  
      const transcriptData = await transcriptResponse.json();
      console.log('Transcript initiated:', transcriptData);
      
      const { id: transcriptId } = transcriptData;
      if (!transcriptId) {
        throw new Error('Failed to get transcript ID from response');
      }
  
      // 3. Poll for transcription completion
      console.log('Polling for transcription completion...');
      let pollingAttempts = 0;
      const maxAttempts = 60; // 3 minutes max (60 attempts * 3 seconds)
      
      while (pollingAttempts < maxAttempts) {
        const pollingResponse = await fetch(`${baseUrl}/v2/transcript/${transcriptId}`, {
          headers: { 'authorization': apiKey }
        });
        
        if (!pollingResponse.ok) {
          throw new Error(`Polling failed: ${pollingResponse.status}`);
        }
        
        const result = await pollingResponse.json();
        
        if (result.status === 'completed') {
          console.log('Transcription completed successfully');
          // Format the transcript segments
          const segments: TranscriptSegment[] = result.utterances.map(
            (utterance: any, index: number) => ({
              id: `seg-${index}-${utterance.start}`,
              speaker: utterance.speaker || 'SPEAKER_0',
              text: utterance.text,
              timestamp: utterance.start,
              confidence: utterance.confidence ?? 0.9,
              end: utterance.end
            })
          );
          return segments;
        }
        
        if (result.status === 'error') {
          throw new Error(`Transcription failed: ${result.error}`);
        }
        
        pollingAttempts++;
        await new Promise(resolve => setTimeout(resolve, 3000)); // Wait 3 seconds
      }
  
      throw new Error('Transcription timed out after 3 minutes');
  
    } catch (error) {
      console.error('Transcription error:', error);
      throw new Error(`Transcription failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const startRecording = async (title: string, subject?: string) => {
    try {
      // Stop any existing recording first
      if (isRecording) {
        await stopRecording();
      }

      // Create new audio context
      audioContextRef.current = new AudioContext();
      
      // Get microphone stream
      micStreamRef.current = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false
        }
      });

      // Get display media with system audio
      tabStreamRef.current = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false
        }
      });

      // Check if we actually got audio tracks
      if (tabStreamRef.current.getAudioTracks().length === 0) {
        console.warn('No audio tracks in tab capture');
        tabStreamRef.current.getTracks().forEach(t => t.stop());
        throw new Error('No system audio captured');
      }

      // Create destination stream
      const destinationStream = audioContextRef.current.createMediaStreamDestination();
      
      // Create sources and connect them
      const micSource = audioContextRef.current.createMediaStreamSource(micStreamRef.current);
      const tabSource = audioContextRef.current.createMediaStreamSource(tabStreamRef.current);
      
      // Create analysers for visualization
      micAnalyserRef.current = audioContextRef.current.createAnalyser();
      tabAnalyserRef.current = audioContextRef.current.createAnalyser();
      
      // Connect sources to analysers and destination
      micSource.connect(micAnalyserRef.current);
      tabSource.connect(tabAnalyserRef.current);
      micSource.connect(destinationStream);
      tabSource.connect(destinationStream);

      // Setup media recorder
      chunksRef.current = [];
      const recorder = new MediaRecorder(destinationStream.stream, {
        mimeType: 'audio/webm;codecs=opus',
        audioBitsPerSecond: 128000
      });

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onerror = (e) => {
        console.error('MediaRecorder error:', e);
        stopRecording();
      };

      mediaRecorderRef.current = recorder;
      recorder.start(100); // Collect data every 100ms

      // Setup visualization
      const updateLevels = () => {
        if (!micAnalyserRef.current || !tabAnalyserRef.current) return;
        
        const micData = new Uint8Array(micAnalyserRef.current.fftSize);
        micAnalyserRef.current.getByteTimeDomainData(micData);
        setMicLevel(Math.max(...micData) - 128);

        const tabData = new Uint8Array(tabAnalyserRef.current.fftSize);
        tabAnalyserRef.current.getByteTimeDomainData(tabData);
        setTabLevel(Math.max(...tabData) - 128);

        animationFrameRef.current = requestAnimationFrame(updateLevels);
      };
      updateLevels();

      // Create recording object
      const newRecording: Recording = {
        id: Date.now().toString(),
        title,
        duration: 0,
        date: new Date().toISOString(),
        status: 'recording',
        participants: ['Tutor', 'Student'],
        subject
      };

      setCurrentRecording(newRecording);
      setRecordings(prev => [newRecording, ...prev]);
      setIsRecording(true);
      setLastAudioBlob(null);

    } catch (error) {
      console.error('Recording start failed:', error);
      stopRecording();
      throw error;
    }
  };

  const stopRecording = async () => {
    if (!isRecording) return;

    console.log('Beginning stop recording process');

    try {
        // Stop visualization first
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
        }

        // Stop media recorder
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            const recorder = mediaRecorderRef.current;
            
            const recorderStopped = new Promise<void>((resolve) => {
                recorder.onstop = () => {
                    console.log('MediaRecorder fully stopped');
                    resolve();
                };
            });

            recorder.stop();
            await recorderStopped;
        }

        // Create final blob
        let audioBlob: Blob | null = null;
        if (chunksRef.current.length > 0) {
            audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
            setLastAudioBlob(audioBlob);
        }

        // Start transcription process if we have audio
        if (currentRecording && audioBlob) {
            setIsTranscribing(true);
            console.log('Starting transcription process');
            
            try {
                const transcriptSegments = await transcribeWithAssemblyAI(audioBlob);
                console.log('Transcription completed');
                
                const duration = 60 * 5; // Default duration
                
                const completedRecording: Recording = {
                    ...currentRecording,
                    status: 'completed',
                    duration,
                    transcript: {
                        id: `transcript-${currentRecording.id}`,
                        recordingId: currentRecording.id,
                        segments: transcriptSegments,
                        generatedAt: new Date().toISOString()
                    },
                    analytics: {
                        engagement: Math.floor(Math.random() * 20) + 80,
                        speakingTimeDistribution: {
                            'Tutor': Math.floor(Math.random() * 20) + 60,
                            'Student': Math.floor(Math.random() * 20) + 20
                        },
                        topicsDiscussed: [],
                        keyMoments: []
                    },
                    studentAudioBlob: audioBlob
                };

                setRecordings(prev => prev.map(r => 
                    r.id === currentRecording.id ? completedRecording : r
                ));
            } catch (error) {
                console.error('Transcription failed:', error);
                alert('Transcription failed. Please try again.');
            } finally {
                setIsTranscribing(false);
            }
        }
    } catch (error) {
        console.error('Error during stop process:', error);
        setIsTranscribing(false);
    } finally {
        console.log('Starting cleanup phase');
        
        // Stop all tracks from all streams
        const stopAllTracks = (stream: MediaStream | null) => {
            if (stream) {
                stream.getTracks().forEach(track => {
                    if (track.readyState === 'live') {
                        track.stop();
                    }
                });
            }
        };

        stopAllTracks(mediaRecorderRef.current?.stream || null);
        stopAllTracks(micStreamRef.current);
        stopAllTracks(tabStreamRef.current);

        // Close audio context if it exists
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
            await audioContextRef.current.close();
        }

        // Reset all refs
        micStreamRef.current = null;
        tabStreamRef.current = null;
        mediaRecorderRef.current = null;
        micAnalyserRef.current = null;
        tabAnalyserRef.current = null;
        audioContextRef.current = null;
        chunksRef.current = [];

        // Update state
        setIsRecording(false);
        setCurrentRecording(null);

        console.log('Cleanup complete, recording fully stopped');
    }
  };
    

  const getRecording = (id: string) => {
    return recordings.find(r => r.id === id);
  };

  const deleteRecording = (id: string) => {
    setRecordings(prev => prev.filter(r => r.id !== id));
  };

  const getLastAudioUrl = () => {
    return lastAudioBlob ? URL.createObjectURL(lastAudioBlob) : null;
  };

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (isRecording) {
        stopRecording();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <RecordingContext.Provider value={{
      recordings,
      currentRecording,
      isTranscribing,
      startRecording,
      stopRecording,
      getRecording,
      deleteRecording,
      transcribeWithAssemblyAI
    }}>
      <div>
        <div>
          <span>Student (Mic):</span>
          <div style={{ width: `${Math.max(0, micLevel * 2)}px`, height: '10px', background: 'green' }} />
        </div>
        <div>
          <span>Tutor (System/Tab):</span>
          <div style={{ width: `${Math.max(0, tabLevel * 2)}px`, height: '10px', background: 'blue' }} />
        </div>
        
        {/* Loading indicator for transcription */}
        {isTranscribing && (
          <div style={{ 
            margin: '1rem 0', 
            padding: '1rem', 
            background: '#f0f9ff', 
            border: '1px solid #0ea5e9', 
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div className="animate-spin" style={{
              width: '20px',
              height: '20px',
              border: '2px solid #0ea5e9',
              borderTop: '2px solid transparent',
              borderRadius: '50%'
            }}></div>
            <div>
              <div style={{ fontWeight: 'bold', color: '#0ea5e9' }}>
                Processing Recording...
              </div>
              <div style={{ fontSize: '14px', color: '#64748b' }}>
                Sending audio to AssemblyAI for transcription. This may take a few moments.
              </div>
            </div>
          </div>
        )}
        
        {lastAudioBlob && !isTranscribing && (
          <div style={{ margin: '1rem 0' }}>
            <a 
              href={getLastAudioUrl() || '#'} 
              download={`recording-${new Date().toISOString()}.webm`} 
              style={{ color: 'blue', textDecoration: 'underline' }}
            >
              Download Last Recording (webm)
            </a>
          </div>
        )}
      </div>
      {children}
    </RecordingContext.Provider>
  );
}