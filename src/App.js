import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [sentence, setSentence] = useState('');
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [scored, setScored] = useState(false);

  const mediaRecorder = useRef(null);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        setRecording(true);
        mediaRecorder.current = new MediaRecorder(stream);
        let chunks = [];
        mediaRecorder.current.ondataavailable = (e) => {
          chunks.push(e.data);
        };
        mediaRecorder.current.onstop = () => {
          const blob = new Blob(chunks, { type: 'audio/webm' });
          setAudioBlob(blob);
        };
        mediaRecorder.current.start();
      })
      .catch(err => {
        console.error('Error accessing microphone:', err);
      });
  };

  const stopRecording = () => {
    mediaRecorder.current.stop();
    setRecording(false);
  };

  const scoreAudio = () => {
    // Code to score the audio goes here
    setScored(true);
  };

  const resetApp = () => {
    setSentence('');
    setRecording(false);
    setAudioBlob(null);
    setScored(false);
  };

  const handleGetStarted = () => {
    setSentence("Please read this sentence out loud.");
  };

  return (
    <div className="App">
      <header className="App-header">
        {!scored ? (
          <>
            <p>{sentence}</p>
            {!recording ? (
              <button onClick={startRecording}>Start Recording</button>
            ) : (
              <button onClick={stopRecording}>Stop Recording</button>
            )}
            {audioBlob && (
              <button onClick={scoreAudio}>Score</button>
            )}
          </>
        ) : (
          <>
            <p>Thank you for your submission!</p>
            <button onClick={resetApp}>Start Again</button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
