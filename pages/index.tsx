import type { NextPage } from "next";
import styled from "styled-components";

const Container = styled.div`
  font-size: 21px;
  color: gray;
`;

const Home: NextPage = () => {
  return <Container>Hello World</Container>;
};

export default Home;
