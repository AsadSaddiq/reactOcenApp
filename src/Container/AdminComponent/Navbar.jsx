import { Avatar, Divider } from "antd";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex flex-col items-center w-full justify-center">
      <div className="flex w-[90%] my-2 justify-between items-center">
        <span>Asad</span>
        <div className="flex">
          <span className="mr-3">
            WELCOME, ADMIN. VIEW SITE / CHANGE PASSWORD / LOG OUT
          </span>
          <Avatar />
        </div>
      </div>
      <Divider className="m-0" />
    </div>
  );
};

export default Navbar;
