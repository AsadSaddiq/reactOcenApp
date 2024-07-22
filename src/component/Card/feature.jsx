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
import { GiAbstract021 } from "react-icons/gi";
import { HiMiniRadio } from "react-icons/hi2";
import { BiSolidWasher } from "react-icons/bi";
import { MdAcUnit } from "react-icons/md";
import { RiCarFill } from "react-icons/ri";
import { TbWheel } from "react-icons/tb";
import { FaCompactDisc } from "react-icons/fa";
import { IoSpeedometerOutline } from "react-icons/io5";
import { FaKey } from "react-icons/fa";
import { IoKeyOutline } from "react-icons/io5";
import { BiNavigation } from "react-icons/bi";
import { BiLockAlt } from "react-icons/bi";
import { BiToggleLeft } from "react-icons/bi";
import { GiSteeringWheel } from "react-icons/gi";
import { BiDoorOpen } from "react-icons/bi";

const features = {
  ABS: function () {
    return <GiAbstract021 />;
  },
  "AM/FM Radio": function () {
    return <HiMiniRadio />;
  },
  "Air Bags": function () {
    return <RiCarFill />;
  },
  "Air Conditioning": function () {
    return <MdAcUnit />;
  },
  "Alloy Rims": function () {
    return <TbWheel />;
  },
  "CD Player": function () {
    return <FaCompactDisc />;
  },
  "Cruise Control": function () {
    return <IoSpeedometerOutline />;
  },
  "DVD Player": function () {
    return <FaCompactDisc />;
  },
  "Immobilizer Key": function () {
    return <FaKey />;
  },
  "Keyless Entry": function () {
    return <IoKeyOutline />;
  },
  "Navigation System": function () {
    return <BiNavigation />;
  },
  "Power Locks": function () {
    return <BiLockAlt />;
  },
  "Power Mirrors": function () {
    return <BiToggleLeft />;
  },
  "Power Steering": function () {
    return <GiSteeringWheel />;
  },
  "Power Windows": function () {
    return <BiDoorOpen />;
  },
};

const Feature = ({ item }) => {
  if (features[item]) {
    return (
      <div className="flex flex-col items-center text-center justify-center min-w-[80px] min-h-[80px]  mr-3 mb-3 rounded-md bg-gray-200">
        <div className="flex">{features[item]()}</div>{" "}
        <span className="flex items-center font-semibold ml-[2px]">{item}</span>
      </div>
    );
  } else {
    return null;
  }
};

export default Feature; // Export the Amenities component
