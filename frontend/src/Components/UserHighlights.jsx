import React, { useEffect, useState } from "react";
import { useAuthUserContext } from "../Hooks/useAuthUserContext";
import {
  ActionCard,
  HighlightCardSkeleton,
  TotalAgentsCard,
  ListAgeCard,
  AgentsContactedCard,
  TotalListCard,
} from "./DashHighlightCards";
import { useListContext } from "../Hooks/useListContext";

const UserHighlights = () => {
  const [highlights, setHighlights] = useState(null);
  const { userState } = useAuthUserContext();
  const [isLoading, setIsLoading] = useState(null);
  const [needAction, setNeedAction] = useState(null);
  const { listDispatch } = useListContext();

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/user/highlights", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userState.token}`,
      },
    }).then(async (res) => {
      const data = await res.json();
      setHighlights(data);
      //used for building
      console.log(data);
      listDispatch({ type: "updateTotalAgentsContacted", payload: data.agentsContacted });
      setIsLoading(false);
      if (
        data.number_of_lists === 0 ||
        data.agentsContacted === data.totalAgentsPulled
      ) {
        setNeedAction(true);
      }
    });
  }, []);

  return (
    <div className="grid gap-4 min-w-40 rounded-lg shadow-xs overflow-hidden bg-color2 mb-8 md:grid-cols-2 xl:grid-cols-4">
      {isLoading && <HighlightCardSkeleton />}
      {highlights && highlights.totalAgentsPulled > 0 && (
        <TotalAgentsCard totalAgentsPulled={highlights.totalAgentsPulled} />
      )}
      {highlights && highlights.number_of_lists > 0 && (
        <AgentsContactedCard agentsContacted={highlights.agentsContacted} />
      )}
      {highlights && highlights.number_of_lists > 0 && (
        <TotalListCard number_of_lists={highlights.number_of_lists} />
      )}
      {highlights && highlights.lastApiCall != null && (
        <ListAgeCard blurb={"Days Since Last List"} datePulled={highlights.lastApiCall} />
      )}
      {needAction && <ActionCard />}
    </div>
  );
};

export default UserHighlights;
