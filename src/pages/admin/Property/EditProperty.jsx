import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  message,
} from "antd";
import moment from "moment";
import {
  useGetPropertyByIdApiQuery,
  useUpdatePropertyApiMutation,
  useGetAmenitiesApiQuery,
} from "../../../redux/features/property/propertyApi";

const { TextArea } = Input;

const EditPropertyForm = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const [updateProperty] = useUpdatePropertyApiMutation();
  const {
    data: property,
    isLoading: propertyLoading,
    error: propertyError,
  } = useGetPropertyByIdApiQuery(propertyId);
  const {
    data: amenities,
    isLoading: amenitiesLoading,
    error: amenitiesError,
  } = useGetAmenitiesApiQuery();

  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  useEffect(() => {
    if (property) {
      console.log("Fetched property data:", property);

      form.setFieldsValue({
        ...property,
        available_from: property.available_from
          ? moment(property.available_from)
          : null,
        insurance_expiry_date: property.insurance_expiry_date
          ? moment(property.insurance_expiry_date)
          : null,
        amenities:
          property.amenities?.map((amenity) => amenity.id.toString()) || [],
      });

      if (property.property_images) {
        console.log("Property images:", property.property_images);

        const newFileList = property.property_images.map((img) => {
          console.log("Mapping image:", img);
          return {
            uid: img.id.toString(),
            name: img.image.split("/").pop(),
            status: "done",
            url: `http://127.0.0.1:8000${img.property_images}`,
          };
        });

        console.log("New fileList before set:", newFileList);
        setFileList(newFileList);
        console.log("Updated fileList state:", newFileList);
      } else {
        console.warn("No images found in motor object.");
      }
    } else {
      console.warn("No motor data available.");
    }
  }, [property, form]);

  // useEffect(() => {
  //   if (property) {
  //     form.setFieldsValue({
  //       ...property,
  //       available_from: property.available_from
  //         ? moment(property.available_from)
  //         : null,
  //       amenities:
  //         property.amenities?.map((amenity) => amenity.id.toString()) || [],
  //     });

  //     setFileList(
  //       property.property_images?.map((img) => ({
  //         uid: img.id.toString(), // Unique identifier for each file
  //         name: img.image.split("/").pop(), // Name of the file
  //         status: "done", // Mark file as already uploaded
  //         url: `http://127.0.0.1:8000/${img.image}`, // URL of the image
  //         // src={`http://127.0.0.1:8000/${element?.images[0]?.image}`}
  //       })) || []
  //     );
  //   }
  // }, [property, form]);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handlePreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const imgWindow = window.open(src);
    imgWindow.document.write(`<img src="${src}" style="width: 100%"/>`);
  };

  const dummyRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const onFinish = async (values) => {
    const formData = new FormData();
    values.available_from = values.available_from.format("YYYY-MM-DD");
    values.purpose = values.isForSale ? "forSale" : "forRent";

    for (let key in values) {
      if (key === "images") {
        values[key].forEach((file) => {
          if (file.originFileObj) {
            formData.append("images", file.originFileObj);
          } else {
            formData.append("existing_images", file.url);
          }
        });
      } else if (key === "amenities") {
        values[key].forEach((amenityId) => {
          formData.append("amenities", parseInt(amenityId));
        });
      } else {
        formData.append(key, values[key]);
      }
    }
    try {
      const response = await updateProperty({ id: propertyId, formData });

      // Assuming `response` has a status property to check if the update was successful
      if (response.status === 201) {
        // or whatever status code indicates success
        message.success("Property updated successfully!");
        navigate("/admin");
      } else {
        message.error("Failed to update property.");
      }
    } catch (error) {
      message.error("Failed to update property.");
      console.error(error);
    }
  };

  if (propertyLoading || amenitiesLoading) return <p>Loading...</p>;
  if (propertyError || amenitiesError) return <p>Error loading data</p>;

  return (
    <div className="flex justify-center w-full h-full overflow-auto">
      <div className="flex flex-col mt-2 w-[90%]">
        <div className="flex w-full items-center justify-center py-2">
          <button
            className={`px-6 py-2 rounded-l-md ${
              form.getFieldValue("purpose") === "forSale"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
            onClick={() => form.setFieldsValue({ purpose: "forSale" })}
          >
            For Sale
          </button>
          <button
            className={`px-6 py-2 rounded-r-md ${
              form.getFieldValue("purpose") === "forRent"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
            onClick={() => form.setFieldsValue({ purpose: "forRent" })}
          >
            For Rent
          </button>
        </div>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          encType="multipart/form-data"
        >
          <div className="flex flex-col font-14">
            <div className="flex mb-4 mt-4 text-lg border-b">
              Please enter at least three images
            </div>
            <div className="flex mt-2 items-center">
              {/* <Form.Item
                name="images"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                className="flex it"
              >
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={handleChange}
                  onPreview={handlePreview}
                  customRequest={dummyRequest}
                >
                  {fileList.length >= 8 ? null : (
                    <button
                      style={{
                        border: 0,
                        background: "none",
                      }}
                      type="button"
                    >
                      <PlusOutlined />
                      <div>Upload</div>
                    </button>
                  )}
                </Upload>
              </Form.Item> */}
              <Form.Item
                name="images"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={handleChange}
                  onPreview={handlePreview}
                  customRequest={dummyRequest}
                >
                  {fileList.length >= 8 ? null : (
                    <button
                      style={{ border: 0, background: "none" }}
                      type="button"
                    >
                      <PlusOutlined />
                      <div>Upload</div>
                    </button>
                  )}
                </Upload>
              </Form.Item>
            </div>
            <div className="flex mb-2 text-lg border-b">
              Property Information
            </div>
            <div className="flex flex-wrap justify-around mt-4">
              <div className="justify-between w-full grid grid-cols-3 gap-2 col-span-1">
                {/* Form Fields */}
                <Form.Item
                  className="min-w-[280px] p-0 mb-1"
                  wrapperCol={{ span: 24 }}
                  label="Owner"
                  name="owner"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] p-0 mb-1"
                  wrapperCol={{ span: 24 }}
                  label="Title"
                  name="title"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] p-0 mb-1"
                  wrapperCol={{ span: 24 }}
                  label="Property Type"
                  name="property_type"
                >
                  <Select>
                    <Select.Option value="apartment">Apartment</Select.Option>
                    <Select.Option value="house">House</Select.Option>
                    <Select.Option value="villa">Villa</Select.Option>
                    <Select.Option value="condo">Condo</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] mb-1"
                  wrapperCol={{ span: 24 }}
                  label="Floor Number"
                  name="floor_number"
                >
                  <InputNumber className="flex w-full" />
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] mb-1"
                  label="Bedrooms"
                  name="bedrooms"
                >
                  <InputNumber className="flex w-full" />
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] mb-1"
                  label="Bed"
                  name="bed"
                >
                  <InputNumber className="flex w-full" />
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] mb-1"
                  label="Bathrooms"
                  name="bathrooms"
                >
                  <InputNumber className="flex w-full" />
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] mb-1 p-0"
                  label="Cooling System"
                  name="cooling_system"
                >
                  <Select>
                    <Select.Option value="central">
                      Central Cooling
                    </Select.Option>
                    <Select.Option value="split">
                      Split System Cooling
                    </Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] mb-1 p-0"
                  label="Heating System"
                  name="heating_system"
                >
                  <Select>
                    <Select.Option value="central">
                      Central Heating
                    </Select.Option>
                    <Select.Option value="split">
                      Split System Heating
                    </Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] mb-1 p-0"
                  label="Parking Spaces"
                  name="parking_spaces"
                >
                  <InputNumber className="flex w-full" />
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] mb-1"
                  label="Area (sq. ft.)"
                  name="area"
                >
                  <InputNumber className="flex w-full" />
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] mb-1"
                  label="City"
                  name="city"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] mb-1"
                  label="Address"
                  name="address"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] mb-1"
                  label="Rent Amount"
                  name="rent_amount"
                >
                  <InputNumber className="flex w-full" />
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] mb-1"
                  label="Rent Period"
                  name="rent_period"
                >
                  <Select>
                    <Select.Option value="month">Month</Select.Option>
                    <Select.Option value="year">Year</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] mb-1"
                  label="Currency"
                  name="currency"
                >
                  <Select>
                    <Select.Option value="USD">USD</Select.Option>
                    <Select.Option value="EUR">EUR</Select.Option>
                    <Select.Option value="PKR">PKR</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] mb-1"
                  label="Available From"
                  name="available_from"
                >
                  <DatePicker className="flex w-full" format="YYYY-MM-DD" />
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] mb-1"
                  label="Contact Name"
                  name="contact_name"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] mb-1"
                  label="Contact Email"
                  name="contact_email"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] mb-1"
                  label="Contact Phone"
                  name="contact_phone"
                >
                  <Input />
                </Form.Item>
              </div>
              <div className="w-full">
                <Form.Item
                  name="description"
                  label="Description"
                  className="mb-4"
                >
                  <TextArea rows={4} />
                </Form.Item>
                <Form.Item name="amenities" label="Amenities">
                  <Select mode="multiple">
                    {amenities?.map((amenity) => (
                      <Select.Option
                        key={amenity.id}
                        value={amenity.id.toString()}
                      >
                        {amenity.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="is_featured" valuePropName="checked">
                  <Checkbox>Featured</Checkbox>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Update Property
                  </Button>
                </Form.Item>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditPropertyForm;
