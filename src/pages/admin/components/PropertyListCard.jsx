import React from "react";
import { useNavigate } from "react-router-dom";

const PropertyListCard = ({ property }) => {
  const navigate = useNavigate();
  console.log(property);
  return (
    <div className="flex flex-col mt-2 w-full border rounded-lg">
      <div
        className="flex w-full "
        onClick={() => navigate("/admin/property/create")}
      >
        <img
          className="rounded-l-lg w-24 sm:rounded-r-none sm:rounded-l-xl"
          src={`http://127.0.0.1:8000/${property?.property_images[0]?.image}`}
          alt=""
        />

        <div className="flex flex-col w-full  mx-2 justify-center">
          <div className="flex text-lg sm:text-md font-bold">
            A villa foe rent
          </div>
          <div className="flex w-full  justify-between">
            <div className="flex text-base ">
              {property?.currency.toUpperCase()} {property?.rent_amount}
            </div>
            <span>{property?.available_from}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyListCard;
