import styled from "@emotion/styled";

interface ClassProps {
  className?: string;
}

export const Button1 = styled.div<ClassProps>`
  background-image: linear-gradient(to bottom right, #44A2B1, #C15A93);
  overflow: hidden;
  position: relative;
  width: 120px;
  height: 22px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  display: flex;
  color: white;
  font-family: Helvetica Now Display;
  font-size: 17px;
  border-radius: 10px;
  font-weight: 500;
  padding: 10px;
  ${(props) => props.className}

  span {
    z-index: 20;
  }

  &:after {
    background: #fff;
    content: "";
    height: 155px;
    left: -75px;
    opacity: .2;
    position: absolute;
    top: -50px;
    transform: rotate(35deg);
    transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
    width: 50px;
  }

  :hover {
    
    &:after {
      left: 120%;
      transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
    }
  }
`

