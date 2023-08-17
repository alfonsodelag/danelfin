import React, { useEffect, useState } from "react";
import Link from "next/link";

const Users = () => {
  const [userList, setUserList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [startPageIndex, setStartPageIndex] = useState(0);

  const DB_NAME = "userDatabase";
  const STORE_NAME = "userStore";
  const EXPIRATION_DURATION = 3600000;

  const openDatabase = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 1);
      request.onerror = (event) => reject("Failed to open IndexedDB.");
      request.onsuccess = (event) => resolve(event.target.result);
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      };
    });
  };

  const getUserListFromAPI = async () => {
    const response = await fetch("https://randomuser.me/api/?results=5000");
    const users = await response.json();
    setUserList(users.results);
    setLoading(false);

    const db = await openDatabase();
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    store.put({
      id: "userList",
      timestamp: Date.now(),
      data: users.results,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const db = await openDatabase();
      const transaction = db.transaction([STORE_NAME], "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const cachedData = store.get("userList");

      transaction.oncomplete = () => {
        if (
          cachedData.result &&
          Date.now() - cachedData.result.timestamp < EXPIRATION_DURATION
        ) {
          setUserList(cachedData.result.data);
          setLoading(false);
        } else {
          getUserListFromAPI();
        }
      };
    };

    fetchData();
  }, []);

  const itemsPerPage = 20;
  const totalPages = userList?.length
    ? Math.ceil(userList.length / itemsPerPage)
    : 0;

  const handleLeftArrowClick = () => {
    setStartPageIndex((prevIndex) => Math.max(prevIndex - 8, 0));
  };

  const handleRightArrowClick = () => {
    setStartPageIndex((prevIndex) => Math.min(prevIndex + 8, totalPages - 8));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col rounded-lg bg-gray-800 m-8 text-white h-5/6 w-full p-6">
        <div className="flex flex-col gap-1">
          {userList
            ?.slice(
              currentPage * itemsPerPage,
              (currentPage + 1) * itemsPerPage,
            )
            .map((user, index) => (
              <Link
                key={index}
                href={{
                  pathname: `/user/${user.login.uuid}`,
                  query: { userData: JSON.stringify(user) },
                }}
              >
                User: {user.name.first} {user.name.last}
              </Link>
            ))}
        </div>
        {totalPages > 0 && (
          <div className="flex gap-4 text-white w-full justify-between mt-10">
            <button className="ml-2" onClick={handleLeftArrowClick}>
              &lt;
            </button>
            {[...Array(8)].map((_, index) => {
              const pageIndex = startPageIndex + index;
              if (pageIndex < totalPages) {
                return (
                  <button
                    key={pageIndex}
                    onClick={() => setCurrentPage(pageIndex)}
                    className={pageIndex === currentPage ? "active" : ""}
                  >
                    {pageIndex + 1}
                  </button>
                );
              }
              return null;
            })}
            <button className="mr-2" onClick={handleRightArrowClick}>
              &gt;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
