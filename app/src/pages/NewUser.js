import axios from "axios";
import { apiurl, defaultlanguague } from "config/globalVariables";
import { SuccesNotification, WarningNotification } from "config/NotificationManager";
import React, { useEffect, useRef, useState } from "react";
import style from "./../styles/AddUserStyle.css";
import { useCookies } from "react-cookie";
import translation from "./../translations/NewUser.json";

function NewUser() {
  const FullNameRef = useRef();
  const EmailRef = useRef();
  const UsernameRef = useRef();
  const PasswordRef = useRef();
  const RoleRef = useRef();

  const [ranks, setRanks] = useState([]);

  const [cookies, setCookie] = useCookies();
  const [lang, setLang] = useState(cookies.lang || defaultlanguague);

  useEffect(() => {
    if (cookies.lang === "en" || cookies.lang === "hu" || cookies.lang === "rs") {
      setLang(cookies.lang || defaultlanguague);
    } else {
      setLang(defaultlanguague);
    }
  }, [cookies.lang]);

  useEffect(() => {
    axios.get(apiurl + "getranks").then((res) => {
      if (res.data.success) {
        setRanks(res.data.ranks);
      }
    });
  }, []);

  const handleCreateAccount = () => {
    axios
      .post(apiurl + "createAccount", {
        Username: UsernameRef.current.value,
        Password: PasswordRef.current.value,
        Email: EmailRef.current.value,
        FullName: FullNameRef.current.value,
        RankName: RoleRef.current.value,
        lang: lang,
      })
      .then((res) => {
        if (res.data.success) {
          SuccesNotification("", res.data.message);
        } else {
          WarningNotification("", res.data.message);
        }
      });
  };

  const generatePassword = () => {
    PasswordRef.current.value = Math.random().toString(36).slice(-8);
  };

  return (
    <div className="home_content">
      <div className="add_user_title">{translation.AddNewUser[lang]}</div>
      <div className="list_wrap">
        <div className="wrap">
          <input ref={FullNameRef} type="text" className="input_full_name" placeholder={translation.FirstNameAndSurname[lang]} />
          <input ref={EmailRef} type="text" className="input_email" placeholder={translation.EmailAddress[lang]} />
          <input ref={UsernameRef} type="text" className="input_user_name" placeholder={translation.Username[lang]} />
          <div className="new_line">
            <div className="input_password_box">
              <input disabled ref={PasswordRef} type="password" className="input_password" placeholder={translation.Password[lang]} />
              <i onClick={() => generatePassword()} className="bx bx-shuffle"></i>
            </div>
            <select ref={RoleRef} name="rank" className="rank_picker">
              {ranks.map((r) => {
                return (
                  <option key={r.id} value={r.Name}>
                    {r.Name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="new_line_btns">
            <i className="bx bx-envelope"></i>
            <div className="save_btn" onClick={() => handleCreateAccount()}>
              {translation.Save[lang]}
            </div>
            <i className="bx bx-printer"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewUser;
