import React from 'react'
import styled from '@emotion/styled';
export interface BlurComponentProps {
  x: number;
  y: number;
  height: number;
  width: number;
}
const BlurComponent: React.FC<BlurComponentProps> = ({x, y, height, width}) => {
  return (
    <BlurComponentContainer
      x={x}
      y={y}
      height={height}
      width={width}
    />
  )
}

const BlurComponentContainer = styled.div<BlurComponentProps>`
  backdrop-filter: blur(100px);
  height: ${(props) => props.height + "px"};
  width: ${(props) => props.width + "px"};
  position: absolute;
  z-index: 510;
  left: ${(props) => props.x + "px"};
  top: ${(props) => props.y + "px"};
  
`
export default BlurComponent
