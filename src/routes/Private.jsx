import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminContainer from "../Container/AdminContainer";
import Admin from "../pages/admin";
import PropertyTable from "../pages/admin/Property/PropertyTable";
import MotorsTable from "../pages/admin/motors/motorsTable";
import FurnitureTable from "../pages/admin/furniture/Table";
import ElectronicsTable from "../pages/admin/electronics/table";
import PropertyCreate from "../pages/admin/Property/propertyCreate";
import EditPropertyForm from "../pages/admin/Property/EditProperty";
import MotorsForm from "../pages/admin/motors/createMotors";
import EditMotorForm from "../pages/admin/motors/EditMotor";
import FurnitureForm from "../pages/admin/furniture/CreateFurniture";
import EditFurnitureForm from "../pages/admin/furniture/EditFurniture";
import ElectronicsForm from "../pages/admin/electronics/Form";
import EditElectronicsForm from "../pages/admin/electronics/EditElectronics";
const Private = () => {
  return (
    <div>
      <Routes>
        <Route path="/admin" element={<AdminContainer />}>
          <Route path="/admin" element={<Admin />}>
            <Route path="property" element={<PropertyTable />} />
            <Route path="motors" element={<MotorsTable />} />
            <Route path="furniture" element={<FurnitureTable />} />
            <Route path="electronics" element={<ElectronicsTable />} />
            <Route path="jobs" element={<div>Jobs Table Placeholder</div>} />
            <Route
              path="community"
              element={<div>Community Table Placeholder</div>}
            />
          </Route>
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
          <Route path="/admin/motor/edit/:id" element={<EditMotorForm />} />
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
