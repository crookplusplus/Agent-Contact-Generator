import React from "react";
import { Link } from "react-router-dom";
import { FiUserPlus } from "react-icons/fi";
import { BiUser, BiCalendarCheck, BiUserCheck } from "react-icons/bi";

export const ActionCard = () => {
  return (
    <Link to="/products" className="p-4 flex bg-color3 rounded-lg items-center">
      <div className="p-3 rounded-full bg-color2 bg-opacity-75 animate-bounce200">
        <FiUserPlus className="w-8 h-8 text-color4" />
      </div>
      <div>
        <p className="text-color1 text-lg font-medium ml-2">
          Make More Connections!
        </p>
      </div>
    </Link>
  );
};

export const HighlightCardSkeleton = () => (
  <div className="p-4 flex bg-color1 rounded-lg items-center animate-pulse">
    <div className="p-3 rounded-full bg-color5 bg-opacity-75">
      <div className="w-8 h-8 bg-color3 rounded-full" />
    </div>
    <div>
      <div className="text-color3 text-sm font-medium ml-2 bg-color3 h-4 rounded w-24"></div>
      <div className="text-color3 text-lg font-semibold ml-2 bg-color3 h-6 rounded w-32 mt-2"></div>
    </div>
  </div>
);

// accepts a highlights.totalAgentsPulled in UserHighlights.jsx
export const TotalAgentsCard = (props) => {
  return (
    <div className="p-4 flex bg-color1 rounded-lg items-center">
      <div className="p-3 rounded-full bg-color5 bg-opacity-75">
        <BiUser className="w-8 h-8 text-color3" />
      </div>
      <div>
        <p className="text-color3 text-sm font-medium ml-2">
          Total Agent Contacts
        </p>
        <p className="text-color3 text-lg font-semibold ml-2">
          {props.totalAgentsPulled}
        </p>
      </div>
    </div>
  );
};

export const AgentsContactedCard = (props) => {
    return (
        <div className="p-4 flex bg-color1 rounded-lg items-center">
          <div className="p-3 rounded-full bg-affirm bg-opacity-75">
            <BiUserCheck className="w-8 h-8 text-color3" />
          </div>
          <div>
            <p className="text-color3 text-sm font-medium ml-2">
              Agents Contacted
            </p>
            <p className="text-color3 text-lg font-semibold ml-2">
              {props.agentsContacted}
            </p>
          </div>
        </div>
    )
};

export const TotalListCard = (props) => {
    return (
        <div className="p-4 flex bg-color1 rounded-lg items-center">
          <div className="p-3 rounded-full bg-purple-700 bg-opacity-75">
            <BiUser className="w-8 h-8 text-color3" />
          </div>
          <div>
            <p className="text-color3 text-sm font-medium ml-2">Total Lists</p>
            <p className="text-color3 text-lg font-semibold ml-2">
              {props.number_of_lists}
            </p>
          </div>
        </div>
    );
};

export const ListAgeCard = (props) => {
  return (
    <div className="p-4 flex bg-color1 rounded-lg items-center">
      <div className="p-3 rounded-full bg-caution bg-opacity-75">
        <BiCalendarCheck className="w-8 h-8 text-color3" />
      </div>
      <div>
        <p className="text-color3 text-sm font-medium ml-2">
          {props.blurb}
        </p>
        <p className="text-color3 text-lg font-semibold ml-2">
          {Math.floor(
            (new Date() - new Date(props.datePulled)) /
              (1000 * 60 * 60 * 24)
          )}
        </p>
      </div>
    </div>
  );
};
