import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const UserDetails = () => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (router.isReady) {
      const user = JSON.parse(router.query.userData || "{}");
      setCurrentUser(user);
    }
  }, [router.isReady, router.query]);

  if (!currentUser) {
    return <div>Loading user...</div>;
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col rounded-lg bg-gray-800 m-8 text-white h-5/6 w-full p-6">
        <h2 className="mb-6">User Information</h2>
        <Image
          className="rounded-lg mb-8"
          src={currentUser?.picture.large}
          width={100}
          height={100}
        />
        <div>
          <h3>Name: {currentUser?.name?.first}</h3>
          <h3>Last Name: {currentUser?.name?.last}</h3>
          <h3>Cell Phone: {currentUser?.cell}</h3>
          <h3>E-mail: {currentUser?.email}</h3>
          <h3>Gender: {currentUser?.gender}</h3>
        </div>
        <div>
          <h2 className="mb-6">Location</h2>
          <div>
            <h3>City: {currentUser?.location.city}</h3>
            <h3>Country: {currentUser?.location.country}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
