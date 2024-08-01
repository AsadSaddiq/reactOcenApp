import React, { useEffect } from "react";
import MotorCard from "./components/motor";
import { useGetMotorsApiQuery } from "../../redux/features/motors/motorsApi";

const Motors = () => {
  const { data: motors, isError, isLoading } = useGetMotorsApiQuery();

  return (
    <div className="flex justify-center w-full items-center h-full">
      <div className="flex justify-center flex-col w-[90vw]">
        <div className="w-full ">
          <div className="grid ts:grid-cols-2 sm:grid-cols-1 gap-1 w-[60vw] md:w-[70vw] lg:w-[60vw] mb-16">
            {!isLoading && !isError && motors && motors.length > 0 ? (
              motors?.map((motor) => <MotorCard key={motor.id} motor={motor} />)
            ) : (
              <p>
                {isLoading
                  ? "Loading..."
                  : isError
                  ? "Error loading motors."
                  : "No motors found."}
              </p>
            )}
          </div>
          <div className="w-[40vw]"></div>
        </div>
      </div>
    </div>
  );
};

export default Motors;
