  import React, { useState } from 'react';
  import axios from 'axios';

  const MyMind: React.FC = () => {
    const [transcript, setTranscript] = useState<string>('');
    const [isTranscribing, setIsTranscribing] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [serverResponse, setServerResponse] = useState<any>(null); // Change 'any' to the appropriate type

    // const sendTranscript = (transcript: string): void => {
    //   axios
    //     .post('http://localhost:5000/print_transcript', { transcript })
    //     .then((response) => console.log(response.data))
    //     .catch((error) => console.error('Error sending transcript:', error));
    // };

    const startTranscription = (): void => {
      setIsTranscribing(true);
  
      console.log("Starting transcription");
  
      // Initialize speech recognition
      let recognition: any;
      if ('SpeechRecognition' in window) {
        recognition = new (window as any).SpeechRecognition();
      } else if ('webkitSpeechRecognition' in window) {
        recognition = new (window as any).webkitSpeechRecognition();
      } else {
        console.error('Speech recognition not supported');
        return;
      }
  
      console.log("recognition: ", recognition);
  
      recognition.lang = "en-US";
      recognition.start();
  
      console.log("Ready to receive a command.");
  
      recognition.onresult = function (event: any): void {
        const speechToText: string = event.results[0][0].transcript;
        setTranscript(speechToText);
        console.log("Transcript:", speechToText);
  
        // Send the transcript to the server
        fetch("http://localhost:5000/print_transcript", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ transcript: speechToText }),
        })
          .then((response) => {
            if (response.ok) {
              return response.json(); // Assuming the server responds with JSON
            } else {
              console.error("Failed to send transcript to the server");
            }
          })
          .then((data) => {
            // Handle the data received from the server
            console.log("Server Response:", data);
  
            // Update the state with the server response
            setServerResponse(data);
          })
          .catch((error) => {
            console.error("Error sending transcript:", error);
          });
      };
    };

    const stopTranscription = (): void => {
      setIsTranscribing(false);
    };

    const sendMessage = (): void => {
      // sendTranscript(message);
      console.log("Message sent:", message);
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
