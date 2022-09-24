import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "../components/NavBar";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import NotFound from "../pages/NotFound";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/Login" exact element={<Login />} />
            <Route path="/Logout" exact element={<Logout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </section>
      </BrowserRouter>
    </>
  )
}

export default App