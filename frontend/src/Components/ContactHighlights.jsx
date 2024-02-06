import { React, useState, useEffect, useRef } from "react";
import Chart from "react-apexcharts";
import {
  ActionCard,
  TotalAgentsCard,
  ListAgeCard,
  TotalListCard,
  HighlightCardSkeleton,
} from "./DashHighlightCards";
import { useListContext } from "../Hooks/useListContext";

const ContactHighlights = () => {
  const [isLoading, setIsLoading] = useState(null);
  const { listState } = useListContext(false);
  const [series, setSeries] = useState([]);
  const [labels, setLabels] = useState([]);
  const [colors, setColors] = useState([]);
  const dataRef = useRef([]);

  const setGraphData = () => {
    setSeries(dataRef.current.map((item) => item.value));
    setLabels(dataRef.current.map((item) => item.category));
    setColors(dataRef.current.map((item) => item.color));
  };

  useEffect(() => {
    setIsLoading(true);
    let tempData = [];
    if (listState.focus && listState.focus.list_id === "All Contacts") {
      tempData = [
        {
          category: "Uncontacted Agents",
          value: (listState.totalContacts - listState.totalAgentsContacted),
          color: "#C5C6C7",
        },
        {
          category: "Contacted Agents",
          value: listState.totalAgentsContacted,
          color: "#66FCF1",
        },
      ];
      setIsLoading(false);
    } else if (listState.focus) {
      tempData = [
        {
          category: "Uncontacted Agents",
          value: (Number(listState.focus.num_agents)-listState.focus.agents_contacted),
          color: "#C5C6C7",
        },
        {
          category: "Contacted Agents",
          value: listState.focus.agents_contacted,
          color: "#66FCF1",
        },
      ];
      setIsLoading(false);
    }
    dataRef.current = tempData;
    setGraphData();
  }, [listState]);

  const options = {
    series: series,
    chart: {
      type: "donut",
    },
    labels: labels,
    colors: colors,
    dataLabels: {
      enabled: false,
    },
    stroke: {
      colors: ["#45A29E"],
    },
    legend: {
      position: "bottom",
      labels: {
        colors: "#FF0000",
      },
      itemMargin: {
        horizontal: 5,
        vertical: 3,
      },
      onItemClick: {
        toggleDataSeries: false,
      },
      onItemHover: {
        highlightDataSeries: false,
      },
    },

    fill: {
      colors: ["#C5C6C7", "#66FCF1"],
    },
  };

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      <div className="col-span-1 bg-color1 rounded-lg p-4 md:my-4 flex items-center justify-center">
        {!isLoading ? (
          <>
            {listState.focus && (
              <Chart
                options={options}
                series={series}
                type="donut"
                width="100%"
                className="max-w-md"
              />
            )}
          </>
        ) : (
          <>
            <div className="w-6/12">
              <img src="../src/assets/nnneon.svg" alt="AquaintLogo" className="w-full" />
            </div>
          </>
        )}
      </div>
      <div className="col-span-1 flex flex-col justify-center gap-4 my-4 placeholder:min-w-40 rounded-lg shadow-xs overflow-hidden bg-color2 md:mb-8 md:grid-cols-2 xl:grid-cols-4">
        {!isLoading ? (
          <>
            <TotalAgentsCard
              totalAgentsPulled={Number(listState.focus.num_agents)}
            />
            {listState.focus.list_id === "All Contacts" ? (
              <>
              <TotalListCard number_of_lists={listState.lists.length} />
              <ListAgeCard blurb="Days Since Last List" datePulled={listState.lists[0].date_created}/>
              </>
            ) : (
              <ListAgeCard blurb="Age of List in Days:" datePulled={listState.focus.date_created} />
            )}
          </>
        ) : (
          <>
            <ActionCard />
            <HighlightCardSkeleton />
          </>
        )}
      </div>
    </div>
  );
};

export default ContactHighlights;
