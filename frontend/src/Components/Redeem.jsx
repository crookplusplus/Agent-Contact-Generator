import React, { useState, useEffect } from "react";
import { Button, Label, TextInput, Tooltip } from "flowbite-react";
import { useAuthUserContext } from "../Hooks/useAuthUserContext";
import {
  isValidZipCode,
  isDivisibleBy20,
  withinAmount,
  redeemCredits,
} from "../Hooks/useRedeemInfo";
import Aquiant from "../assets/nnneon.svg";

const Redeem = () => {
  const { userState, userDispatch } = useAuthUserContext();
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

  const handleSubmit = async (e) => {
    setGoodToGo(true);
    e.preventDefault();
    
    if (!isValidZipCode(zipCode)) {
      setInputErrors("Invalid Zip Code");
      return;
    }
    if (!isDivisibleBy20(toRedeem)) {
      setInputErrors("Amount should be divisible by 20");
      return;
    }
    if (!withinAmount(toRedeem, userState.credits)) {
      setInputErrors("Amount exceeds your credits");
      return;
    }
    console.log("Form submitted");

    const redeemResponse = await redeemCredits(userState, toRedeem, zipCode);
    const { credits } = redeemResponse.credits;
    userDispatch({ type: "CREDITS", payload: { credits } });
    setGoodToGo(false);
  };

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-6 lg:gap-4">
      <div className="lg:col-span-4 bg-gradient-to-br from-color1 via-color2 to-color5 rounded-xl p-2 mb-8">
        <div className="flex flex-col items-center justify-center border-solid border-4 rounded-lg border-silver shadow-2xl font-fjalla shadow-robinsegg p-2 m-2">
          <div className="w-80 ">
            <img src={Aquiant} alt="Aquaint Logo" />
          </div>
        </div>
      </div>
      {/**Redemption Form */}
      <div className="lg:col-span-2 bg-gradient-to-br from-timberwolf to-silver5 rounded-lg justify-center items-center mb-8">
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
            isProcessing={goodToGo}
          >
            Receive Contacts
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Redeem;
