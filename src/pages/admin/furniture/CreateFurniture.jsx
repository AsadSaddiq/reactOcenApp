// import React, { useEffect, useState } from "react";
// import { PlusOutlined } from "@ant-design/icons";
// import { useCreateFurnitureApiMutation } from "../../../redux/features/furniture/furnitureApi";
// import {
//   Button,
//   Checkbox,
//   DatePicker,
//   Form,
//   Input,
//   InputNumber,
//   Select,
//   Upload,
// } from "antd";
// import { useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// const { TextArea } = Input;

// const FurnitureForm = () => {
//   const [registerProperty] = useCreateFurnitureApiMutation();
//   const [fileList, setFileList] = useState([]);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const furnitureId = location.state?.furnitureId;

//   const normFile = (e) => {
//     if (Array.isArray(e)) {
//       return e;
//     }
//     return e?.fileList;
//   };

//   const handleChange = ({ fileList: newFileList }) => {
//     setFileList(newFileList);
//   };

//   const handlePreview = async (file) => {
//     let src = file.url;
//     if (!src) {
//       src = await new Promise((resolve) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file.originFileObj);
//         reader.onload = () => resolve(reader.result);
//       });
//     }
//     const imgWindow = window.open(src);
//     imgWindow.document.write(`<img src="${src}" style="width: 100%"/>`);
//   };

//   const dummyRequest = ({ onSuccess }) => {
//     setTimeout(() => {
//       onSuccess("ok");
//     }, 0);
//   };

//   const onFinish = async (values) => {
//     const formData = new FormData();
//     values.available_from = values.available_from.format("YYYY-MM-DD");

//     for (let key in values) {
//       if (key === "images") {
//         values[key].forEach((file) => {
//           formData.append("images", file.originFileObj);
//         });
//       } else {
//         formData.append(key, values[key]);
//       }
//     }
//     const res = await registerProperty(formData);
//     if (res) {
//       // navigate("/admin/funniture");
//     }
//   };

