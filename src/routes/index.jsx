import React from "react";
import { Routes, Route } from "react-router-dom";
import Private from "./Private";
import Public from "./Public";
import ScrollToTop from "../component/ScroolToTop";

const RoutesComponent = () => {
  return (
    <>
      <ScrollToTop />
      <Private />
      <Public />
    </>
  );
};

export default RoutesComponent;
