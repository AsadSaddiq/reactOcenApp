import React from "react";
const apiUrl = import.meta.env.VITE_API_URL;

const Card = ({ element, index }) => {
  return (
    <div
      key={index}
      className="flex w-full flex-col mb-4 rounded-md hover:bg-gray-200 hover:shadow-xl border"
    >
      <div className="w-full h-32 overflow-hidden">
        <img
          className="rounded-t-md w-full h-full object-cover"
          src={`${apiUrl}${element.property_images[0].image}`}
          alt=""
        />
      </div>
      <div className="flex flex-col p-2">
        <span className="flex items-center text-blue-700 font-semibold">
          {element?.currency.toUpperCase()} {element.rent_amount}
        </span>
        <span className="flex items-center whitespace-nowrap overflow-hidden text-ellipsis font-semibold">
          {element?.title}
        </span>
        <span className="flex items-center whitespace-nowrap overflow-hidden text-ellipsis font-semibold">
          {element?.bed} bed, {element?.bathrooms} bath, {element?.area} sqft
        </span>
        <span className="flex items-center overflow-hidden">
          {element.location}
        </span>
      </div>
    </div>
  );
};

export default Card;
