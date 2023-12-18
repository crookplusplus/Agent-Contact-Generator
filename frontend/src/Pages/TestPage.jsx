import React, { useState } from "react";
import Card from "../Components/Card";
import { useParsing } from "../Hooks/useParsing";

const TestPage = () => {
  const [numAgents, setNumAgents] = useState("");
  const [numSkip, setNumSkip] = useState("");
  const { parseAgentTest, isLoading, error } =  useParsing();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    await parseAgentTest(numSkip, numAgents);
  }

  return (
    <Card>
      <div className="flex flex-col text-center">
        <h1 className="sm:text-4xl text-4xl font-extrabold font-sil italic title-font mx-2 my-4 text-color4 drop-shadow-[3px_3px_5px_rgba(91,91,91,0.58)]">
          Test Parameters
        </h1>
      </div>
      <div className="flex flex-col items-center mb-3">
        <form
          className="bg-color3 w-2/3 mx-16 my-auto rounded flex flex-col items-center"
          onSubmit={handleSubmit}
         >
          <p className="my-4 bg-white rounded text-color2 italic w-3/4">This page makes a POST request to "/api/data/parse-agent-test" for the back end to use a saved JSON file
           and generate the agent contacts and store them in the database. FOR TESTING!</p>
          <label htmlFor="agentCount" className="my-2">
              Number of Agents:
          </label>
          <input 
          className="my-2 rounded"
          type="text"
          onChange={(e) => setNumAgents(e.target.value)}
          value={numAgents}
          />
          <label htmlFor="agentCount" className="my-2">
              Number to skip:
          </label>
          <input 
          className="my-2 rounded"
          type="text"
          onChange={(e) => setNumSkip(e.target.value)}
          value={numSkip}
          />
          <button className="my-4 p-2 bg-color2 text-color4 rounded-md font-semibold hover:bg-color5 hover:text-color2 transition-all duration-150 ease-in border-[#13181f]">
          Try
          </button>
        </form>
      </div>
    </Card>
  );
};

export default TestPage;
