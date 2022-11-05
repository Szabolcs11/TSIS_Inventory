import axios from "axios";
import LoadingComponent from "components/LoadingComponent";
import { apiurl } from "config/globalVariables";
import { SuccesNotification, WarningNotification } from "config/NotificationManager";
import React, { useEffect, useState } from "react";
import style from "../styles/UserListStyle.css";

function UserList({ userdatas }) {
  const [ranks, setRanks] = useState([]);
  const [users, setUsers] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [rankFilter, setRankFilter] = useState("Összes");

  const [selectedPlayer, setSelectedPlayer] = useState();

  useEffect(() => {
    axios
      .post(apiurl + "getusers", {
        MyId: userdatas.id,
      })
      .then((res) => {
        if (res.data.success) {
          setRanks(res.data.ranks);
          setUsers(res.data.users);
          setFilteredUsers(res.data.users);
          setIsLoading(false);
        }
      });
  }, []);

  useEffect(() => {
    if ((searchText == "" || searchText == " ") && rankFilter == "Összes") {
      setFilteredUsers(users);
    } else {
      const temp = users.filter((e) => e?.FullName?.toLowerCase().includes(searchText?.toLowerCase()));
      setFilteredUsers(rankFilter != "Összes" ? temp.filter((e) => e?.Rank?.includes(rankFilter)) : temp);
    }
  }, [searchText, rankFilter]);

  const handleDeleteUser = (uid) => {
    console.log(uid, userdatas.id);
    if (uid && userdatas.id) {
      axios
        .post(apiurl + "handledeleteuser", {
          targetid: uid,
          myid: userdatas.id,
        })
        .then((res) => {
          setSelectedPlayer(null);
          if (res.data.success) {
            SuccesNotification("", res.data.message);
            let temp = users.filter((e) => e.id != uid);
            setUsers(temp);
            setFilteredUsers(temp);
          } else {
            WarningNotification("", res.data.message);
          }
        });
    }
  };

  if (isLoading) {
    return <LoadingComponent bgcolor={"#fff"} color={"#0078AA"} type={"bubbles"} />;
  }

  return (
    <div className="home_content">
      <div className="list_wrap">
        <div className="list_wrap2">
          <div className="line" id="searchline">
            <div className="searchbar">
              <input onChange={(e) => setSearchText(e.target.value)} type="text" className="search" placeholder="Keresés" />
              <i className="bx bx-search-alt-2"></i>
            </div>
            <select onChange={(e) => setRankFilter(e.target.value)} name="room" className="rank">
              <option value="Összes">Összes</option>
              {ranks.map((r) => {
                return (
                  <option key={r.id} value={r.Name}>
                    {r.Name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="list_row" id="first">
            <div className="row_room">ID</div>
            <div className="row_name">Teljes név</div>
            <div className="row_type">Beosztás</div>
            <div className="row_del"></div>
          </div>

          {filteredUsers.map((u) => {
            return (
              <div key={u.id} className="list_row">
                <div className="row_room">{u.id}</div>
                <div className="row_name">{u.FullName}</div>
                <div className="row_type">{u.Rank}</div>
                <div className="row_del" onClick={() => setSelectedPlayer(u)}>
                  <i className="bx bx-trash" id="kuka"></i>
                </div>
              </div>
            );
          })}
        </div>
        {selectedPlayer && (
          <div className="ontop">
            <div className="popout">
              <div className="sure">Biztos szeretné törölni a következő felhasználót?</div>
              <div className="delete_name">{selectedPlayer.FullName}</div>
              <div className="buttons">
                <div className="delete" onClick={() => handleDeleteUser(selectedPlayer.id)}>
                  Törlés
                </div>
                <div className="not_delete" onClick={() => setSelectedPlayer(null)}>
                  Mégsem
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserList;
