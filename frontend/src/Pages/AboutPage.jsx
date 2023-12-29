import React from "react";
import Card from "../Components/Card";
import styles from "./AboutPage.module.css";

const AboutPage = () => {
  return (
    <Card>
      <div className={styles.aboutContainer}>
        <h1 className={styles.title}>About Acquaint</h1>
        <p className={styles.paragraph}>
          Acquaint is a startup company that is looking to help Loan Officers
          build working relationships with Top-Selling Real Estate Agents in
          their area. With the number of real estate transactions steadily
          decreasing, it has become increasingly more important for a Loan
          Officer to expand their network to make a living. Acquaint is here to
          provide the contact information of the Top-Selling Real Estate Agents
          to help the Loan Officer spend less time on Researching Real Estate
          Agents and spend more time making valuable connections.
        </p>
      </div>
    </Card>
  );
};

export default AboutPage;
