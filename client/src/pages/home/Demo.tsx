import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import Frame1 from '../../assets/Frame1.png'
import Frame2 from '../../assets/Frame2.png'
import Frame3 from '../../assets/Frame3.png'
import Frame4 from '../../assets/Frame4.png'
import Frame5 from '../../assets/Frame5.png'
import Frame6 from '../../assets/Frame6.png'
import Frame7 from '../../assets/Frame7.png'
import Frame8 from '../../assets/Frame8.png'
import Frame9 from '../../assets/Frame9.png'
import Frame10 from '../../assets/Frame10.png'
import Frame11 from '../../assets/Frame11.png'

const Demo = () => {
  const slides = [Frame1, Frame2, Frame3, Frame4, Frame5, Frame6, Frame7, Frame8, Frame9, Frame10, Frame11];
  const times = [2000, 2000, 2000, 1000, 2000, 2000, 2000, 1000, 2000, 2000, 1000];

  const [currIndex, setCurrIndex] = useState(0);
  const [isTransition, setIsTransition] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, times[currIndex]);
  
    return () => clearInterval(interval);
  }, []);


  return (
    <DemoContainer>
      <img src={slides[currIndex]}/>
    </DemoContainer>
  )
}

const DemoContainer = styled.div`
  width: 30%;
  background-color: white;
  margin-left: 40px;
  border-radius: 10px;
  height: 390px;
  z-index: 300;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }

  > p {
    color: white;
  }

`
export default Demo
