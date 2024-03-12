import { useState, useEffect } from "react";
import { useAuthUserContext } from "../Hooks/useAuthUserContext";
import { useListContext } from "../Hooks/useListContext";
import { useContactInfo } from "./useContactInfo";

export const useEditAgentInfo = () => {
  //for http calls
  const { userState } = useAuthUserContext();
  const { listState, listDispatch } = useListContext();
  const [isLoading, setIsLoading] = useState(null);
  const [errorEA, setErrorEA] = useState(null);
  const { getContactInfo } = useContactInfo();

  const editAgentInfo = async (agentInfo) => {
    const [agent_id, agentUpdates] = agentInfo;
    setIsLoading(true);
    setErrorEA(null);

    const response = await fetch(`/api/agent/edit/${agent_id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userState.token}`,
      },
      body: JSON.stringify(agentUpdates),
    });

    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setErrorEA(json.error);
    }

    if (response.ok) {
      console.log(json.message);
      let focusList = listState.focus; 
      getContactInfo();
      listDispatch({ type: "updateFocus", payload: focusList });
      setIsLoading(false);
    }
  };

  return { isLoading, errorEA, editAgentInfo };
};
