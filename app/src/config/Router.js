import axios from "axios";
import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Auth from "../pages/Auth/Auth";
import { apiurl } from "./globalVariables";
import Home from "pages/Home";
import MainLayout from "./MainLayout";
import News from "pages/News";
import FullList from "pages/FullList";
import NewItem from "pages/NewItem";
import NewClassroom from "pages/NewClassroom";
import UserList from "pages/UserList";
import NewUser from "pages/NewUser";
import Settings from "pages/Settings";
import { ErrorNotification, SuccesNotification } from "./NotificationManager";
import LoadingComponent from "components/LoadingComponent";

export let authenticateUser;
export let handleLogout;

function Router() {
  const [user, setUser] = useState(false);
  const [cookies, removeCookie] = useCookies();
  const navigate = useNavigate();

  useEffect(() => {
    authenticateUser();
  }, []);

  handleLogout = () => {
    console.log(user);
    axios
      .post(apiurl + "handleLogout", {
        myid: user.id,
        sessiontoken: user.sessiontoken,
      })
      .then((res) => {
        if (res.data.success) {
          SuccesNotification("", res.data.message);
          removeCookie("SessionToken");
          console.log("removecookie");
          console.log(cookies.SessionToken);
          authenticateUser();
        } else {
          ErrorNotification("", res.data.message);
        }
      });
  };

  authenticateUser = (sessiontoken) => {
    axios
      .post(apiurl + "authenticate", {
        SessionToken: sessiontoken ? sessiontoken : cookies.SessionToken || "",
      })
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.user);
          navigate("/");
        } else {
          setUser([]);
        }
      });
  };
  if (user == false) {
    console.log("nincs user", user);
    return <LoadingComponent type={"bubbles"} color={"#fff"} bgcolor={"#0078AA"} />;
  } else if (user.length == 0) {
    console.log("nincs user", user);
    return (
      <>
        <Routes>
          {/* <Route path="/" element={<Navigate to="/auth" />} /> */}
          <Route path="/auth" element={<Auth />} />
          {/* <Route path="*" element={<Navigate to="/auth" />} /> */}
        </Routes>
      </>
    );
  } else if (user) {
    console.log("van user", user);
    return (
      <>
        <Routes>
          <Route element={<MainLayout userdatas={user} />}>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/news" element={<News />} />
            <Route exact path="/list" element={<FullList userdatas={user} />} />
            <Route exact path="/newitem" element={<NewItem userdatas={user} />} />
            <Route exact path="/newclassroom" element={<NewClassroom />} />
            <Route exact path="/userslist" element={<UserList userdatas={user} />} />
            <Route exact path="/newuser" element={<NewUser />} />
            <Route exact path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </>
    );
  }
  // else if (user === []) {
  //   console.log("nincs user", user.length);
  //   return (
  //     <>
  //       <Routes>
  //         <Route path="/" element={<Navigate to="/auth" />} />
  //         <Route path="/auth" element={<Auth />} />
  //         {/* <Route path="*" element={<Navigate to="/auth" />} /> */}
  //       </Routes>
  //     </>
  //   );
  // }
}

export default Router;
