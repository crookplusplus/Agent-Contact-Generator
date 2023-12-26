import { useState, useEffect } from "react";
import { useAuthUserContext } from "./useAuthUserContext";


export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { userState, userDispatch } = useAuthUserContext();

  useEffect(() => {
    console.log('AuthContext state: ', userState);
  }, [userState]);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      setIsLoading(false);
      console.log(json.mssg);
      const token = json.token;
      //set the user info in the context
      userDispatch({ type: "LOGIN", payload: token });
    }
  };
  return { login, isLoading, error };
};
