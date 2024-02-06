import { React, useEffect, useState } from "react";
import { Dropdown } from "flowbite-react";
import { useListContext } from "../Hooks/useListContext";

//theme for customizing the Flowbite dropdown
const customTheme = {
  arrowIcon: "ml-2 h-4 w-4",
  content: "py-1 focus:outline-none",
  floating: {
    animation: "transition-opacity",
    arrow: {
      base: "absolute z-10 h-2 w-2 rotate-45",
      style: {
        dark: "bg-gray-900 dark:bg-gray-700",
        light: "bg-white",
        auto: "bg-white dark:bg-gray-700",
      },
      placement: "-4px",
    },
    base: "z-10 w-fit rounded divide-y divide-gray-100 shadow focus:outline-none",
    content: "py-1 text-sm text-gray-700 dark:text-gray-200",
    divider: "my-1 h-px bg-gray-100 dark:bg-gray-600",
    header: "block py-2 px-4 text-sm text-gray-700 dark:text-gray-200",
    hidden: "invisible opacity-0",
    item: {
      container: "",
      base: "flex items-center justify-start py-2 px-4 text-sm text-gray-700 cursor-pointer w-full hover:bg-gray-100 focus:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white",
      icon: "mr-2 h-4 w-4",
    },

    target:
      "bg-color4 text-color1 w-fit enabled:hover:bg-color1 enabled:hover:text-color4 focus:ring-0 focus:bg-color4 focus:outline-none",
  },
  inlineWrapper: "flex items-center",
};

const ListSelectorButton = () => {
  const { listState, listDispatch } = useListContext();
  const { focus, lists } = listState;
  const [buttonLabel, setButtonLabel] = useState("Select a list");

  useEffect(() => {
    if (focus && focus.list_id !== "All Contacts") {
      setButtonLabel(focus.zip_code);
    } else if (focus.list_id === "All Contacts") {
      setButtonLabel("All Contacts");
    }
  }, [focus]);

  const getAgeofList = (listDate) => {
    const dateCreated = new Date(listDate);
    const currentDate = new Date();
    const differenceInTime = currentDate.getTime() - dateCreated.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return Math.ceil(differenceInDays);
  };

  const getAllContactsFocus = (listArray) => {
    return listArray.reduce(
      (acc, list) => {
        return {
          agents_contacted:
            acc.agents_contacted + parseInt(list.agents_contacted),
          date_created: null,
          list_id: "All Contacts",
          num_agents: acc.num_agents + parseInt(list.num_agents),
          zip_code: null,
        };
      },
      { agents_contacted: 0, num_agents: 0 }
    );
  };

  return (
    <div className="p-4 md:pr-8">
      <Dropdown theme={customTheme} label={buttonLabel}>
        {lists.map((listItem, index) => (
          <Dropdown.Item
            key={index}
            onClick={() =>
              listDispatch({ type: "updateFocus", payload: listItem })
            }
          >{`${listItem.zip_code} (${getAgeofList(
            listItem.date_created
          )} days old)`}</Dropdown.Item>
        ))}
        <Dropdown.Divider />
        <Dropdown.Item
          onClick={() =>
            listDispatch({
              type: "updateFocus",
              payload: getAllContactsFocus(lists),
            })
          }
        >
          All Contacts
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};

export default ListSelectorButton;
