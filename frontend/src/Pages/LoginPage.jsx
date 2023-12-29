import React, { useState } from "react";
import Card from "../Components/Card";
import { useLogin } from "../Hooks/useLogin";
import style from "./LoginPage.module.css"; // Import your CSS file

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Info sent");

    await login(email, password);
  };

  return (
    <Card>
      <div className={style.container}>
        <h1 className={style.title}>Login</h1>
        <div className={style.formContainer}>
          <form className={style.loginForm} onSubmit={handleSubmit}>
            <label htmlFor="email" className={style.label}>
              Email
            </label>
            <input
              id="email"
              className={style.inputField}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <label htmlFor="password" className={style.label}>
              Password
            </label>
            <input
              id="password"
              className={style.inputField}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button className={style.submitButton} disabled={isLoading}>
              Login
            </button>
            {error && <div className={style.errorMessage}>{error}</div>}
          </form>
        </div>
      </div>
    </Card>
  );
};

export default LoginPage;
