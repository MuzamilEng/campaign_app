import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./app/pages/Home";

export const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Home />} />

    </Routes>
  );
};
