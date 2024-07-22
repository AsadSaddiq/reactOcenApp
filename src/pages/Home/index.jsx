import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../component/Card";
import MotorCard from "../../component/Card/motors";
import FurnitureCard from "../../component/Card/furnitureCard";

import { useGetPropertyApiQuery } from "../../redux/features/property/propertyApi";
import { useGetMotorsApiQuery } from "../../redux/features/motors/motorsApi";
import { useGetFurnitureApiQuery } from "../../redux/features/furniture/furnitureApi";
import { useGetElectronicsApiQuery } from "../../redux/features/electronics/electronics.service";

const Home = () => {
  const navigate = useNavigate();
  const { data: property, isError, isLoading } = useGetPropertyApiQuery();
  const {
    data: motors,
    isMotorsError,
    isMotorsLoading,
  } = useGetMotorsApiQuery();
  const {
    data: furniture,
    isFurnitureError,
    isFurnitureLoading,
  } = useGetFurnitureApiQuery();
  const {
    data: electronics,
    isElectronicsError,
    isElectronicsLoading,
  } = useGetElectronicsApiQuery();

  return (
    <div className="w-full flex justify-center  ">
      <div className="w-[90vw] flex flex-col">
        <div className=" hidden w-full sm:flex h-[250px] border  mt-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"></div>
        <div className="text-[1.5rem] flex items-center  font-[600] mt-4 mb-4">
          <h1>Popular in Residential for Rent</h1>
        </div>
        <div className="flex flex-col ts:grid ts:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 w-full flex-wrap items-center mb-12 sm:mb-0  justify-between ">
          {property?.map((element, index) => {
            return (
              <div
                key={index}
                onClick={() => navigate(`/detail/${element.id}`)}
              >
                <Card element={element} index={index} />
              </div>
            );
          })}
        </div>
        <div className="text-[1.5rem] flex items-center  font-[600] mt-4 mb-4">
          <h1>Popular in Residential for Sale</h1>
        </div>
        <div className="flex flex-col ts:grid ts:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 w-full flex-wrap items-center mb-12 sm:mb-0  justify-between ">
          {property?.map((element, index) => {
            return (
              <div
                key={index}
                onClick={() => navigate(`/detail/${element.id}`)}
              >
                <Card element={element} index={index} />
              </div>
            );
          })}
        </div>
        <div className="text-[1.5rem] flex items-center  font-[600] mt-4 mb-4">
          <h1>Popular in Motors for Sale</h1>
        </div>
        <div className="flex flex-col ts:grid ts:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 w-full flex-wrap items-center mb-12 sm:mb-0  justify-between ">
          {motors?.map((element, index) => {
            return (
              <div
                key={index}
                onClick={() => navigate(`/motors/detail/${element.id}`)}
              >
                <MotorCard element={element} index={index} />
              </div>
            );
          })}
        </div>
        <div className="text-[1.5rem] flex items-center  font-[600] mt-4 mb-4">
          <h1>Popular in Furniture for Sale</h1>
        </div>
        <div className="flex flex-col ts:grid ts:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 w-full flex-wrap items-center mb-12 sm:mb-0  justify-between ">
          {furniture?.map((element, index) => {
            return (
              <div
                key={index}
                onClick={() => navigate(`/furniture/detail/${element.id}`)}
              >
                <FurnitureCard element={element} index={index} />
              </div>
            );
          })}
        </div>
        <div className="text-[1.5rem] flex items-center  font-[600] mt-4 mb-4">
          <h1>Popular in Electronic for Sale</h1>
        </div>
        <div className="flex flex-col ts:grid ts:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 w-full flex-wrap items-center mb-12 sm:mb-0  justify-between ">
          {electronics?.map((element, index) => {
            return (
              <div
                key={index}
                onClick={() => navigate(`/furniture/detail/${element.id}`)}
              >
                <FurnitureCard element={element} index={index} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
