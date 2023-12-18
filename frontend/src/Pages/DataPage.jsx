import React, { useState } from "react";
import Card from "../Components/Card";
import { useParameters } from "../Hooks/useParameters";

const DataPage = () => {
  const [numberOfCalls, setNumberOfCalls] = useState("0");
  const [zipCode, setZipCode] = useState("");
  const { callForList, error, isLoading } = useParameters();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await callForList(numberOfCalls, zipCode);
  };

  return (
    <Card>
      <div className="flex flex-col text-center">
        <h1 className="sm:text-4xl text-4xl font-extrabold font-sil italic title-font mx-2 my-4 text-color4 drop-shadow-[3px_3px_5px_rgba(91,91,91,0.58)]">
          Data
        </h1>
        <div className="flex flex-col items-center mb-3">
          <form
            className="bg-color3 w-2/3 mx-16 my-auto rounded flex flex-col items-center"
            onSubmit={handleSubmit}
          >
            <p className="my-4 bg-white rounded text-color2 italic w-3/4">This page makes a POST request to '/api/data/generate-list' for the back end to make a call to the API and generate
              the agent contacts and store them in the database. </p>
            <label htmlFor="agentCount" className="my-2">
              Number of Agents:
            </label>
            <select
              value={numberOfCalls}
              onChange={(e) => setNumberOfCalls(e.target.value)}
              className="my-2"
            >
              <option value="">Please select</option>
              <option value="1">20</option>
              <option value="2">40</option>
              <option value="3">60</option>
              <option value="4">80</option>
              <option value="5">100</option>
            </select>
            <label htmlFor="zipCode" className="my-2">
              Zip Code:{" "}
            </label>
            <input
              id="zipCode"
              className="my-2"
              type="text"
              required
              onChange={(e) => {
                setZipCode(e.target.value);
              }}
              value={zipCode}
            />
            <button
              className="mt-6 p-2 bg-color2 text-color4 rounded-md font-semibold hover:bg-color5 hover:text-color2 transition-all duration-150 ease-in mb-8 border-[#13181f]"
              disabled={isLoading}
            >
              Send Data
            </button>
            {error && (
              <div className="text-red-500 font-bold font-sil">{error}</div>
            )}
          </form>
        </div>
      </div>
    </Card>
  );
};

export default DataPage;
