import { React, useState, useEffect } from "react";
import { ListSkeleton, BlankList } from "./ListComponents";
import { Table } from "flowbite-react";
import { Pagination } from "flowbite-react";
import { useListContext } from "../Hooks/useListContext";
import { useContactInfo } from "../Hooks/useContactInfo";
import { useUpdateContact } from "../Hooks/useUpdateContact";
import EditAgentModal from "./EditAgentModal";

const UserContactsTable = () => {
  //for http calls
  const { listState, listDispatch } = useListContext();
  const { getContactInfo, error } = useContactInfo();
  const [agentsToDisplay, setAgentsToDisplay] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  //for updating Agent contact info
  const { updateContacted, isUpdatingContact, errorUC } = useUpdateContact();
  //for pagination
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page) => setCurrentPage(page);
  const [totalPages, setTotalPages] = useState(0);
  //for table sorting
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  //sets the sort state
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  //fetches contact information on page mount
  //may need to be adjusted if # of users and contacts increase for performance
  useEffect(() => {
    const fetchContactInfo = async () => {
      await getContactInfo();
    };
    setTableLoading(true);
    fetchContactInfo();
  }, []);

  //sets the list of agents to display
  useEffect(() => {
    if (listState.focus && listState.contacts[listState.focus.list_id]) {
      setAgentsToDisplay(listState.contacts[listState.focus.list_id]);
      setTableLoading(false);
    } 
    else if (
      listState.focus === null &&
      listState.lists.length > 0) 
      {
        if (listState.contacts[listState.lists[0].list_id]) 
      {
        listDispatch({ type: "updateFocus", payload: listState.lists[0] });
        setAgentsToDisplay(listState.contacts[listState.lists[0].list_id]);
      } 
        else if ( listState.focus.list_id === "All Contacts") {
        const allAgents = [];

        for (const list of listState.lists) {
          listState.contacts[list.list_id].forEach((agent) => {
            allAgents.push(agent);
          });
        }
      setAgentsToDisplay(allAgents);
      setTableLoading(false);
      }
    }
  }, [listState]);

  //sets the total pages for pagination
  useEffect(() => {
    setTotalPages(Math.ceil(agentsToDisplay.length / itemsPerPage));
  }, [agentsToDisplay, itemsPerPage]);

  //for pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  let sortedAgents = [...agentsToDisplay];
  if (sortConfig.key !== null) {
    sortedAgents.sort((a, b) => {
      // Convert to number if the key is 'num_transactions'
      let aValue =
        sortConfig.key === "num_transactions"
          ? Number(a[sortConfig.key])
          : a[sortConfig.key];
      let bValue =
        sortConfig.key === "num_transactions"
          ? Number(b[sortConfig.key])
          : b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }

  const currentPageData = sortedAgents
    ? sortedAgents.slice(startIndex, endIndex)
    : [];

  const handleContactedChange = (agent_id) => {
    console.log("agent_id: ", agent_id);
    updateContacted(agent_id);
  };

  return (
    <>
      {/** <BlankList />  This needs to be connected and linked to products/services*/}
      {/** <ListSkeleton /> This needs to be dynamically rendered with an isLoading variable */}
      {tableLoading ? (
        <ListSkeleton />
      ) : (
        <div>
          <div className="w-full overflow-x-auto">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell
                  className="cursor-pointer"
                  onClick={() => requestSort("contacted")}
                >
                  Contacted
                </Table.HeadCell>
                <Table.HeadCell
                  className="cursor-pointer"
                  onClick={() => requestSort("last_name")}
                >
                  Name
                </Table.HeadCell>
                <Table.HeadCell
                  className="cursor-pointer"
                  onClick={() => requestSort("nick_name")}
                >
                  Nick Name
                </Table.HeadCell>
                <Table.HeadCell
                  className="cursor-pointer"
                  onClick={() => requestSort("broker")}
                >
                  Broker
                </Table.HeadCell>
                <Table.HeadCell
                  className="cursor-pointer"
                  onClick={() => requestSort("num_transactions")}
                >
                  Transactions
                </Table.HeadCell>
                <Table.HeadCell
                  className="cursor-pointer"
                  onClick={() => requestSort("mobile")}
                >
                  Mobile
                </Table.HeadCell>
                <Table.HeadCell
                  className="cursor-pointer"
                  onClick={() => requestSort("business")}
                >
                  Business
                </Table.HeadCell>
                <Table.HeadCell
                  className="cursor-pointer"
                  onClick={() => requestSort("email")}
                >
                  Email
                </Table.HeadCell>
                <Table.HeadCell
                  className="cursor-pointer"
                  onClick={() => requestSort("website")}
                >
                  Website
                </Table.HeadCell>
                <Table.HeadCell
                  className="cursor-pointer"
                  onClick={() => requestSort("address")}
                >
                  Address
                </Table.HeadCell>
                <Table.HeadCell
                  className="cursor-pointer"
                  onClick={() => requestSort("city")}
                >
                  City, State
                </Table.HeadCell>
                <Table.HeadCell
                  className="cursor-pointer"
                  onClick={() => requestSort("zip")}
                >
                  Zip Code
                </Table.HeadCell>
                <Table.HeadCell>Edit</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {currentPageData.map((agent, index) => (
                  <Table.Row key={index} className="bg-white">
                    <Table.Cell>
                      <label className="relative inline-flex items-center me-5 cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={agent.contacted}
                          onChange={(e) =>
                            handleContactedChange(agent._id)
                          }
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                          {agent.contacted ? "Yes" : "No"}
                        </span>
                      </label>
                    </Table.Cell>
                    <Table.Cell>{`${agent.first_name} ${agent.last_name}`}</Table.Cell>
                    <Table.Cell>{agent.nick_name}</Table.Cell>
                    <Table.Cell>{agent.broker}</Table.Cell>
                    <Table.Cell>{agent.num_transactions}</Table.Cell>
                    <Table.Cell>{agent.mobile}</Table.Cell>
                    <Table.Cell>{agent.business}</Table.Cell>
                    <Table.Cell>{agent.email}</Table.Cell>
                    <Table.Cell>{agent.website}</Table.Cell>
                    <Table.Cell>{agent.address}</Table.Cell>
                    <Table.Cell>{`${agent.city}, ${agent.state}`}</Table.Cell>
                    <Table.Cell>{agent.zip}</Table.Cell>
                    <Table.Cell><EditAgentModal agentInfo={agent} key={agent._id}/></Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
          {/** Pagination */}
          <div className="flex justify-center min-w-full md:justify-between bg-white rounded-b-lg border-t border-gray-200">
            <div className="align-center items-center pl-2 hidden md:flex">
              <span className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-semibold text-gray-900">
                  {startIndex + 1}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-gray-900">
                  {Math.min(
                    endIndex,
                    agentsToDisplay ? agentsToDisplay.length : 0
                  )}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-900">
                  {agentsToDisplay ? agentsToDisplay.length : 0}
                </span>{" "}
                Entries
              </span>
            </div>
            <div className="hidden md:flex whitespace-nowrap items-center justify-center pb-2 pr-2">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                showIcons
              />
            </div>
            <div className="flex pb-2 md:hidden overflow-x-auto sm:justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                showIcons
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserContactsTable;
