import React, { useState, useEffect } from "react";
import { Button, Label, TextInput, Tooltip } from "flowbite-react";
import { useAuthUserContext } from "../Hooks/useAuthUserContext";
import {
  isValidZipCode,
  isDivisibleBy20,
  withinAmount,
  redeemCredits
} from "../Hooks/useRedeemInfo";

const Redeem = () => {
  const { userState } = useAuthUserContext();
  const [zipCode, setZipCode] = useState("");
  const [toRedeem, setToRedeem] = useState("");
  const [inputErrors, setInputErrors] = useState(null);
  const [goodToGo, setGoodToGo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInputErrors(null);
    }, 5000);

    // Clear the timer when component unmounts or when inputErrors changes
    return () => clearTimeout(timer);
  }, [inputErrors]);

  //function that checks the input fields for errors
  const handleInputChange = () => {
    try {
      let errors = [];
      if (!isValidZipCode(zipCode)) {
        errors.push("Invalid Zip Code");;
        setInputErrors(errors);
        return;
      }
      if (!isDivisibleBy20(toRedeem)) {
        errors.push("Amount should be divisible by 20");
        setInputErrors(errors);
        return;
      }
      if (!withinAmount(toRedeem,  userState.credits)) {
        errors.push("Amount exceeds your credits");
        setInputErrors(errors);
        return;
      }
      setInputErrors(null);
      setGoodToGo(true);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleInputChange();
    if (goodToGo) {
      console.log("Form submitted");
      redeemCredits(userState, toRedeem, zipCode);
      setGoodToGo(false);
    }
  };

  return (
    <div className="flex flex-row">
      <div className="">
        <p>What is the best method of</p>
      </div>
      <div className="bg-gradient-to-br from-timberwolf to-silver5 rounded-lg justify-center items-center">
        <form
          className="flex max-w-md flex-col gap-4 p-4"
          onSubmit={handleSubmit}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="zip_code" value="Zip Code" className="font-pop" />
            </div>
            <Tooltip
              content="Zip Code should only have 5 digits"
              placement="bottom"
            >
              <TextInput
                id="zip_code"
                type="text"
                placeholder="#####"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                required
                shadow
              />
            </Tooltip>
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="password2"
                value="Credits to use"
                className="font-pop"
              />
            </div>
            <Tooltip
              content="Credit amount should be divisible by twenty"
              placement="bottom"
              className="z-50"
            >
              <TextInput
                id="Credits to use"
                type="text"
                value={toRedeem}
                onChange={(e) => setToRedeem(e.target.value)}
                required
                shadow
              />
            </Tooltip>
            {inputErrors && (
              <div className="my-4">
                <span className="text-error font-pop">{inputErrors}</span>
              </div>
            )}
          </div>
          <Button
            type="submit"
            className="bg-color4 text-color2 font-pop hover:bg-color5"
            isProcessing={false}
          >
            Receive Contacts
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Redeem;
