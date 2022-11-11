import axios from "axios";
import { apiurl, defaultlanguague } from "config/globalVariables";
import { SuccesNotification, WarningNotification } from "config/NotificationManager";
import React, { useEffect, useRef, useState } from "react";
import translation from "./../translations/Settings.json";

import { useCookies } from "react-cookie";

function TurnOfTwoFa({ lang, successfull, close, userdatas }) {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [secret, setSecret] = useState("");
  const CodeRef = useRef();
  const [cookies, setCookie] = useCookies();

  useEffect(() => {
    const awaitfunc = async () => {
      const res = await axios.get(apiurl + "generateqrcode");
      setQrCodeUrl(res.data.qrcodedeurl);
      setSecret(res.data.seecret);
    };
    awaitfunc();
  }, []);

  const handleTurnOnTwoFa = () => {
    axios
      .post(apiurl + "handleaddtwofa", {
        userid: userdatas.id,
        seecret: secret,
        code: CodeRef.current.value,
        lang: cookies.lang || defaultlanguague,
      })
      .then((res) => {
        if (res.data.success) {
          close();
          successfull();
          SuccesNotification("", res.data.message);
        } else {
          WarningNotification("", res.data.message);
        }
      });
  };

  return (
    <div className="ontop">
      <div className="popout">
        <div className="sure">{translation.EnableTwoFactorAuthentication[lang]}</div>
        <div className="delete_name">{translation.EnterTheCode[lang]}</div>
        <div className="images">
          <img src={qrCodeUrl} alt="qr_code" className="qr_code" />
        </div>
        <input ref={CodeRef} type="text" className="set_code" placeholder={translation.EnterTheCode[lang]} />
        <div className="buttons">
          <div className="set" onClick={() => handleTurnOnTwoFa()}>
            {translation.Set[lang]}
          </div>
          <div className="not_set" onClick={() => close(false)}>
            {translation.Cancel[lang]}
          </div>
        </div>
        <div className="x">
          <i onClick={() => close(false)} className="bx bx-x"></i>
        </div>
      </div>
    </div>
  );
}

export default TurnOfTwoFa;
