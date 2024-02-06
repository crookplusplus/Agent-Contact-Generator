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
import UserHomePage from "./Pages/UserHomePage";
import UserListPage from "./Pages/UserListPage";
import UserContactsPage from "./Pages/UserContactsPage";
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
        userDispatch({ type: "LOGIN", payload: data });
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
          {/** standard webpage routing (Unauthenticated user Routes)*/}
          <Route path="/" element={userState.token ? <Navigate to="/welcome" /> : <HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/login" element={userState.token ? <Navigate to="/welcome" /> : <LoginPage />} />
          <Route path="/signup" element={userState.token ? <Navigate to="/welcome" /> : <SignUpPage />} />
          {/**Authenticated user Routes*/}
          <Route path="/welcome" element={userState.token ? <UserHomePage /> : <Navigate to="/" />} />
          <Route path="/lists" element={userState.token ? <UserListPage /> : <Navigate to="/" />} />
          <Route path="/contacts" element={userState.token ? <UserContactsPage /> : <Navigate to="/" />} />
          {/**This is just for practice and making backend server calls */}
          <Route path="/test" element={userState.token==null ? <Navigate to="/signup" /> : <TestPage />} />
          <Route path="/data" element={userState.token==null ? <Navigate to="/signup" /> : <DataPage />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
