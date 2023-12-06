import React from "react";
import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UpdateWork from "./components/UpdateWork/UpdateWork";
import CreateWork from "./components/AddWork/CreateWork";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work-create" element={<CreateWork />} />
          <Route path="/work-update/:id" element={<UpdateWork />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
