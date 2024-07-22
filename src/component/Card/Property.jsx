import React from "react";
import { Button, Flex } from "antd";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ property }) => {
  console.log(property);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col sm:flex-row mt-6 w-full border rounded-xl">
      <div
        className="flex w-full sm:w-[25vw] sm:min-w-[230px] "
        onClick={() => navigate("/detail")}
      >
        <img
          className="rounded-t-xl sm:rounded-r-none sm:rounded-l-xl"
          src={`http://127.0.0.1:8000${property?.property_images[0]?.image}`}
          alt=""
        />
      </div>
      <div className="grid gap-0 px-1 py-2">
        <div className="flex items-baseline">
          <div className="flex text-lg sm:text-xl font-bold">
            {property?.currency.toUpperCase()} {property?.rent_amount}
          </div>
          <div className="flex text-base ml-2">{property?.rent_period}</div>
        </div>
        <div className="flex text-sm">
          <span>{property?.bed}:bed</span>
          <span className="mx-2">{property?.bathrooms}:bath</span>
          <span>884:sqft</span>
        </div>
        <div className="flex text-sm">{property?.title} </div>
        <div className="flex text-sm font-bold">
          {property?.city} {property?.address}
        </div>

        <div className="flex ">
          <Button
            type="primary"
            className="bg-cyan-100 text-gray-800 flex items-center justify-center"
          >
            <FaEnvelope />
            <span className="sr-only sm:not-sr-only">Email</span>
          </Button>
          <Button
            type="primary"
            className="bg-cyan-400 text-gray-800 mx-2 flex items-center justify-center"
          >
            <FaPhone />
            <span className="sr-only sm:not-sr-only">Call</span>
          </Button>
          <Button
            type="primary"
            className="bg-cyan-600 text-gray-800  flex items-center justify-center"
          >
            <AiOutlineWhatsApp />
            <span className="sr-only sm:not-sr-only">WhatsApp</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
