import "../styles/globals.css";
import React, { useState, useEffect } from "react";
import UserContext from "../context/UserContext";

function MyApp({ Component, pageProps }) {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("https://randomuser.me/api/?results=5000");
      const data = await response.json();
      setUserList(data.results);
    };

    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={userList}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
