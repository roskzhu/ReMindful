import React, { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { IoMdSend } from "react-icons/io";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import Background1 from '../../assets/IMG_1782.jpg'
import BlurComponent, { BlurComponentProps } from '../../components/BlurComponent';

interface ChatMessage {
  content: string;
  sender: number;
}

let fetched = false;

const MyMind: React.FC = () => {
  const [transcript, setTranscript] = useState<string>('');
  const [isTranscribing, setIsTranscribing] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [serverResponse, setServerResponse] = useState<any>(null);  // transcription
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const [coordinates , setCoordinates] = useState<any>();

    
   // Initialize score state
  const [score, setScore] = useState<number>(60);

  // Function to update score
  const updateScore = () => {
    setScore(prevScore => prevScore + 20);
  };

  // Placeholder for unblur function
  const unblurImage = () => {
    // Unblur logic goes here...

    // Update the score each time an image is unblurred
    updateScore();
  };
  
  const [currentImage, setCurrentImage] = useState<any>("");
  const [blurs, setBlurs] = useState<BlurComponentProps[]>([{
    x: 10,
    y: 30,
    height: 380,
    width: 330,
  }]);

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

  useEffect(() => {

      

    const fetchData = async () => {
      if (!fetched){
      try {
        console.log("begin fetch")
        const response = await fetch('http://localhost:5000/retrieve', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("response ok: ", data)
          // console
          setCurrentImage(data[0]?.img_path);  // string
          setCoordinates(data[0]?.objects_detected);  // dict of objects
        } else {

          console.error('Failed to retrieve data from the server.');
        }
        fetched = true;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    };
    fetchData();
  }, []);

  console.log("curr", currentImage);
  console.log("coor: ", coordinates);
  
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
      if (transcript.split(" ").includes("soda")){
        // If the condition is true, create a new state object without the "soda" key
        setCoordinates({
          ...coordinates,
          predictSoda: [{x: -1, y: -1, height: 0, width: 0}],
        })
      }
      else if (transcript.split(" ").includes("money")){
        setCoordinates({
          ...coordinates,
          predictMoney: [{x: -1, y: -1, height: 0, width: 0}],
        })
      }
      else if (transcript.split(" ").includes("phone")){
        setCoordinates({
          ...coordinates,
          predictPhone: [{x: -1, y: -1, height: 0, width: 0}],
        })
      }
    }
  }, [transcript]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // sendTranscript(message);
    if(message.trim() !== "") {
      const newChatMessage: ChatMessage = {
        content: message,
        sender: 2,
      };

      console.log("message: ", message);
      console.log("coordinates before: ", coordinates)

      setChatHistory([...chatHistory, newChatMessage]);
      setMessage("");
      if (message.split(" ").includes("soda")){
        // If the condition is true, create a new state object without the "soda" key
        setCoordinates({
          ...coordinates,
          predictSoda: [{x: -1, y: -1, height: 0, width: 0}],
        })
      }
      if (message.split(" ").includes("money")){
        setCoordinates({
          ...coordinates,
          predictMoney: [{x: -1, y: -1, height: 0, width: 0}],
        })
      }
      if (message.split(" ").includes("phone")){
        console.log("phone popped")
        // const {phone, ...newCoordinates} = coordinates;
        setCoordinates({
          ...coordinates,
          predictPhone: [{x: -1, y: -1, height: 0, width: 0}],
        })
      }

      console.log("coordinates after: ", coordinates)
    }
  }

  return (
    <MyMindContainer>
      <div>
        <CurrentImage>
          <img src={Background1}/>
            {/* {coordinates && coordinates.map((val : any, index : any) =>  // index is the type
              <BlurComponent 
                x = {coordinates.index[0].x}
                y = {coordinates.index[0].y}
                height = {coordinates.index[0].height}
                width = {coordinates.index[0].width}
                key={index}
              />
            )} */}
            {coordinates && Object.values(coordinates).map((val: any, index: any) => (
              <>
              <BlurComponent 
                x={val.length > 0 ? val[0].x : 0}
                // x={val?.[0]?.x}
                y={val.length > 0 ? val[0].y : 0}
                // y={val?.[0]?.y}
                // height={val?.[0]?.height}
                height={val.length > 0 ? val[0].height : 0}
                // width={val?.[0]?.width}
                width={val.length > 0 ? val[0].width : 0}
                key={index}
              />              
              {console.log("val", val, index)}
              </>
            ))}
        </CurrentImage>

        <RightContainer>
          <TranscriptionContainer>
            <Transcript>
              <div>

                {chatHistory.map((chatMessage, index) => (
                  <p key={index}>{chatMessage.content}</p>
                ))}
              </div>
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
          
          <Scoreboard>
                  score:  {score}/100
          </Scoreboard>
        </RightContainer>
      </div>
    </MyMindContainer>
  );
};

const MyMindContainer = styled.div`
  width: 100vw;
  height: calc(80vh);
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    margin-top: 240px;
    height: 80vh;
    width: 80vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const CurrentImage = styled.div`
  height: 640px;
  width: 640px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  > img {
    height: 640px;
    width: 640px;
    object-fit: cover;
    border-radius: 10px;

  }
  
`

const RightContainer = styled.div`
  width: calc(50%);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 640px;
  
`
// background: linear-gradient(to bottom right, #44A2B1, #B54382);
const TranscriptionContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.9);
  border-radius: 10px;
  height: calc(90%);
  width: calc(100%-20px);
  margin: 10px;
  margin-top: 0;
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

  justify-content: end;
  flex-direction: column;
  padding: 20px;

  > div {
    overflow-y: scroll;
    color: white;
    margin-bottom: 22px;
  }
  p {
    color: white;
    font-size: 18px;
  }
`

const Scoreboard = styled.div`
  background: linear-gradient(to bottom right, #44A2B1, #B54382);
  border-radius: 10px;
  height: calc(10%);
  width: calc(100%-20px);
  margin: 10px;
  margin-bottom:0px;
  display: flex;
  position: relative;
  padding: 10px;
  padding-top: 20px;
  margin-top: 0px;
  color: white;
  font-size: 31px;
  justify-content: center;
  text-align: center;
  font-family: Helvetica Now Display;
  font-weight: 500;
  -webkit-animation: glow 1s ease-in-out infinite alternate;
  -moz-animation: glow 1s ease-in-out infinite alternate;
  animation: glow 1s ease-in-out infinite alternate;
}

@-webkit-keyframes glow {
  from {
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073, 0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073;
  }
  to {
    text-shadow: 0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff4da6;
  }
}
`
export default MyMind;
