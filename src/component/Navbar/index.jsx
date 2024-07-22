import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { IoFilter } from "react-icons/io5";
import { MdOutlineAddBox } from "react-icons/md";

import {
  BellOutlined,
  HistoryOutlined,
  InsertRowBelowOutlined,
  CommentOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import Cookies from "js-cookie";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../store/slices/UserSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  const [loginUser, setLoginUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get("accessToken")) {
      setLoginUser(true);
    }
  });
  const profile = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/users/me",
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    };
    axios
      .request(config)
      .then((response) => {
        dispatch(login(response.data));
        navigate("/me");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const logout = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/users/logout",
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    };
    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        Cookies.remove("accessToken");
        setLoginUser(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="flex w-full h-14 items-center justify-center">
        <div className="flex w-[90vw] border-b-[1px] border-gray-400 h-full items-center justify-between">
          <div className="flex sm:ml-4">
            <NavLink className="font-bold text-xl sm:text-2xl" to="/">
              <h1>BlueOcean</h1>
            </NavLink>
          </div>
          <div className="flex items-center">
            <NavLink
              className=" flex   flex-col items-center justify-center mr-4 ml-4 text-gray-500 text-xl md:text-sm"
              to="/"
            >
              <BellOutlined className="" />
              <span className="hidden md:flex ">Notification</span>
            </NavLink>
            <NavLink
              className="hidden sm:flex flex-col items-center justify-center mr-4 ml-4 text-gray-500 text-xl md:text-sm"
              to="about"
            >
              <IoFilter />
              <span className="hidden md:flex ">Filter</span>
            </NavLink>
            <NavLink
              className="hidden sm:flex flex-col items-center justify-center mr-4 ml-4 text-gray-500 text-xl md:text-sm"
              to="favorites"
            >
              <HeartOutlined />
              <span className="hidden md:flex ">Favorites</span>
            </NavLink>
            <NavLink
              className="hidden sm:flex flex-col items-center justify-center mr-4 ml-4 text-gray-500 text-xl md:text-sm"
              to="login"
            >
              <CommentOutlined />
              <span className="hidden md:flex ">Chat</span>
            </NavLink>
            <NavLink
              className="flex flex-col items-center justify-center mr-4 ml-4 text-gray-500 text-xl md:text-sm"
              to="admin"
            >
              <MdOutlineAddBox />
              <span className="hidden md:flex ">My Add</span>
            </NavLink>
            {loginUser ? (
              <div className="flex flex-col cursor-pointer">
                <span onClick={profile}>me</span>
                <span onClick={logout}>logout</span>
              </div>
            ) : (
              <NavLink
                className="flex flex-col items-center justify-center sm:mr-4 ml-4 text-gray-500 text-sm"
                to="/me"
              >
                <Avatar icon={<UserOutlined />} />
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
