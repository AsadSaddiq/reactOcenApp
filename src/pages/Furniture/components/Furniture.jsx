import React from "react";
import { Button } from "antd";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

const FurnitureCard = ({ furniture }) => {
  const navigate = useNavigate();

  const handleWhatsAppClick = (e) => {
    e.stopPropagation(); // Prevents triggering the navigation
    window.open(`https://wa.me/${furniture.contact_phone}`, "_blank");
  };

  const handleMailClick = (e) => {
    e.stopPropagation();
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${furniture.contact_email}`,
      "_blank"
    );
  };

  const handlePhoneClick = (e) => {
    e.stopPropagation();
    window.location.href = `tel:${furniture.contact_phone}`;
  };

  return (
    <div
      className="flex flex-col h-[230px] sm:flex-row mt-4 w-full rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 bg-white"
      onClick={() => navigate(`/furniture/detail/${furniture.id}`)}
    >
      <div className="flex w-full sm:w-2/5 cursor-pointer">
        <img
          className="object-cover w-full h-40 sm:h-auto"
          src={`${apiUrl}${furniture?.images[0]?.image}`}
          alt={furniture?.name}
        />
      </div>
      <div className="flex flex-col justify-between p-4 w-full sm:w-3/5">
        <div>
          <div className="text-xl font-bold text-blue-700 mb-1">
            {furniture?.currency} {parseFloat(furniture?.price)}
          </div>
          <div className="text-lg font-semibold text-gray-700 mb-1 truncate">
            {furniture?.name}
          </div>
          <div className="text-sm font-medium text-gray-600 mb-1 truncate">
            {furniture?.brand_name} - {furniture?.model}
          </div>
          <div className="flex text-xs font-medium text-gray-500 mb-1 truncate w-[80%] justify-between">
            Type: {furniture?.furniture_type}
            <div className="text-xs text-gray-600 mb-1 truncate ">
              Material: {furniture?.material}
            </div>
            <div className="text-xs text-gray-600 mb-1 truncate">
              Color: {furniture?.color}
            </div>
          </div>
          <div className=" flex text-xs text-gray-600 mb-1 truncate w-[80%]  font-medium">
            Dimensions: {furniture?.dimensions}
            <div className="text-xs text-gray-600 mb-1 truncate ml-6">
              Seating Capacity: {furniture?.seating_capacity}
            </div>
          </div>
          <div className="text-xs text-gray-600 mb-1 truncate">
            Eco-Friendly: {furniture?.eco_friendly ? "Yes" : "No"}
          </div>
          <div className="text-xs text-gray-600 flex items-center mt-2 truncate">
            <CiLocationOn className="w-4 h-4 mr-1" />
            {furniture?.location || "Location not specified"}
          </div>
        </div>
        <div className="flex mt-2 space-x-2">
          <Button
            type="primary"
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleMailClick}
          >
            <FaEnvelope className="w-4 h-4" />
          </Button>
          <Button
            type="primary"
            className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white"
            onClick={handlePhoneClick}
          >
            <FaPhone className="w-4 h-4" />
          </Button>
          <Button
            type="primary"
            className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white"
            onClick={handleWhatsAppClick}
          >
            <AiOutlineWhatsApp className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FurnitureCard;
