import { useState, useEffect } from "react";
import { useAuthUserContext } from "../Hooks/useAuthUserContext";
import { useListContext } from "../Hooks/useListContext";

export const useUpdateContact = () => {
  const { userState } = useAuthUserContext();
  const { listState, listDispatch } = useListContext();
  const [isUpdatingContact, setIsUpdatingContact] = useState(null);
  const [errorUC, setErrorUC] = useState(null);

  const updateContacted = async (agent_id) => {
    setIsUpdatingContact(true);
    setErrorUC(null);

    const response = await fetch(`/api/agent/contact/${agent_id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userState.token}`,
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setIsUpdatingContact(false);
      setErrorUC(json.error);
    }
    if (response.ok) {
      setIsUpdatingContact(false);
      console.log(json.mssg);
      let change = json.change;
      let upList = json.upList;
      let upAgent = json.upAgent;
      let updateStateLists = listState.lists;
      let listToUpdate = updateStateLists.find(
        (list) => list.list_id === upList
      );
      //trouble shooting
      //console.log("listToUpdate: ", listToUpdate, "upList: ", upList, "upAgent: ", upAgent);
      if (listToUpdate) {
        listToUpdate.agents_contacted = listToUpdate.agents_contacted + change;
        let updateAgentContacts = listState.contacts;
        //trouble shooting
        //console.log("updateAgentContacts list: ", updateAgentContacts[upList]);
        let agentToUpdate = updateAgentContacts[upList]?.find(
            (agent) => agent._id === upAgent
        );
        //trouble shooting
        //console.log("agentToUpdate: ", agentToUpdate);
        if (agentToUpdate) {
          agentToUpdate.contacted = !agentToUpdate.contacted;
          listDispatch({ type: "updateLists", payload: updateStateLists });
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

  return { updateContacted, isUpdatingContact, errorUC };
};
