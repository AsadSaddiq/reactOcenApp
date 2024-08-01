import React from "react";
const apiUrl = import.meta.env.VITE_API_URL;

const FurnitureCard = ({ element, index }) => {
  // console.log(element);
  return (
    <div
      key={index}
      className="flex w-full flex-col mb-4 rounded-md hover:bg-gray-200 hover:shadow-xl border"
    >
      <div className="w-full h-32 overflow-hidden">
        <img
          className="rounded-t-md w-full h-full object-cover"
          src={`${apiUrl}${element?.images[0]?.image}`}
        />
      </div>
      <div className="flex flex-col p-2">
        <span className="flex items-center text-blue-700 font-semibold">
          {element?.name} {element?.brand_name}
        </span>
        <span className="flex items-center whitespace-nowrap overflow-hidden text-ellipsis font-semibold">
          {element?.price} {element?.currency}
        </span>
        <span className="flex items-center whitespace-nowrap overflow-hidden text-ellipsis font-semibold">
          {element?.location}
        </span>
      </div>
    </div>
  );
};

export default FurnitureCard;
