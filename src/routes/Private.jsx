import React from "react";
import { Routes, Route } from "react-router-dom";
import Admin from "../pages/admin";
import AdminContainer from "../Container/AdminContainer";
import PropertyCreate from "../pages/admin/Property/propertyCreate";
import MotorsForm from "../pages/admin/motors/createMotors";

const Private = () => {
  return (
    <div>
      <Routes>
        <Route path="/admin" element={<AdminContainer />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/property/create" element={<PropertyCreate />} />
          <Route path="/admin/motors/create" element={<MotorsForm />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Private;
