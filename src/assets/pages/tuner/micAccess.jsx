import React, { useState, useRef } from 'react';
import { AMDF } from 'pitchfinder';

function MicAccess({ onData, onListeningChange }) {
  const [listening, setListening] = useState(false);
  const audioContextRef = useRef(null);
  const processorRef = useRef(null);
  const sourceRef = useRef(null);
  const streamRef = useRef(null);

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioContext;

      const source = audioContext.createMediaStreamSource(stream);
      sourceRef.current = source;

      const detectPitch = AMDF();
      const processor = audioContext.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;

      processor.onaudioprocess = (event) => {
        const input = event.inputBuffer.getChannelData(0);
        const pitch = detectPitch(input);
        if (pitch && onData) onData(pitch);
      };

      source.connect(processor);
      processor.connect(audioContext.destination);

      setListening(true);
      if (onListeningChange) onListeningChange(true);
    } catch (err) {
      console.error('גישה למיקרופון נכשלה:', err);
    }
  };

  const stopListening = () => {
    if (processorRef.current) processorRef.current.disconnect();
    if (sourceRef.current) sourceRef.current.disconnect();
    if (audioContextRef.current) audioContextRef.current.close();
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setListening(false);
    if (onListeningChange) onListeningChange(false);
  };

  return (
    <div>
      <button onClick={listening ? stopListening : startListening}>
        {listening ? 'עצור האזנה' : 'התחל האזנה'}
      </button>
    </div>
  );
}

export default MicAccess;
