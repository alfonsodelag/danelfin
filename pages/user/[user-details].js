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
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <Head>
        <title>
          User Details - {initialUser?.name?.first} {initialUser?.name?.last}
        </title>
        <meta
          name="description"
          content={`Details about user ${initialUser?.name?.first} ${initialUser?.name?.last}`}
        />
      </Head>

      <article className="flex flex-col rounded-lg shadow-lg bg-white p-4 md:p-8 m-4 md:m-8 h-auto md:h-5/6 w-full md:w-4/5">
        <header className="mb-6">
          <h2 className="text-gray-900 text-3xl mb-2">User Information</h2>
        </header>

        <button
          onClick={() => router.back()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6 md:w-1/6"
        >
          Go Back
        </button>

        <div className="flex flex-col md:flex-row md:justify-start justify-between gap-4 mb-4">
          <div className="w-48 h-48 rounded-full overflow-hidden">
            <Image
              src={initialUser?.picture.large}
              width={200}
              height={200}
              alt={`${initialUser?.name?.first} ${initialUser?.name?.last}`}
            />
          </div>

          <section>
            <h3 className="text-xl mb-2">Name: {initialUser?.name?.first}</h3>
            <h3 className="text-xl mb-2">
              Last Name: {initialUser?.name?.last}
            </h3>
            <h3 className="text-xl mb-2">Gender: {initialUser?.gender}</h3>
            <h3 className="text-xl mb-2">Age: {initialUser?.dob.age}</h3>
            <h3 className="text-xl mb-2">Phone Number: {initialUser?.cell}</h3>
            <h3 className="text-xl mb-2">E-mail: {initialUser?.email}</h3>
            <h3 className="text-xl mb-2">
              Username: {initialUser?.login.username}
            </h3>
            <h3 className="text-xl mb-2">Nationality: {initialUser?.nat}</h3>
          </section>
        </div>
        <div className="flex flex-col md:flex-row">
          <section className="mt-6">
            <h2 className="text-gray-900 text-2xl mb-4">Location</h2>
            <div>
              <h3 className="text-xl mb-2">
                Street: {initialUser?.location.street.number}{" "}
                {initialUser?.location.street.name}
              </h3>
              <h3 className="text-xl mb-2">
                City: {initialUser?.location.city}
              </h3>
              <h3 className="text-xl mb-2">
                State: {initialUser?.location.state}
              </h3>
              <h3 className="text-xl mb-2">
                Country: {initialUser?.location.country}
              </h3>
              <h3 className="text-xl mb-2">
                Postcode: {initialUser?.location.postcode}
              </h3>
              <h3 className="text-xl mb-2">
                Timezone: {initialUser?.location.timezone.description}
              </h3>
            </div>
          </section>

          <section className="mt-6">
            <h2 className="text-gray-900 text-2xl mb-4">Other Details</h2>
            <div>
              <h3 className="text-xl mb-2">
                Date of Birth:{" "}
                {new Date(initialUser?.dob.date).toLocaleDateString()}
              </h3>
              <h3 className="text-xl mb-2">
                Registered Since:{" "}
                {new Date(initialUser?.registered.date).toLocaleDateString()}
              </h3>
              <h3 className="text-xl mb-2">
                ID: {initialUser?.id.name} - {initialUser?.id.value}
              </h3>
            </div>
          </section>
        </div>
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
