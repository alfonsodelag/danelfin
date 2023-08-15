import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col gap-4 justify-center items-center h-full">
        <Link href="login">
          <button className="rounded-md bg-blue-700 px-5 py-2 text-white">
            Login
          </button>
        </Link>
        <p>or</p>
        <Link href="signup">
          <button className="rounded-md bg-purple-700 px-5 py-2 text-white">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}
