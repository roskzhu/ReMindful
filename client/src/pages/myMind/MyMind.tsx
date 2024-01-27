import React, { useState } from 'react';
import axios from 'axios';

const MyMind: React.FC = () => {
  const [transcript, setTranscript] = useState<string>('');
  const [isTranscribing, setIsTranscribing] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const sendTranscript = (transcript: string): void => {
    axios
      .post('http://localhost:5000/print_transcript', { transcript })
      .then((response) => console.log(response.data))
      .catch((error) => console.error('Error sending transcript:', error));
  };

  // Assuming you have a transcription method like startTranscription
  const startTranscription = (): void => {
    setIsTranscribing(true);
    // ... Transcription logic ...
    // After transcription
    sendTranscript(transcript);
  };

  const stopTranscription = (): void => {
    setIsTranscribing(false);
  };

  const sendMessage = (): void => {
    sendTranscript(message);
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here"
      />
      <button onClick={sendMessage}>Send Message</button>

      <button onClick={startTranscription} disabled={isTranscribing}>
        Start Transcription
      </button>
      <button onClick={stopTranscription} disabled={!isTranscribing}>
        Stop Transcription
      </button>

      {transcript && <p>Transcription: {transcript}</p>}
    </div>
  );
};

export default MyMind;
