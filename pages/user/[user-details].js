import Image from "next/image";
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

const UserDetails = ({ initialUser }) => {
  const router = useRouter();

  if (!initialUser) {
    return <div>Loading user...</div>;
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <Head>
        <title>
          User Details - {initialUser?.name?.first} {initialUser?.name?.last}
        </title>
        <meta
          name="description"
          content={`Details about user ${initialUser?.name?.first} ${initialUser?.name?.last}`}
        />
      </Head>
      <article className="flex flex-col rounded-lg bg-gray-800 m-8 text-white h-5/6 w-full p-6">
        <header>
          <h2 className="mb-1">User Information</h2>
        </header>
        <button
          onClick={() => router.back()}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-40 mb-4"
        >
          Go Back
        </button>
        <Image
          className="rounded-lg mb-8"
          src={initialUser?.picture.large}
          width={250}
          height={250}
          alt={`${initialUser?.name?.first} ${initialUser?.name?.last}`}
        />
        <section>
          <h3>Name: {initialUser?.name?.first}</h3>
          <h3>Last Name: {initialUser?.name?.last}</h3>
          <h3>Cell Phone: {initialUser?.cell}</h3>
          <h3>E-mail: {initialUser?.email}</h3>
          <h3>Gender: {initialUser?.gender}</h3>
        </section>
        <section className="mt-10">
          <h2 className="mb-2">Location</h2>
          <div>
            <h3>City: {initialUser?.location.city}</h3>
            <h3>Country: {initialUser?.location.country}</h3>
          </div>
        </section>
      </article>
    </div>
  );
};

export async function getServerSideProps(context) {
  const uuid = context.params.id;
  const response = await fetch(`https://randomuser.me/api/?uuid=${uuid}`);
  const data = await response.json();

  return {
    props: {
      initialUser: data.results[0],
    },
  };
}

export default UserDetails;
