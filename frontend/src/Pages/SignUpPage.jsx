import React, { useState } from "react";
import Card from "../Components/Card";
import style from "./SignUpPage.module.css";
import { useSignUp } from "../Hooks/useSignUp";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignUp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sign Up info sent");

    await signup(email, password);
  };

  return (
    <Card>
      <div className={style.container}>
        <h1 className={style.title}>Sign Up</h1>
        <div className={style.formContainer}>
          <form className={style.signupForm} onSubmit={handleSubmit}>
            <label htmlFor="email" className={style.label}>
              Email:
            </label>
            <input
              id="email"
              className={style.inputField}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <label htmlFor="password" className={style.label}>
              Password:
            </label>
            <input
              id="password"
              className={style.inputField}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button className={style.signupButton} disabled={isLoading}>
              Sign Up
            </button>
            {error && <div className={style.errorMessage}>{error}</div>}
          </form>
        </div>
      </div>
    </Card>
  );
};

export default SignUpPage;
