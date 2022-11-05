import axios from "axios";
import { apiurl } from "config/globalVariables";
import { SuccesNotification, WarningNotification } from "config/NotificationManager";
import React, { useRef } from "react";

const TypeOfClassrooms = ["Tanterem", "Számítógépes terem", "Labor", "Mosdó", "Konyha", "Diákterem", "Raktár", "Egyéb"];

function NewClassroom() {
  const Name = useRef();
  const Type = useRef();
  const Description = useRef();

  const handleAddNewClassroom = () => {
    if (Name.current.value) {
      axios
        .post(apiurl + "addnewclassroom", {
          Name: Name.current.value,
          // Type: Type.current.value,
          Type: "Test",
          Description: Description.current.value,
        })
        .then((res) => {
          if (res.data.success) {
            SuccesNotification("", res.data.message);
          } else {
            WarningNotification("", res.data.message);
          }
        });
    } else {
      WarningNotification("", "Töltsd ki a mezőket!");
    }
  };

  return (
    <div className="home_content">
      <div className="add_room_title">Új terem hozzáadása</div>
      <div className="addroomwrap">
        <div className="wrap">
          <input type="text" className="input_room_id" placeholder="Terem azonosítója" ref={Name} />
          {/* <select ref={Type} defaultValue={"Válassza ki a termet"} name="room" className="room_add_picker">
            {TypeOfClassrooms.map((r) => {
              return (
                <option key={r} value={r}>
                  {r}
                </option>
              );
            })}
          </select> */}
          <textarea name="Text1" cols="40" className="input_extra" rows="4" placeholder="Egyéb leírás" ref={Description}></textarea>
          <div onClick={() => handleAddNewClassroom()} className="btn_save">
            Mentés
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
