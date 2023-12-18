import { useState } from "react";

export const useParameters = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const callForList = async (numberOfCalls, zipCode) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('/api/data/generate-list', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({numberOfCalls, zipCode})
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      setIsLoading(false);
      console.log(json.mssg);
    }
  };
  return { callForList, error, isLoading };
};
