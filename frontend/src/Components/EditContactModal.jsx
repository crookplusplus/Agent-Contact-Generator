import { React, useRef, useState, useEffect } from "react";
import { Button, Modal } from "flowbite-react";

const EditContactModal = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const emailInputRef = useRef(null);
  let oldAgentInfo = props.agentInfo;
  //chnaged value states
  const [first_name, setFirst_name] = useState(oldAgentInfo.first_name);
  const [last_name, setLast_name] = useState(oldAgentInfo.last_name);
  const [nick_name, setNick_name] = useState(oldAgentInfo.nick_name);
  const [broker, setBroker] = useState(oldAgentInfo.broker);
  const [mobile, setMobile] = useState(oldAgentInfo.mobile);
  const [business, setBusiness] = useState(oldAgentInfo.business);
  const [email, setEmail] = useState(oldAgentInfo.email);
  const [website, setWebsite] = useState(oldAgentInfo.website);
  const [address, setAddress] = useState(oldAgentInfo.address);
  const [city, setCity] = useState(oldAgentInfo.city);
  const [state, setState] = useState(oldAgentInfo.state);
  const [zip, setZip] = useState(oldAgentInfo.zip);
  const [num_transactions, setNum_transactions] = useState(oldAgentInfo.num_transactions);

  useEffect(() => {
    console.log("oldAgentInfo", oldAgentInfo);
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
          <form className="max-w-sm mx-auto grid grid-cols-2 gap-2">
            <p className="text-color2 text-lg col-span-2 mb-2">
              Only fill in the field you wish to change.
            </p>
            <div className="col-span-1">
              <label className="mb-2 text-sm font-medium text-gray-900">
                First Name
              </label>
              <input
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-2 focus:border-color2 focus:outline-none block w-full p-2.5"
                value={first_name}
                onChange={(e) => setFirst_name(e.target.value)}
              />
            </div>
            <div className="col-span-1">
              <label className="mb-2 text-sm font-medium text-gray-900">
                Last Name
              </label>
              <input
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-2 focus:border-color2 focus:outline-none block w-full p-2.5"
                value={last_name}
                onChange={(e) => setLast_name(e.target.value)}
              />
            </div>
            <div className="col-span-1">
              <label className="mb-2 text-sm font-medium text-gray-900">
                Nick Name
              </label>
              <input
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-2 focus:border-color2 focus:outline-none block w-full p-2.5"
                value={nick_name}
                onChange={(e) => setNick_name(e.target.value)}
              />
            </div>
            <div className="col-span-1">
              <label className="mb-2 text-sm font-medium text-gray-900">
                Broker
              </label>
              <input
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-2 focus:border-color2 focus:outline-none block w-full p-2.5"
                value={broker}
                onChange={(e) => setBroker(e.target.value)}
              />
            </div>
            <div className="col-span-1">
              <label className="mb-2 text-sm font-medium text-gray-900">
                Mobile
              </label>
              <input
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-2 focus:border-color2 focus:outline-none block w-full p-2.5"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
            <div className="col-span-1">
              <label className="mb-2 text-sm font-medium text-gray-900">
                Business
              </label>
              <input
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-2 focus:border-color2 focus:outline-none block w-full p-2.5"
                value={business}
                onChange={(e) => setBusiness(e.target.value)}
              />
            </div>
            <div className="col-span-2">
              <label
                for="email"
                className="block text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-2 focus:ring-0 focus:border-color2 focus:outline-none block w-full p-2.5"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-900">
                Website
              </label>
              <input
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-2 focus:border-color2 focus:outline-none block w-full p-2.5"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-900">
                Street Address
              </label>
              <input
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-2 focus:border-color2 focus:outline-none block w-full p-2.5"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                City
              </label>
              <input
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-2 focus:border-color2 focus:outline-none block w-full p-2.5"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                State
              </label>
              <input
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-2 focus:border-color2 focus:outline-none block w-full p-2.5"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <div className="col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Zip Code
              </label>
              <input
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-2 focus:border-color2 focus:outline-none block w-full p-2.5"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
            </div>
            <div className="col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Number of Transactions
              </label>
              <input
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-2 focus:border-color2 focus:outline-none block w-full p-2.5"
                value={num_transactions}
                onChange={(e) => setNum_transactions(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="col-span-2 block mx-auto justify-center text-color4 bg-color1 hover:bg-color4 hover:text-color1 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Save Changes
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditContactModal;
