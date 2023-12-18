import React, { useState } from "react";
import Card from "../Components/Card";
import { useLogin } from "../Hooks/useLogin";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, error, isLoading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Login Info sent');

        await login(email, password);
    }


  return (
    <Card>
      <div className="flex flex-col text-center">
        <h1 className="sm:text-3xl text-2xl font-rocksalt font-extrabold italic title-font mx-2 my-4 text-color4 drop-shadow-[3px_3px_5px_rgba(91,91,91,0.58)]">
          Login
        </h1>
        <div className="flex flex-col items-center mb-3">
          <form className="bg-color3 w-2/3 mx-16 my-auto rounded flex flex-col items-center"
          onSubmit={handleSubmit}
          >
            <label htmlFor="agentCount" className="my-2">
              Email
            </label>
            <input 
            className="my-2 rounded" 
            type="email" 
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            />
            <label htmlFor="agentCount" className="my-2">
              Password
            </label>
            <input 
            className="my-2 rounded" 
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            />
           <button
              className="mt-6 p-2 bg-color2 text-color4 rounded-md font-semibold hover:bg-color5 hover:text-color2 transition-all duration-150 ease-in mb-8 border-[#13181f]"
              disabled={isLoading}
            >
              Send Data
            </button>
            {error && (
              <div className="text-red-500 font-bold font-sil">{error}</div>
            )}
          </form>
        </div>
      </div>
    </Card>
  );
};

export default LoginPage;
