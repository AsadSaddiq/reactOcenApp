import React from "react";
import {
  HomeOutlined,
  HistoryOutlined,
  InsertRowBelowOutlined,
  CommentOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { IoFilter } from "react-icons/io5";

import { NavLink } from "react-router-dom";

const MbFooter = ({ openFilter }) => {
  return (
    <div className=" w-[100vw]  h-full  flex items-center justify-around ">
      <NavLink
        className="flex text-xl items-center justify-center mr-4 ml-4 text-gray-500"
        to="/"
      >
        <HomeOutlined />{" "}
      </NavLink>
      <button
        className="flex flex-col items-center font-12 justify-center mr-4 ml-4 text-gray-500 text-xl"
        onClick={() => openFilter()}
      >
        <IoFilter />
      </button>
      <NavLink
        className="flex flex-col items-center justify-center mr-4 ml-4 text-gray-500 text-xl"
        to="favorites"
      >
        <HeartOutlined />
      </NavLink>
      <NavLink
        className="flex flex-col items-center justify-center mr-4 ml-4 text-gray-500 text-xl"
        to="login"
      >
        <CommentOutlined />
      </NavLink>
    </div>
  );
};

export default MbFooter;