//   return (
//     <div className="flex justify-center w-full h-full overflow-auto">
//       <div className="flex flex-col mt-2 w-[90%]">
//         <Form
//           layout="vertical"
//           onFinish={onFinish}
//           encType="multipart/form-data"
//         >
//           <div className="flex flex-col font-14">
//             <div className="flex mb-4 mt-4 text-lg border-b">
//               Please enter at least three images
//             </div>
//             <div className="flex mt-2 items-center">
//               <Form.Item
//                 name="images"
//                 valuePropName="fileList"
//                 getValueFromEvent={normFile}
//                 className="flex it"
//               >
//                 <Upload
//                   listType="picture-card"
//                   fileList={fileList}
//                   onChange={handleChange}
//                   onPreview={handlePreview}
//                   customRequest={dummyRequest}
//                 >
//                   {fileList.length >= 8 ? null : (
//                     <button
//                       style={{
//                         border: 0,
//                         background: "none",
//                       }}
//                       type="button"
//                     >
//                       <PlusOutlined />
//                       <div>Upload</div>
//                     </button>
//                   )}
//                 </Upload>
//               </Form.Item>
//             </div>
//             <div className="flex mb-2 text-lg border-b">
//               Furniture Information
//             </div>
//             <div className="flex flex-wrap justify-around mt-4">
//               <div className="justify-between w-full grid grid-cols-3 gap-2 col-span-1">
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Owner"
//                   name="owner"
//                 >
//                   <Input />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Title"
//                   name="title"
//                 >
//                   <Input />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Property Type"
//                   name="property_type"
//                 >
//                   <Select>
//                     <Select.Option value="apartment">Apartment</Select.Option>
//                     <Select.Option value="house">House</Select.Option>
//                     <Select.Option value="villa">Villa</Select.Option>
//                     <Select.Option value="condo">Condo</Select.Option>
//                   </Select>
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Floor Number"
//                   name="floor_number"
//                 >
//                   <InputNumber className="flex w-full" />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] mb-1"
//                   label="Bedrooms"
//                   name="bedrooms"
//                 >
//                   <InputNumber className="flex w-full" />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] mb-1"
//                   label="Bathrooms"
//                   name="bathrooms"
//                 >
//                   <InputNumber className="flex w-full" />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] mb-1 p-0"
//                   label="Cooling System"
//                   name="cooling_system"
//                 >
//                   <Select>
//                     <Select.Option value="central">
//                       Central Cooling
//                     </Select.Option>
//                     <Select.Option value="split">
//                       Split System Cooling
//                     </Select.Option>
//                   </Select>
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] mb-1 p-0"
//                   label="Heating System"
//                   name="heating_system"
//                 >
//                   <Select>
//                     <Select.Option value="central">
//                       Central Heating
//                     </Select.Option>
//                     <Select.Option value="electric">
//                       Electric Heating
//                     </Select.Option>
//                     <Select.Option value="gas">Gas Heating</Select.Option>
//                   </Select>
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] mb-1"
//                   label="Area"
//                   name="area"
//                 >
//                   <InputNumber className="flex w-full" />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   label="Parking Space"
//                   name="parking_spaces"
//                 >
//                   <InputNumber className="flex w-full" />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] mb-1"
//                   label="Available From"
//                   name="available_from"
//                 >
//                   <DatePicker format="YYYY-MM-DD" className="flex w-full" />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] mb-1"
//                   label="Currency"
//                   name="currency"
//                 >
//                   <Input />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] mb-1"
//                   label="Rent Amount"
//                   name="rent_amount"
//                 >
//                   <InputNumber className="flex w-full" />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] mb-1 p-0"
//                   label="City"
//                   name="city"
//                 >
//                   <Input />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] mb-1 p-0"
//                   label="Address"
//                   name="address"
//                 >
//                   <Input />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] mb-1"
//                   label="Contact Name"
//                   name="contact_name"
//                 >
//                   <Input />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] mb-1"
//                   label="Contact Email"
//                   name="contact_email"
//                 >
//                   <Input />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] mb-1"
//                   label="Bed"
//                   name="bed"
//                 >
//                   <Input />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Rent Period"
//                   name="rent_period"
//                 >
//                   <Select>
//                     <Select.Option value="day">Day</Select.Option>
//                     <Select.Option value="month">Month</Select.Option>
//                     <Select.Option value="year">Year</Select.Option>
//                   </Select>
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] mb-1"
//                   label="Contact Phone"
//                   name="contact_phone"
//                 >
//                   <InputNumber className="flex w-full" />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] mb-1"
//                   label="Description"
//                   name="description"
//                 >
//                   <TextArea rows={1} />
//                 </Form.Item>
//               </div>
//             </div>
//             {/* Amenity Section */}
//             <div className="flex mb-4 text-lg border-b mt-8">Amenities</div>
//             <Form.Item className="min-w-[100px] mb-3" name="amenities">
//               <Checkbox.Group className="justify-between gap-x-8 grid grid-cols-2 gap-3">
//                 {amenities?.map((amenity) => (
//                   <Checkbox key={amenity.id} value={amenity.id.toString()}>
//                     {amenity.name}
//                   </Checkbox>
//                 ))}
//               </Checkbox.Group>
//             </Form.Item>
//             <div className="flex w-full">
//               <Form.Item>
//                 <Button htmlType="submit">Submit</Button>
//               </Form.Item>
//             </div>
//           </div>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default FurnitureForm;
import React, { useState } from "react";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Upload,
  Checkbox,
  Select,
  Space,
} from "antd";
import { useCreateFurnitureApiMutation } from "../../../redux/features/furniture/furnitureApi";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

const FURNITURE_TYPE_CHOICES = [
  { value: "table", label: "Table" },
  { value: "chair", label: "Chair" },
  { value: "sofa", label: "Sofa" },
  { value: "bed", label: "Bed" },
  { value: "cabinet", label: "Cabinet" },
  { value: "desk", label: "Desk" },
  { value: "shelf", label: "Shelf" },
  { value: "stool", label: "Stool" },
  { value: "dresser", label: "Dresser" },
  { value: "bench", label: "Bench" },
  { value: "armchair", label: "Armchair" },
  { value: "recliner", label: "Recliner" },
  { value: "nightstand", label: "Nightstand" },
  { value: "wardrobe", label: "Wardrobe" },
  { value: "bookcase", label: "Bookcase" },
  { value: "console", label: "Console" },
  { value: "ottoman", label: "Ottoman" },
  { value: "futon", label: "Futon" },
  { value: "barstool", label: "Barstool" },
  { value: "sectional", label: "Sectional Sofa" },
  { value: "loveseat", label: "Loveseat" },
  { value: "beanbag", label: "Beanbag" },
  { value: "changing_table", label: "Changing Table" },
  { value: "daybed", label: "Daybed" },
  { value: "murphy_bed", label: "Murphy Bed" },
  { value: "other", label: "Other" },
];

