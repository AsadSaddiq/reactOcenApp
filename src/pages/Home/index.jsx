import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../component/Card";
import MotorCard from "../../component/Card/motors";
import FurnitureCard from "../../component/Card/furnitureCard";
import ElectronicsCard from "../../component/Card/ElectronicsCard";
import StreamCard from "../../component/Card/StreamCard";

import { useGetPropertyApiQuery } from "../../redux/features/property/propertyApi";
import { useGetMotorsApiQuery } from "../../redux/features/motors/motorsApi";
import { useGetFurnitureApiQuery } from "../../redux/features/furniture/furnitureApi";
import { useGetElectronicsApiQuery } from "../../redux/features/electronics/electronics.service";
import { useGetStreamDataApiQuery } from "../../redux/features/streams/streams.api";

const getCardComponent = (model) => {
  switch (model) {
    case "Motor":
      return MotorCard;
    case "Furniture":
      return FurnitureCard;
    case "Electronics":
      return ElectronicsCard;
    case "Property":
      return Card;
    default:
      return StreamCard;
  }
};

const Home = () => {
  const navigate = useNavigate();
  const {
    data: property,
    isError: isPropertyError,
    isLoading: isPropertyLoading,
    error: propertyError,
  } = useGetPropertyApiQuery();
  const {
    data: motors,
    isError: isMotorsError,
    isLoading: isMotorsLoading,
    error: motorsError,
  } = useGetMotorsApiQuery();
  const {
    data: furniture,
    isError: isFurnitureError,
    isLoading: isFurnitureLoading,
    error: furnitureError,
  } = useGetFurnitureApiQuery();
  const {
    data: electronics,
    isError: isElectronicsError,
    isLoading: isElectronicsLoading,
    error: electronicsError,
  } = useGetElectronicsApiQuery();
  const {
    data,
    error: streamDataError,
    isLoading: isStreamDataLoading,
  } = useGetStreamDataApiQuery();

  const [parsedData, setParsedData] = useState([]);

  useEffect(() => {
    if (data) {
      try {
        // Directly assign data without categorizing
        setParsedData(data);
      } catch (e) {
        console.error("Failed to parse stream data", e);
      }
    }
  }, [data]);

  const renderSection = (
    title,
    items,
    isLoading,
    isError,
    error,
    cardComponent,
    basePath
  ) => (
    <section>
      <div className="text-[1.5rem] flex items-center font-[600] mt-4 mb-4">
        <h1>{title}</h1>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <>
          <p>Error loading data</p>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </>
      ) : (
        <div className="flex flex-col ts:grid ts:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 w-full flex-wrap items-center mb-12 sm:mb-0 justify-between">
          {items?.map((element) => (
            <div
              key={element.id}
              onClick={() => navigate(`/${basePath}/detail/${element.id}`)}
            >
              {React.createElement(cardComponent, { element })}
            </div>
          ))}
        </div>
      )}
    </section>
  );

  return (
    <div className="w-full flex justify-center">
      <div className="w-[90vw] flex flex-col">
        <div className="hidden w-full sm:flex h-[250px] border mt-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"></div>

        {renderSection(
          "Popular in Residential for Rent",
          property,
          isPropertyLoading,
          isPropertyError,
          propertyError,
          Card,
          "property"
        )}
        {renderSection(
          "Popular in Residential for Sale",
          property,
          isPropertyLoading,
          isPropertyError,
          propertyError,
          Card,
          "property"
        )}
        {renderSection(
          "Popular in Motors for Sale",
          motors,
          isMotorsLoading,
          isMotorsError,
          motorsError,
          MotorCard,
          "motors"
        )}
        {renderSection(
          "Popular in Furniture for Sale",
          furniture,
          isFurnitureLoading,
          isFurnitureError,
          furnitureError,
          FurnitureCard,
          "furniture"
        )}
        {renderSection(
          "Popular in Electronics for Sale",
          electronics,
          isElectronicsLoading,
          isElectronicsError,
          electronicsError,
          ElectronicsCard,
          "electronics"
        )}

        <section>
          <div className="text-[1.5rem] flex items-center font-[600] mt-4 mb-4">
            <h1>Streamed Data</h1>
          </div>
          {isStreamDataLoading ? (
            <p>Loading...</p>
          ) : streamDataError ? (
            <>
              <p>Error loading streamed data</p>
              <pre>{JSON.stringify(streamDataError, null, 2)}</pre>
            </>
          ) : (
            <div className="flex flex-col ts:grid ts:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 w-full flex-wrap items-center mb-12 sm:mb-0 justify-between">
              {parsedData.map((element, index) => {
                const CardComponent = getCardComponent(element.model);
                const itemData = element.data || {}; // Safeguard against undefined data
                return (
                  <div
                    key={itemData.id || index} // Use a fallback key
                    onClick={() =>
                      navigate(
                        `/${element.model.toLowerCase()}/detail/${itemData.id}`
                      )
                    }
                  >
                    {React.createElement(CardComponent, { element: itemData })}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;
