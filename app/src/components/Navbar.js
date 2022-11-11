import { apiurl, defaultlanguague } from "config/globalVariables";
import React, { useRef, useState } from "react";
import logo from "../assets/Images/logo.png";
import { routes } from "config/Routes";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ErrorNotification, SuccesNotification } from "config/NotificationManager";
import { handleLogout } from "config/Router";
import HUNFlag from "./../assets/Images/HungarianFlag.png";
import ENGFlag from "./../assets/Images/EnglistFlag.jpg";
import RSFlag from "./../assets/Images/SerbianFlag.jpg";

import { useCookies } from "react-cookie";

export let changeavatar;

function Navbar({ userdatas }) {
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies();

  const [language, setLanguague] = useState(cookies.lang || defaultlanguague);

  const changeLang = (lang) => {
    if (lang === "hu" || lang === "en" || lang === "rs") {
      // setCookie("lang", lang);
      setCookie("lang", lang, { maxAge: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) });
      setLanguague(lang);
    }
  };

  const AvatarRef = useRef();
  changeavatar = (imgname) => {
    AvatarRef.current.src = apiurl + "UsersAvatar/" + imgname;
  };

  return (
    <>
      <i className="bx bx-menu" id="btn_hidden" onClick={() => setToggle(!toggle)}></i>
      <div className={toggle ? "sidebar active" : "sidebar"}>
        <div className="logo_content">
          <div className="logo">
            <img src={logo} id="logopicture" alt="" />
            <div className="logo_name">Ivan Saric</div>
          </div>
          <i className="bx bx-menu" id="btn" onClick={() => setToggle(!toggle)}></i>
        </div>
        <ul className="nav_list">
          {routes.map((r) => {
            return (
              <li style={{ cursor: "pointer" }} key={r.url} onClick={() => navigate(r.url)}>
                <a className={r.url === window.location.pathname ? "selected" : ""}>
                  <i className={"bx " + r.icon}></i>
                  <span className="links_name">{r.name[language]}</span>
                </a>
                <span className="tooltip">{r.name[language]}</span>
              </li>
            );
          })}
        </ul>
        <div className="language">
          <img onClick={() => changeLang("hu")} src={HUNFlag} alt="HungarianFlag" className="Flag" id="Magyar" />
          <img onClick={() => changeLang("en")} src={ENGFlag} alt="EnglishFlag" className="Flag" />
          <img onClick={() => changeLang("rs")} src={RSFlag} alt="SerbianFlag" className="Flag" id="Szerb" />
        </div>
        <div className="profile_content">
          <div className="profile">
            <div className="profile_details">
              {/* <img src="./img/profile.png" id="profile_pic" alt="NoImgFound" /> */}
              <img ref={AvatarRef} src={apiurl + "UsersAvatar/" + userdatas.AvatarURL} id="profile_pic" alt="NoImgFound" />
              <div className="name_job">
                <input type="file" id="image_input" />
                <div className="name">{userdatas.FullName}</div>
                <div className="job">{userdatas.RankName}</div>
              </div>
            </div>
            <i onClick={() => handleLogout(true)} className="bx bx-log-out" id="log_out"></i>
          </div>
        </div>
        {/* {translation.SettingsLabel[language]} */}
      </div>
    </>
  );
}

export default Navbar;
