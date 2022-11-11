import { warning } from "@remix-run/router";
import axios from "axios";
import { apiurl, defaultlanguague } from "config/globalVariables";
import { SuccesNotification, WarningNotification } from "config/NotificationManager";
import React, { useEffect, useRef } from "react";
import translation from "./../translations/Settings.json";

import { useCookies } from "react-cookie";

function TurnOffTwoFa({ lang, successfull, userdatas, close }) {
  const KeyRef = useRef();

  const [cookies, setCookie] = useCookies();

  const handleTurnOffTwoFa = () => {
    axios
      .post(apiurl + "handledeletetwofa", {
        userid: userdatas.id,
        key: KeyRef.current.value,
        lang: cookies.lang || defaultlanguague,
      })
      .then((res) => {
        if (res.data.success) {
          successfull();
          close();
          SuccesNotification("", res.data.message);
        } else {
          WarningNotification("", res.data.message);
        }
      });
  };

  return (
    <div className="ontop">
      <div className="popout">
        <div className="sure">{translation.DisableTwoFactorAuthentication[lang]}</div>
        <div className="delete_name">{translation.EnterTheCurrentCode[lang]}</div>
        <div className="images">
          <img src={apiurl + "UsersAvatar/GoogleAuthenticator.png"} alt="GoogleAuthenticator" className="qr_code" />
        </div>
        <input ref={KeyRef} type="text" className="set_code" placeholder={translation.EnterTheCode[lang]} />
        <div className="buttons">
          <div className="set" onClick={() => handleTurnOffTwoFa()}>
            {translation.Disable[lang]}
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

export default TurnOffTwoFa;
