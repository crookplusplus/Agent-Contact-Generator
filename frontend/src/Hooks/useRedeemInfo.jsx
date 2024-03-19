

// Function for type checking ZIP code
export function isValidZipCode(zipCode) {
  return /^\d{5}$/.test(zipCode);
}

// Function for type checking if a number is divisible by 20
export function isDivisibleBy20(number) {
  return number % 20 === 0;
}

// Function for type checking if a number is within an allowance
export function withinAmount(number, allowance) {
  return number <= allowance;
}

//function for checking the credits allowance of a user
export async function userCreditCheck(userState) {
    try{
        const response = await fetch("/api/user/credits", {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userState.token}`,
            },
        });
        return response.json();
    } catch (error) {
        console.log("Error: ", error);
    }
}

export async function redeemCredits(userState, toRedeem, zipCode) {
  try {
    const response = await fetch("/api/user/redeem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userState.token}`,
      },
      body: JSON.stringify({ toRedeem, zipCode }),
    });
    return response.json();
  } catch (error) {
    console.log("Error: ", error);
  }
}