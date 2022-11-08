import axios from "axios";
import LoadingComponent from "components/LoadingComponent";
import Pagination from "components/Pagination";
import Records from "components/Records";
import { apiurl, defaultlanguague } from "config/globalVariables";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import translation from "./../translations/FullList.json";

function FullList({ userdatas }) {
  const [loading, setLoading] = useState(true);
  const [classRooms, setClassRooms] = useState([]);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchText, setSearchText] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  const [cookies, setCookie] = useCookies();
  const [lang, setLang] = useState(cookies.lang || defaultlanguague);

  useEffect(() => {
    setLang(cookies.lang || defaultlanguague);
  }, [cookies.lang]);

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
          setLoading(false);
        }
      });
  }, []);

  useEffect(() => {
    if (searchText == "" || searchText == " ") {
      setFilteredItems(items);
    } else {
      const temp = items.filter((e) => e?.Name?.toLowerCase().includes(searchText?.toLowerCase()));
      setCurrentPage(1);
      setFilteredItems(temp);
    }
  }, [searchText]);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredItems.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(filteredItems.length / recordsPerPage);

  if (loading) {
    return <LoadingComponent color={"#0078AA"} type={"bubbles"} bgcolor={"#fff"} />;
  }
  return (
    <div className="home_content">
      <div className="list_wrap">
        <div className="list_wrap2">
          <div className="line">
            <input
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              type="text"
              className="search"
              placeholder={translation.SearchTitle[lang]}
            />
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
          </div>
          <Records filteredItems={currentRecords} />
          <Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </div>
  );
}

export default FullList;
