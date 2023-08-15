import React, { useState } from "react";

const Signup = () => {
  const [signUpData, setSignUpData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  return (
    <div className="h-screen flex justify-center items-center">
      <form className="w-full h-full flex justify-center">
        <div className="flex flex-col rounded-lg bg-gray-800 text-white m-8 h-2/3 w-1/4">
          <div className="flex gap-4 flex-col p-5">
            <h1 className="text-center">SIGN UP</h1>
            <div className="flex flex-col">
              <label>Name</label>
              <input
                onChange={() =>
                  setSignUpData({ ...signUpData, name: e.target.value })
                }
                type="text"
                className="rounded-lg text-black py-2"
                placeholder="Name"
              ></input>
            </div>
            <div className="flex flex-col">
              <label>Last Name</label>
              <input
                onChange={(e) =>
                  setSignUpData({ ...signUpData, lastName: e.target.value })
                }
                type="text"
                className="rounded-lg text-black py-2"
                placeholder="Last Name"
              ></input>
            </div>
            <div className="flex flex-col">
              <label>E-mail</label>
              <input
                onChange={(e) =>
                  setSignUpData({ ...signUpData, email: e.target.value })
                }
                type="email"
                className="rounded-lg text-black py-2"
                placeholder="E-mail"
              ></input>
            </div>
            <div className="flex flex-col">
              <label>Password</label>
              <input
                onChange={(e) =>
                  setSignUpData({ ...signUpData, password: e.target.value })
                }
                type="password"
                className="rounded-lg text-black py-2"
                placeholder="Password"
              ></input>
            </div>
            <div className="flex flex-col">
              <label>Repeat Password</label>
              <input
                onChange={(e) => console.log(e.target.value)}
                type="password"
                className="rounded-lg text-black py-2"
                placeholder="Repeat Password"
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

export default Signup;
