import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import { AuthProvider } from "../context/AuthProvider";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import LogoutConfirm from "../pages/LogoutConfirm";
import NotFound from "../pages/NotFound";
import Offers from "../pages/Offers";
import RefreshToken from "../pages/RefreshToken";
import UsersManage from "../pages/UsersManage";
import ProtectedRoleRoute from "./ProtectedRoleRoute";
import ProtectedRoute from "./ProtectedRoute";


const App = () => {
  


  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route index path="/" exact element={<Home />} />
              <Route path="/Login" exact element={<Login />} />
              <Route path="/LogoutConfirm" exact element={<LogoutConfirm />} />
              <Route path="/Logout" exact element={<Logout />} />
              <Route path="/Offers" exact element={<Offers />} />
              <Route element={<ProtectedRoute />} >                
                <Route element={<ProtectedRoleRoute allowed={["admin"]} />} >
                  <Route path="/Users" element={<UsersManage />} />
                </Route>
              </Route>
              <Route path="/refreshtoken" exact element={<RefreshToken/>}/>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App