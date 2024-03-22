import { useState} from "react";
import { useAuthUserContext } from "./useAuthUserContext";


export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { userState, userDispatch } = useAuthUserContext();

  const signup = async (username, email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      setIsLoading(false);
      console.log(json.mssg);
      const username = json.username;
      const token = json.token;
      //set the user info in the context
      userDispatch({ type: "LOGIN", payload: {token, username }});
    }
  };
  return { signup, isLoading, error };
};