import axios from "axios";
import { changeavatar } from "components/Navbar";
import TurnOffTwoFa from "components/TurnOffTwoFa";
import TurnOfTwoFa from "components/TurnOfTwoFa";
import { apiurl, defaultlanguague } from "config/globalVariables";
import { SuccesNotification, WarningNotification } from "config/NotificationManager";
import { handleLogout } from "config/Router";
import React, { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import style from "./../styles/SettingsStyle.css";
import translation from "./../translations/Settings.json";

function Settings({ userdatas }) {
  const [cookies, setCookie] = useCookies();
  const [lang, setLang] = useState(cookies.lang || defaultlanguague);
  const [checked, setChecked] = useState(false);
  const [showEnable2FA, setShowEnable2FA] = useState(false);
  const [showDisable2FA, setShowDisable2FA] = useState(false);

  useEffect(() => {
    if (cookies.lang === "en" || cookies.lang === "hu" || cookies.lang === "rs") {
      setLang(cookies.lang || defaultlanguague);
    } else {
      setLang(defaultlanguague);
    }
  }, [cookies.lang]);

  useEffect(() => {
    axios
      .post(apiurl + "getusertwoastatus", {
        userid: userdatas.id,
        lang: lang,
      })
      .then((res) => {
        if (res.data.success) {
          setChecked(res.data.twofastatus);
        }
      });
  }, []);

  const CurrentPassRef = useRef();
  const PasswordRef = useRef();
  const PasswordAgainRef = useRef();
  const AvatrRef = useRef();

  const handleChangePassword = () => {
    axios
      .post(apiurl + "changepassword", {
        id: userdatas.id,
        oldpassword: CurrentPassRef.current.value,
        newpassword: PasswordRef.current.value,
        newpasswordagain: PasswordAgainRef.current.value,
        lang: lang,
      })
      .then((res) => {
        if (res.data.success) {
          SuccesNotification("", res.data.message);
          handleLogout(false);
        } else {
          WarningNotification("", res.data.message);
        }
      });
  };

  const handleAvatarChange = async (e) => {
    if (e.target.files[0]) {
      const data = new FormData();
      data.append("file", e.target.files[0]);
      data.append("userid", userdatas.id);
      data.append("lang", lang);
      const cc_res = await axios({
        method: "POST",
        url: apiurl + "upploadimage",
        data,
      }).then((res) => {
        if (res.data.success) {
          SuccesNotification("", res.data.message);
          AvatrRef.current.src = apiurl + "UsersAvatar/" + res.data.imgname;
          changeavatar(res.data.imgname);
        } else {
          WarningNotification("", res.data.message);
        }
      });
    }
  };

  const handleChange = (status) => {
    if (status) {
      console.log("Most be");
      setShowEnable2FA(true);
    } else {
      console.log("Most ki");
      setShowDisable2FA(true);
    }
  };

  return (
    <div className="home_content">
      <div className="list_wrap">
        <div className="profile_side">
          <div className="img_holder">
            <img ref={AvatrRef} src={apiurl + "UsersAvatar/" + userdatas.AvatarURL} alt="MyProfilePic" className="profile_pic" />
            <label htmlFor="file-input">
              <div className="add">+</div>
            </label>
            <input type="file" id="file-input" accept=".png, .jpg, jpeg" onChange={handleAvatarChange} style={{ display: "none" }} />
          </div>
          <div className="full_name">{userdatas.FullName}</div>
          <div className="user_name">{userdatas.Username}</div>
        </div>
        <div className="other_side">
          <div className="fa">{translation.TwoFactorLogin[lang]}</div>
          {/* <div className="fa">Két lépcsős bejelntkezés</div> */}
          <div className="switch">
            <input
              type="checkbox"
              id="switch"
              checked={checked}
              onChange={() => {
                handleChange(!checked);
              }}
            />
            <label className="switchclass" htmlFor="switch">
              Toggle
            </label>
          </div>
          <div className="change_password">
            <div className="change_password_text">{translation.PasswordChange[lang]}</div>
            {/* <div className="change_password_text">Jelszó változtatás</div> */}
            <input ref={CurrentPassRef} type="text" className="settings_input_password" placeholder={translation.CurrentPassword[lang]} />
            {/* <input type="text" className="input_password" placeholder="Jelenlegi jelszó" /> */}
            <input ref={PasswordRef} type="text" className="settings_input_password" placeholder={translation.NewPassword[lang]} />
            {/* <input type="text" className="input_password" placeholder="Új jelszó" /> */}
            <input ref={PasswordAgainRef} type="text" className="settings_input_password" placeholder={translation.NewPasswordAgain[lang]} />
            {/* <input type="text" className="input_password" placeholder="Új jelszó megerősítése" /> */}
            <div className="btn_save" onClick={() => handleChangePassword()}>
              {translation.SavePassword[lang]}
            </div>
            {/* <div className="btn_save">Jelszó mentés</div> */}
          </div>
        </div>
      </div>
      {showEnable2FA ? <TurnOfTwoFa lang={lang} successfull={() => setChecked(true)} userdatas={userdatas} close={() => setShowEnable2FA(false)} /> : null}
      {showDisable2FA ? <TurnOffTwoFa lang={lang} successfull={() => setChecked(false)} userdatas={userdatas} close={() => setShowDisable2FA(false)} /> : null}
    </div>
  );
}

export default Settings;
