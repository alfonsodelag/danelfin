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
    <div className="h-screen flex justify-center items-center">
      <form
        onSubmit={formik.handleSubmit}
        className="flex justify-center w-full"
      >
        <div className="flex flex-col rounded-lg bg-gray-800 text-white m-8 w-1/4">
          <div className="flex gap-4 flex-col p-5">
            <h1 className="text-center">LOGIN</h1>
            <div className="flex flex-col">
              <label>E-mail</label>
              <input
                name="email"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="rounded-lg text-black py-2"
                placeholder="E-mail"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="flex flex-col">
              <label>Password</label>
              <input
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="rounded-lg text-black py-2"
                placeholder="Password"
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500">{formik.errors.password}</div>
              ) : null}
            </div>
          </div>
          <div className="flex justify-center items-center mb-4">
            <button type="submit" className="bg-blue-800 rounded-lg w-1/2 py-2">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
