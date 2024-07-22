import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import CategoriesBar from "../pages/admin/components/CategoriesBar";
import Navbar from "./AdminComponent/Navbar";

const AdminContainer = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen ">
        <Navbar />

        <div className="flex-1 overflow-y-auto  ">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminContainer;
