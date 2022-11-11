import axios from "axios";
import { apiurl, defaultlanguague } from "config/globalVariables";
import { SuccesNotification, WarningNotification } from "config/NotificationManager";
import { authenticateUser } from "config/Router";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import style from "./../../styles/AuthenticateTwoFaStyle.css";
import translation from "./../../translations/TwoFactorLogin.json";

function AuthenticateTwoFa() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [code, setCode] = useState();
  const [cookies, setCookie] = useCookies();

  const VerifyCode = () => {
    if (code == undefined || code == "" || code == " " || code.length < 6) return;
    axios
      .post(apiurl + "verifytwofa", {
        token: token,
        code: code,
        lang: cookies.lang || defaultlanguague,
      })
      .then((res) => {
        if (res.data.success) {
          SuccesNotification("", res.data.message);
          setCookie("SessionToken", res.data.sessiontoken, { maxAge: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) });
          authenticateUser(res.data.sessiontoken, true);
        } else {
          WarningNotification("", res.data.message);
        }
      });
  };
  useEffect(() => {
    axios.get(apiurl + "validatetwofaverify/" + token).then((res) => {
      console.log(res.data);
      if (!res.data.success) {
        navigate("/");
      }
    });
  }, []);

  useEffect(() => {
    VerifyCode();
  }, [code]);

  return (
    <div className="AuthContainer">
      <div className="Authwrap">
        <div className="Authtitle">{translation.TwoFactorLogin[cookies.lang || defaultlanguague]}</div>
        <img src={apiurl + "UsersAvatar/GoogleAuthenticator.png"} alt="" className="Authimg_autent" />
        <div className="Authsubtitle">
          {translation.EnterThe[cookies.lang || defaultlanguague]} <b>{translation.GoogleAuthenticator[cookies.lang || defaultlanguague]}</b>{" "}
          {translation.RecivedCode[cookies.lang || defaultlanguague]}
        </div>
        <input onChange={(e) => setCode(e.target.value)} type="text" className="Authinput_code" placeholder={translation.EnterTheCode[cookies.lang || defaultlanguague]} />
        <div className="Authcontinue" onClick={() => VerifyCode()}>
          {translation.Login[cookies.lang || defaultlanguague]}
        </div>
      </div>
    </div>
  );
}

export default AuthenticateTwoFa;
