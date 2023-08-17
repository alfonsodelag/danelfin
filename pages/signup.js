import React from "react";
import Router from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";

const Signup = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Must be 6 characters or more")
        .required("Required"),
      repeatPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
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
            <h1 className="text-center">SIGN UP</h1>
            <div className="flex flex-col">
              <label>Name</label>
              <input
                name="name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className="rounded-lg text-black py-2"
                placeholder="Name"
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500">{formik.errors.name}</div>
              ) : null}
            </div>
            <div className="flex flex-col">
              <label>Last Name</label>
              <input
                name="lastName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                className="rounded-lg text-black py-2"
                placeholder="Last Name"
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className="text-red-500">{formik.errors.lastName}</div>
              ) : null}
            </div>
            <div className="flex flex-col">
              <label>E-mail</label>
              <input
                name="email"
                type="email"
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
            <div className="flex flex-col">
              <label>Repeat Password</label>
              <input
                name="repeatPassword"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.repeatPassword}
                className="rounded-lg text-black py-2"
                placeholder="Repeat Password"
              />
              {formik.touched.repeatPassword && formik.errors.repeatPassword ? (
                <div className="text-red-500">
                  {formik.errors.repeatPassword}
                </div>
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

export default Signup;
