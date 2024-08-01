import React from "react";
import { Button } from "antd";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { LiaBedSolid } from "react-icons/lia";
import { PiBathtubLight } from "react-icons/pi";
import { CiLocationOn, CiRuler } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  const formatNumber = (number) => {
    return parseFloat(number.toString());
  };

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${property.contact_phone}`, "_blank");
  };

  const handleMailClick = () => {
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${property.contact_email}`,
      "_blank"
    );
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${property.contact_phone}`;
  };

  return (
    <div
      className="flex flex-col sm:flex-row mt-6 w-full rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105"
      onClick={() => navigate(`/property/detail/${property.id}`)}
    >
      <div className="flex w-full sm:w-2/4 cursor-pointer">
        <img
          className="object-cover w-full h-64 sm:h-auto"
          src={`${apiUrl}${property?.property_images[0]?.image}`}
          alt="Property"
        />
      </div>
      <div className="flex flex-col justify-between p-4 w-full sm:w-2/3 bg-gradient-to-r from-gray-100 to-gray-50">
        <div>
          <div className="flex items-baseline mb-2">
            <div className="text-2xl font-bold text-blue-600">
              {property?.currency.toUpperCase()}{" "}
              {parseFloat(property?.rent_amount)}
            </div>
            <div className="text-lg font-medium ml-2 text-gray-500">
              {property?.rent_period}
            </div>
          </div>
          <div className="text-sm mt-1 first-letter:capitalize font-medium text-gray-600">
            {property?.property_type}
          </div>

          <div className="flex text-sm font-bold mt-2 text-gray-600 space-x-4">
            <span className="flex items-center">
              <LiaBedSolid className="mr-1" />
              {property?.bed}
            </span>
            <span className="flex items-center">
              <PiBathtubLight className="mr-1" />
              {property?.bathrooms}
            </span>
            <span className="flex items-center">
              <CiRuler className="mr-1" />
              {formatNumber(property?.area)} sqft
            </span>
          </div>
          <div className="font-medium text-lg text-gray-800 mt-2">
            {property?.title}
          </div>

          <div className="text-sm font-bold mt-1 flex items-center text-gray-600">
            <CiLocationOn className="w-4 mr-1" style={{ fontWeight: "bold" }} />
            {property?.city}, {property?.address}
          </div>

          <div className="items-center font-medium mt-2 text-gray-600">
            Rating: **** {property?.ratings}
          </div>
          <div className="items-center font-medium mt-2 text-gray-600">
            Available From: {property?.available_from}
          </div>
        </div>

        <div className="flex mt-4 space-x-2">
          <Button
            type="primary"
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleMailClick}
          >
            <FaEnvelope className="w-5 h-5" />
          </Button>
          <Button
            type="primary"
            className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white"
            onClick={handlePhoneClick}
          >
            <FaPhone
              className="w-5 h-5"
              style={{ transform: "rotate(90deg)" }}
            />
          </Button>
          <Button
            type="primary"
            className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white"
            onClick={handleWhatsAppClick}
          >
            <AiOutlineWhatsApp className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
