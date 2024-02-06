import { useState, useEffect } from "react";
import { useAuthUserContext } from "../Hooks/useAuthUserContext";
import { useListContext } from "../Hooks/useListContext";

export const useEditAgentInfo = () => {
  //for http calls
  const { userState } = useAuthUserContext();
  const { listState, listDispatch } = useListContext();
  const [isLoading, setIsLoading] = useState(null);
  const [errorEA, setErrorEA] = useState(null);

  const editAgentInfo = async (agentInfo) => {
    setIsLoading(true);
    setErrorEA(null);

    const response = await fetch("/api/user/contacts/edit", {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userState.token}`,
      },
      body: JSON.stringify(agentInfo),
    });

    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setErrorEA(json.error);
    }
    if (response.ok) {
      setIsLoading(false);
      console.log(json.mssg);
      let upList = json.upList;
      let upAgent = json.upAgent;
      let updateStateLists = listState.lists;
      let listToUpdate = updateStateLists.find(
        (list) => list.list_id === upList
      );
      if (listToUpdate) {
        let updateAgentContacts = listState.contacts;
        //trouble shooting
        //console.log("updateAgentContacts list: ", updateAgentContacts[upList]);
        let updatedList = updateAgentContacts[upList]?.filter(
            (agent) => agent._id !== upAgent
          );
          updatedList.push(agentInfo);
        //trouble shooting
        //console.log("agentToUpdate: ", agentToUpdate);
        if (agentToUpdate) {
          agentToUpdate.contacted = !agentToUpdate.contacted;
          listDispatch({
            type: "updateContacts",
            payload: updateAgentContacts,
          });
          if (listState.focus && listState.focus.list_id === "All Contacts") {
            listDispatch({
              type: "updateTotalAgentsContacted",
              payload: listState.totalAgentsContacted + change,
            });
          }
        } else {
          console.error("Invalid agent or list");
        }
      } else {
        console.error("Invalid list");
      }
    }
  };

    return { isLoading, errorEA, editAgentInfo };
};
