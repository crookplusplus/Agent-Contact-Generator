import React, { useState } from "react";
import Card from "../Components/Card";
import { useLogin } from "../Hooks/useLogin";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Info sent");

    await login(email, password);
  };

  return (
    <Card>
      <div className="flex flex-col items-center justify-center md:flex-row md:space-x-8 lg:space-x-20 text-center">
        <div
          className="flex w-96 h-64"
          style={{
            backgroundImage: `url(../src/assets/nnneon.svg)`,
            backgroundPosition: "center", // centers the image
            backgroundRepeat: "no-repeat", // prevents the image from repeating
            backgroundSize: "cover", // makes the image as large as possible without stretching it
          }}
        ></div>
        <div className="flex flex-col items-center my-3">
          <div className="flex  bg-color3 p-4 sm:p-6 rounded-lg items-center justify-center">
            <div className="relative flex flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none">
              <h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                Welcome Back!
              </h4>
              <p className="mt-1 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
                Enter your details to Login.
              </p>
              <form
                className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
                onSubmit={handleSubmit}
              >
                <div className="mb-4 flex flex-col gap-6">
                  <div className="relative h-11 w-full min-w-[200px]">
                    <input
                      className="peer h-full w-full rounded-md border border-color1 bg-transparent px-3 py-3 font-sans text-sm font-normal text-color1 outline outline-0 transition-all focus:ring-0 placeholder-shown:border placeholder-shown:border-color1 focus:border-2 focus:border-color4 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      placeholder=" "
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                    <label
                      className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight transition-all text-transparent
                    before:pointer-events-none before:mt-[6.5px] before:mr-1 before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-transparent 
                    before:transition-all after:text-transparent after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r 
                    after:border-transparent after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-color1 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent 
                    peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-color1 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-color4 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-color4 peer-disabled:text-transparent 
                    peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-pink-500"
                    >
                      Email
                    </label>
                  </div>
                  <div className="relative h-11 w-full min-w-[200px]">
                    <input
                      type="password"
                      className="peer h-full w-full rounded-md border border-color1 bg-transparent px-3 py-3 font-sans text-sm font-normal text-color1 outline outline-0 transition-all focus:ring-0 placeholder-shown:border placeholder-shown:border-color1 focus:border-2 focus:border-color4 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-pink-500"
                      placeholder=" "
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                    <label
                      className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight transition-all text-transparent
                    before:pointer-events-none before:mt-[6.5px] before:mr-1 before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-transparent 
                    before:transition-all after:text-transparent after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r 
                    after:border-transparent after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-color1 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent 
                    peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-color1 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-color4 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-color4 peer-disabled:text-transparent 
                    peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-pink-500"
                    >
                      Password
                    </label>
                  </div>
                </div>
                {error && (
                  <div className="text-red-500 font-bold font-sil">{error}</div>
                )}
                <button
                  className="mt-6 block w-full select-none rounded-lg bg-color2 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-color4 shadow-md shadow-color4/20 transition-all hover:shadow-lg hover:shadow-color1/40 hover:bg-color5 hover:text-color2 focus:opacity-[0.9] active:shadow-lg active:shadow-color4 disabled:pointer-events-none disabled:bg-white disabled:shadow-none"
                  type="submit"
                  data-ripple-light="true"
                >
                  Login
                </button>
                <p className="mt-4 block text-center font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
                  Need to create an account? &nbsp;
                  <Link
                    className="font-semibold text-color2 transition-colors hover:text-color4"
                    to="/signup"
                  >
                    Sign Up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LoginPage;
