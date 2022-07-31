import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate, Navigate } from "react-router-dom";
const Container = styled.div`
  width: 100vw;

  display: flex;

  background: #a47e3b;
  justify-content: center;
  flex-wrap: wrap;
`;
const Box = styled.div`
  padding: 3rem;
  border: 1px solid white;
  margin: 2rem;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const AdmNo = styled.input`
  outline: none;
  padding: 1rem;
  font-size: 1rem;
`;
const SubmitForm = styled.button`
  padding: 0.4rem;
  width: 4rem;
  margin: auto;
  font-size: 1rem;
  cursor: pointer;
`;
const NewUser = styled.p`
  text-decoration: underline;
  color: blck;
  text-align: center;
  font-size: 1.2em;
  padding: 1rem;
  cursor: pointer;
  font-weight: 600;
  :hover {
    color: #61481c;
  }
`;
export function Home({ setUser }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ admNo: "", password: "" });
  async function login(e) {
    e.preventDefault();
    try {
      const student = await axios.post(
        "https://gatepassapi.herokuapp.com/api/v1/getStudent/login",
        {
          admNo: data.admNo,
          password: data.password,
        }
      );
      if (student.status === 200) {
        setUser(student.data);
        localStorage.setItem("stutoken", student.data.token);
        localStorage.setItem("user", JSON.stringify(student.data));
        setLoading(true);
      }
    } catch (err) {
      alert("Bad Credentials");
    }
  }

  return (
    <>
      {loading ? (
        <Navigate to="/dashboard" replace={true} />
      ) : (
        <Container>
          <Box>
            <Form>
              <AdmNo
                type="text"
                value={data.admNo}
                placeholder="Enter Admission No"
                onChange={(e) => setData({ ...data, admNo: e.target.value })}
              />
              <AdmNo
                type="text"
                value={data.password}
                placeholder="Enter Security Code"
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
              <SubmitForm type="button" onClick={login}>
                Login
              </SubmitForm>
            </Form>
            <Link to="/changePassword">
              <NewUser>Reset Password</NewUser>
            </Link>
          </Box>
        </Container>
      )}
    </>
  );
}
