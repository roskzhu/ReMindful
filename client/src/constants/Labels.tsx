import styled from "@emotion/styled";

interface ClassProps {
  className?: string;
}
export const Label1 = styled.h1<ClassProps>`
  margin: 0;
  padding: 0;
  color: white;
  font-family: Helvetica Now Display;
  font-size: 1.7rem;
  font-weight: 600;
  text-align: center;
  justify-self: center;
  ${(props) => props.className}
`

export const Label2 = styled.h1<ClassProps>`
  margin: 0;
  padding: 0;
  color: rgba(230, 230, 230, 100);
  font-family: Helvetica Now Display;
  font-size: 17px;
  transition: color 300ms;
  font-weight: 500;
  :hover {
    color: white;
  }
  ${(props) => props.className}
`