import React, { useEffect } from "react";
import FurnitureCard from "./components/Furniture";
import { useGetFurnitureApiQuery } from "../../redux/features/furniture/furnitureApi";

const Furniture = () => {
  const { data: furniture, isError, isLoading } = useGetFurnitureApiQuery();

  useEffect(() => {
    console.log(furniture);
  }, [furniture]);

  return (
    <div className="flex justify-center w-full items-center h-full">
      <div className="flex justify-center flex-col w-[90vw]">
        <div className="w-full ">
          <div className="grid ts:grid-cols-2 sm:grid-cols-1 gap-1 w-[60vw] md:w-[70vw] lg:w-[60vw] mb-16">
            {!isLoading && !isError && furniture && furniture.length > 0 ? (
              furniture?.map((furniture) => (
                <FurnitureCard key={furniture.id} furniture={furniture} />
              ))
            ) : (
              <p>
                {isLoading
                  ? "Loading..."
                  : isError
                  ? "Error loading furniture."
                  : "No furniture found."}
              </p>
            )}
          </div>
          <div className="w-[40vw]"></div>
        </div>
      </div>
    </div>
  );
};

export default Furniture;
