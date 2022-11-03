import { apiurl } from "config/globalVariables";
import React, { useState } from "react";
import logo from "../assets/Images/logo.png";
import { routes } from "config/Routes";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ErrorNotification, SuccesNotification } from "config/NotificationManager";
import { handleLogout } from "config/Router";

function Navbar({ userdatas }) {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

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
                  <span className="links_name">{r.name}</span>
                </a>
                <span className="tooltip">{r.name}</span>
              </li>
            );
          })}
        </ul>
        <div className="profile_content">
          <div className="profile">
            <div className="profile_details">
              {/* <img src="./img/profile.png" id="profile_pic" alt="NoImgFound" /> */}
              <img src={apiurl + "UsersAvatar/" + userdatas.AvatarURL} id="profile_pic" alt="NoImgFound" />
              <div className="name_job">
                <input type="file" id="image_input" />
                <div className="name">Tóth Zsolt</div>
                <div className="job">Admin</div>
              </div>
            </div>
            <i onClick={() => handleLogout()} className="bx bx-log-out" id="log_out"></i>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
