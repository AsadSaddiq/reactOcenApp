import React, { useState } from "react";
import MotorsTable from "./motors/motorsTable";
import PropertyTable from "./Property/PropertyTable";
import ElectronicsTable from "./electronics/table";
import FurnitureTable from "./furniture/Table";

const DashboardArea = () => {
  const [selectedSection, setSelectedSection] = useState("Property");

  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  return (
    <div className="flex justify-center flex-col w-full items-center h-full">
      <div className="flex flex-col justify-center items-center w-[90vw] md:w-[90vw] lg:w:[90vw] mb-16">
        <div className="grid gap-0 grid-cols-6 w-full items-center mt-1 ">
          {[
            "Property",
            "Motors",
            "Furniture",
            "Electronic",
            "Jobs",
            "Community",
          ].map((section) => (
            <div
              key={section}
              onClick={() => handleSectionClick(section)}
              className={`flex p-2 border items-center justify-center  cursor-pointer font-bold ${
                selectedSection === section
                  ? "bg-blue-300 text-white"
                  : "bg-gray-200"
              }`}
            >
              {section}
            </div>
          ))}
        </div>
        <div className="w-full">
          {selectedSection === "Property" && <PropertyTable />}
          {selectedSection === "Motors" && <MotorsTable />}
          {selectedSection === "Jobs" && <div>Jobs Table Placeholder</div>}
          {selectedSection === "Furniture" && (
            <div>
              <FurnitureTable />
            </div>
          )}
          {selectedSection === "Electronic" && (
            <div>
              <ElectronicsTable />
            </div>
          )}
          {selectedSection === "Community" && (
            <div>Community Table Placeholder</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardArea;
