import React, { useState } from "react";
import Card from "../Components/Card";
import style from "./TestPage.module.css"; // Import your CSS file
import { useParsing } from "../Hooks/useParsing";

const TestPage = () => {
  const [numAgents, setNumAgents] = useState("");
  const [numSkip, setNumSkip] = useState("");
  const { parseAgentTest, isLoading, error } = useParsing();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await parseAgentTest(numSkip, numAgents);
  };

  return (
    <Card>
      <div className={style.container}>
        <h1 className={style.title}>Test Parameters</h1>
      </div>
      <div className={style.formContainer}>
        <form className={style.testForm} onSubmit={handleSubmit}>
          <p className={style.description}>
            This page makes a POST request to "/api/data/parse-agent-test" for
            the backend to use a saved JSON file and generate the agent contacts
            and store them in the database. FOR TESTING!
          </p>
          <label htmlFor="numAgents" className={style.label}>
            Number of Agents:
          </label>
          <input
            id="numAgents"
            className={style.inputField}
            type="text"
            onChange={(e) => setNumAgents(e.target.value)}
            value={numAgents}
          />
          <label htmlFor="numSkip" className={style.label}>
            Number to Skip:
          </label>
          <input
            id="numSkip"
            className={style.inputField}
            type="text"
            onChange={(e) => setNumSkip(e.target.value)}
            value={numSkip}
          />
          <button className={style.tryButton} disabled={isLoading}>
            Try
          </button>
          {error && <div className={style.errorMessage}>{error}</div>}
        </form>
      </div>
    </Card>
  );
};

export default TestPage;
