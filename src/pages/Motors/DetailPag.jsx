import React from "react";
import { Button } from "antd";
import { ShareAltOutlined, HeartOutlined } from "@ant-design/icons";
import Feature from "../../component/Card/feature";
import Slider from "../PropertyRent/components/slider";
import { useParams } from "react-router-dom";
import { useGetMotorsByIdApiQuery } from "../../redux/features/motors/motorsApi";
import { GiCarDoor } from "react-icons/gi";
import { IoIosSpeedometer } from "react-icons/io";
import { BsFillEvStationFill } from "react-icons/bs";
import { AiTwotoneSetting } from "react-icons/ai";
import { FaCalendarAlt } from "react-icons/fa";

const DetailPag = () => {
  const { id } = useParams();
  const { data: motors, isError, isLoading } = useGetMotorsByIdApiQuery(id);
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
            {!isLoading && <Slider images={motors?.images} />}
          </div>
          <div className="w-full flex">
            <div className="w-[65%]">
              <div className="flex relative mt-8 flex-col mb-8 ">
                <div className="grid w-full grid-cols-2 justify-between mt-6">
                  <h1 className="text-xl font-bold ">
                    {motors?.currency} {motors?.price}
                  </h1>
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
                <h1 className="text-x">{motors?.location}</h1>
              </div>
              <hr />
              <div className="grid grid-cols-4 gap-2 py-2">
                <div className=" flex flex-col items-center justify-center p-4 bg-gray-100">
                  <span className="font-semibold">MODEL</span>
                  <FaCalendarAlt className="text-3xl" />
                  <span className="flex font-bold">{motors?.model}</span>
                </div>
                <div className=" flex flex-col items-center justify-center p-4 bg-gray-100">
                  <span className="font-semibold">KILOMETERS</span>
                  <IoIosSpeedometer className="text-3xl" />
                  <span className="flex font-bold">
                    {motors?.kilometers_driven}
                  </span>
                </div>
                <div className=" flex flex-col items-center justify-center p-8 bg-gray-100">
                  <span className="font-semibold">FULE-TYPE</span>
                  <BsFillEvStationFill className="text-3xl" />
                  <span className="flex font-bold">{motors?.fuel_type}</span>
                </div>
                <div className=" flex flex-col items-center justify-center p-8 bg-gray-100">
                  <span className="font-semibold">TRANSMISSION</span>
                  <AiTwotoneSetting className="text-3xl" />
                  <span className="flex font-bold">{motors?.transmission}</span>
                </div>
              </div>
              <hr />
              <div className="flex mt-8 flex-col mb-8">
                <div>
                  <h1 className="text-xl font-bold">{motors?.title}</h1>
                </div>
                <span className="text-2xl font-bold">Additional Detail</span>

                <div className="grid grid-cols-2 gap-0 mt-6">
                  <span className="font-bold p-2 bg-gray-200">Name</span>
                  <span className="p-2 bg-gray-200">
                    {motors?.name.toUpperCase()}
                  </span>

                  <span className="font-bold p-2 bg-gray-300">Brand Name</span>
                  <span className="p-2 bg-gray-300">
                    {motors?.brand_name.toUpperCase()}
                  </span>

                  <span className="font-bold p-2 bg-gray-200">Torque</span>
                  <span className="p-2 bg-gray-200">{motors?.torque} Nm</span>

                  <span className="font-bold p-2 bg-gray-300">
                    Manufacturer
                  </span>
                  <span className="p-2 bg-gray-300">
                    {motors?.manufacturer}
                  </span>

                  <span className="font-bold p-2 bg-gray-200">Model</span>
                  <span className="p-2 bg-gray-200">{motors?.model}</span>

                  <span className="font-bold p-2 bg-gray-300">Max Speed</span>
                  <span className="p-2 bg-gray-300">
                    {motors?.max_speed} Km
                  </span>

                  <span className="font-bold p-2 bg-gray-200">
                    Acceleration
                  </span>
                  <span className="p-2 bg-gray-200">
                    {motors?.acceleration} m/s²
                  </span>

                  <span className="font-bold p-2 bg-gray-300">
                    Fuel Capacity
                  </span>
                  <span className="p-2 bg-gray-300">
                    {motors?.fuel_capacity} L
                  </span>

                  <span className="font-bold p-2 bg-gray-200">Mileage</span>
                  <span className="p-2 bg-gray-200">{motors?.mileage} Km</span>

                  <span className="font-bold p-2 bg-gray-300">Color</span>
                  <span className="p-2 bg-gray-300">{motors?.color}</span>

                  <span className="font-bold p-2 bg-gray-200">
                    Seating Capacity
                  </span>
                  <span className="p-2 bg-gray-200">
                    {motors?.seating_capacity}
                  </span>

                  <span className="font-bold p-2 bg-gray-300">
                    Safety Rating
                  </span>
                  <span className="p-2 bg-gray-300">
                    {motors?.safety_rating} / 5
                  </span>

                  <span className="font-bold p-2 bg-gray-200">
                    Warranty Years
                  </span>
                  <span className="p-2 bg-gray-200">
                    {motors?.warranty_years}
                  </span>

                  <span className="font-bold p-2 bg-gray-300">
                    Insurance Expiry
                  </span>
                  <span className="p-2 bg-gray-300">
                    {motors?.insurance_expiry_date}
                  </span>
                </div>

                <div className="flex text-justify mt-6">
                  <span>{motors?.description}</span>
                </div>
                <div className="flex mt-6">
                  <h2>Posted on:</h2>
                  <span className="ml-2">{formatDate(motors?.date_added)}</span>
                </div>
              </div>
              <hr />
              <div className="flex mt-8 flex-col mb-8">
                <div>
                  <h1 className="text-xl font-bold ">Feature</h1>
                </div>
                <div className="grid sm:grid-cols-6 lg:grid-cols-6 grid-cols-3 gap-1 mt-6">
                  {motors?.features?.map((item, index) => (
                    <Feature key={index} item={item.name} />
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
              <div className="mt-8">
                <h1 className="text-xl font-bold">More info</h1>
                <h1 className="font-bold">SPARE PARTS</h1>
                <table className="w-full mt-2">
                  <thead>
                    <tr>
                      <th className="bg-gray-200 p-1 text-left">Brand Name</th>
                      <th className="bg-gray-200 p-1 text-left">Part Type</th>
                      <th className="bg-gray-200 p-1 text-left">
                        Manufacturer
                      </th>
                      <th className="bg-gray-200 p-1 text-left">
                        Model Number
                      </th>
                      <th className="bg-gray-200 p-1 text-left">
                        Warranty Period
                      </th>
                      <th className="bg-gray-200 p-1 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {motors?.spare_parts_related?.map((item, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? "bg-gray-300" : "bg-gray-200"
                        }`}
                      >
                        <td className="p-1">{item.brand_name}</td>
                        <td className="p-1">{item.part_type}</td>
                        <td className="p-1">{item.manufacturer}</td>
                        <td className="p-1">{item.model_number}</td>
                        <td className="p-1">{item.warranty_period}</td>
                        <td className="p-1">{item.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8">
                <h1 className="font-bold">RATING</h1>
                <table className="w-full mt-2">
                  <thead>
                    <tr>
                      <th className="bg-gray-200 p-1 text-left">Part</th>
                      <th className="bg-gray-200 p-1 text-left">Rating</th>
                      <th className="bg-gray-200 p-1 text-left">Rated By</th>
                      <th className="bg-gray-200 p-1 text-left">Date Rated</th>
                      <th className="bg-gray-200 p-1 text-left">Review</th>
                    </tr>
                  </thead>
                  <tbody>
                    {motors?.ratings?.map((item, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? "bg-gray-300" : "bg-gray-200"
                        }`}
                      >
                        <td className="p-1">{item.part}</td>
                        <td className="p-1">{item.rating}</td>
                        <td className="p-1">{item.rated_by}</td>
                        <td className="p-1">{formatDate(item.date_rated)}</td>
                        <td className="p-1">{item.review}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 mb-16">
                <h1 className="font-bold">REPAINT</h1>
                <table className="w-full mt-2">
                  <thead>
                    <tr>
                      <th className="bg-gray-200 p-1 text-left">Color Brand</th>
                      <th className="bg-gray-200 p-1 text-left">Color Name</th>
                      <th className="bg-gray-200 p-1 text-left">Color Date</th>
                      <th className="bg-gray-200 p-1 text-left">
                        Repaint Shop
                      </th>
                      <th className="bg-gray-200 p-1 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {motors?.repaints?.map((item, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? "bg-gray-300" : "bg-gray-200"
                        }`}
                      >
                        <td className="p-1">{item.color_brand}</td>
                        <td className="p-1">{item.color_Name}</td>
                        <td className="p-1">{formatDate(item.date)}</td>
                        <td className="p-1">{item.repaint_shop}</td>
                        <td className="p-1">{item.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
