import React, { useEffect, useState } from "react";
// import PropertyCard from "../../component/Card/Property";
import PropertyCard from "./components/Property";
import { useGetPropertyApiQuery } from "../../redux/features/property/propertyApi";

const PropertyRent = () => {
  const [isForSale, setIsForSale] = useState(true);
  const { data: property, isError, isLoading } = useGetPropertyApiQuery();
  useEffect(() => {
    console.log(property);
  }, [property]);

  const handleToggle = () => {
    setIsForSale((prevState) => !prevState);
  };
  return (
    <div className="flex justify-center w-full items-center   h-full">
      <div className="flex justify-center flex-col w-[90vw]">
        <div className="flex items-center justify-center py-4">
          <button
            className={`px-6 py-2 rounded-l-md ${
              isForSale ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
            }`}
            onClick={handleToggle}
          >
            For Sale
          </button>
          <button
            className={`px-6 py-2 rounded-r-md ${
              !isForSale
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
            onClick={handleToggle}
          >
            For Rent
          </button>
        </div>
        <div className="w-full ">
          <div className="grid ts:grid-cols-2 sm:grid-cols-1 gap-1 w-[60vw] md:w-[70vw] lg:w-[60vw] mb-16">
            {!isLoading && !isError && property && property.length > 0 ? (
              property?.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))
            ) : (
              <p>
                {isLoading
                  ? "Loading..."
                  : isError
                  ? "Error loading properties."
                  : "No properties found."}
              </p>
            )}
          </div>
          <div className="w-[40vw]"></div>
        </div>
      </div>
    </div>
  );
};

export default PropertyRent;
