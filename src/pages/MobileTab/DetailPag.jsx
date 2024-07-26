import React from "react";
import { Button } from "antd";
import { ShareAltOutlined, HeartOutlined } from "@ant-design/icons";
import Feature from "../../component/Card/feature";
import Slider from "../PropertyRent/components/slider";
import { useParams } from "react-router-dom";
import { useGetElectronicsByIdApiQuery } from "../../redux/features/electronics/electronics.service";
import { FaCalendarAlt } from "react-icons/fa";

const DetailPage = () => {
  const { id } = useParams();
  const {
    data: electronics,
    isError,
    isLoading,
  } = useGetElectronicsByIdApiQuery(id);

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  }

  return (
    <div className="flex w-full h-full justify-center">
      <div className="flex w-[90vw] flex-col md:flex-row justify-between mt-6">
        <div className="w-full">
          <div className="flex w-full md:h-[75vh]">
            {!isLoading && electronics && (
              <Slider images={electronics?.images} />
            )}
          </div>
          <div className="w-full flex">
            <div className="w-[65%]">
              <div className="flex relative mt-8 flex-col mb-8">
                <div className="grid w-full grid-cols-2 justify-between mt-6">
                  <h1 className="text-xl font-bold">
                    {electronics?.currency} {electronics?.price}
                  </h1>
                  <div className="flex justify-end">
                    <Button
                      type="text"
                      className="hidden border border-gray-300 mr-4 ts:flex items-center"
                    >
                      <HeartOutlined className="text-[16px]" />
                      Favorite
                    </Button>
                    <Button
                      type="text"
                      className="border flex border-gray-300 items-center justify-center"
                    >
                      <ShareAltOutlined className="items-center text-[18px]" />
                      Share
                    </Button>
                  </div>
                </div>
                <h1 className="text-x">{electronics?.location}</h1>
              </div>
              <hr />
              <div className="grid grid-cols-4 gap-2 py-2">
                <div className="flex flex-col items-center justify-center p-4 bg-gray-100">
                  <span className="font-semibold">MODEL</span>
                  <FaCalendarAlt className="text-3xl" />
                  <span className="flex font-bold">
                    {electronics?.model_number}
                  </span>
                </div>
              </div>
              <hr />
              <div className="flex mt-8 flex-col mb-8">
                <div>
                  <h1 className="text-xl font-bold">{electronics?.name}</h1>
                </div>
                <span className="text-2xl font-bold">Additional Details</span>

                <div className="grid grid-cols-2 gap-0 mt-6">
                  <span className="font-bold p-2 bg-gray-300">Name</span>
                  <span className="p-2 bg-gray-300">
                    {electronics?.name.toUpperCase()}
                  </span>

                  <span className="font-bold p-2 bg-gray-200">Brand</span>
                  <span className="p-2 bg-gray-200">
                    {electronics?.brand.toUpperCase()}
                  </span>

                  <span className="font-bold p-2 bg-gray-300">
                    Manufacturer
                  </span>
                  <span className="p-2 bg-gray-300">
                    {electronics?.manufacturer}
                  </span>

                  <span className="font-bold p-2 bg-gray-200">
                    Model Number
                  </span>
                  <span className="p-2 bg-gray-200">
                    {electronics?.model_number}
                  </span>

                  <span className="font-bold p-2 bg-gray-300">Color</span>
                  <span className="p-2 bg-gray-300">{electronics?.color}</span>

                  <span className="font-bold p-2 bg-gray-200">
                    Warranty Period
                  </span>
                  <span className="p-2 bg-gray-200">
                    {electronics?.warranty_period} months
                  </span>

                  <span className="font-bold p-2 bg-gray-300">
                    Insurance Expiry
                  </span>
                  <span className="p-2 bg-gray-300">
                    {formatDate(electronics?.insurance_expiry_date)}
                  </span>

                  <span className="font-bold p-2 bg-gray-200">
                    Battery Life
                  </span>
                  <span className="p-2 bg-gray-200">
                    {electronics?.battery_life} hours
                  </span>

                  <span className="font-bold p-2 bg-gray-300">
                    Battery Type
                  </span>
                  <span className="p-2 bg-gray-300">
                    {electronics?.battery_type}
                  </span>

                  <span className="font-bold p-2 bg-gray-200">Processor</span>
                  <span className="p-2 bg-gray-200">
                    {electronics?.processor}
                  </span>

                  <span className="font-bold p-2 bg-gray-300">RAM</span>
                  <span className="p-2 bg-gray-300">{electronics?.ram} GB</span>

                  <span className="font-bold p-2 bg-gray-200">
                    Storage Capacity
                  </span>
                  <span className="p-2 bg-gray-200">
                    {electronics?.storage_capacity} GB
                  </span>

                  <span className="font-bold p-2 bg-gray-300">Screen Size</span>
                  <span className="p-2 bg-gray-300">
                    {electronics?.screen_size} inches
                  </span>

                  <span className="font-bold p-2 bg-gray-200">Resolution</span>
                  <span className="p-2 bg-gray-200">
                    {electronics?.resolution}
                  </span>

                  <span className="font-bold p-2 bg-gray-300">Screen Type</span>
                  <span className="p-2 bg-gray-300">
                    {electronics?.screen_type}
                  </span>

                  <span className="font-bold p-2 bg-gray-200">
                    Operating System
                  </span>
                  <span className="p-2 bg-gray-200">
                    {electronics?.operating_system}
                  </span>

                  <span className="font-bold p-2 bg-gray-300">
                    Software Included
                  </span>
                  <span className="p-2 bg-gray-300">
                    {electronics?.software_included}
                  </span>

                  <span className="font-bold p-2 bg-gray-200">
                    Connectivity
                  </span>
                  <span className="p-2 bg-gray-200">
                    {electronics?.connectivity}
                  </span>

                  <span className="font-bold p-2 bg-gray-300">
                    Eco Friendly
                  </span>
                  <span className="p-2 bg-gray-300">
                    {electronics?.eco_friendly ? "Yes" : "No"}
                  </span>

                  <span className="font-bold p-2 bg-gray-200">
                    Water Resistant
                  </span>
                  <span className="p-2 bg-gray-200">
                    {electronics?.water_resistant ? "Yes" : "No"}
                  </span>

                  <span className="font-bold p-2 bg-gray-300">
                    Included Accessories
                  </span>
                  <span className="p-2 bg-gray-300">
                    {electronics?.included_accessories}
                  </span>

                  <span className="font-bold p-2 bg-gray-200">
                    Maintenance Instructions
                  </span>
                  <span className="p-2 bg-gray-200">
                    {electronics?.maintenance_instructions}
                  </span>

                  <span className="font-bold p-2 bg-gray-300">
                    Usage Instructions
                  </span>
                  <span className="p-2 bg-gray-300">
                    {electronics?.usage_instructions}
                  </span>

                  <span className="font-bold p-2 bg-gray-200">
                    Support Contact
                  </span>
                  <span className="p-2 bg-gray-200">
                    {electronics?.support_contact}
                  </span>

                  <span className="font-bold p-2 bg-gray-300">Weight</span>
                  <span className="p-2 bg-gray-300">
                    {electronics?.weight} {electronics?.weight_unit}
                  </span>

                  <span className="font-bold p-2 bg-gray-200">Dimensions</span>
                  <span className="p-2 bg-gray-200">
                    {electronics?.dimensions} {electronics?.dimension_unit}
                  </span>
                </div>

                <div className="flex text-justify mt-6">
                  <span>{electronics?.description}</span>
                </div>
                <div className="flex mt-6">
                  <h2>Posted on:</h2>
                  <span className="ml-2">
                    {formatDate(electronics?.date_added)}
                  </span>
                </div>
              </div>
              <hr />
              <div className="flex mt-8 flex-col mb-8">
                <div>
                  <h1 className="text-xl font-bold">Feature</h1>
                </div>
                <div className="grid sm:grid-cols-6 lg:grid-cols-6 grid-cols-3 gap-1 mt-6">
                  {electronics?.features?.map((item, index) => (
                    <Feature key={index} item={item.name} />
                  ))}
                </div>
              </div>
              <hr />
              <div className="flex mt-8 flex-col mb-8">
                <div>
                  <h1 className="text-xl font-bold">Map View</h1>
                </div>
                <span className="mt-4">{electronics?.location}</span>
                <div className="w-full sm:h-[55vh] mt-2">
                  <img
                    className="object-cover w-full h-full rounded-2xl"
                    src="/images/img9.jpg"
                    alt="Map"
                  />
                </div>
              </div>
              {/* <hr />
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
                    {electronics?.spare_parts_related?.map((item, index) => (
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
              </div> */}
            </div>
            <div className="w-[30%]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
