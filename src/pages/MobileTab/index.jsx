import React, { useEffect } from "react";
import ElectornicsCard from "./components/Electronics";
import { useGetElectronicsApiQuery } from "../../redux/features/electronics/electronics.service";

const Electronics = () => {
  const { data: electronics, isError, isLoading } = useGetElectronicsApiQuery();

  useEffect(() => {
    console.log(electronics);
  }, [electronics]);

  return (
    <div className="flex justify-center w-full items-center h-full">
      <div className="flex justify-center flex-col w-[90vw]">
        <div className="w-full ">
          <div className="grid ts:grid-cols-2 sm:grid-cols-1 gap-1 w-[60vw] md:w-[70vw] lg:w-[60vw] mb-16">
            {!isLoading && !isError && electronics && electronics.length > 0 ? (
              electronics?.map((electronics) => (
                <ElectornicsCard
                  key={electronics.id}
                  electronics={electronics}
                />
              ))
            ) : (
              <p>
                {isLoading
                  ? "Loading..."
                  : isError
                  ? "Error loading electronics."
                  : "No electronics found."}
              </p>
            )}
          </div>
          <div className="w-[40vw]"></div>
        </div>
      </div>
    </div>
  );
};

export default Electronics;
