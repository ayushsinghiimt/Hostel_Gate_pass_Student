import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
const Loading = styled.h1`
  text-align: center;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #a47e3b;
  gap: 20px;
`;
const Pass = styled.div`
  display: flex;
  color: white;
  width: 70vw;
  margin: auto;
  flex-direction: row;
  justify-content: space-around;
  padding: 1rem;
  background: ${(props) => (props.status === "accept" ? "green" : "red")};
`;
export function AllPass({ user }) {
  const [loading, setLoading] = useState(true);
  const [pass, setPass] = useState([]);
  async function getPass() {
    const data = await axios.post(
      "https://gatepassapi.herokuapp.com/api/v1/getAllPass",
      {
        id: user.student._id,
      }
    );
    setPass(data.data.allPass);
    setLoading(false);
  }
  useEffect(() => {
    getPass();
  }, []);
  return (
    <>
      {loading && <Loading>Loading...</Loading>}

      <Container>
        {pass.length > 0 &&
          pass.map((single) => {
            const date = single.date.split("-");
            const year = date[0][0] + date[0][1] + date[0][2] + date[0][3];
            const month = date[1][0] + date[1][1];
            const day = date[2][0] + date[2][1];
            return (
              <Pass status={single.status}>
                <h3>{day + " - " + month + " - " + year}</h3>
                <h3>{single.reason}</h3>
              </Pass>
            );
          })}
      </Container>
    </>
  );
}
