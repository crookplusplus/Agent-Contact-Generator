import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "flowbite-react";
import { Pagination } from "flowbite-react";
import { VscFilePdf } from "react-icons/vsc";
import { PiFileCsv } from "react-icons/pi";
import { ListSkeleton, BlankList } from "./ListComponents";
import { useAuthUserContext } from "../Hooks/useAuthUserContext";
import { useListContext } from "../Hooks/useListContext";
import { useFileDownloader } from "../Hooks/useFileDownloader";

const UserListTable = () => {
  //paginatation variables
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page) => setCurrentPage(page);
  const [totalPages, setTotalPages] = useState(0);
  //for http calls
  const { userState } = useAuthUserContext();
  const [isLoading, setIsLoading] = useState(null);
  const { listState, listDispatch  } = useListContext();
  //for file download
  const { downloadFile } = useFileDownloader();
  //for user dash navigation
  const nav = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/user/lists", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userState.token}`,
      },
    }).then(async (res) => {
      const data = await res.json();
      const chronoList = [...data.lists].reverse();
      listDispatch({ type: "updateLists", payload: chronoList });
      if (listState.focus === null){
        listDispatch({ type: "updateFocus", payload: chronoList[0] });

      }
      //used for function testing
      //console.log(listState.lists);
      setTotalPages(Math.ceil(data.lists.length / itemsPerPage));
      setIsLoading(false);
    });
  }, []);

  const handleDownload = (form, listId, zipCode, dateCreated) => {
    const date = new Date(dateCreated);
    const formattedDate = `${
      date.getMonth() + 1
    }-${date.getDate()}-${date.getFullYear()}`;
    const filename = `${zipCode}_${formattedDate}.${form}`;

    downloadFile(`/api/agent/download/${form}/${listId}`, filename, userState.token);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = listState.lists
    ? listState.lists.slice(startIndex, endIndex)
    : [];

  return (
    <>
      {isLoading ? (
        <ListSkeleton />
      ) : (
        <div>
          <div className="w-full overflow-x-auto">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Date Created</Table.HeadCell>
                <Table.HeadCell>Number of Agents</Table.HeadCell>
                <Table.HeadCell>Zip Code</Table.HeadCell>
                <Table.HeadCell>Agents Contacted</Table.HeadCell>
                <Table.HeadCell>Download</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {currentPageData.map((list, index) => (
                  <Table.Row 
                    key={index} 
                    className="bg-white"
                    onClick={() => { 
                      listDispatch({ type: "updateFocus", payload: list });
                      nav("/contacts");
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                      {new Date(list.date_created).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Table.Cell>
                    <Table.Cell>{list.num_agents}</Table.Cell>
                    <Table.Cell>{list.zip_code}</Table.Cell>
                    <Table.Cell>{list.agents_contacted}</Table.Cell>
                    <Table.Cell style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <a
                        href="#"
                        className="text-cyan-600 hover:underline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(
                            "pdf",
                            list.list_id,
                            list.zip_code,
                            list.date_created
                          );
                        }}
                      >
                        <VscFilePdf size="2em" />
                      </a>
                      <a
                        href="#"
                        className="text-cyan-600 hover:underline"
                        onClick={() =>
                          handleDownload(
                            "csv",
                            list.list_id,
                            list.zip_code,
                            list.date_created
                          )
                        }
                      >
                        <PiFileCsv size="2em" />
                      </a>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
          {/* Pagination */}
          <div className=" flex justify-center min-w-full md:justify-between bg-white rounded-b-lg border-t border-gray-200 ">
            <div className="align-center items-center pl-2 hidden md:flex">
              <span className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-semibold text-gray-900">
                  {startIndex + 1}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-gray-900">
                  {Math.min(endIndex, listState.lists ? listState.lists.length : 0)}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-900">
                  {listState.lists ? listState.lists.length : 0}
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

export default UserListTable;
