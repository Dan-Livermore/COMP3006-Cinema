import { Link, Form, redirect, useActionData } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const data = useActionData();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 bg-sky-100">
        <div className="bg-white shadow-md rounded-md p-6 max-w-md w-full mt-1 md:mt-0">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Create your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <Form method="post" action="/create-account"   className="space-y-6">
              <div className="">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  name="password"
                  type="password"
                  onChange={handlePasswordChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              {data && data.error && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                  role="alert"
                >
                  <strong className="font-bold">Error! </strong>
                  <span className="block sm:inline">{data.error}</span>
                </div>
              )}

              <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                  >
                    Sign up
                  </button>
              </div>
            </Form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already have an account?
              <Link
                to="/log-in"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                {" "}
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateAccount;

export const HandleSignUp = async ({ request }) => {
  const data = await request.formData();

  const email = data.get("email");
  const password = data.get("password");

  console.log(email, password);
  try {
    // Make a POST request to your Express route
    const response = await axios.post("http://localhost:5555/signup", {
      email,
      password,
    });

    console.log("Response from server:", response.data);
    if (response.data === "Account Created!") {
      return redirect("/account");
    }
    else if (response.data === "Enter both an email and a password."){
      return {error: ' Please enter both an email address and a password'}
    }
    else {
      return {error: ' An Error Has Occurred'}
    }
  } catch (error) {
    return {error: error.response.data};
  }
};
