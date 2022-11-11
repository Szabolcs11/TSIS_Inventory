import axios from "axios";
import { apiurl, defaultlanguague } from "config/globalVariables";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function VerifyTwoFa() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [code, setCode] = useState();
  const [cookies, setCookie] = useCookies();

  const VerifyCode = () => {
    if (code == undefined || code == "" || code == " ") return;
    axios
      .post(apiurl + "verifytwofa", {
        token: token,
        code: code,
        lang: cookies.lang || defaultlanguague,
      })
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.message);
        } else {
          console.log(res.data.message);
        }
      });
  };
  useEffect(() => {
    axios.get(apiurl + "validatetwofaverify/" + token).then((res) => {
      if (!res.data.success) {
        navigate("/");
      }
    });
  }, []);

  useEffect(() => {
    VerifyCode();
  }, [code]);

  return (
    <div>
      <div>VerifyTwoFa</div>
      <input type="text" onChange={(e) => setCode(e.target.value)} />
      <div onClick={() => VerifyCode()}>Login</div>
    </div>
  );
}

export default VerifyTwoFa;
