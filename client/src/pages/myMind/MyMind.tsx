import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import "./MyMind.css";

function MyMind() {

  // Audio Transcription
  const [transcript, setTranscript] = useState("");
  const [isTranscribing, setIsTranscribing] = useState(false);

  // Define a state variable to store the server response
  const [serverResponse, setServerResponse] = useState(null);

  const startTranscription = () => {
    setIsTranscribing(true);

    console.log("Starting transcription");

    // Initialize speech recognition
    let recognition;
    if ("SpeechRecognition" in window) {
      recognition = new window.SpeechRecognition();
    } else if ("webkitSpeechRecognition" in window) {
      recognition = new window.webkitSpeechRecognition();
    } else {
      console.error("Speech recognition not supported");
      return;
    }

    console.log("recognition: ", recognition);

    recognition.lang = "en-US";
    recognition.start();

    console.log("Ready to receive a command.");

    recognition.onresult = function (event) {
      const speechToText = event.results[0][0].transcript;
      setTranscript(speechToText);
      console.log("Transcript:", speechToText);

      // Send the transcript to the server
      fetch("http://localhost:5000/generate_phrases", {
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

  const stopTranscription = () => {
    setIsTranscribing(false);
  };

  const json_string_data = JSON.stringify(serverResponse, null, 2);
  // console.log('ser[0]: ', serverResponse.phrases);

  // State to manage the input message
  const [message, setMessage] = useState("");

  // Event handler for sending a message
  const sendMessage = () => {
    console.log("Message sent:", message);

    // Call the generate_phrases endpoint with the message
    axios
      .post("http://localhost:5000/generate_phrases", {
        transcript: message,
      })
      .then((response) => {
        console.log("Message processed successfully", response.data);
        // Update the server response with the returned data
        setServerResponse(response.data);
      })
      .catch((error) => {
        console.error("Error processing message:", error);
      });
    // Add your logic here to handle the message (e.g., send it to the server)
  };

  return (
    <div className="background-gradient p-20 pt-[110px]">
      <div className="Main grid grid-cols-5 gap-4">
        <div className="justify-end w-full right-0 relative ml-[950px] flex">
          <div>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here"
              className="h-[120px] p-8 rounded-3xl"
            />
            <button
              onClick={sendMessage}
              className="explore-button rounded-full mt-4"
            >
              Send Message
            </button>
          </div>

          <div className="flex">
            <div className="transcription-container">
              <div className="flex gap-4">
                <button
                  onClick={startTranscription}
                  disabled={isTranscribing}
                  className="explore-button rounded-full"
                >
                  Start Transcription
                </button>
                <button
                  onClick={stopTranscription}
                  disabled={!isTranscribing}
                  className="explore-button rounded-full"
                >
                  Stop Transcription
                </button>
              </div>
              {transcript && (
                <div className="text-black">
                  <h3 className="text-black">Transcription:</h3>
                  <p>{transcript}</p>
                </div>
              )}
            </div>

            <div className="suggestion-container text-black">
              <h3 className="text-black max-w-[200px]">Suggested phrases:</h3>
              {serverResponse && (
                <div className="text-black">
                  {/* <pre>{JSON.stringify(serverResponse, null, 2)}</pre> */}
                  {/* <pre>{serverResponse && serverResponse[0]}</pre> */}

                  {serverResponse.phrases.map((str, index) => (
                    <div key={index}>{str}</div>
                  ))}
                </div>
              )}
              {/* <h3>
              {test}
            </h3> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyMind;
