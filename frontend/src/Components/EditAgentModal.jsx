import { React, useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Modal } from "flowbite-react";
import { useEditAgentInfo } from "../Hooks/useEditAgentInfo";
import { useListContext } from "../Hooks/useListContext";
import { BsCheck2Circle } from "react-icons/bs";
import { BiMessageSquareError } from "react-icons/bi";

//array of keys for comparison of changes
const infoKeys = [
  "first_name",
  "last_name",
  "nick_name",
  "broker",
  "email",
  "address",
  "city",
  "state",
  "zip",
  "website",
  "num_transactions",
  "mobile",
  "business",
];

const EditAgentModal = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [agentSavedModalOpen, setAgentSavedModalOpen] = useState(false);
  const [errorSaving, setErrorSaving] = useState(false);
  const { listState, listDispatch } = useListContext();
  const [oldAgentInfo, setOldAgentInfo] = useState(props.agentInfo);
  //react-use-form
  const { register, handleSubmit, reset, getValues } = useForm();
  const [originalValues, setOriginalValues] = useState(null);
  const { isLoading, errorEA, editAgentInfo } = useEditAgentInfo();

  const submitHandler = async (data) => {
    //compare the data for changes
    const currentValues = getValues();
    const changes = {};

    for (const key of infoKeys) {
      if (currentValues[key] !== originalValues[key]) {
        changes[key] = currentValues[key];
      }
    }
    await editAgentInfo([oldAgentInfo._id, changes]);
    console.log(changes);
    setOpenModal(false);

    if (!errorEA) {
      setAgentSavedModalOpen(true);
       setTimeout(() => {
           setAgentSavedModalOpen(false);
       }, 2000);
    }
    if (errorEA) {
      setErrorSaving(true);
       setTimeout(() => {
          setErrorSaving(false);
       }, 2000);
    }
  };

  //return to saved data if modal is closed and not submitted
  //also sets state var for comparison of changes
  useEffect(() => {
    if (openModal) {
      setOldAgentInfo(props.agentInfo);
      setOriginalValues(oldAgentInfo);
      reset(oldAgentInfo);
    }
  }, [openModal, oldAgentInfo, reset]);

  //testing only
  useEffect(() => {
    console.log(listState);
    //console.log("oldAgentInfo", oldAgentInfo);
  }, [openModal]);

  return (
    <>
      <Button
        className="bg-color2 text-color4  hover:text-4 focus:outline-none focus:ring-0"
        onClick={() => setOpenModal(true)}
      >
        Edit
      </Button>
      <Modal
        show={openModal}
        size="md"
        popup
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <form
            className="max-w-sm mx-auto grid grid-cols-2 gap-2"
            onSubmit={handleSubmit(submitHandler)}
          >
            <p className="text-color2 text-lg col-span-2 mb-2 ">
              Only fill in the area you wish to change.
            </p>
            <div className="col-span-1">
              <label className="mb-2 text-sm font-medium text-gray-900">
                First Name
              </label>
              <input
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-2 focus:border-color2 focus:outline-none block w-full p-2.5"
                {...register("first_name")}
              />
            </div>
            <div className="col-span-1">
              <label className="mb-2 text-sm font-medium text-gray-900">
                Last Name
              </label>
              <input
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-2 focus:border-color2 focus:outline-none block w-full p-2.5"
                {...register("last_name")}
              />
            </div>
            <div className="col-span-1">
              <label className="mb-2 text-sm font-medium text-gray-900">
                Nick Name
              </label>
              <input
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-2 focus:border-color2 focus:outline-none block w-full p-2.5"
                {...register("nick_name")}
              />
            </div>
            <div className="col-span-1">
              <label className="mb-2 text-sm font-medium text-gray-900">
                Broker
              </label>
              <input
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-2 focus:border-color2 focus:outline-none block w-full p-2.5"
                {...register("broker")}
              />
            </div>
            <div className="col-span-1">
              <label className="mb-2 text-sm font-medium text-gray-900">
                Mobile
              </label>
              <input
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-2 focus:border-color2 focus:outline-none block w-full p-2.5"
                {...register("mobile")}
              />
            </div>
            <div className="col-span-1">
              <label className="mb-2 text-sm font-medium text-gray-900">
                Business
              </label>
              <input
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-2 focus:border-color2 focus:outline-none block w-full p-2.5"
                {...register("business")}
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-2 focus:ring-0 focus:border-color2 focus:outline-none block w-full p-2.5"
                {...register("email")}
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-900">
                Website
              </label>
              <input
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-2 focus:border-color2 focus:outline-none block w-full p-2.5"
                {...register("website")}
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-900">
                Street Address
              </label>
              <input
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-2 focus:border-color2 focus:outline-none block w-full p-2.5"
                {...register("address")}
              />
            </div>
            <div className="col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                City
              </label>
              <input
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-2 focus:border-color2 focus:outline-none block w-full p-2.5"
                {...register("city")}
              />
            </div>
            <div className="col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                State
              </label>
              <input
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-2 focus:border-color2 focus:outline-none block w-full p-2.5"
                {...register("state")}
              />
            </div>
            <div className="col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Zip Code
              </label>
              <input
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-2 focus:border-color2 focus:outline-none block w-full p-2.5"
                {...register("zip")}
              />
            </div>
            <div className="col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Number of Transactions
              </label>
              <input
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-2 focus:border-color2 focus:outline-none block w-full p-2.5"
                {...register("num_transactions")}
              />
            </div>
            <button
              type="submit"
              className="col-span-2 block mx-auto justify-center text-color4 bg-color1 hover:bg-color4 hover:text-color1 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              disabled={isLoading}
            >
              Save Changes
            </button>
          </form>
        </Modal.Body>
      </Modal>
      {/* Agent Saved modal */}
      <Modal show={agentSavedModalOpen} size="sm" popup>
        <Modal.Body>
          <div className="flex justify-center mt-6">
            <div className="flex align-center bg-affirm bg-opacity-10 p-3 rounded-lg border-affirm border-2">
              <BsCheck2Circle className="text-affirm w-8 h-8 stroke-0 mx-2" />
              <p className="mt-1 mx-2">Changes Saved</p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/* Error Saving modal */}
      <Modal show={errorSaving} size="sm" popup>
        <Modal.Body>
          <div className="flex justify-center mt-6">
            <div className="flex align-center bg-error bg-opacity-10 p-3 rounded-lg border-error border-2">
              <BiMessageSquareError className="text-error w-8 h-8 stroke-0 mt-2 mx-2" />
              <p className="mx-2">Error occured! Please Try Again later.</p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditAgentModal;
