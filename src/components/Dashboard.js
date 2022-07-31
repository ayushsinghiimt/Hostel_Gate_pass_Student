import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Pusher from "pusher-js";
import { Link } from "react-router-dom";
import { Pending } from "../components/Pending";
const Container = styled.div`
  width: 100vw;
  height: 100vh;

  margin: 0;
  padding: 0;
`;

const Navbar = styled.div`
  background: #61481c;
  display: flex;
  justify-content: space-evenly;
  padding: 1.5rem;
  flex-wrap: wrap;
`;
const Nav = styled.h3`
  margin: 10px;
  padding: 0;
  color: white;
  padding: 0.7rem;
  border: 1px solid white;
  cursor: pointer;
  :hover {
    background: white;
    color: #61481c;
  }
`;
const Form = styled.div`
  background: #a47e3b;
`;
const FormCtn = styled.div`
  width: 80vw;
  display: flex;
  margin: auto;
  flex-direction: column;
  align-items: center;
  justify-items: center;
`;
const FormRow = styled.form`
  display: flex;
  flex-wrap: wrap;

  margin: 20px auto;
  justify-content: center;
  border: 1px solid white;
`;
const Label = styled.label`
  color: white;
  margin: 20px;
  text-align: center;
`;
const Input = styled.input`
  outline: none;
  font-size: 1rem;

  padding: 0.5rem;
`;
const Span = styled.span`
  margin-right: 15px;
`;
const Select = styled.select`
  outline: none;
  font-size: 1rem;
  padding: 0.5rem;
`;
const Button = styled.button`
  padding: 10px 20px;
  font-size: 1.4rem;
  letter-spacing: 2px;
`;
export function Dashboard({ user }) {
  const [pass, setPass] = useState({
    reason: "Market",
    timeOut: "",
    timeIn: "",
  });
  const [req, setReq] = useState();
  const [isPending, setPending] = useState(false);
  async function handleSubmit() {
    const newPass = await axios.post(
      "https://gatepassapi.herokuapp.com/api/v1/gatePass/request",
      {
        reason: pass.reason,
        timeOut: pass.timeOut,
        timeIn: pass.timeIn,
        studentId: user.student._id,
        admNo: user.student.admNo,
      }
    );
    if (newPass.status === 200) {
      // console.log(newPass.data.newPass);
      setReq(newPass.data.newPass._id);
      setPending(true);
      // console.log(req);
    }
    // console.log(pass, user.student._id);
  }
  return (
    <>
      <Container>
        <Navbar>
          <Link to="/dashboard">
            <Nav onClick={() => setPending(false)}>Home</Nav>
          </Link>
          <Link to="/dashboard/allPass">
            <Nav>All Pass</Nav>
          </Link>
        </Navbar>
        {isPending ? (
          <Pending req={req} setPending={setPending} />
        ) : (
          <Form>
            <FormCtn>
              <FormRow>
                <Label htmlFor="reason">
                  <Span>Reason</Span>
                  <Select
                    name="reason"
                    id="reason"
                    value={pass.reason}
                    onChange={(e) =>
                      setPass({ ...pass, reason: e.target.value })
                    }
                  >
                    <option value="market">Market</option>

                    <option value="Local Guardian">Local Guardian</option>
                  </Select>
                </Label>
                <Label>
                  <Span>Time Out:</Span>
                  <Input
                    type="text"
                    value={pass.timeOut}
                    onChange={(e) =>
                      setPass({ ...pass, timeOut: e.target.value })
                    }
                  />
                </Label>
                <Label>
                  <Span>Time In</Span>
                  <Input
                    type="text"
                    value={pass.timeIn}
                    onChange={(e) =>
                      setPass({ ...pass, timeIn: e.target.value })
                    }
                  />
                </Label>
              </FormRow>
              <Button onClick={handleSubmit}>Submit</Button>
            </FormCtn>
          </Form>
        )}
      </Container>
    </>
  );
}
