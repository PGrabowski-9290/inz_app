import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "../components/NavBar";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <section className="flex flex-row mx-auto w-5/6">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </section>
      </BrowserRouter>
    </>
  )
}

export default App