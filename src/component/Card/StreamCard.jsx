import React from "react";

const StreamCard = ({ element, index }) => {
  // Log the element for debugging
  console.log(element);

  // Determine the image source
  const imageSrc =
    element?.property_images && element.property_images.length > 0
      ? `http://127.0.0.1:8000/${element.property_images[0].image}`
      : "path_to_default_image"; // Provide a default image path or use a placeholder

  return (
    <div
      key={index}
      className="flex w-full flex-col mb-4 rounded-md hover:bg-gray-200 hover:shadow-xl border"
    >
      <div className="w-full h-32 overflow-hidden">
        <img
          className="rounded-t-md w-full h-full object-cover"
          src={imageSrc}
          alt={element?.name || "Default Image"}
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

export default StreamCard;
