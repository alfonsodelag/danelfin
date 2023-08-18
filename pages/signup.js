import React from "react";
import Router from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import Head from "next/head";

const SignUp = () => {
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
    <>
      <Head>
        <title>Sign Up</title>
        <meta name="description" content="Sign up for an account" />
      </Head>

      <main className="h-screen flex justify-center items-center bg-gray-100">
        <form
          onSubmit={formik.handleSubmit}
          className="flex justify-center w-full"
        >
          <section className="flex flex-col rounded-lg shadow-lg bg-white p-8 m-8 w-1/4">
            <header className="mb-6">
              <h1 className="text-gray-900 text-center text-3xl">Sign Up</h1>
            </header>

            {[
              {
                label: "Name",
                name: "name",
                type: "text",
                placeholder: "Name",
              },
              {
                label: "Last Name",
                name: "lastName",
                type: "text",
                placeholder: "Last Name",
              },
              {
                label: "E-mail",
                name: "email",
                type: "email",
                placeholder: "E-mail",
              },
              {
                label: "Password",
                name: "password",
                type: "password",
                placeholder: "Password",
              },
              {
                label: "Repeat Password",
                name: "repeatPassword",
                type: "password",
                placeholder: "Repeat Password",
              },
            ].map((field) => (
              <div className="flex flex-col mb-4" key={field.name}>
                <label className="mb-2 font-medium">{field.label}</label>
                <input
                  name={field.name}
                  type={field.type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[field.name]}
                  className="rounded-lg py-2 px-4 border focus:border-blue-500"
                  placeholder={field.placeholder}
                />
                {formik.touched[field.name] && formik.errors[field.name] && (
                  <div className="text-red-500 mt-2">
                    {formik.errors[field.name]}
                  </div>
                )}
              </div>
            ))}

            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 rounded-lg w-1/2 py-2 text-white transition duration-300"
              >
                Submit
              </button>
            </div>
          </section>
        </form>
      </main>
    </>
  );
};

export default SignUp;
