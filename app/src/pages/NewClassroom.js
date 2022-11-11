import axios from "axios";
import { apiurl, defaultlanguague } from "config/globalVariables";
import { SuccesNotification, WarningNotification } from "config/NotificationManager";
import React, { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import translation from "./../translations/NewClassroom.json";

const TypeOfClassrooms = ["Tanterem", "Számítógépes terem", "Labor", "Mosdó", "Konyha", "Diákterem", "Raktár", "Egyéb"];

function NewClassroom() {
  const Name = useRef();
  const Type = useRef();
  const Description = useRef();
  const [cookies, setCookie] = useCookies();
  const [lang, setLang] = useState(cookies.lang || defaultlanguague);

  useEffect(() => {
    if (cookies.lang === "en" || cookies.lang === "hu" || cookies.lang === "rs") {
      setLang(cookies.lang || defaultlanguague);
    } else {
      setLang(defaultlanguague);
    }
  }, [cookies.lang]);

  const handleAddNewClassroom = () => {
    // if (Name.current.value) {
    axios
      .post(apiurl + "addnewclassroom", {
        Name: Name.current.value,
        // Type: Type.current.value,
        Description: Description.current.value,
        lang: lang,
      })
      .then((res) => {
        if (res.data.success) {
          SuccesNotification("", res.data.message);
        } else {
          WarningNotification("", res.data.message);
        }
      });
    // }
  };

  return (
    <div className="home_content">
      <div className="add_room_title">{translation.NewClassroomTitle[lang]}</div>
      {/* <div className="add_room_title">Új terem hozzáadása</div> */}
      <div className="addroomwrap">
        <div className="wrap">
          <input type="text" className="input_room_id" placeholder={translation.ClassroomIdentity[lang]} ref={Name} />
          {/* <input type="text" className="input_room_id" placeholder="Terem azonosítója" ref={Name} /> */}
          {/* <select ref={Type} defaultValue={"Válassza ki a termet"} name="room" className="room_add_picker">
            {TypeOfClassrooms.map((r) => {
              return (
                <option key={r} value={r}>
                  {r}
                </option>
              );
            })}
          </select> */}
          <textarea name="Text1" cols="40" className="input_extra" rows="4" placeholder={translation.Description[lang]} ref={Description}></textarea>
          {/* <textarea name="Text1" cols="40" className="input_extra" rows="4" placeholder="Egyéb leírás" ref={Description}></textarea> */}
          <div onClick={() => handleAddNewClassroom()} className="btn_save">
            {translation.Save[lang]}
          </div>
          <br />
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}

export default NewClassroom;
