import { Avatar, Divider } from "antd";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex flex-col items-center w-full justify-center">
      <div className="flex w-[90%] my-2 justify-between items-center">
        {/* <span>Ahmad Hameed</span> */}
        <NavLink className="font-bold text-xl sm:text-2xl" to="/">
          <h1>BlueOcean</h1>
        </NavLink>
        <div className="flex">
          <span className="mr-3">
            {/* WELCOME, ADMIN. VIEW SITE / CHANGE PASSWORD / LOG OUT */}
            Welcome to the Admin Pannel of Blue Ocean
          </span>
          <Avatar />
        </div>
      </div>
      <Divider className="m-0" />
    </div>
  );
};

export default Navbar;
