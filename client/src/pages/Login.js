import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../utils/API";

const Login = () => {
  const { setAuth } = useAuth()
  const [showPass, setShowPass] = useState(false);
  const [info, setInfo] = useState(null);
  const [email, setEmail] = useState(null);
  const [passwd, setPasswd] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const fromLocation = location?.state?.srcLocation?.pathname || "/";

  useEffect(()=> {
    setInfo(null)
  }, [email, passwd])

  const handleLogin = async (e) => {
    try{
      if ( !email || !passwd ) return setInfo({error: "Uzupełnij dane"});
      const response = await axios.post('/auth/login',
        {
          email: email,
          password: passwd
        },
        {
          headers: { 'Content-Type': 'application/json'},
          withCredentials: true
        }
      );

      const success = response?.status === 200;

      if (success) {
        const {message, accessToken, role} = response?.data
        setInfo({ success: message});
        setAuth({accessToken: accessToken, role: role})
        setTimeout(() => {
          console.log("przekierowanie na główną");
          navigate("/", {replace: true})
        }, 1000)
      }

    } catch (err) {
      console.error(err)

      setInfo({error: err?.response?.data?.message});
    }
  }

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
                placeholder="Email"
                onChange={(e) => {setEmail(e.target.value)}}
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
                  placeholder="Hasło"
                  onChange={(e) => {setPasswd(e.target.value)}}
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
              { info?.error && <div className="mt-2 ml-2 w-full"> 
                  <span className="text-red-600 text-sm">{info?.error}</span>
                </div>
              }
              { info?.success && <div className="mt-2 ml-2 w-full"> 
                  <span className="text-green-700 text-sm">{info?.success}</span>
                </div>
              }
            </div>
            <div className="mt-8">
              <button onClick={() => handleLogin()} className="text-base font-semibold leading-none text-gray-300 focus:outline-none bg-gray-600 border rounded-md hover:bg-gray-700 hover:text-white py-4 w-full">
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
