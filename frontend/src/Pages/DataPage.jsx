import React, { useState } from "react";
import Card from "../Components/Card";
import { useParameters } from "../Hooks/useParameters";
import styles from './DataPage.module.css'; // Import the CSS module

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
      <div className={styles.dataContainer}>
        <h1 className={styles.title}>
          Data
        </h1>
        <div className={styles.formContainer}>
          <form
            className={styles.form}
            onSubmit={handleSubmit}
          >
            <p className={styles.paragraph}>
              This page makes a POST request to '/api/data/generate-list' for the back end to make a call to the API and generate
              the agent contacts and store them in the database. 
            </p>
            <label htmlFor="agentCount" className={styles.label}>
              Number of Agents:
            </label>
            <select
              value={numberOfCalls}
              onChange={(e) => setNumberOfCalls(e.target.value)}
              className={styles.select}
            >
              <option value="">Please select</option>
              <option value="1">20</option>
              <option value="2">40</option>
              <option value="3">60</option>
              <option value="4">80</option>
              <option value="5">100</option>
            </select>
            <label htmlFor="zipCode" className={styles.label}>
              Zip Code:{" "}
            </label>
            <input
              id="zipCode"
              className={styles.input}
              type="text"
              required
              onChange={(e) => {
                setZipCode(e.target.value);
              }}
              value={zipCode}
            />
            <button
              className={styles.button}
              disabled={isLoading}
            >
              Send Data
            </button>
            {error && (
              <div className={styles.error}>{error}</div>
            )}
          </form>
        </div>
      </div>
    </Card>
  );
};

export default DataPage;