const MATERIAL_CHOICES = [
  { value: "wood", label: "Wood" },
  { value: "metal", label: "Metal" },
  { value: "plastic", label: "Plastic" },
  { value: "fabric", label: "Fabric" },
  { value: "leather", label: "Leather" },
  { value: "composite", label: "Composite" },
  { value: "glass", label: "Glass" },
  { value: "rattan", label: "Rattan" },
  { value: "vinyl", label: "Vinyl" },
  { value: "stone", label: "Stone" },
  { value: "ceramic", label: "Ceramic" },
  { value: "bamboo", label: "Bamboo" },
  { value: "marble", label: "Marble" },
  { value: "particleboard", label: "Particleboard" },
  { value: "fiberboard", label: "Fiberboard" },
  { value: "plywood", label: "Plywood" },
  { value: "natural_fiber", label: "Natural Fiber" },
  { value: "other", label: "Other" },
];

const COLOR_CHOICES = [
  { value: "black", label: "Black" },
  { value: "white", label: "White" },
  { value: "brown", label: "Brown" },
  { value: "beige", label: "Beige" },
  { value: "grey", label: "Grey" },
  { value: "red", label: "Red" },
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "yellow", label: "Yellow" },
  { value: "purple", label: "Purple" },
  { value: "orange", label: "Orange" },
  { value: "pink", label: "Pink" },
  { value: "teal", label: "Teal" },
  { value: "gold", label: "Gold" },
  { value: "silver", label: "Silver" },
  { value: "cream", label: "Cream" },
  { value: "navy", label: "Navy" },
  { value: "burgundy", label: "Burgundy" },
  { value: "tan", label: "Tan" },
  { value: "lavender", label: "Lavender" },
  { value: "peach", label: "Peach" },
  { value: "other", label: "Other" },
];

const CURRENCY_CHOICES = [
  { value: "USD", label: "US Dollar" },
  { value: "EUR", label: "Euro" },
  { value: "GBP", label: "British Pound" },
  { value: "JPY", label: "Japanese Yen" },
  { value: "CNY", label: "Chinese Yuan" },
  { value: "INR", label: "Indian Rupee" },
  { value: "AUD", label: "Australian Dollar" },
  { value: "CAD", label: "Canadian Dollar" },
  { value: "CHF", label: "Swiss Franc" },
  { value: "NZD", label: "New Zealand Dollar" },
  { value: "SEK", label: "Swedish Krona" },
  { value: "NOK", label: "Norwegian Krone" },
  { value: "DKK", label: "Danish Krone" },
  { value: "HKD", label: "Hong Kong Dollar" },
  { value: "SGD", label: "Singapore Dollar" },
  { value: "other", label: "Other" },
];

