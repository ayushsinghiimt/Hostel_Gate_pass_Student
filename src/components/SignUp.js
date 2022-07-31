import styled from "styled-components";
import emailjs from "@emailjs/browser";

import { useState } from "react";

const axios = require("axios").default;
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

  margin: auto;
  font-size: 1rem;
  cursor: pointer;
`;
const Otp = styled.button`
  height: 30px;
  margin: auto;
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
const OtpCtn = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;
const Info = styled.p`
  color: blck;
`;
export function SignUp() {
  const [data, setData] = useState({
    admNo: "",
    oldPassword: "",
    newPassword: "",
  });
  // var options = {authorization : "NjOY1AW675Ko4VvXmwtCH82i90GZSpbdQfeJayILuTszRnqBPDNhQlXDPRovyS3OY1eM6q5IuaVkUfir" , message : '' ,  numbers : ['9999999999','8888888888']}
  // fast2sms.sendMessage(options)
  async function changePassword(e) {
    e.preventDefault();

    try {
      if (
        data.admNo === "" ||
        data.oldPassword === "" ||
        data.newPassword === ""
      )
        alert("enter required field");
      else {
        const response = await axios.post(
          "https://gatepassapi.herokuapp.com/api/v1/getStudent/changePassword",
          data
        );
        if (response.status === 200) {
          alert("password updated");
          setData({ admNo: "", oldPassword: "", newPassword: "" });
        } else {
          alert(response.response.data.msg);
        }
      }
    } catch (err) {
      alert(err.response.data.msg);
    }
  }

  return (
    <>
      <Container>
        <Box>
          <Form>
            <AdmNo
              type="text"
              placeholder="Enter Admission No"
              value={data.admNo}
              onChange={(e) => setData({ ...data, admNo: e.target.value })}
            />
            <AdmNo
              type="text"
              placeholder="Enter Old Password "
              value={data.oldPassword}
              onChange={(e) =>
                setData({ ...data, oldPassword: e.target.value })
              }
            />
            <AdmNo
              type="text"
              placeholder="Enter New Password "
              value={data.newPassword}
              onChange={(e) =>
                setData({ ...data, newPassword: e.target.value })
              }
            />
            <SubmitForm type="button" onClick={changePassword}>
              Change
            </SubmitForm>
          </Form>
        </Box>
      </Container>
    </>
  );
}
