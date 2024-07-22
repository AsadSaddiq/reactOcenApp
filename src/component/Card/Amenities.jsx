import React from "react";
import {
  FaWifi,
  FaBed,
  FaToilet,
  FaSnowflake,
  FaTv,
  FaShieldAlt,
  FaBroom,
  FaSun,
  FaDumbbell,
  FaSwimmingPool,
  FaParking,
  FaBell,
  FaUtensils,
  FaSpa,
} from "react-icons/fa";
import { GiKitchenScale, GiCookingPot } from "react-icons/gi";
import { BiSolidWasher } from "react-icons/bi";

const amenities = {
  Bedding: function () {
    return <FaBed />;
  },
  Bathroom: function () {
    return <FaToilet />;
  },
  Kitchen: function () {
    return <GiKitchenScale />;
  },
  Kitchenette: function () {
    return <GiCookingPot />;
  },
  "Wi-Fi": function () {
    return <FaWifi />;
  },
  AC: function () {
    return <FaSnowflake />;
  },
  Security: function () {
    return <FaShieldAlt />;
  },
  Fitness: function () {
    return <FaDumbbell />;
  },
  Outdoor: function () {
    return <FaSun />;
  },
  keeping: function () {
    return <FaBroom />;
  },
  TV: function () {
    return <FaTv />;
  },
  Pool: function () {
    return <FaSwimmingPool />;
  },
  Laundry: function () {
    return <BiSolidWasher />;
  },
  Parking: function () {
    return <FaParking />;
  },
  Concierge: function () {
    return <FaBell />;
  },
  Restaurant: function () {
    return <FaUtensils />;
  },
  Spa: function () {
    return <FaSpa />;
  },
  "Room Service": function () {
    return <GiKitchenScale />;
  },
};

const Amenities = ({ item }) => {
  if (amenities[item]) {
    return (
      <div className="flex flex-col items-center text-center justify-center min-w-[80px] min-h-[80px]  mr-3 mb-3 rounded-md bg-gray-200">
        <div className="flex">{amenities[item]()}</div>{" "}
        <span className="flex items-center font-semibold ml-[2px]">{item}</span>
      </div>
    );
  } else {
    return null;
  }
};

export default Amenities; // Export the Amenities component
