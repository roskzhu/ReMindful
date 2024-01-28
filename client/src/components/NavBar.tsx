import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Label1, Label2 } from '../constants/Labels'
import { Button1 } from '../constants/Buttons'
import { Link, useNavigate } from 'react-router-dom'
import { css, keyframes } from '@emotion/react'
const NavBar = () => {
  const navigate = useNavigate();
  const [ hoveredTab, setHoveredTab] = useState(0);
  return (
    <OuterCountainer>
      <NavBarContainer onMouseLeave={() => setHoveredTab(0)}>
        <SliderBlock location={hoveredTab}/>
        <NavBarSubContainer>
          <Link 
            to={"/"} 
            className='link' 
            onMouseOver={() => setHoveredTab(1)}
          >
            <Label2 className='cursor: pointer;'>
              Home
            </Label2>
          </Link>
          <Link 
            to={"/connect"} 
            className='link' 
            onMouseOver={() => setHoveredTab(2)}
          >
            <Label2 className='cursor: pointer;'>
              Connect
            </Label2>
          </Link>
        </NavBarSubContainer>

        <Label1 
          className="margin-left: 7rem; margin-right: 7rem; color: rgba(255, 255, 255, 0.95); cursor: pointer;" 
          onClick={() => navigate("/")}
        >
            remindful.
        </Label1>

        <NavBarSubContainer>
          <Button1 className='justify-self: end; cursor: pointer;'
          onClick={() =>
            navigate("/myMind")
          }>
            My Mind
          </Button1>
        </NavBarSubContainer>
        <div></div>
      </NavBarContainer>
    </OuterCountainer>
  )
}

const OuterCountainer = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  z-index: 9999;

`
const NavBarContainer = styled.div`
  height: 5rem;
  width: 70vw;
  min-width: 1200px;
  margin: 20px;
  margin-top: 30px;
  background-color: rgba(88, 88, 88, 0.2);
  display: flex; 
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  justify-self: center;
  backdrop-filter: blur(10px);
  .hide {
    display: none;
  }
  .link {
    text-decoration: none;
  }
`


const NavBarSubContainer = styled.div`
  display: flex;
  width: 40%;
  align-items: center;
  justify-content: space-evenly;
  justify-self: start;
  z-index: 2;
`;

interface LocationProps {
  location: number,
}

const Sliding1 = keyframes`
  0% {
    transform: translateX(0) scale(0.65);
  }
  100% {
    transform: translateX(-29.5rem) scale(1);
  }
`
const Sliding2 = keyframes`
  0% {
    transform: translateX(0) scale(0.65);
  }
  100% {
    transform: translateX(-19.5rem) scale(1);
  }
`;
const Sliding3 = keyframes`
  0% {
    transform: translateX(0) scale(0.65);
  }
  100% {
    transform: translateX(-24.5rem) scale(1);
  }
`
const Sliding4 = keyframes`
  0% {
    transform: translateX(0) scale(0.65);
  }
  100% {
    transform: translateX(-17rem) scale(1);
  }
`;
const SliderBlock = styled.div<LocationProps>`
  background: linear-gradient(to bottom, rgba(100, 100, 100, 0.3), rgba(150, 150, 150, 0.3));
  width: 80px;
  height: 3rem;
  position: absolute;
  z-index: 1;
  border-radius: 12px;
  @media (min-width: 80em) {
    ${(props) => {
      if (props.location === 1) {
        return css`animation: ${Sliding3} 300ms ease-in forwards;`;
      } else if (props.location === 2) {
        return css`animation: ${Sliding4} 300ms ease-in forwards; width: 100px;`;
      } else {
        return css`transform: translateX(0); display: none;`;
      }
    }}
  }
  @media (min-width: 93em) {
    ${(props) => {
      if (props.location === 1) {
        return css`animation: ${Sliding1} 300ms ease-in forwards;`;
      } else if (props.location === 2) {
        return css`animation: ${Sliding2} 300ms ease-in forwards; width: 120px;`;
      } else {
        return css`transform: translateX(0); display: none;`;
      }
    }}
  }
  @media (max-width: 82em) {
    display: none;
  }

`

export default NavBar