import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";

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
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>User List</title>
        <meta
          name="description"
          content="A list of users fetched from the API"
        />
      </Head>

      <main className="h-screen flex justify-center items-center bg-gray-100">
        <div className="flex flex-col rounded-lg shadow-lg bg-white m-8 text-gray-800 h-2/3 w-5/6 p-8">
          <h1 className="text-gray-900 text-center text-4xl mb-6">User List</h1>
          <div className="flex flex-col gap-2 overflow-y-auto mb-6">
            {userList
              ?.slice(
                currentPage * itemsPerPage,
                (currentPage + 1) * itemsPerPage,
              )
              .map((user, index) => (
                <Link key={index} href={`/user/${user.login.uuid}`}>
                  User: {user.name.first} {user.name.last}
                </Link>
              ))}
          </div>

          {totalPages > 0 && (
            <nav className="flex gap-4 text-gray-800 w-full justify-between mt-6 border-t pt-6">
              <button
                className="ml-2 hover:bg-gray-200 p-2 rounded"
                onClick={handleLeftArrowClick}
              >
                &lt;
              </button>
              {[...Array(8)].map((_, index) => {
                const pageIndex = startPageIndex + index;
                if (pageIndex < totalPages) {
                  return (
                    <button
                      key={pageIndex}
                      onClick={() => setCurrentPage(pageIndex)}
                      className={`p-2 rounded ${
                        pageIndex === currentPage
                          ? "bg-gray-300"
                          : "hover:bg-gray-200"
                      }`}
                    >
                      {pageIndex + 1}
                    </button>
                  );
                }
                return null;
              })}
              <button
                className="mr-2 hover:bg-gray-200 p-2 rounded"
                onClick={handleRightArrowClick}
              >
                &gt;
              </button>
            </nav>
          )}
        </div>
      </main>
    </>
  );
};

export async function getServerSideProps() {
  const response = await fetch("https://randomuser.me/api/?results=5000");
  const data = await response.json();

  return {
    props: {
      initialUsers: data,
    },
  };
}

export default Users;
