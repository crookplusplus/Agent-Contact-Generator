import React, { useCallback, useEffect } from "react";
import Layout from "./Components/Layout";
import { Navigate, Routes, Route } from "react-router-dom";
import AboutPage from "./Pages/AboutPage";
import HomePage from "./Pages/HomePage";
import ServicesPage from "./Pages/ServicesPage";
import TestPage from "./Pages/TestPage";
import DataPage from "./Pages/DataPage";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import UserLanding from "./Pages/UserLanding";
import SomePage from "./Pages/SomePage";
import { useAuthUserContext } from "./Hooks/useAuthUserContext";

function App() {
  const { userState, userDispatch } = useAuthUserContext();

  const verifyUser = useCallback(() => {
    fetch("/api/user/refresh", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }).then(async (res) => {
      const data = await res.json();
      if (res.ok) {
        userDispatch({ type: "LOGIN", payload: data.token });
      } else {
        userDispatch({ type: "LOGOUT" });
      }
      setTimeout(verifyUser, 1000 * 60 * 10);
    });
  }, [userDispatch]);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={userState.token ?<UserLanding /> : <HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/some" element={<SomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/login" element={userState.token ? <Navigate to="/" /> : <LoginPage />} />
          <Route path="/signup" element={userState.token ? <Navigate to="/" /> : <SignUpPage />} />
          {/**This is just for practice and making backend server calls */}
          <Route path="/test" element={userState.token==null ? <Navigate to="/signup" /> : <TestPage />} />
          <Route path="/data" element={userState.token==null ? <Navigate to="/signup" /> : <DataPage />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
