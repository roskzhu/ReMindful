import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Label1, Label2 } from '../constants/Labels'
import { Button1 } from '../constants/Buttons'
import { Link, useNavigate } from 'react-router-dom'

const NavBar = () => {
  const navigate = useNavigate();
  const [ hoveredTab, setHoveredTab] = useState(0);
  return (
    <OuterContainer>
      <NavBarContainer>
        <NavBarSubContainer>
          <Link to={"/"} className='link'>
            <Label2 className='cursor: pointer;'>
              Home
            </Label2>
          </Link>
          <Link to={"/connect"} className='link'>
            <Label2 className='cursor: pointer;'>
              Connect
            </Label2>
          </Link>
        </NavBarSubContainer>

        <Label1 className="margin-left: 7rem; margin-right: 7rem; cursor: pointer;">
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
      </NavBarContainer>
    </OuterContainer>
  )
}

const NavBarContainer = styled.div`
  height: 6rem;
  width: 70vw;
  margin: 20px;
  background-color: rgba(128, 128, 128, 0.3);
  display: flex; 
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  border-radius: 15px;
  justify-self: center;
  backdrop-filter: blur(5px);
  z-index: 9999;
  .hide {
    display: none;
  }
  .link {
    text-decoration: none;
  }
`

const OuterContainer = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`


const NavBarSubContainer = styled.div`
  display: flex;
  width: 40%;
  align-items: center;
  justify-content: space-evenly;
  justify-self: start;


`;

export default NavBar
