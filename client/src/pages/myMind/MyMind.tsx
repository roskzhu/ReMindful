import React, { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { IoMdSend } from "react-icons/io";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";

interface ChatMessage {
  content: string;
  sender: number;
}

const MyMind: React.FC = () => {
  const [transcript, setTranscript] = useState<string>('');
  const [isTranscribing, setIsTranscribing] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [serverResponse, setServerResponse] = useState<any>(null); 
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  useEffect(() => {
      if(isTranscribing) {
        console.log("Starting transcription");
  
        // Initialize speech recognition
        let recognition;
        if ('SpeechRecognition' in window) {
          recognition = new (window as any).SpeechRecognition();
        } else if ('webkitSpeechRecognition' in window) {
          recognition = new (window as any).webkitSpeechRecognition();
        } else {
          console.error('Speech recognition not supported');
          return;
        }
        
        recognition.lang = "en-US";
        recognition.start();

        console.log("Ready to receive a command.");

        recognition.onresult = function (event: any): void {
          const speechToText: string = event.results[0][0].transcript;
          setTranscript(speechToText);
          console.log("Transcript:", speechToText);
          // Send the transcript to the server
          fetch("http://127.0.0.1:5000/print_transcript", {
            method: "POST",
            mode: "cors",
            body: JSON.stringify({ transcript: speechToText }),
          })
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                console.error("Failed to send transcript to server.");
              }
            })
            .then((data) => {
              console.log("Server Response: ", data);
              setServerResponse(data);
            })
            .catch((error) => {
              console.error(error.message);
            });
            setIsTranscribing(false);
        };     
    };
  }, [isTranscribing]);


  const stopTranscription = (): void => {
    setIsTranscribing(false);
  };

  useEffect(() => {
    if(transcript) {
      const newChatMessage: ChatMessage = {
        content: transcript,
        sender: 2,
      };
      setChatHistory([...chatHistory, newChatMessage])
    }
  }, [transcript]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // sendTranscript(message);
    if(message.trim() != "") {
      const newChatMessage: ChatMessage = {
        content: message,
        sender: 2,
      };

      setChatHistory([...chatHistory, newChatMessage]);
      setMessage("");
    }
  }

  return (
    <MyMindContainer>
      <div>
        <CurrentImage>
          
        </CurrentImage>

        <RightContainer>
          <TranscriptionContainer>
            <Transcript>
              {chatHistory.map((chatMessage, index) => (
                <p key={index}>{chatMessage.content}</p>
              ))}
            </Transcript>
            <Toolkit onSubmit={handleSubmit}>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here"
              />
              <button onClick={handleSubmit} className='send'><IoMdSend/></button>

              <button onClick={() => setIsTranscribing(true)} disabled={isTranscribing} className='start'>
                <FaMicrophone className='icon'/> Transcribe
              </button>
              <button onClick={stopTranscription} disabled={!isTranscribing} className='stop'>
                <FaMicrophoneSlash className='icon'/> Stop
              </button>
            </Toolkit>
           
          </TranscriptionContainer>
        </RightContainer>
      </div>
    </MyMindContainer>
  );
};

const MyMindContainer = styled.div`
  width: 100vw;
  height: calc(100vh);
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    margin-top: 120px;
    background-color: red;
    height: 80vh;
    width: 80vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const CurrentImage = styled.div`
  background-color: white;
  width: 50%;
  height: 100%;
  
`

const RightContainer = styled.div`
  width: 50%;
  height: 100%;
  background-color: purple;
`
// background: linear-gradient(to bottom right, #44A2B1, #B54382);
const TranscriptionContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.9);
  border-radius: 10px;
  height: calc(50%);
  width: calc(100%-20px);
  margin: 10px;
  display: flex;
  position: relative;
  input {
    display: flex;
    width: 320px;
    height: 28px;
    padding: 5px;
    padding-left: 15px;
    color: black;
    outline: 2px solid white;
    border: none;
    font-family: Helvetica Now Display;
    border-radius: 25px;
  }

  .send {
    width: 37px;
    height: 37px;
    border-radius: 18.5px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: white;
    margin-right: 10px;
    margin-left: 5px;
  }

  .start {
    border: none;
    border-radius: 16px;
    padding-left: 12px;
    padding-right: 12px;
    height: 32px;
    background-color: white;
    margin-left: 10px;
    margin-right: 5px;
    font-family: Helvetica Now Display;
    font-weight: 500;
    display: flex;
    align-items: center;
    .icon {
      margin-right: 5px;
    }

  }
  .stop {
    border: none;
    border-radius: 16px;
    padding-left: 18px;
    padding-right: 18px;
    height: 32px;
    background-color: white;
    display: flex;
    align-items: center;
    font-family: Helvetica Now Display;
    font-weight: 500;
    .icon {
      margin-right: 5px;
    }
  }
`

const Toolkit = styled.form`
  position: absolute;
  bottom: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-bottom: 15px;
`

const Transcript = styled.div`
  display: flex;
  height: 80%;
  width: 100%;
  overflow-y: scroll;
  align-content: end;
  flex-direction: column;
  > p {
    color: white;
    font-size: 12px;
  }
`

export default MyMind;
