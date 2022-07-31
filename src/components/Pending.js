import LinearProgress from "@mui/material/LinearProgress";
import Pusher from "pusher-js";
import styled from "styled-components";
import Qrious from "qrious";
import { useEffect, useState, useRef } from "react";
const Message = styled.h2`
  text-align: center;
`;
const Info = styled.p`
  text-align: center;
  font-weight: 600;
`;
const Canvas = styled.canvas`
  padding-left: 0;
  padding-right: 0;
  margin-left: auto;
  margin-right: auto;
  display: block;
`;
const Btn = styled.div`
  padding: 10px 20px;
  border: 1px solid black;
  margin: 0 auto;
  text-align: center;
  width: 200px;
  font-size: 1.2rem;
`;
export function Pending({ req, setPending }) {
  const [accept, setAccept] = useState(false);
  const [reject, setReject] = useState(false);
  const [code, setCode] = useState(true);
  const [value, setValue] = useState();
  useEffect(() => {
    let pusher = new Pusher("30cd7e7cc787cf702e61", {
      cluster: "ap2",
      encrypted: true,
    });

    let channel = pusher.subscribe("hostel");
    channel.bind("updated", (data) => {
      // console.log(data);
      // console.log(req);
      if (data.id === req) {
        if (data.status === "accept") {
          setValue(data.id);
          setAccept(true);
        } else setReject(true);
      }
    });
  });

  const [info, setInfo] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setInfo(false);
    }, 4000);
  });

  function generate(e) {
    e.preventDefault();
    var qr = new Qrious({
      element: document.getElementById("qr"),
      value: value,
    });
    setCode(false);
  }
  if (accept) {
    return (
      <>
        <h1 style={{ textAlign: "center" }}>Request Accepted</h1>
        {code && <Btn onClick={generate}>Generate Qr Code</Btn>}

        <Canvas id="qr"></Canvas>
      </>
    );
  }
  if (reject) {
    return <h1 style={{ textAlign: "center" }}>Request Rejected</h1>;
  }
  return (
    <>
      <LinearProgress />
      <Message>
        Waiting for Wardern Response<span id="wait">.</span>
      </Message>
      {info && <Info>it will take few minutes</Info>}
    </>
  );
}
