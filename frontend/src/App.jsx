import React, { useState } from "react";
import Layout from "./Components/Layout";
import { Routes, Route } from "react-router-dom";
import AboutPage from "./Pages/AboutPage";
import HomePage from "./Pages/HomePage";
import ServicesPage from "./Pages/ServicesPage";
import TestPage from "./Pages/TestPage";
import DataPage from "./Pages/DataPage";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          {/**This is just for practice and making backend server calls */}
          <Route path="/test" element={<TestPage />} />
          <Route path="/data" element={<DataPage />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
