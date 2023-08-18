import React from "react";
import Router from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Must be 6 characters or more")
        .required("Required"),
    }),
    onSubmit: (values) => {
      if (values.email && values.password) {
        Router.push("/users");
      }
    },
  });

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={formik.handleSubmit}
        className="flex justify-center w-full"
      >
        <div className="flex flex-col rounded-lg shadow-lg bg-white p-8 m-8 w-1/4">
          <h1 className="text-gray-900 text-center text-3xl mb-6">Login</h1>

          <div className="flex flex-col mb-4">
            <label className="mb-2 font-medium">E-mail</label>
            <input
              name="email"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="rounded-lg py-2 px-4 border focus:border-blue-500"
              placeholder="E-mail"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 mt-2">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="flex flex-col mb-6">
            <label className="mb-2 font-medium">Password</label>
            <input
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="rounded-lg py-2 px-4 border focus:border-blue-500"
              placeholder="Password"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 mt-2">{formik.errors.password}</div>
            ) : null}
          </div>

          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 rounded-lg w-1/2 py-2 text-white transition duration-300"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
