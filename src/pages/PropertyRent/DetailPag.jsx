import React from "react";
import { Button } from "antd";
import { ShareAltOutlined, HeartOutlined } from "@ant-design/icons";
import Amenities from "../../component/Card/Amenities";
import Slider from "./components/slider";
import { useParams } from "react-router-dom";
import { useGetPropertyByIdApiQuery } from "../../redux/features/property/propertyApi";

const DetailPag = () => {
  const { id } = useParams();
  const { data: property, isError, isLoading } = useGetPropertyByIdApiQuery(id);
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  }
  return (
    <div className="flex w-full h-full justify-center">
      <div className="flex w-[90vw] flex-col md:flex-row justify-between mt-6">
        <div className=" w-full">
          <div className="flex w-full md:h-[75vh]   ">
            {!isLoading && <Slider images={property?.property_images} />}
          </div>
          <div className="w-full flex">
            <div className="w-[65%]">
              <div className="flex relative mt-8 flex-col mb-8 ">
                <div className="grid w-full grid-cols-2 justify-between mt-6">
                  <h1 className="text-xl font-bold ">AED 1534 Year</h1>
                  <div className="flex justify-end">
                    <Button
                      type="text"
                      className="hidden border border-gray-300 mr-4  ts:flex items-center"
                    >
                      <HeartOutlined className="text-[16px]" />
                      Favorite
                    </Button>
                    <Button
                      type="text"
                      className=" border flex border-gray-300 items-center justify-center "
                    >
                      <ShareAltOutlined className="items-center text-[18px]" />
                      Share
                    </Button>
                  </div>
                </div>
                <h1 className="text-x">
                  {property?.bedrooms}-room {property?.bed}-bed{" "}
                  {property?.bathrooms}-bat
                </h1>
                <h1 className="text-xl">
                  {property?.city}-{property?.address}
                </h1>
              </div>
              <hr />
              <div className="flex mt-8 flex-col mb-8">
                <div>
                  <h1 className="text-xl font-bold">{property?.title}</h1>
                </div>
                <div className="grid grid-cols-2 gap-1 mt-6">
                  <span className=" font-bold">Type</span>
                  <span className="">{property?.property_type}</span>

                  <span className=" font-bold">Purpose</span>
                  <span className="">{property?.purpose}</span>

                  <span className=" font-bold">Furnishing</span>
                  <span className="">
                    {property?.is_furnished ? "Furnished" : " UnFurnished"}
                  </span>

                  <span className=" font-bold">Available From</span>
                  <span className="">
                    {formatDate(property?.available_from)}
                  </span>

                  <span className=" font-bold">Update</span>
                  <span className="">{formatDate(property?.updated_at)}</span>
                </div>
                <div className="flex text-justify mt-6">
                  <span>{property?.description}</span>
                </div>
                <div className="flex mt-6">
                  <h2>Posted on:</h2>
                  <span className="ml-2">
                    {formatDate(property?.created_at)}
                  </span>
                </div>
              </div>
              <hr />
              <div className="flex mt-8 flex-col mb-8">
                <div>
                  <h1 className="text-xl font-bold ">Amenities</h1>
                </div>
                <div className="grid sm:grid-cols-6 lg:grid-cols-6 grid-cols-3 gap-1 mt-6">
                  {property?.amenities?.map((item, index) => (
                    <Amenities key={index} item={item.name} />
                  ))}
                </div>
              </div>
              <hr />
              <div className="flex mt-8 flex-col mb-8">
                <div>
                  <h1 className="text-xl font-bold">Map View</h1>
                </div>
                <span className="mt-4">
                  Act One | Act Two Towers, Opera District, Downtown Dubai,
                  Dubai, UAE
                </span>
                <div className="w-full sm:h-[55vh]  mt-2">
                  <img
                    className="object-cover w-full h-full rounded-2xl"
                    src="/images/img9.jpg"
                    alt=""
                  />
                </div>
              </div>
              <hr />
              <div className="grid grid-cols-2 mt-8  mb-16">
                <h1 className="text-xl font-bold">More info</h1>
                <div></div>
                <span className="w-[15vw]">PermitNo</span>
                <span className="w-[15vw] font-bold">7132769644</span>
                <span className="w-[15vw]">RERA</span>
                <span className="w-[15vw] font-bold">4769644</span>
                <span className="w-[15vw]">DED</span>
                <span className="w-[15vw] font-bold">8132769</span>
                <span className="w-[15vw]">Reference ID</span>
                <span className="w-[15vw] font-bold">TREO-R-22699</span>
              </div>
              <hr />
            </div>
            <div className="w-[35%]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPag;
