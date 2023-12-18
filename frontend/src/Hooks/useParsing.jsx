import { useState } from "react";

export const useParsing = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const parseAgentTest = async (numSkip, numAgents) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/data/parse-agent-test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ numSkip, numAgents }),
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
  return { parseAgentTest, isLoading, error };
};
