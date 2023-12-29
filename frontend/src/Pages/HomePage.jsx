import React from "react";
import Card from "../Components/Card";
import MenuButton from "../Components/MenuButton";
import style from "./HomePage.module.css";

const HomePage = () => {
  return (
    <Card>
      <div className={style.pageContainer}>
        <h1 className={style.title}>More Time Spent Connecting</h1>
        <p className={style.description}>
          There is no longer a need to spend time searching for Real Estate
          Agents' contact information! Simply create an account and purchase a
          list of the top-selling Real Estate Agents in your area! The list is
          downloadable and contains the Agents' preferred contact information.
        </p>
      </div>
      <div className={style.buttonContainer}>
        <MenuButton
          site="/services"
          name="See Packages"
        />

        <MenuButton
          site="/home"
          name="Login/Sign Up"
        />
      </div>
    </Card>
  );
};

export default HomePage;