const FurnitureForm = () => {
  const [registerFurniture] = useCreateFurnitureApiMutation();
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate();

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
    console.log(values);
    values.insurance_expiry_date =
      values.insurance_expiry_date.format("YYYY-MM-DD");
    const formData = new FormData();

    for (let key in values) {
      if (key === "images") {
        values[key].forEach((file) => {
          formData.append("images", file.originFileObj);
        });
      } else {
        formData.append(key, values[key]);
      }
    }

    console.log("formData", formData);
    try {
      const res = await registerFurniture(formData).unwrap();
      console.log(res);
      if (res.status === 204) {
        navigate("/admin");
      } else {
        console.error("Error submitting the form:", res);
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <div className="flex justify-center w-full h-full overflow-auto">
      <div className="flex flex-col mt-2 w-[90%]">
        <Form
          layout="vertical"
          onFinish={onFinish}
          encType="multipart/form-data"
        >
          <div className="flex flex-col font-14">
            <div className="flex mb-4 mt-4 text-lg border-b">
              Please enter at least three images
            </div>
            <div className="flex mt-2 items-center">
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
              Furniture Information
            </div>
            <div className="flex flex-wrap justify-around mt-4">
              <div className="justify-between w-full grid grid-cols-3 gap-2 col-span-1">
                <Form.Item
                  className="min-w-[280px] p-0 mb-1"
                  wrapperCol={{ span: 24 }}
                  label="Name"
                  name="name"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] p-0 mb-1"
                  wrapperCol={{ span: 24 }}
                  label="Brand Name"
                  name="brand_name"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] p-0 mb-1"
                  wrapperCol={{ span: 24 }}
                  label="Furniture Type"
                  name="furniture_type"
                >
                  <Select options={FURNITURE_TYPE_CHOICES} />
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] p-0 mb-1"
                  wrapperCol={{ span: 24 }}
                  label="Material"
                  name="material"
                >
                  <Select options={MATERIAL_CHOICES} />
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] p-0 mb-1"
                  wrapperCol={{ span: 24 }}
                  label="Dimensions"
                  name="dimensions"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] p-0 mb-1"
                  wrapperCol={{ span: 24 }}
                  label="Weight"
                  name="weight"
                >
                  <InputNumber className="flex w-full" />
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] p-0 mb-1"
                  wrapperCol={{ span: 24 }}
                  label="Color"
                  name="color"
                >
                  <Select options={COLOR_CHOICES} />
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] p-0 mb-1"
                  wrapperCol={{ span: 24 }}
                  label="Price"
                  name="price"
                >
                  <InputNumber className="flex w-full" />
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] p-0 mb-1"
                  wrapperCol={{ span: 24 }}
                  label="Currency"
                  name="currency"
                >
                  <Select options={CURRENCY_CHOICES} />
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] p-0 mb-1"
                  wrapperCol={{ span: 24 }}
                  label="Warranty Period (years)"
                  name="warranty_period"
                >
                  <InputNumber className="flex w-full" />
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] p-0 mb-1"
                  wrapperCol={{ span: 24 }}
                  label="Assembly Required"
                  name="assembly_required"
                  valuePropName="checked"
                >
                  <Checkbox />
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] p-0 mb-1"
                  wrapperCol={{ span: 24 }}
                  label="Manufacturer"
                  name="manufacturer"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] p-0 mb-1"
                  wrapperCol={{ span: 24 }}
                  label="Model"
                  name="model"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] p-0 mb-1"
                  wrapperCol={{ span: 24 }}
                  label="Year"
                  name="year"
                >
                  <InputNumber className="flex w-full" />
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] p-0 mb-1"
                  wrapperCol={{ span: 24 }}
                  label="Max Weight Capacity"
                  name="max_weight_capacity"
                >
                  <InputNumber className="flex w-full" />
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] p-0 mb-1"
                  wrapperCol={{ span: 24 }}
                  label="Eco Friendly"
                  name="eco_friendly"
                  valuePropName="checked"
                >
                  <Checkbox />
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] p-0 mb-1"
                  wrapperCol={{ span: 24 }}
                  label="Interior Material"
                  name="interior_material"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] p-0 mb-1"
                  wrapperCol={{ span: 24 }}
                  label="Seating Capacity"
                  name="seating_capacity"
                >
                  <InputNumber className="flex w-full" />
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] p-0 mb-1"
                  wrapperCol={{ span: 24 }}
                  label="Safety Rating"
                  name="safety_rating"
                >
                  <InputNumber className="flex w-full" />
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] p-0 mb-1"
                  wrapperCol={{ span: 24 }}
                  label="Insurance Provider"
                  name="insurance_provider"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] p-0 mb-1"
                  wrapperCol={{ span: 24 }}
                  label="Insurance Expiry Date"
                  name="insurance_expiry_date"
                >
                  <DatePicker format="YYYY-MM-DD" className="flex w-full" />
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] p-0 mb-1"
                  wrapperCol={{ span: 24 }}
                  label="Location"
                  name="location"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] p-0 mb-1"
                  wrapperCol={{ span: 24 }}
                  label="Production Country"
                  name="production_country"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] p-0 mb-1"
                  wrapperCol={{ span: 24 }}
                  label="Maintenance Instructions"
                  name="maintenance_instructions"
                >
                  <TextArea />
                </Form.Item>
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <Button
                className="bg-red-500 hover:bg-red-700 text-white flex items-center"
                onClick={() => console.log("Close")}
              >
                <MinusOutlined className="flex items-center" />
                Close
              </Button>
              <Form.Item>
                <Button
                  className="bg-blue-500 hover:bg-blue-700 text-white flex items-center"
                  type="primary"
                  htmlType="submit"
                >
                  <PlusOutlined className="flex items-center" />
                  Submit
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default FurnitureForm;
