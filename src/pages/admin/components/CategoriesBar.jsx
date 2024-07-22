import React from "react";
import { NavLink } from "react-router-dom";
import { BellOutlined } from "@ant-design/icons";
import { BsCarFront } from "react-icons/bs";
import {
  FaHome,
  FaBriefcase,
  FaCouch,
  FaLaptop,
  FaUsers,
} from "react-icons/fa";

const CategoriesBar = () => {
  return (
    <>
      <div className="flex w-full items-center justify-center">
        <div className="grid grid-cols-3 pt-2 pb-2  gap-2 sm:flex w-[90vw] border-b-[1px] border-gray-400 h-full items-center justify-around">
          <NavLink
            className="flex font-bold flex-col items-center justify-center  py-1 sm:py-0 rounded-md bg-slate-200 sm:bg-transparent  text-gray-800 text-sm"
            to="/motors"
          >
            <span className="flex flex-col items-center justify-center   ">
              <BsCarFront className="mr-1" />
              Motors
            </span>
          </NavLink>
          <NavLink
            className="flex font-bold  flex-col items-center justify-center py-1 rounded-md bg-slate-200 sm:bg-transparent text-gray-800 text-sm"
            to="/admin/property"
          >
            <span className="flex flex-col items-center justify-center   ">
              <FaHome className="mr-1" />
              Property
            </span>
          </NavLink>

          <NavLink
            className="flex font-bold flex-col items-center justify-center py-1 rounded-md bg-slate-200 sm:bg-transparent text-gray-800 text-sm"
            to="/jobs"
          >
            <span className="flex flex-col items-center justify-center  ">
              <FaBriefcase className="mr-1" />
              Jobs
            </span>
          </NavLink>

          <NavLink
            className="flex font-bold flex-col items-center justify-center py-1 rounded-md  bg-slate-200 sm:bg-transparent text-gray-800 text-sm"
            to="/furniture"
          >
            <span className="flex flex-col items-center justify-center  ">
              <FaCouch className="mr-1" />
              Furniture
            </span>
          </NavLink>
          <NavLink
            className="flex font-bold flex-col items-center justify-center py-1 rounded-md  bg-slate-200 sm:bg-transparent text-gray-800 text-sm"
            to="/mobile&tab"
          >
            <span className="flex flex-col items-center justify-center   ">
              <FaLaptop className="mr-1" />
              Electronic
            </span>
          </NavLink>
          <NavLink
            className="flex font-bold flex-col items-center justify-center py-1 rounded-md bg-slate-200 sm:bg-transparent text-gray-800 text-sm"
            to="/community"
          >
            <span className="flex flex-col items-center justify-center   ">
              <FaUsers className="mr-1" />
              Community
            </span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default CategoriesBar;
