import React from 'react'
import styled from '@emotion/styled';
export interface BlurComponentProps {
  x: number;
  y: number;
  height: number;
  width: number;
}
const BlurComponent: React.FC<BlurComponentProps> = ({x, y, height, width}) => {
  // x = 

  return (
    <BlurComponentContainer
      x={(x-400)/3024*640}
      y={(y-600)/3024*640}
      height={height*1.3/3024*640}
      width={width*1.3/3024*640}
      // x={x}
      // y={y}
      // height={height}
      // width={width}
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
  border-radius: rounded;
`
export default BlurComponent
