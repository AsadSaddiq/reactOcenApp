import React from "react";
import { Routes, Route } from "react-router-dom";
import Admin from "../pages/admin";
import AdminContainer from "../Container/AdminContainer";
import PropertyCreate from "../pages/admin/Property/propertyCreate";
import EditPropertyForm from "../pages/admin/Property/EditProperty";
import EditMotorForm from "../pages/admin/motors/EditMotor";
import MotorsForm from "../pages/admin/motors/createMotors";
import FurnitureForm from "../pages/admin/furniture/CreateFurniture";
import EditFurnitureForm from "../pages/admin/furniture/EditFurniture";
import ElectronicsForm from "../pages/admin/electronics/Form";
import EditElectronicsForm from "../pages/admin/electronics/EditElectronics";
const Private = () => {
  return (
    <div>
      <Routes>
        <Route path="/admin" element={<AdminContainer />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/property/create" element={<PropertyCreate />} />
          <Route path="/admin/motors/create" element={<MotorsForm />} />
          <Route path="/admin/furniture/create" element={<FurnitureForm />} />
          <Route
            path="/admin/furniture/edit/:FurnitureId"
            element={<EditFurnitureForm />}
          />
          <Route
            path="/admin/electronics/create"
            element={<ElectronicsForm />}
          />

          <Route
            path="/admin/property/edit/:propertyId"
            element={<EditPropertyForm />}
          />
          <Route
            path="/admin/motor/edit/:motorId"
            element={<EditMotorForm />}
          />
          <Route
            path="/admin/electronics/edit/:ElectronicsId"
            element={<EditElectronicsForm />}
          />
        </Route>
      </Routes>
    </div>
  );
};

export default Private;
