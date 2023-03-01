import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../context/AuthProvider";
import { FilterProvider } from "../context/FilterProvider";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import LogoutConfirm from "../pages/LogoutConfirm";
import NotFound from "../pages/NotFound";
import { Details as DetailsPrivate, Edit, New, Offers as OffersPrivate, Profile, Salons as SalonsPrivate, Settings, UsersManage, Company, Deal } from '../pages/private';
import OfferDetailsPublic from '../pages/public/OffertDetails';
import OffersPublic from "../pages/public/Offerts";
import SalonsPublic from "../pages/public/Salons";
import RefreshToken from "../pages/RefreshToken";
import Layout from "./Layout";
import ProtectedRoleRoute from "./ProtectedRoleRoute";
import ProtectedRoute from "./ProtectedRoute";
//todo fix typo offerts -> offers
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
                <Route path="/offers"  >
                  <Route path="" exact element={<OffersPublic />} />
                  <Route path="details" exact element={<OfferDetailsPublic />}/>
                </Route>
                <Route path="/salons" exact element={<SalonsPublic />} />
                <Route path="/a" element={<ProtectedRoute />} >
                  <Route path="settings" element={<Settings />} >
                    <Route path="profile" element={<Profile />}/>
                    <Route element={<ProtectedRoleRoute allowed={["admin"]} />} >
                      <Route path="users" element={<UsersManage />} />
                      <Route path="company" element={<Company />} />
                    </Route>
                  </Route>
                  <Route path="offers" exact >
                    <Route path="" exact element={<OffersPrivate/>} />
                    <Route element={<ProtectedRoleRoute allowed={["admin", "user"]} />} >
                      <Route path="details" exact element={<DetailsPrivate />} />
                      <Route path="new" exact element={<New/>}/>
                      <Route path="edit" exact element={<Edit />}/>
                      <Route path='deal' exact element={<Deal/>} />
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