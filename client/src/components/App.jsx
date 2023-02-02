import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../context/AuthProvider";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import LogoutConfirm from "../pages/LogoutConfirm";
import NotFound from "../pages/NotFound";
import OffertDetails from '../pages/OffertDetails';
import Offerts from "../pages/Offerts";
import Profile from "../pages/Profile";
import RefreshToken from "../pages/RefreshToken";
import Salons from "../pages/Salons";
import Settings from "../pages/Settings";
import UsersManage from "../pages/UsersManage";
import Layout from "./Layout";
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
              <Route path="/login" exact element={<Login />} />
              <Route path="/logoutConfirm" exact element={<LogoutConfirm />} />
              <Route path="/logout" exact element={<Logout />} />
              <Route path="/offerts"  >
                <Route path="" exact element={<Offerts />} />
                <Route path="details" exact element={<OffertDetails />}/>
              </Route>
              <Route path="/salons" exact element={<Salons />} />
              <Route element={<ProtectedRoute />} >
                <Route path="/settings" element={<Settings />} >
                  <Route path="profile" element={<Profile />}/>
                  <Route element={<ProtectedRoleRoute allowed={["admin"]} />} >
                    <Route path="users" element={<UsersManage />} />
                  </Route>
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