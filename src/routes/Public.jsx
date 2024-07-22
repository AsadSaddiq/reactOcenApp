import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import DetailPag from "../pages/PropertyRent/DetailPag";
import Motors from "../pages/Motors";
import Favorites from "../pages/Favorites";
import Jobs from "../pages/Jobs";
import MobileTab from "../pages/MobileTab";
import PropertyRent from "../pages/PropertyRent";
import PropertySale from "../pages/PropertySale";
import Classifieds from "../pages/Classifieds";
import Furniture from "../pages/Furniture";
import Community from "../pages/Community";
import PageContainer from "../Container/PageContainer";
import MotorsDetailPag from "../pages/Motors/DetailPag";
import FurnitureDetailPage from "../pages/Furniture/furnitureDetail";

const Public = () => {
  return (
    <div>
      <Routes>
        <Route path="/me" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PageContainer />}>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<DetailPag />} />
          <Route path="/motors/detail/:id" element={<MotorsDetailPag />} />
          <Route path="/motors" element={<Motors />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/mobile&tab" element={<MobileTab />} />
          <Route path="/property/rent" element={<PropertyRent />} />
          <Route path="/property/sale" element={<PropertySale />} />
          <Route path="/classifieds" element={<Classifieds />} />
          <Route path="/furniture" element={<Furniture />} />
          <Route
            path="/furniture/detail/:id"
            element={<FurnitureDetailPage />}
          />
          <Route path="/community" element={<Community />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Public;
