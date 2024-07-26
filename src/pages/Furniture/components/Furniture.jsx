import React from "react";
import { Button } from "antd";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const FurnitureCard = ({ furniture }) => {
  const navigate = useNavigate();

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${furniture.contact_phone}`, "_blank");
  };

  const handleMailClick = () => {
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${furniture.contact_email}`,
      "_blank"
    );
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${furniture.contact_phone}`;
  };

  return (
    <div className="flex flex-col sm:flex-row mt-6 w-full rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105">
      <div
        className="flex w-full sm:w-2/4 cursor-pointer"
        onClick={() => navigate(`/furniture/detail/${furniture.id}`)}
      >
        <img
          className="object-cover w-full h-64 sm:h-auto"
          src={`http://127.0.0.1:8000${furniture?.images[0]?.image}`}
          alt="Motor"
        />
      </div>
      <div className="flex flex-col justify-between p-4 w-full sm:w-2/3 bg-gradient-to-r from-gray-100 to-gray-50">
        <div>
          <div className="flex items-baseline mb-2">
            <div className="text-2xl font-bold text-blue-600">
              {furniture?.currency.toUpperCase()} {furniture?.price}
            </div>
          </div>
          <div className="text-sm mt-1 first-letter:capitalize font-medium text-gray-600">
            {furniture?.brand_name} - {furniture?.model} ({furniture?.year})
          </div>
          {/* <div className="flex text-sm font-bold mt-2 text-gray-600 space-x-4">
            <span className="flex items-center">
              Engine Capacity: {motor?.engine_capacity} cc
            </span>
            <span className="flex items-center">
              Horsepower: {motor?.horsepower} hp
            </span>
          </div> */}
          <div className="font-medium text-lg text-gray-800 mt-2">
            {furniture?.name}
          </div>
          <div className="text-sm font-bold mt-1 flex items-center text-gray-600">
            <CiLocationOn className="w-4 mr-1" style={{ fontWeight: "bold" }} />
            {furniture?.location || "Location not specified"}
          </div>
          {/* <div className="items-center font-medium mt-2 text-gray-600">
            Mileage: {motor?.mileage} km
          </div> */}
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

export default FurnitureCard;
