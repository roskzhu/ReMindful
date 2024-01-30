import React, { useRef, useState, ChangeEvent } from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import Marracas from "../../assets/marracas.gif";
import { BottomBlob, TopBlob } from '../home/Hero';
import Background2 from "../../assets/background2.png";
import Background1 from "../../assets/background1.png";
const Connect = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const media: string[] = [Marracas, Marracas, Marracas, Marracas];

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.currentTarget.files;

    if (selectedFiles) {
      setFiles(selectedFiles);
    }
  };

  
  return (
    <ConnectContainer>
      <ConnectHeader>
        <h1>
          Connect your Media
        </h1>
        <UploadContainer>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg"
            style={{
              display: "none",
            }}
            onChange={handleChangeFile}
            multiple
          />
          <UploadButton 
            onClick={() => fileInputRef.current?.click()}>
              <p>
                Upload Photos!
              </p>
              
          </UploadButton>
        </UploadContainer>
        <FilesContainer>
          {files && (
              Array.from(files).map((file, index) =>
                <p key={index}>{file.name}</p>)
          )}
        </FilesContainer>
      </ConnectHeader>
      
      <MediaContainer>
        <MediaGallery>
          {media.map((photo, index) => 
          <div key={index}>
            <img src={photo}/>
          </div>)
          }
        </MediaGallery>
      </MediaContainer>

    </ConnectContainer>
  )
}
const ConnectContainer = styled.div`
  margin: 0;
  padding: 0
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;

`

const GradientAnimation = keyframes`
  0%{background-position:0% 50%}
  50%{background-position:100% 50%}
  100%{background-position:0% 50%}
`

const ConnectHeader = styled.div`
  background: linear-gradient(231deg, #ce89a9, #98769e, #7dbfcb);
  background-size: 600% 600%;
  height: 450px;
  width: 100vw;
  margin-top: 0px;
  padding: 0px;
  padding-top: 85px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  display: flex;
  -webkit-animation: ${GradientAnimation} 9s ease infinite;
  -moz-animation: ${GradientAnimation} 9s ease infinite;
  animation: ${GradientAnimation} 9s ease infinite;

  > h1 {
    color: white;
    font-family: Helvetica Now Display;
    font-weight: 600;
    font-size: 55px;
  }
`

const UploadButton = styled.button`
  background-color: rgba(0, 0, 0, 0);
  color: white;
  width: 200px;
  outline: 2px solid white;
  border: none;
  height: 60px;
  cursor: pointer;
  text-align: center;
  font-family: Helvetica Now Display;
  transition: all 500ms;
  font-weight: 600;
  border-radius: 10px;
  font-size: 15px;
  :hover {
    background-color: white;
    > p {
      background-image: linear-gradient(to right, #44A2B1, #C15A93, #B9B8BF);
      background-size: 100%;
      -webkit-background-clip: text;
      -moz-background-clip: text;
      -webkit-text-fill-color: transparent; 
      -moz-text-fill-color: transparent;
    }
  }
`

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const FilesContainer = styled.div`
  display: flex;
  color: rgba(255, 255, 255, 0.8);
  text-family: Helvetica Now Display;
  font-weight: 500;
  margin-top: 20px;
  flex-wrap: wrap;
  min-height: 50px;
`
const MediaGallery = styled.div`
  grid-template-columns: 1fr 1fr 1fr 1fr;
  display: grid;
  align-items: center;
  div {
    width: 275px;
    height: 250px;
    display: flex;
    transition: all 500ms;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > img {
      width: 100%;
      object-fit: cover;
      transition: transform 300ms;
      :hover {
        transform: translateY(-10px);
      }
    }
  }
  gap: 60px;
  z-index: 5;
`

const MediaContainer = styled.div`
  display: flex;
  width: 100vw;
  align-items: center;
  justify-content: center;
`
export default Connect
