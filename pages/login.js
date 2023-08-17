import React, { useState } from "react";
import Router from "next/router";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const submitForm = async (e) => {
    e.preventDefault();

    if (loginData.email === "" || loginData.password === "") {
      throw new Error("E-mail and Password must not be empty");
    }
    Router.push("/users");
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form onSubmit={submitForm} className="w-full h-full flex justify-center">
        <div className="flex flex-col rounded-lg bg-gray-800 text-white m-8 h-2/5 w-1/4">
          <div className="flex gap-4 flex-col p-5">
            <h1 className="text-center">LOGIN</h1>
            <div className="flex flex-col">
              <label>E-mail</label>
              <input
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                type="text"
                className="rounded-lg text-black py-2"
                placeholder="E-mail"
              ></input>
            </div>
            <div className="flex flex-col">
              <label>Password</label>
              <input
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                type="text"
                className="rounded-lg text-black py-2"
                placeholder="Password"
              ></input>
            </div>
          </div>
          <div className="flex justify-center">
            <button className="bg-blue-800 rounded-lg w-1/2 py-2">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
