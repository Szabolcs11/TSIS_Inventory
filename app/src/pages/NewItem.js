import axios from "axios";
import { apiurl } from "config/globalVariables";
import { SuccesNotification, WarningNotification } from "config/NotificationManager";
import React, { useEffect, useRef, useState } from "react";

function NewItem({ userdatas }) {
  const [rooms, setRooms] = useState([]);
  const [itemDate, setItemDate] = useState(new Date().toISOString().split("T")[0]);

  const ItemName = useRef();
  const ItemType = useRef();
  const ItemClassrom = useRef();
  const ItemIdentifier = useRef();
  const ItemDescription = useRef();

  useEffect(() => {
    axios
      .post(apiurl + "getclassrooms", {
        MyId: userdatas.id,
      })
      .then((res) => {
        if (res.data.success) {
          setRooms(res.data.classrooms);
        }
      });
  }, []);

  const handleAdditem = () => {
    axios
      .post(apiurl + "addnewitem", {
        MyId: userdatas.id,
        Name: ItemName.current.value,
        Identifier: ItemIdentifier.current.value || "",
        Type: ItemType.current.value,
        Classroom: ItemClassrom.current.value,
        Description: ItemDescription.current.value,
        Date: itemDate,
      })
      .then((res) => {
        if (res.data.success) {
          SuccesNotification("", res.data.message);
        } else {
          WarningNotification("", res.data.message);
        }
      });
  };

  return (
    <div className="home_content">
      <div className="add_item_title">Új tárgy hozzáadása</div>
      <div className="additemwrap">
        <div className="wrap">
          <input ref={ItemName} type="text" className="input_name" placeholder="Tárgy neve" />
          <div className="new_line">
            <input ref={ItemType} type="text" className="input_type" placeholder="Tárgy fajtája" />
            <select ref={ItemClassrom} name="room" className="room_picker">
              {rooms.map((r) => {
                return (
                  <option key={r.id} value={r.Name}>
                    {r.Name}
                  </option>
                );
              })}
            </select>
            {/* <select name="room" className="room_picker">
              <option value="notselected" selected disabled hidden>Válassza ki a termet</option>
              <option value="room1">Tanári</option>
              <option value="room2">Díszterem</option>
              <option value="room3">115</option>
            </select> */}
          </div>
          <div className="new_line">
            <input ref={ItemIdentifier} type="text" className="input_id" placeholder="Azonosító" />
            <input type="date" className="Date" id="Date" placeholder="Dátum" name="Date" value={itemDate} onChange={(e) => setItemDate(e.target.value)} />
          </div>
          <textarea ref={ItemDescription} name="Text1" cols="40" className="input_extra" rows="4" placeholder="Egyéb leírás"></textarea>
          <div onClick={() => handleAdditem()} className="btn_save">
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

export default NewItem;
