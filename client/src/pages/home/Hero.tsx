import React from 'react'
import styled from '@emotion/styled'
import Background2 from "../../assets/background2.png";
import Background1 from "../../assets/background1.png";
import Demo from './Demo';
import { Button1 } from '../../constants/Buttons';
const Hero = () => {
  return (
    <HeroContainer>
      <TextContainer>
        <h1>
          Meet Remindful.
          </h1>
        <p>
          A powerful memory health tool and recall game powered by Computer Vision. 
        </p>
        <Button1 className='margin-top: 25px; align-self: center; width: 160px; height: 40px;'>
          Connect Photos
        </Button1>
      </TextContainer>
      <Demo />

      <TopBlob src={Background2} />
      <BottomBlob src={Background1}/>
    </HeroContainer>
  )
}

const HeroContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  margin-top: 20px;
  position: relative;
  overflow-x: clip;
`

const TextContainer = styled.div`
  width: 34rem;
  display: flex;
  flex-direction: column;
  font-family: Helvetica Now Display;
  margin-right: 40px;
  > h1 {
    font-size: 70px;
    font-weight: 500;
    background-image: linear-gradient(to right, #44A2B1, #C15A93, #B9B8BF);
    background-size: 100%;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent; 
    -moz-text-fill-color: transparent;
    margin-bottom: 0px;
    margin-top: 0px;
  }
  > p {
    color: white;
    font-weight: 500;
    font-size: 26px;
    margin-top: 10px;
  }
`

export const TopBlob = styled.img`
  position: absolute;
  width: 400px;
  right: -90px;
  top: 0px;
  z-index: 0;
`
export const BottomBlob = styled.img`
  position: absolute;
  width: 480px;
  left: -160px;
  z-index: 0;
  bottom: 0px;
`
export default Hero