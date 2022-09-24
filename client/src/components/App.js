import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import LogoutConfirm from "../pages/LogoutConfirm";
import NotFound from "../pages/NotFound";

const App = () => {
  return (
    <>
      <BrowserRouter>
      <Routes>
          <Route element={<Layout />}>
            <Route index path="/" exact element={<Home />} />
            <Route path="/Login" exact element={<Login />} />
            <Route path="/LogoutConfirm" exact element={<LogoutConfirm />} />
            <Route path="/Logout" exact element={<Logout />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App