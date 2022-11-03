import axios from "axios";
import { apiurl } from "config/globalVariables";
import React, { useEffect, useState } from "react";

function FullList({ userdatas }) {
  const [classRooms, setClassRooms] = useState([]);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchText, setSearchText] = useState();

  useEffect(() => {
    axios
      .post(apiurl + "getitems", {
        MyId: userdatas.id,
      })
      .then((res) => {
        if (res.data.success) {
          setClassRooms(res.data.classrooms);
          setItems(res.data.items);
          setFilteredItems(res.data.items);
        }
      });
  }, []);

  return (
    <div className="home_content">
      <div className="list_wrap">
        <div className="list_wrap2">
          <div className="line">
            <input type="text" className="search" placeholder="Keresés" />
            <i className="bx bx-search-alt-2"></i>
          </div>
          <div className="newline">
            <select name="room" defaultValue={"item1"} className="room_picker_check">
              {classRooms.map((r) => {
                return (
                  <option key={r.id} value={r.Name}>
                    {r.Name}
                  </option>
                );
              })}
            </select>
            <select name="asd" defaultValue={"item0"} className="item_picker_check">
              <option value="item0" selected>
                Minden tárgy
              </option>
              <option value="item1">Egér</option>
              <option value="item2">Pc</option>
              <option value="item3">Asztal</option>
            </select>
          </div>
          {filteredItems.map((i) => {
            return (
              <div className="list_row" key={i.id}>
                <div className="row_name">{i.id}</div>
                <div className="row_id">{i.InventoryID}</div>
                <div className="row_name">{i.Name}</div>
                <div className="row_type">{i.Quantity}</div>
                <div className="row_room">{i.Classroom}</div>
              </div>
            );
          })}
          {/* <div className="list_row">
            <div className="row_name">Asus</div>
            <div className="row_id">TsIs115</div>
            <div className="row_type">Monitor</div>
            <div className="row_room">115</div>
          </div>

          <div className="list_row">
            <div className="row_name">Acer</div>
            <div className="row_id">R15</div>
            <div className="row_type">Egér</div>
            <div className="row_room">235</div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default FullList;
