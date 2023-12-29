import React from "react";
import Card from "../Components/Card";
import style from "./UserLanding.module.css"; // Import your CSS file

const UserLanding = () => {
  return (
    <Card>
      <h1 className={style.title}>
        Supercharge Your Partnerships Today!
      </h1>
      <div className={style.descriptionContainer}>
        <p className={style.description}>
          Your journey begins here. Whether you're looking to nurture existing
          connections or expand your reach, we're here to support your
          success. Explore your purchased contacts or discover new
          opportunities today!
        </p>
      </div>
    </Card>
  );
};

export default UserLanding;
