import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../context/AuthProvider";
import { FilterProvider } from "../context/FilterProvider";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import LogoutConfirm from "../pages/LogoutConfirm";
import NotFound from "../pages/NotFound";
import { Details as DetailsPrivate, Edit, New, Offerts as OffertsPrivate, Profile, Salons as SalonsPrivate, Settings, UsersManage } from '../pages/private';
import OffertDetailsPublic from '../pages/public/OffertDetails';
import OffertsPublic from "../pages/public/Offerts";
import SalonsPublic from "../pages/public/Salons";
import RefreshToken from "../pages/RefreshToken";
import Layout from "./Layout";
import ProtectedRoleRoute from "./ProtectedRoleRoute";
import ProtectedRoute from "./ProtectedRoute";

const App = () => {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <FilterProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route index path="/" exact element={<Home />} />
                <Route path="/login" exact element={<Login />} />
                <Route path="/logoutConfirm" exact element={<LogoutConfirm />} />
                <Route path="/logout" exact element={<Logout />} />
                <Route path="/offerts"  >
                  <Route path="" exact element={<OffertsPublic />} />
                  <Route path="details" exact element={<OffertDetailsPublic />}/>
                </Route>
                <Route path="/salons" exact element={<SalonsPublic />} />
                <Route path="/a" element={<ProtectedRoute />} >
                  <Route path="settings" element={<Settings />} >
                    <Route path="profile" element={<Profile />}/>
                    <Route element={<ProtectedRoleRoute allowed={["admin"]} />} >
                      <Route path="users" element={<UsersManage />} />
                    </Route>
                  </Route>
                  <Route path="offerts" exact >
                    <Route path="" exact element={<OffertsPrivate/>} />
                    <Route element={<ProtectedRoleRoute allowed={["admin", "user"]} />} >
                      <Route path="details" exact element={<DetailsPrivate />} />
                      <Route path="new" exact element={<New/>}/>
                      <Route path="edit" exact element={<Edit />}/>
                    </Route>
                  </Route>
                  <Route path="salons" exact element={<SalonsPrivate/>}/>
                </Route>
                <Route path="/refreshtoken" exact element={<RefreshToken/>}/>
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </FilterProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App