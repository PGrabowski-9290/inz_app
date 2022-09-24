import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

const Login = () => {
  const [showPass, setShowPass] = useState(false);

  return (
    <>
      <div>
        <div className="xl:px-20 md:px-10 sm:px-6 px-4 md:py-12 py-9 2xl:mx-auto 2xl:container md:flex items-center justify-center">
          <div className="bg-white shadow-lg rounded xl:w-1/3 lg:w-5/12 md:w-1/2 w-full lg:px-10 sm:px-6 sm:py-10 px-2 py-6">
            <p className="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800">
              Logowanie
            </p>
            <div className="w-full flex items-center justify-between py-5">
              <hr className="w-full bg-gray-400" />
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none text-gray-800"
              >
                {" "}
                Email{" "}
              </label>
              <input
                id="email"
                aria-labelledby="email"
                type="email"
                className="bg-gray-100 border rounded text-xs font-medium leading-none placeholder-gray-800 text-gray-800 py-3 w-full pl-3 mt-2"
                placeholder=""
              />
            </div>
            <div className="mt-6 w-full">
              <label
                htmlFor="myInput"
                className="text-sm font-medium leading-none text-gray-800"
              >
                {" "}
                Password{" "}
              </label>
              <div className="relative flex items-center justify-center">
                <input
                  id="myInput"
                  type={showPass ? "text" : "password"}
                  className="bg-gray-100 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                />
                <div
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-0 mt-2 mr-3 cursor-pointer text-gray-800"
                >
                  <div id="show" className={!showPass ? "block" : "hidden"}>
                    <EyeIcon className="w-6 h-6" />
                  </div>
                  <div id="hide" className={showPass ? "block" : "hidden"}>
                    <EyeSlashIcon className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <button className="text-base font-semibold leading-none text-gray-300 focus:outline-none bg-gray-600 border rounded-md hover:bg-gray-700 hover:text-white py-4 w-full">
                Zaloguj
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
