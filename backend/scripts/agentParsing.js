const Agent = require("../models/agentModel");


/**
 * Helper function to create a uniform format of Agent attributes
 * @param {string} word
 * @returns {string}
 */
function formatName(word) {
  if (word !== undefined && word !== null) {
    return word
      .toLowerCase()
      .split(" ")
      .map((wordPart) => wordPart.charAt(0).toUpperCase() + wordPart.slice(1))
      .join(" ");
  } else return "";
}

/**
 * Helper function to create a uniform format of phone numbers
 * @param {string} number
 * @returns {string} (###) ###-####
 */
function formatPhoneNumbers(number) {
  if (number === "") {
    return "";
  } else {
    // Remove all characters that are not numbers
    const digits = number.replace(/\D/g, "");
    // Format as (###) ###-####
    const formattedNumber = `(${digits.slice(0, 3)}) ${digits.slice(
      3,
      6
    )}-${digits.slice(6)}`;
    return formattedNumber;
  }
}

/**
 * Function to parse out the first and last name of the agent
 * @param {Array<Object>} agentData - An array of JSON objects representing agent attributes.
 * @returns {Array<string>} returns Array[0] = first_name, Array[1] = last_name
 */
function parseName(agentData) {
  if (agentData.hasOwnProperty("first_name")) {
    if (agentData.first_name !== "") {
      return [
        formatName(agentData.first_name),
        formatName(agentData.last_name),
      ];
    }
  }
  if (agentData.hasOwnProperty("person_name")) {
    const [first, last] = agentData.person_name.split(/\s+/);
    return [formatName(first), formatName(last)];
  }
  if (agentData.hasOwnProperty("full_name")) {
    const [first, last] = agentData.full_name.split(/\s+/);
    return [formatName(first), formatName(last)];
  }
  return ["", ""]; // Default return in the event of no name found
}

/**
 * Function to parse a nick name if one is associated with the agent
 * @param {Array<Object>} agentData - An array of JSON objects representing agent attributes.
 * @returns {string} nickname or empty string
 */
function parseNickName(agentData) {
  let space = 0;

  if (agentData.hasOwnProperty("nick_name")) {
    let nickName = agentData.nick_name;

    if (nickName === "") {
      return "";
    }

    for (let char of nickName) {
      if (char === " ") {
        space++;
        if (space > 1) {
          return "";
        }
      } else if (!char.match(/[a-zA-Z]/)) {
        return "";
      }
    }
    return formatName(nickName);
  } else {
    return "";
  }
}

/**
 * Function to parse the name of the Agents Brokerage
 * @param {Array<Object>} agentData - An array of JSON objects representing agent attributes.
 * @returns {string} name of the brokerage or empty string
 */
function parseBrokerName(agentData) {
  let broker = "";

  if (agentData.broker && agentData.broker.name) {
    broker = agentData.broker.name.trim();
  } else if (agentData.office && agentData.office.name) {
    broker = agentData.office.name;
  }

  return formatName(broker);
}

/**
 * Function to find the email and trim the whitespace
 * @param {Array<Object>} agentData - An array of JSON objects representing agent attributes.
 * @returns {string} agent's email
 */
function parseEmail(agentData) {
  return agentData.email.trim();
}

/**
 * Function to parse the address, city, state, and zip of the Agent
 * @param {Array<Object>} agentData - An array of JSON objects representing agent attributes.
 * @returns {Array<string>} an array containing the address, city, state, and zip of the Agent
 */
function parseAddress(agentData) {
  const address = agentData.address.line + " " + agentData.address.line2;
  const city = agentData.address.city;
  const state = agentData.address.state_code;
  const zip = agentData.address.postal_code;

  return [formatName(address), formatName(city), state, zip];
}

/**
 * Function to parse a website associated with the agent
 * @param {Array<Object>} agentData - An array of JSON objects representing agent attributes.
 * @returns {string} Agent's email or empty string
 */
function parseWebsite(agentData) {
  if (agentData.href) {
    return agentData.href;
  } else {
    return "";
  }
}

/**
 * Function to parse the number of transactions the agent has had within 12 months
 * @param {Array<Object>} agentData - An array of JSON objects representing agent attributes.
 * @returns {string} number of home transactions
 */
function parseRecentTransactions(agentData) {
  return agentData.recently_sold.count;
}

/**
 * Function to parse mobile and business numbers of an agent
 * @param {Array<Object>} agentData - An array of JSON objects representing agent attributes.
 * @returns {Array<string>} Array[0] = mobile, Array[1] = business, or default "" for either
 */
function parsePhoneNumbers(agentData) {
  let mobileNumber = "";
  let businessNumber = "";

  for (const num of agentData.phones) {
    if (num.type === "Mobile") {
      mobileNumber = num.number;
    }
    if (num.type === "Home" && mobileNumber === "") {
      mobileNumber = num.number;
    }
    if (num.type === "Office") {
      businessNumber = num.number;
    }
  }

  for (const key in agentData.office.phone_list) {
    const number = agentData.office.phone_list[key];
    if (businessNumber === "" && number.type === "Office") {
      businessNumber = number.number;
    }
  }

  return [formatPhoneNumbers(mobileNumber), formatPhoneNumbers(businessNumber)];
}


/**
 * Function to parse agent information from the raw JSON data that return from the 
 * third party API call
 * @param {Array<object>} jsonData - raw json data returned from the third party api
 * @param {Array<Agents>} agentObjects - Agent[] that do not contain duplicate names
 * @param {Set<string>} agentNameSet - set used to determine if any duplicate agent data is retrieved
 *      the agent's first and last names are combined to make the unique key
 * @returns {null} agentObjects and agentNameSet are modified in place for use else where in the program
 */
function agentDatabaseBuilder(jsonData, agentObjects, agentNameSet, user_id, apiCall_id) {
  jsonData.agents.forEach((agent) => {
    const [first, last] = parseName(agent);
    const nickName = parseNickName(agent);
    const brokerName = parseBrokerName(agent);
    const agentEmail = parseEmail(agent);
    const [agentAddress, agentCity, agentState, agentZip] = parseAddress(agent);
    const href = parseWebsite(agent);
    const transactions = parseRecentTransactions(agent);
    const [cell, office] = parsePhoneNumbers(agent);

    const agentFullName = `${first} ${last}`;

    if (!agentNameSet.has(agentFullName)) {
      agentNameSet.add(agentFullName);

      const currAgent = new Agent({
        first_name: first,
        last_name: last,
        nick_name: nickName,
        broker: brokerName,
        email: agentEmail,
        address: agentAddress,
        city: agentCity,
        state: agentState,
        zip: agentZip,
        website: href,
        num_transactions: transactions,
        mobile: cell,
        business: office,
        user_id: user_id,
        APICall_id: apiCall_id
      });

      agentObjects.push(currAgent);
    }
  });
}

module.exports = { agentDatabaseBuilder };
