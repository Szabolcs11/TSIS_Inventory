import axios from "axios";
import { apiurl, defaultlanguague } from "config/globalVariables";
import { SuccesNotification, WarningNotification } from "config/NotificationManager";
import React, { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import translation from "./../translations/NewItem.json";

function NewItem({ userdatas }) {
  const [rooms, setRooms] = useState([]);
  const [itemDate, setItemDate] = useState(new Date().toISOString().split("T")[0]);
  const [cookies, setCookie] = useCookies();
  const [lang, setLang] = useState(cookies.lang || defaultlanguague);

  const ItemName = useRef();
  const ItemQuantity = useRef();
  const ItemClassrom = useRef();
  const ItemIdentifier = useRef();
  const ItemDescription = useRef();

  useEffect(() => {
    axios
      .post(apiurl + "getclassrooms", {
        MyId: userdatas.id,
        lang: lang,
      })
      .then((res) => {
        if (res.data.success) {
          setRooms(res.data.classrooms);
        }
      });
  }, []);

  useEffect(() => {
    if (cookies.lang === "en" || cookies.lang === "hu" || cookies.lang === "rs") {
      setLang(cookies.lang || defaultlanguague);
    } else {
      setLang(defaultlanguague);
    }
  }, [cookies.lang]);

  const handleAdditem = () => {
    axios
      .post(apiurl + "addnewitem", {
        MyId: userdatas.id,
        Name: ItemName.current.value,
        Identifier: ItemIdentifier.current.value || "",
        Quantity: ItemQuantity.current.value,
        Classroom: ItemClassrom.current.value,
        Description: ItemDescription.current.value,
        Date: itemDate,
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

  return (
    <div className="home_content">
      <div className="add_item_title">{translation.NewItemTitle[lang]}</div>
      {/* <div className="add_item_title">Új tárgy hozzáadása</div> */}
      <div className="additemwrap">
        <div className="wrap">
          <input ref={ItemName} type="text" className="input_name" placeholder={translation.Name[lang]} />
          {/* <input ref={ItemName} type="text" className="input_name" placeholder="Tárgy neve" /> */}
          <div className="new_line">
            <input ref={ItemQuantity} type="number" className="input_type" placeholder={translation.Quantity[lang]} />
            {/* <input ref={ItemQuantity} type="number" className="input_type" placeholder="Darabszám" /> */}
            <select ref={ItemClassrom} name="room" className="room_picker">
              {rooms.map((r) => {
                return (
                  <option key={r.id} value={r.Name}>
                    {r.Name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="new_line">
            <input ref={ItemIdentifier} type="text" className="input_id" placeholder={translation.Identity[lang]} />
            {/* <input ref={ItemIdentifier} type="text" className="input_id" placeholder="Azonosító" /> */}
            <input type="date" className="Date" id="Date" placeholder="Dátum" name="Date" value={itemDate} onChange={(e) => setItemDate(e.target.value)} />
          </div>
          <textarea ref={ItemDescription} name="Text1" cols="40" className="input_extra" rows="4" placeholder={translation.Description[lang]}></textarea>
          {/* <textarea ref={ItemDescription} name="Text1" cols="40" className="input_extra" rows="4" placeholder="Egyéb leírás"></textarea> */}
          <div onClick={() => handleAdditem()} className="btn_save">
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

export default NewItem;
