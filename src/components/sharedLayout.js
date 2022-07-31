import styled from "styled-components";
import { Outlet } from "react-router-dom";
const Container = styled.div`
  width: 100vw;
  display: flex;
  background: #61481c;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const Logo = styled.img`
  height: 70px;
  width: 70px;
  margin-left: 20px;
  padding: 1rem;
  border-radius: 50%;
`;
const Heading = styled.h1`
  color: white;
`;
const Links = styled.p`
    display:${(props) => (props.user ? "none" : "none")}
 opacity:0;
  color: white;
  cursor: pointer;
  padding: 0.7rem;
  border: 2px solid white;
  font-size: 1.5rem;

  :hover {
    padding: 1rem;
  }
`;
export function SharedLayout(props) {
  return (
    <>
      <Container>
        <Logo src="./iimt_logo.png" />
        <Heading>IIMT BOYS HOSTEL</Heading>
      </Container>
      <Outlet />
    </>
  );
}
