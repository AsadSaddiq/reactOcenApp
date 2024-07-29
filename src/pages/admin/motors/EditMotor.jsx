// import React, { useEffect, useState } from "react";
// import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
// import {
//   useGetMotorByIdApiQuery,
//   useUpdateMotorApiMutation,
//   useGetFeatureApiQuery,
// } from "../../../redux/features/motors/motorsApi";
// import {
//   Button,
//   DatePicker,
//   Form,
//   Input,
//   InputNumber,
//   Upload,
//   Space,
//   Checkbox,
//   Select,
// } from "antd";

// const PART_TYPE_CHOICES = [
//   { value: "tire", label: "Tire" },
//   { value: "pump", label: "Gas Pump" },
//   { value: "battery", label: "Battery" },
//   { value: "brake", label: "Brake" },
//   { value: "filter", label: "Filter" },
//   { value: "light", label: "Light" },
//   { value: "oil", label: "Oil" },
//   { value: "other", label: "Other" },
// ];
// import { useNavigate } from "react-router-dom";

// const { TextArea } = Input;

// const EditMotorsForm = () => {
//   const { motorId } = useParams();
//   const navigate = useNavigate();
//   const [updateMotor] = useUpdateMotorApiMutation();
//   const {
//     data: motor,
//     isLoading: motorLoading,
//     error: motorError,
//   } = useGetMotorByIdApiQuery(motorId);
//   const {
//     data: features,
//     error: featureError,
//     isLoading: featureLoading,
//   } = useGetFeatureApiQuery();
//   const [form] = Form.useForm();
//   const [fileList, setFileList] = useState([]);

//   useEffect(() => {
//     if(motor){
//       form.setFieldsValue({
//         ...motor,
//         available_form:motor.available_form
//         ? moment(motor.available_form)
//         :null,
//         features:
//         motor.features?.map((feature)=> feature.id.toString()) || [],
//       });

//       setFileList(
//         motor.motor_images?.map((img) => ({
//           uid: img.id.toString(), // Unique identifier for each file
//           name: img.image.split("/").pop(), // Name of the file
//           status: "done", // Mark file as already uploaded
//           url: img.image, // URL of the image
//         })) || []
//       );
//     }
//   }, [motor]);

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
//     console.log(values);
//     values.insurance_expiry_date =
//       values.insurance_expiry_date.format("YYYY-MM-DD");
//     const formData = new FormData();

//     for (let key in values) {
//       if (key === "images") {
//         values[key].forEach((file) => {
//           formData.append("images", file.originFileObj);
//         });
//       } else if (key === "ratings") {
//         values[key].forEach((item) => {
//           formData.append("ratings", JSON.stringify(item));
//         });
//       } else if (key === "repaints") {
//         values[key].forEach((item) => {
//           item.date = item.date.format("YYYY-MM-DD");
//           formData.append("repaints", JSON.stringify(item));
//         });
//       } else if (key === "spare_parts_related") {
//         values[key].forEach((item) => {
//           formData.append("spare_parts_related", JSON.stringify(item));
//         });
//       } else if (key === "features") {
//         values[key].forEach((item) => {
//           formData.append("features", +item);
//         });
//       } else {
//         formData.append(key, values[key]);
//       }
//     }
//     console.log("formData");
//     console.log(formData);

//     const res = await registerMotors(formData);
//     if (res) {
//       // navigate("/admin");
//     } else {
//       console.error("Error submitting the form:", res);
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
//                       style={{ border: 0, background: "none" }}
//                       type="button"
//                     >
//                       <PlusOutlined />
//                       <div>Upload</div>
//                     </button>
//                   )}
//                 </Upload>
//               </Form.Item>
//             </div>
//             <div className="flex mb-2 text-lg border-b">Motor Information</div>
//             <div className="flex flex-wrap justify-around mt-4">
//               <div className="justify-between w-full grid grid-cols-3 gap-2 col-span-1">
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Name"
//                   name="name"
//                 >
//                   <Input />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Brand Name"
//                   name="brand_name"
//                 >
//                   <Select
//                     options={[
//                       { label: "Audi", value: "audi" },
//                       { label: "BMW", value: "bmw" },
//                       { label: "Ford", value: "ford" },
//                       { label: "Honda", value: "honda" },
//                       { label: "Hyundai", value: "hyundai" },
//                       { label: "Mercedes-Benz", value: "mercedes" },
//                       { label: "Toyota", value: "toyota" },
//                       { label: "Volkswagen", value: "volkswagen" },
//                       { label: "Volvo", value: "volvo" },
//                       { label: "Other", value: "other" },
//                     ]}
//                   />
//                 </Form.Item>

//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Vehicle Type"
//                   name="vehicle_type"
//                 >
//                   <Select
//                     options={[
//                       { label: "Car", value: "car" },
//                       { label: "Truck", value: "truck" },
//                       { label: "Motorcycle", value: "motorcycle" },
//                       { label: "Bus", value: "bus" },
//                       { label: "Van", value: "van" },
//                       { label: "SUV", value: "suv" },
//                       { label: "Pickup", value: "pickup" },
//                       { label: "Bike", value: "bike" },
//                       { label: "Boat", value: "boat" },
//                       { label: "Bicycle", value: "bicycle" },
//                     ]}
//                   />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Engine Capacity"
//                   name="engine_capacity"
//                 >
//                   <InputNumber className="flex w-full" />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Horsepower"
//                   name="horsepower"
//                 >
//                   <InputNumber className="flex w-full" />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Torque"
//                   name="torque"
//                 >
//                   <InputNumber className="flex w-full" />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Fuel Type"
//                   name="fuel_type"
//                 >
//                   <Select
//                     options={[
//                       { label: "Petrol", value: "petrol" },
//                       { label: "Diesel", value: "diesel" },
//                       { label: "Electric", value: "electric" },
//                       { label: "Hybrid", value: "hybrid" },
//                       { label: "CNG", value: "cng" },
//                       { label: "LPG", value: "lpg" },
//                     ]}
//                   />
//                 </Form.Item>

//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Transmission"
//                   name="transmission"
//                 >
//                   <Select
//                     options={[
//                       { label: "Manual", value: "manual" },
//                       { label: "Automatic", value: "automatic" },
//                       { label: "Semi-Automatic", value: "semiautomatic" },
//                       { label: "CVT", value: "cvt" },
//                     ]}
//                   />
//                 </Form.Item>

//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Manufacturer"
//                   name="manufacturer"
//                 >
//                   <Input />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Model"
//                   name="model"
//                 >
//                   <Input />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Year"
//                   name="year"
//                 >
//                   <InputNumber className="flex w-full" />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Weight"
//                   name="weight"
//                 >
//                   <InputNumber className="flex w-full" />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Dimensions"
//                   name="dimensions"
//                 >
//                   <Input />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Max Speed"
//                   name="max_speed"
//                 >
//                   <InputNumber className="flex w-full" />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Acceleration"
//                   name="acceleration"
//                 >
//                   <InputNumber className="flex w-full" />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Fuel Capacity"
//                   name="fuel_capacity"
//                 >
//                   <InputNumber className="flex w-full" />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Mileage"
//                   name="mileage"
//                 >
//                   <InputNumber className="flex w-full" />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Currency"
//                   name="currency"
//                 >
//                   <Select
//                     options={[
//                       { label: "US Dollar", value: "USD" },
//                       { label: "Euro", value: "EUR" },
//                       { label: "British Pound", value: "GBP" },
//                       { label: "Japanese Yen", value: "JPY" },
//                       { label: "Chinese Yuan", value: "CNY" },
//                       { label: "Indian Rupee", value: "INR" },
//                       { label: "Australian Dollar", value: "AUD" },
//                       { label: "Canadian Dollar", value: "CAD" },
//                       { label: "Other", value: "other" },
//                     ]}
//                   />
//                 </Form.Item>

//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Price"
//                   name="price"
//                 >
//                   <InputNumber className="flex w-full" />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Color"
//                   name="color"
//                 >
//                   <Input />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Seating Capacity"
//                   name="seating_capacity"
//                 >
//                   <InputNumber className="flex w-full" />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Safety Rating"
//                   name="safety_rating"
//                 >
//                   <InputNumber className="flex w-full" />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Warranty Years"
//                   name="warranty_years"
//                 >
//                   <InputNumber className="flex w-full" />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Insurance Provider"
//                   name="insurance_provider"
//                 >
//                   <Input />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Insurance Expiry Date"
//                   name="insurance_expiry_date"
//                 >
//                   <DatePicker format="YYYY-MM-DD" className="flex w-full" />
//                 </Form.Item>
//               </div>
//             </div>
//             <Form.Item className="min-w-[100px] mb-3" name="features">
//               <Checkbox.Group className="justify-between gap-x-8 grid grid-cols-2 gap-3">
//                 {features?.map((feature) => (
//                   <Checkbox key={feature.id} value={feature.id.toString()}>
//                     {feature.name}
//                   </Checkbox>
//                 ))}
//               </Checkbox.Group>
//             </Form.Item>
//             {/* Additional sections for Ratings, Spare Parts, and Repaints */}
//             <div className="flex mb-2 text-lg border-b">Ratings</div>
//             <Form.List name="ratings">
//               {(fields, { add, remove }) => (
//                 <>
//                   {fields.map(({ key, name, fieldKey, ...restField }) => (
//                     <Space
//                       key={key}
//                       className="flex flex-wrap"
//                       align="baseline"
//                     >
//                       <Form.Item
//                         {...restField}
//                         name={[name, "part"]}
//                         key={`${fieldKey}_part`}
//                         label="Part"
//                       >
//                         <Input />
//                       </Form.Item>
//                       <Form.Item
//                         {...restField}
//                         name={[name, "rating"]}
//                         key={`${fieldKey}_rating`}
//                         label="Rating"
//                       >
//                         <InputNumber />
//                       </Form.Item>
//                       <Form.Item
//                         {...restField}
//                         name={[name, "review"]}
//                         key={`${fieldKey}_review`}
//                         label="Review"
//                       >
//                         <Input />
//                       </Form.Item>
//                       <Form.Item
//                         {...restField}
//                         name={[name, "rated_by"]}
//                         key={`${fieldKey}_rated_by`}
//                         label="Rated By"
//                       >
//                         <Input />
//                       </Form.Item>
//                       <Button
//                         type="dashed"
//                         onClick={() => remove(name)}
//                         icon={<MinusOutlined />}
//                       >
//                         Remove
//                       </Button>
//                     </Space>
//                   ))}
//                   <Form.Item>
//                     <Button
//                       type="dashed"
//                       onClick={() => add()}
//                       icon={<PlusOutlined />}
//                     >
//                       Add Rating
//                     </Button>
//                   </Form.Item>
//                 </>
//               )}
//             </Form.List>
//             <div className="flex mb-2 text-lg border-b">Spare Parts</div>
//             <Form.List name="spare_parts_related">
//               {(fields, { add, remove }) => (
//                 <>
//                   {fields.map(({ key, name, fieldKey, ...restField }) => (
//                     <Space
//                       key={key}
//                       className="flex flex-wrap"
//                       align="baseline"
//                     >
//                       <Form.Item
//                         {...restField}
//                         name={[name, "name"]}
//                         key={`${fieldKey}_name`}
//                         label="Name"
//                       >
//                         <Input />
//                       </Form.Item>
//                       <Form.Item
//                         {...restField}
//                         name={[name, "part_type"]}
//                         key={`${fieldKey}_part_type`}
//                         label="Part Type"
//                       >
//                         <Select>
//                           {PART_TYPE_CHOICES.map((choice) => (
//                             <Select.Option
//                               key={choice.value}
//                               value={choice.value}
//                             >
//                               {choice.label}
//                             </Select.Option>
//                           ))}
//                         </Select>
//                       </Form.Item>
//                       <Form.Item
//                         {...restField}
//                         name={[name, "brand_name"]}
//                         key={`${fieldKey}_brand_name`}
//                         label="Brand Name"
//                       >
//                         <Input />
//                       </Form.Item>
//                       <Form.Item
//                         {...restField}
//                         name={[name, "description"]}
//                         key={`${fieldKey}_description`}
//                         label="Description"
//                       >
//                         <Input />
//                       </Form.Item>
//                       <Form.Item
//                         {...restField}
//                         name={[name, "manufacturer"]}
//                         key={`${fieldKey}_manufacturer`}
//                         label="Manufacturer"
//                       >
//                         <Input />
//                       </Form.Item>
//                       <Form.Item
//                         {...restField}
//                         name={[name, "model_number"]}
//                         key={`${fieldKey}_model_number`}
//                         label="Model Number"
//                       >
//                         <Input />
//                       </Form.Item>
//                       <Form.Item
//                         {...restField}
//                         name={[name, "warranty_period"]}
//                         key={`${fieldKey}_warranty_period`}
//                         label="Warranty Period"
//                       >
//                         <InputNumber />
//                       </Form.Item>
//                       <Button
//                         type="dashed"
//                         onClick={() => remove(name)}
//                         icon={<MinusOutlined />}
//                       >
//                         Remove
//                       </Button>
//                     </Space>
//                   ))}
//                   <Form.Item>
//                     <Button
//                       type="dashed"
//                       onClick={() => add()}
//                       icon={<PlusOutlined />}
//                     >
//                       Add Spare Part
//                     </Button>
//                   </Form.Item>
//                 </>
//               )}
//             </Form.List>
//             <div className="flex mb-2 text-lg border-b">Repaints</div>
//             <Form.List name="repaints">
//               {(fields, { add, remove }) => (
//                 <>
//                   {fields.map(({ key, name, fieldKey, ...restField }) => (
//                     <Space
//                       key={key}
//                       className="flex flex-wrap"
//                       align="baseline"
//                     >
//                       <Form.Item
//                         {...restField}
//                         name={[name, "color_brand"]}
//                         key={`${fieldKey}_color_brand`}
//                         label="ColorBrand"
//                       >
//                         <Input />
//                       </Form.Item>
//                       <Form.Item
//                         {...restField}
//                         name={[name, "color_Name"]}
//                         key={`${fieldKey}_color_name`}
//                         label="Color"
//                       >
//                         <Input />
//                       </Form.Item>
//                       <Form.Item
//                         {...restField}
//                         name={[name, "date"]}
//                         key={`${fieldKey}_date`}
//                         label="Date"
//                         className="min-w-[280px] p-0 mb-1"
//                       >
//                         <DatePicker format="YYYY-MM-DD" />
//                       </Form.Item>
//                       <Form.Item
//                         {...restField}
//                         name={[name, "repaint_shop"]}
//                         key={`${fieldKey}_repaint_shop`}
//                         label="Repaint Shop"
//                       >
//                         <Input />
//                       </Form.Item>

//                       <Form.Item
//                         {...restField}
//                         name={[name, "description"]}
//                         key={`${fieldKey}_description`}
//                         label="Description"
//                       >
//                         <Input />
//                       </Form.Item>

//                       <Button
//                         type="dashed"
//                         onClick={() => remove(name)}
//                         icon={<MinusOutlined />}
//                         align="baseline"
//                       >
//                         Remove
//                       </Button>
//                     </Space>
//                   ))}
//                   <Form.Item>
//                     <Button
//                       type="dashed"
//                       onClick={() => add()}
//                       icon={<PlusOutlined />}
//                     >
//                       Add Repaint
//                     </Button>
//                   </Form.Item>
//                 </>
//               )}
//             </Form.List>
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

// export default EditMotorsForm;

// import React, { useEffect, useState } from "react";
// import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
// import {
//   useGetMotorsByIdApiQuery,
//   useUpdateMotorApiMutation,
//   useGetFeatureApiQuery,
// } from "../../../redux/features/motors/motorsApi";
// import {
//   Button,
//   DatePicker,
//   Form,
//   Input,
//   InputNumber,
//   Upload,
//   Space,
//   Checkbox,
//   Select,
// } from "antd";
// import { useNavigate, useParams } from "react-router-dom";
// import moment from "moment";

// const PART_TYPE_CHOICES = [
//   { value: "tire", label: "Tire" },
//   { value: "pump", label: "Gas Pump" },
//   { value: "battery", label: "Battery" },
//   { value: "brake", label: "Brake" },
//   { value: "filter", label: "Filter" },
//   { value: "light", label: "Light" },
//   { value: "oil", label: "Oil" },
//   { value: "other", label: "Other" },
// ];

// const { TextArea } = Input;

// const EditMotorsForm = () => {
//   const { motorId } = useParams();
//   const navigate = useNavigate();
//   const [updateMotor] = useUpdateMotorApiMutation();
//   const {
//     data: motor,
//     isLoading: motorLoading,
//     error: motorError,
//   } = useGetMotorsByIdApiQuery(motorId);
//   const {
//     data: features,
//     error: featureError,
//     isLoading: featureLoading,
//   } = useGetFeatureApiQuery();
//   const [form] = Form.useForm();
//   const [fileList, setFileList] = useState([]);

//   useEffect(() => {
//     if (motor) {
//       form.setFieldsValue({
//         ...motor,
//         available_from: motor.available_from
//           ? moment(motor.available_from)
//           : null,
//         features: motor.features?.map((feature) => feature.id.toString()) || [],
//       });

//       setFileList(
//         motor.motor_images?.map((img) => ({
//           uid: img.id.toString(), // Unique identifier for each file
//           name: img.image.split("/").pop(), // Name of the file
//           status: "done", // Mark file as already uploaded
//           url: img.image, // URL of the image
//         })) || []
//       );
//     }
//   }, [motor]);

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
//     console.log(values);
//     values.insurance_expiry_date =
//       values.insurance_expiry_date.format("YYYY-MM-DD");
//     const formData = new FormData();

//     for (let key in values) {
//       if (key === "images") {
//         values[key].forEach((file) => {
//           formData.append("images", file.originFileObj);
//         });
//       } else if (
//         key === "ratings" ||
//         key === "repaints" ||
//         key === "spare_parts_related"
//       ) {
//         values[key].forEach((item) => {
//           if (key === "repaints") {
//             item.date = item.date.format("YYYY-MM-DD");
//           }
//           formData.append(key, JSON.stringify(item));
//         });
//       } else if (key === "features") {
//         values[key].forEach((item) => {
//           formData.append("features", +item);
//         });
//       } else {
//         formData.append(key, values[key]);
//       }
//     }
//     console.log("formData");
//     console.log(formData);

//     const res = await updateMotor({ id: motorId, body: formData });
//     if (res) {
//       navigate("/admin");
//     } else {
//       console.error("Error submitting the form:", res);
//     }
//   };

//   if (motorLoading || featureLoading) {
//     return <div>Loading...</div>;
//   }

//   if (motorError || featureError) {
//     return <div>Error loading data</div>;
//   }

//   return (
//     <div className="flex justify-center w-full h-full overflow-auto">
//       <div className="flex flex-col mt-2 w-[90%]">
//         <Form
//           layout="vertical"
//           onFinish={onFinish}
//           encType="multipart/form-data"
//           form={form}
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
//                       style={{ border: 0, background: "none" }}
//                       type="button"
//                     >
//                       <PlusOutlined />
//                       <div>Upload</div>
//                     </button>
//                   )}
//                 </Upload>
//               </Form.Item>
//             </div>
//             <div className="flex mb-2 text-lg border-b">Motor Information</div>
//             <div className="flex flex-wrap justify-around mt-4">
//               <div className="justify-between w-full grid grid-cols-3 gap-2 col-span-1">
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Name"
//                   name="name"
//                 >
//                   <Input />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Brand Name"
//                   name="brand_name"
//                 >
//                   <Select
//                     options={[
//                       { label: "Audi", value: "audi" },
//                       { label: "BMW", value: "bmw" },
//                       { label: "Ford", value: "ford" },
//                       { label: "Honda", value: "honda" },
//                       { label: "Hyundai", value: "hyundai" },
//                       { label: "Mercedes-Benz", value: "mercedes" },
//                       { label: "Toyota", value: "toyota" },
//                       { label: "Volkswagen", value: "volkswagen" },
//                       { label: "Volvo", value: "volvo" },
//                       { label: "Other", value: "other" },
//                     ]}
//                   />
//                 </Form.Item>

//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Vehicle Type"
//                   name="vehicle_type"
//                 >
//                   <Select
//                     options={[
//                       { label: "Car", value: "car" },
//                       { label: "Truck", value: "truck" },
//                       { label: "Motorcycle", value: "motorcycle" },
//                       { label: "Bus", value: "bus" },
//                       { label: "Van", value: "van" },
//                       { label: "SUV", value: "suv" },
//                       { label: "Pickup", value: "pickup" },
//                       { label: "Bike", value: "bike" },
//                       { label: "Boat", value: "boat" },
//                       { label: "Bicycle", value: "bicycle" },
//                     ]}
//                   />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Engine Capacity"
//                   name="engine_capacity"
//                 >
//                   <InputNumber className="flex w-full" />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Price"
//                   name="price"
//                 >
//                   <InputNumber className="flex w-full" />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Description"
//                   name="description"
//                 >
//                   <TextArea rows={4} />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Available From"
//                   name="available_from"
//                 >
//                   <DatePicker className="flex w-full" />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Insurance Expiry Date"
//                   name="insurance_expiry_date"
//                 >
//                   <DatePicker className="flex w-full" />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Kilometer Driven"
//                   name="kilometer_driven"
//                 >
//                   <InputNumber className="flex w-full" />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Color"
//                   name="color"
//                 >
//                   <Input />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Feature"
//                   name="features"
//                 >
//                   <Checkbox.Group
//                     options={
//                       features?.map((feature) => ({
//                         label: feature.name,
//                         value: feature.id.toString(),
//                       })) || []
//                     }
//                   />
//                 </Form.Item>
//               </div>
//             </div>
//             <div className="flex mb-2 mt-8 text-lg border-b">Other Info</div>
//             <Form.List name="ratings">
//               {(fields, { add, remove }) => (
//                 <>
//                   {fields.map(({ key, name, fieldKey }) => (
//                     <Space
//                       key={key}
//                       style={{ display: "flex", marginBottom: 8 }}
//                       align="start"
//                     >
//                       <Form.Item
//                         {...fieldKey}
//                         name={[name, "star"]}
//                         fieldKey={[fieldKey, "star"]}
//                         wrapperCol={{ span: 24 }}
//                         className="w-[280px]"
//                         label="Rating Star"
//                       >
//                         <InputNumber min={0} max={5} />
//                       </Form.Item>
//                       <Form.Item
//                         {...fieldKey}
//                         name={[name, "date"]}
//                         fieldKey={[fieldKey, "date"]}
//                         wrapperCol={{ span: 24 }}
//                         className="w-[280px]"
//                         label="Rating Date"
//                       >
//                         <DatePicker />
//                       </Form.Item>
//                       <Form.Item
//                         {...fieldKey}
//                         name={[name, "comment"]}
//                         fieldKey={[fieldKey, "comment"]}
//                         wrapperCol={{ span: 24 }}
//                         className="w-[280px]"
//                         label="Rating Comment"
//                       >
//                         <Input.TextArea />
//                       </Form.Item>
//                       <MinusOutlined onClick={() => remove(name)} />
//                     </Space>
//                   ))}
//                   <Form.Item>
//                     <Button
//                       type="dashed"
//                       onClick={() => add()}
//                       style={{ width: "60%" }}
//                       icon={<PlusOutlined />}
//                     >
//                       Add Rating
//                     </Button>
//                   </Form.Item>
//                 </>
//               )}
//             </Form.List>

//             <Form.List name="repaints">
//               {(fields, { add, remove }) => (
//                 <>
//                   {fields.map(({ key, name, fieldKey }) => (
//                     <Space
//                       key={key}
//                       style={{ display: "flex", marginBottom: 8 }}
//                       align="start"
//                     >
//                       <Form.Item
//                         {...fieldKey}
//                         name={[name, "color"]}
//                         fieldKey={[fieldKey, "color"]}
//                         wrapperCol={{ span: 24 }}
//                         className="w-[280px]"
//                         label="Repaint Color"
//                       >
//                         <Input />
//                       </Form.Item>
//                       <Form.Item
//                         {...fieldKey}
//                         name={[name, "date"]}
//                         fieldKey={[fieldKey, "date"]}
//                         wrapperCol={{ span: 24 }}
//                         className="w-[280px]"
//                         label="Repaint Date"
//                       >
//                         <DatePicker />
//                       </Form.Item>
//                       <Form.Item
//                         {...fieldKey}
//                         name={[name, "description"]}
//                         fieldKey={[fieldKey, "description"]}
//                         wrapperCol={{ span: 24 }}
//                         className="w-[280px]"
//                         label="Repaint Description"
//                       >
//                         <Input.TextArea />
//                       </Form.Item>
//                       <MinusOutlined onClick={() => remove(name)} />
//                     </Space>
//                   ))}
//                   <Form.Item>
//                     <Button
//                       type="dashed"
//                       onClick={() => add()}
//                       style={{ width: "60%" }}
//                       icon={<PlusOutlined />}
//                     >
//                       Add Repaint
//                     </Button>
//                   </Form.Item>
//                 </>
//               )}
//             </Form.List>

//             <Form.List name="spare_parts_related">
//               {(fields, { add, remove }) => (
//                 <>
//                   {fields.map(({ key, name, fieldKey }) => (
//                     <Space
//                       key={key}
//                       style={{ display: "flex", marginBottom: 8 }}
//                       align="start"
//                     >
//                       <Form.Item
//                         {...fieldKey}
//                         name={[name, "part_type"]}
//                         fieldKey={[fieldKey, "part_type"]}
//                         wrapperCol={{ span: 24 }}
//                         className="w-[280px]"
//                         label="Spare Part Type"
//                       >
//                         <Select options={PART_TYPE_CHOICES} />
//                       </Form.Item>
//                       <Form.Item
//                         {...fieldKey}
//                         name={[name, "cost"]}
//                         fieldKey={[fieldKey, "cost"]}
//                         wrapperCol={{ span: 24 }}
//                         className="w-[280px]"
//                         label="Cost"
//                       >
//                         <InputNumber className="flex w-full" />
//                       </Form.Item>
//                       <Form.Item
//                         {...fieldKey}
//                         name={[name, "description"]}
//                         fieldKey={[fieldKey, "description"]}
//                         wrapperCol={{ span: 24 }}
//                         className="w-[280px]"
//                         label="Description"
//                       >
//                         <Input.TextArea />
//                       </Form.Item>
//                       <MinusOutlined onClick={() => remove(name)} />
//                     </Space>
//                   ))}
//                   <Form.Item>
//                     <Button
//                       type="dashed"
//                       onClick={() => add()}
//                       style={{ width: "60%" }}
//                       icon={<PlusOutlined />}
//                     >
//                       Add Spare Part
//                     </Button>
//                   </Form.Item>
//                 </>
//               )}
//             </Form.List>

//             <div className="w-full flex justify-end">
//               <Form.Item className="ml-auto">
//                 <Button type="primary" htmlType="submit">
//                   Submit
//                 </Button>
//               </Form.Item>
//             </div>
//           </div>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default EditMotorsForm;
//

// import React, { useEffect, useState } from "react";
// import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
// import {
//   useGetMotorsByIdApiQuery,
//   useUpdateMotorApiMutation,
//   useGetFeatureApiQuery,
// } from "../../../redux/features/motors/motorsApi";
// import {
//   Button,
//   DatePicker,
//   Form,
//   Input,
//   InputNumber,
//   Upload,
//   Space,
//   Checkbox,
//   Select,
// } from "antd";
// import { useNavigate, useParams } from "react-router-dom";
// import moment from "moment";
// import "moment/locale/en-gb";

// moment.locale("en-gb");

// const PART_TYPE_CHOICES = [
//   { value: "tire", label: "Tire" },
//   { value: "pump", label: "Gas Pump" },
//   { value: "battery", label: "Battery" },
//   { value: "brake", label: "Brake" },
//   { value: "filter", label: "Filter" },
//   { value: "light", label: "Light" },
//   { value: "oil", label: "Oil" },
//   { value: "other", label: "Other" },
// ];

// const { TextArea } = Input;

// const EditMotorsForm = () => {
//   const { motorId } = useParams();
//   const navigate = useNavigate();
//   const [updateMotor] = useUpdateMotorApiMutation();
//   const {
//     data: motor,
//     isLoading: motorLoading,
//     error: motorError,
//   } = useGetMotorsByIdApiQuery(motorId);
//   const {
//     data: features,
//     error: featureError,
//     isLoading: featureLoading,
//   } = useGetFeatureApiQuery();
//   const [form] = Form.useForm();
//   const [fileList, setFileList] = useState([]);

//   useEffect(() => {
//     if (motor) {
//       form.setFieldsValue({
//         ...motor,
//         available_from: motor.available_from
//           ? moment(motor.available_from)
//           : null,
//         insurance_expiry_date: motor.insurance_expiry_date
//           ? moment(motor.insurance_expiry_date)
//           : null,
//         features: motor.features?.map((feature) => feature.id.toString()) || [],
//       });

//       setFileList(
//         motor.motor_images?.map((img) => ({
//           uid: img.id.toString(),
//           name: img.image.split("/").pop(),
//           status: "done",
//           url: img.image,
//         })) || []
//       );
//     }
//   }, [motor, form]);

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
//     values.available_from = values.available_from?.format("YYYY-MM-DD");
//     values.insurance_expiry_date =
//       values.insurance_expiry_date?.format("YYYY-MM-DD");

//     const formData = new FormData();

//     for (let key in values) {
//       if (key === "images") {
//         values[key].forEach((file) => {
//           formData.append("images", file.originFileObj);
//         });
//       } else if (
//         key === "ratings" ||
//         key === "repaints" ||
//         key === "spare_parts_related"
//       ) {
//         values[key].forEach((item) => {
//           if (key === "repaints" && item.date) {
//             item.date = moment(item.date).format("YYYY-MM-DD");
//           }
//           formData.append(key, JSON.stringify(item));
//         });
//       } else if (key === "features") {
//         values[key].forEach((item) => {
//           formData.append("features", +item);
//         });
//       } else {
//         formData.append(key, values[key]);
//       }
//     }

//     const res = await updateMotor({ id: motorId, body: formData });
//     if (res) {
//       navigate("/admin");
//     } else {
//       console.error("Error submitting the form:", res);
//     }
//   };

//   if (motorLoading || featureLoading) {
//     return <div>Loading...</div>;
//   }

//   if (motorError || featureError) {
//     return <div>Error loading data</div>;
//   }

//   return (
//     <div className="flex justify-center w-full h-full overflow-auto">
//       <div className="flex flex-col mt-2 w-[90%]">
//         <Form
//           layout="vertical"
//           onFinish={onFinish}
//           encType="multipart/form-data"
//           form={form}
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
//                       style={{ border: 0, background: "none" }}
//                       type="button"
//                     >
//                       <PlusOutlined />
//                       <div>Upload</div>
//                     </button>
//                   )}
//                 </Upload>
//               </Form.Item>
//             </div>
//             <div className="flex mb-2 text-lg border-b">Motor Information</div>
//             <div className="flex flex-wrap justify-around mt-4">
//               <div className="justify-between w-full grid grid-cols-3 gap-2 col-span-1">
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Name"
//                   name="name"
//                 >
//                   <Input />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Brand Name"
//                   name="brand_name"
//                 >
//                   <Select
//                     options={[
//                       { label: "Audi", value: "audi" },
//                       { label: "BMW", value: "bmw" },
//                       { label: "Ford", value: "ford" },
//                       { label: "Honda", value: "honda" },
//                       { label: "Hyundai", value: "hyundai" },
//                       { label: "Mercedes-Benz", value: "mercedes" },
//                       { label: "Toyota", value: "toyota" },
//                       { label: "Volkswagen", value: "volkswagen" },
//                       { label: "Volvo", value: "volvo" },
//                       { label: "Other", value: "other" },
//                     ]}
//                   />
//                 </Form.Item>

//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Vehicle Type"
//                   name="vehicle_type"
//                 >
//                   <Select
//                     options={[
//                       { label: "Car", value: "car" },
//                       { label: "Truck", value: "truck" },
//                       { label: "Motorcycle", value: "motorcycle" },
//                       { label: "Bus", value: "bus" },
//                       { label: "Van", value: "van" },
//                       { label: "SUV", value: "suv" },
//                       { label: "Pickup", value: "pickup" },
//                       { label: "Bike", value: "bike" },
//                       { label: "Other", value: "other" },
//                     ]}
//                   />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Mileage"
//                   name="mileage"
//                 >
//                   <InputNumber className="flex w-full" />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Price"
//                   name="price"
//                 >
//                   <InputNumber className="flex w-full" />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Availability"
//                   name="availability"
//                 >
//                   <Select
//                     options={[
//                       { label: "Available", value: "available" },
//                       { label: "Sold", value: "sold" },
//                       { label: "Reserved", value: "reserved" },
//                     ]}
//                   />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Available From"
//                   name="available_from"
//                 >
//                   <DatePicker className="flex w-full" />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Insurance Expiry Date"
//                   name="insurance_expiry_date"
//                 >
//                   <DatePicker className="flex w-full" />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Color"
//                   name="color"
//                 >
//                   <Select
//                     options={[
//                       { label: "Black", value: "black" },
//                       { label: "White", value: "white" },
//                       { label: "Red", value: "red" },
//                       { label: "Blue", value: "blue" },
//                       { label: "Green", value: "green" },
//                       { label: "Yellow", value: "yellow" },
//                       { label: "Other", value: "other" },
//                     ]}
//                   />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Status"
//                   name="status"
//                 >
//                   <Select
//                     options={[
//                       { label: "New", value: "new" },
//                       { label: "Used", value: "used" },
//                       { label: "For Parts", value: "for_parts" },
//                       { label: "Other", value: "other" },
//                     ]}
//                   />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Chassis Number"
//                   name="chassis_number"
//                 >
//                   <Input />
//                 </Form.Item>
//               </div>
//               <div className="flex mb-4 mt-4 text-lg border-b col-span-2">
//                 Please enter at least three images
//               </div>
//               <div className="flex flex-wrap">
//                 <Form.Item
//                   name="features"
//                   label="Features"
//                   wrapperCol={{ span: 24 }}
//                   className="min-w-[280px] p-0 mb-1"
//                 >
//                   <Checkbox.Group>
//                     {features.map((feature) => (
//                       <Checkbox key={feature.id} value={feature.id.toString()}>
//                         {feature.name}
//                       </Checkbox>
//                     ))}
//                   </Checkbox.Group>
//                 </Form.Item>
//                 <Form.List name="ratings">
//                   {(fields, { add, remove }) => (
//                     <>
//                       <div className="flex justify-between mb-4 mt-4 text-lg border-b">
//                         Ratings
//                         <Button
//                           type="dashed"
//                           onClick={() => add()}
//                           icon={<PlusOutlined />}
//                         >
//                           Add Rating
//                         </Button>
//                       </div>
//                       {fields.map(({ key, name, ...restField }) => (
//                         <Space
//                           key={key}
//                           style={{ display: "flex", marginBottom: 8 }}
//                           align="baseline"
//                         >
//                           <Form.Item
//                             {...restField}
//                             name={[name, "rater"]}
//                             label="Rater"
//                             rules={[
//                               { required: true, message: "Missing rater" },
//                             ]}
//                           >
//                             <Input />
//                           </Form.Item>
//                           <Form.Item
//                             {...restField}
//                             name={[name, "rating"]}
//                             label="Rating"
//                             rules={[
//                               { required: true, message: "Missing rating" },
//                             ]}
//                           >
//                             <InputNumber min={1} max={5} />
//                           </Form.Item>
//                           <MinusOutlined onClick={() => remove(name)} />
//                         </Space>
//                       ))}
//                     </>
//                   )}
//                 </Form.List>
//                 <Form.List name="repaints">
//                   {(fields, { add, remove }) => (
//                     <>
//                       <div className="flex justify-between mb-4 mt-4 text-lg border-b">
//                         Repaints
//                         <Button
//                           type="dashed"
//                           onClick={() => add()}
//                           icon={<PlusOutlined />}
//                         >
//                           Add Repaint
//                         </Button>
//                       </div>
//                       {fields.map(({ key, name, ...restField }) => (
//                         <Space
//                           key={key}
//                           style={{ display: "flex", marginBottom: 8 }}
//                           align="baseline"
//                         >
//                           <Form.Item
//                             {...restField}
//                             name={[name, "date"]}
//                             label="Date"
//                             rules={[
//                               { required: true, message: "Missing date" },
//                             ]}
//                           >
//                             <DatePicker />
//                           </Form.Item>
//                           <Form.Item
//                             {...restField}
//                             name={[name, "description"]}
//                             label="Description"
//                             rules={[
//                               {
//                                 required: true,
//                                 message: "Missing description",
//                               },
//                             ]}
//                           >
//                             <TextArea rows={2} />
//                           </Form.Item>
//                           <MinusOutlined onClick={() => remove(name)} />
//                         </Space>
//                       ))}
//                     </>
//                   )}
//                 </Form.List>
//                 <Form.List name="spare_parts_related">
//                   {(fields, { add, remove }) => (
//                     <>
//                       <div className="flex justify-between mb-4 mt-4 text-lg border-b">
//                         Spare Parts
//                         <Button
//                           type="dashed"
//                           onClick={() => add()}
//                           icon={<PlusOutlined />}
//                         >
//                           Add Part
//                         </Button>
//                       </div>
//                       {fields.map(({ key, name, ...restField }) => (
//                         <Space
//                           key={key}
//                           style={{ display: "flex", marginBottom: 8 }}
//                           align="baseline"
//                         >
//                           <Form.Item
//                             {...restField}
//                             name={[name, "part_name"]}
//                             label="Part Name"
//                             rules={[
//                               { required: true, message: "Missing part name" },
//                             ]}
//                           >
//                             <Input />
//                           </Form.Item>
//                           <Form.Item
//                             {...restField}
//                             name={[name, "part_type"]}
//                             label="Part Type"
//                             rules={[
//                               { required: true, message: "Missing part type" },
//                             ]}
//                           >
//                             <Select options={PART_TYPE_CHOICES} />
//                           </Form.Item>
//                           <Form.Item
//                             {...restField}
//                             name={[name, "date"]}
//                             label="Date"
//                             rules={[
//                               { required: true, message: "Missing date" },
//                             ]}
//                           >
//                             <DatePicker />
//                           </Form.Item>
//                           <MinusOutlined onClick={() => remove(name)} />
//                         </Space>
//                       ))}
//                     </>
//                   )}
//                 </Form.List>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Additional Information"
//                   name="additional_information"
//                 >
//                   <TextArea rows={4} />
//                 </Form.Item>
//               </div>
//               <div className="flex justify-end w-full">
//                 <Form.Item>
//                   <Button
//                     className="min-w-[150px]"
//                     type="primary"
//                     htmlType="submit"
//                   >
//                     Update Motor
//                   </Button>
//                 </Form.Item>
//               </div>
//             </div>
//           </div>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default EditMotorsForm;
// EditMotorForm.js
// EditMotorForm.js
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import {
//   useGetMotorsByIdApiQuery,
//   useUpdateMotorApiMutation,
//   useGetFeatureApiQuery,
// } from "../../../redux/features/motors/motorsApi"; // Adjust the path as necessary

// const EditMotorForm = () => {
//   const { id: motorId } = useParams();
//   const {
//     data: motorData,
//     error,
//     isLoading,
//   } = useGetMotorsByIdApiQuery(motorId);
//   const [formData, setFormData] = useState(null);

//   useEffect(() => {
//     if (motorData) {
//       setFormData(motorData);
//     }
//   }, [motorData]);

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error loading motor data</div>;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleFeatureChange = (index, e) => {
//     const newFeatures = [...formData.features];
//     newFeatures[index][e.target.name] = e.target.value;
//     setFormData({
//       ...formData,
//       features: newFeatures,
//     });
//   };

//   const handleRatingChange = (index, e) => {
//     const newRatings = [...formData.ratings];
//     newRatings[index][e.target.name] = e.target.value;
//     setFormData({
//       ...formData,
//       ratings: newRatings,
//     });
//   };

//   const handleRepaintChange = (index, e) => {
//     const newRepaints = [...formData.repaints];
//     newRepaints[index][e.target.name] = e.target.value;
//     setFormData({
//       ...formData,
//       repaints: newRepaints,
//     });
//   };

//   const handleSparePartChange = (index, e) => {
//     const newSpareParts = [...formData.spare_parts_related];
//     newSpareParts[index][e.target.name] = e.target.value;
//     setFormData({
//       ...formData,
//       spare_parts_related: newSpareParts,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Submit formData to API
//   };

//   if (!formData) return null;

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Edit Motor</h2>
//       <label>
//         Name:
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Brand:
//         <input
//           type="text"
//           name="brand_name"
//           value={formData.brand_name}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Vehicle Type:
//         <input
//           type="text"
//           name="vehicle_type"
//           value={formData.vehicle_type}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Engine Capacity:
//         <input
//           type="number"
//           name="engine_capacity"
//           value={formData.engine_capacity}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Horsepower:
//         <input
//           type="number"
//           name="horsepower"
//           value={formData.horsepower}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Torque:
//         <input
//           type="number"
//           name="torque"
//           value={formData.torque}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Fuel Type:
//         <input
//           type="text"
//           name="fuel_type"
//           value={formData.fuel_type}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Transmission:
//         <input
//           type="text"
//           name="transmission"
//           value={formData.transmission}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Manufacturer:
//         <input
//           type="text"
//           name="manufacturer"
//           value={formData.manufacturer}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Model:
//         <input
//           type="text"
//           name="model"
//           value={formData.model}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Year:
//         <input
//           type="number"
//           name="year"
//           value={formData.year}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Weight:
//         <input
//           type="number"
//           name="weight"
//           value={formData.weight}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Dimensions:
//         <input
//           type="text"
//           name="dimensions"
//           value={formData.dimensions}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Max Speed:
//         <input
//           type="number"
//           name="max_speed"
//           value={formData.max_speed}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Acceleration:
//         <input
//           type="number"
//           name="acceleration"
//           value={formData.acceleration}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Fuel Capacity:
//         <input
//           type="number"
//           name="fuel_capacity"
//           value={formData.fuel_capacity}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Mileage:
//         <input
//           type="number"
//           name="mileage"
//           value={formData.mileage}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Price:
//         <input
//           type="text"
//           name="price"
//           value={formData.price}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Currency:
//         <input
//           type="text"
//           name="currency"
//           value={formData.currency}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Color:
//         <input
//           type="text"
//           name="color"
//           value={formData.color}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Interior Color:
//         <input
//           type="text"
//           name="interior_color"
//           value={formData.interior_color}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Seating Capacity:
//         <input
//           type="number"
//           name="seating_capacity"
//           value={formData.seating_capacity}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Doors:
//         <input
//           type="number"
//           name="doors"
//           value={formData.doors}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Safety Rating:
//         <input
//           type="number"
//           name="safety_rating"
//           value={formData.safety_rating}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Warranty Years:
//         <input
//           type="number"
//           name="warranty_years"
//           value={formData.warranty_years}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Insurance Provider:
//         <input
//           type="text"
//           name="insurance_provider"
//           value={formData.insurance_provider}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Insurance Expiry Date:
//         <input
//           type="date"
//           name="insurance_expiry_date"
//           value={formData.insurance_expiry_date}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Number of Cylinders:
//         <input
//           type="number"
//           name="number_of_cylinders"
//           value={formData.number_of_cylinders}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Location:
//         <input
//           type="text"
//           name="location"
//           value={formData.location}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Kilometers Driven:
//         <input
//           type="number"
//           name="kilometers_driven"
//           value={formData.kilometers_driven}
//           onChange={handleChange}
//         />
//       </label>

//       <h3>Features</h3>
//       {formData.features.map((feature, index) => (
//         <div key={feature.id}>
//           <label>
//             Feature Name:
//             <input
//               type="text"
//               name="name"
//               value={feature.name}
//               onChange={(e) => handleFeatureChange(index, e)}
//             />
//           </label>
//         </div>
//       ))}

//       <h3>Ratings</h3>
//       {formData.ratings.map((rating, index) => (
//         <div key={rating.id}>
//           <label>
//             Part:
//             <input
//               type="text"
//               name="part"
//               value={rating.part}
//               onChange={(e) => handleRatingChange(index, e)}
//             />
//           </label>
//           <label>
//             Rating:
//             <input
//               type="number"
//               name="rating"
//               value={rating.rating}
//               onChange={(e) => handleRatingChange(index, e)}
//             />
//           </label>
//           <label>
//             Review:
//             <input
//               type="text"
//               name="review"
//               value={rating.review}
//               onChange={(e) => handleRatingChange(index, e)}
//             />
//           </label>
//           <label>
//             Rated By:
//             <input
//               type="text"
//               name="rated_by"
//               value={rating.rated_by}
//               onChange={(e) => handleRatingChange(index, e)}
//             />
//           </label>
//         </div>
//       ))}

//       <h3>Repaints</h3>
//       {formData.repaints.map((repaint, index) => (
//         <div key={repaint.id}>
//           <label>
//             Repaint Date:
//             <input
//               type="date"
//               name="date"
//               value={repaint.date}
//               onChange={(e) => handleRepaintChange(index, e)}
//             />
//           </label>
//           <label>
//             Repaint Color:
//             <input
//               type="text"
//               name="color"
//               value={repaint.color}
//               onChange={(e) => handleRepaintChange(index, e)}
//             />
//           </label>
//         </div>
//       ))}

//       <h3>Spare Parts</h3>
//       {formData.spare_parts_related.map((sparePart, index) => (
//         <div key={sparePart.id}>
//           <label>
//             Part Name:
//             <input
//               type="text"
//               name="name"
//               value={sparePart.name}
//               onChange={(e) => handleSparePartChange(index, e)}
//             />
//           </label>
//           <label>
//             Part Number:
//             <input
//               type="text"
//               name="part_number"
//               value={sparePart.part_number}
//               onChange={(e) => handleSparePartChange(index, e)}
//             />
//           </label>
//         </div>
//       ))}

//       <button type="submit">Save Changes</button>
//     </form>
//   );
// };

// export default EditMotorForm;
// import React, { useState, useEffect } from "react";
// import { PlusOutlined } from "@ant-design/icons";
// import {
//   Button,
//   DatePicker,
//   Form,
//   Input,
//   InputNumber,
//   Upload,
//   Select,
//   message,
// } from "antd";
// import {
//   useGetMotorsByIdApiQuery,
//   useUpdateMotorApiMutation,
//   useGetFeatureApiQuery,
// } from "../../../redux/features/motors/motorsApi";
// import { useParams, useNavigate } from "react-router-dom";
// import moment from "moment";
// import "moment/locale/en-gb"; // import your desired locale

// moment.locale("en-gb"); // set your desired locale globally

// const { TextArea } = Input;

// const MOTOR_TYPE_CHOICES = [
//   { value: "car", label: "Car" },
//   { value: "motorcycle", label: "Motorcycle" },
//   { value: "truck", label: "Truck" },
//   // Add more motor type choices
// ];

// const FUEL_TYPE_CHOICES = [
//   { value: "petrol", label: "Petrol" },
//   { value: "diesel", label: "Diesel" },
//   { value: "electric", label: "Electric" },
//   { value: "hybrid", label: "Hybrid" },
//   // Add more fuel type choices
// ];

// const CURRENCY_CHOICES = [
//   { value: "USD", label: "USD" },
//   { value: "EUR", label: "EUR" },
//   { value: "GBP", label: "GBP" },
//   // Add more currency choices
// ];

// const EditMotorForm = () => {
//   const { id: motorId } = useParams();
//   const [updateMotor] = useUpdateMotorApiMutation();
//   const {
//     data: motor,
//     isLoading: motorLoading,
//     error: motorError,
//   } = useGetMotorsByIdApiQuery(motorId);
//   const { data: features } = useGetFeatureApiQuery();
//   const [form] = Form.useForm();
//   const [fileList, setFileList] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (motor) {
//       form.setFieldsValue({
//         ...motor,
//         available_from: motor.available_from
//           ? moment(motor.available_from)
//           : null,
//         insurance_expiry_date: motor.insurance_expiry_date
//           ? moment(motor.insurance_expiry_date)
//           : null,
//       });

//       setFileList(
//         motor.motor_images?.map((img) => ({
//           uid: img.id.toString(), // Unique identifier for each file
//           name: img.image.split("/").pop(), // Name of the file
//           status: "done", // Mark file as already uploaded
//           url: img.image, // URL of the image
//         })) || []
//       );
//     }
//   }, [motor]);

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

//     for (let key in values) {
//       if (key === "images") {
//         values[key].forEach((file) => {
//           if (file.originFileObj) {
//             formData.append("images", file.originFileObj);
//           } else {
//             formData.append("existing_images", file.url);
//           }
//         });
//       } else {
//         formData.append(key, values[key]);
//       }
//     }
//     try {
//       await updateMotor({ id: motorId, formData });
//       message.success("Motor updated successfully!");
//       navigate("/admin");
//     } catch (error) {
//       message.error("Failed to update motor.");
//       console.error(error);
//     }
//   };

//   if (motorLoading) return <p>Loading...</p>;
//   if (motorError) return <p>Error loading data</p>;

//   return (
//     <div className="flex justify-center w-full h-full overflow-auto">
//       <div className="flex flex-col mt-2 w-[90%]">
//         <Form
//           layout="vertical"
//           onFinish={onFinish}
//           encType="multipart/form-data"
//           form={form}
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
//                       style={{ border: 0, background: "none" }}
//                       type="button"
//                     >
//                       <PlusOutlined />
//                       <div>Upload</div>
//                     </button>
//                   )}
//                 </Upload>
//               </Form.Item>
//             </div>
//             <div className="flex mb-2 text-lg border-b">Motor Information</div>
//             <div className="flex flex-wrap justify-around mt-4">
//               <div className="justify-between w-full grid grid-cols-3 gap-2 col-span-1">
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Name"
//                   name="name"
//                 >
//                   <Input />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Brand Name"
//                   name="brand_name"
//                 >
//                   <Input />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Vehicle Type"
//                   name="vehicle_type"
//                 >
//                   <Select options={MOTOR_TYPE_CHOICES} />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Engine Capacity"
//                   name="engine_capacity"
//                 >
//                   <InputNumber className="flex w-full" />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Horsepower"
//                   name="horsepower"
//                 >
//                   <InputNumber className="flex w-full" />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Torque"
//                   name="torque"
//                 >
//                   <InputNumber className="flex w-full" />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Transmission"
//                   name="transmission"
//                 >
//                   <Input />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Manufacturer"
//                   name="manufacturer"
//                 >
//                   <Input />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Year"
//                   name="year"
//                 >
//                   <InputNumber className="flex w-full" />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Max Speed"
//                   name="max_speed"
//                 >
//                   <InputNumber className="flex w-full" />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Acceleration"
//                   name="acceleration"
//                 >
//                   <InputNumber className="flex w-full" />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Fuel Type"
//                   name="fuel_type"
//                 >
//                   <Select options={FUEL_TYPE_CHOICES} />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Dimensions"
//                   name="dimensions"
//                 >
//                   <Input />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Weight"
//                   name="weight"
//                 >
//                   <InputNumber className="flex w-full" />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Color"
//                   name="color"
//                 >
//                   <Input />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Price"
//                   name="price"
//                 >
//                   <InputNumber className="flex w-full" />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Currency"
//                   name="currency"
//                 >
//                   <Select options={CURRENCY_CHOICES} />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Stock Quantity"
//                   name="stock_quantity"
//                 >
//                   <InputNumber className="flex w-full" />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Available From"
//                   name="available_from"
//                 >
//                   <DatePicker className="flex w-full" />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Insurance Expiry Date"
//                   name="insurance_expiry_date"
//                   rules={[
//                     {
//                       type: "object",
//                       required: true,
//                       message: "Please select a valid date",
//                     },
//                   ]}
//                 >
//                   <DatePicker className="flex w-full" format="YYYY-MM-DD" />
//                 </Form.Item>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-wrap mt-4">
//             <div className="flex justify-between w-full grid grid-cols-3 gap-4">
//               <div className="col-span-1">
//                 <div className="text-lg mb-4 border-b">
//                   Additional Information
//                 </div>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Features"
//                   name="features"
//                 >
//                   <Select
//                     mode="multiple"
//                     allowClear
//                     style={{ width: "100%" }}
//                     placeholder="Please select"
//                     options={features?.map((feature) => ({
//                       value: feature.id,
//                       label: feature.name,
//                     }))}
//                   />
//                 </Form.Item>
//                 <Form.Item
//                   className="min-w-[280px] p-0 mb-1"
//                   wrapperCol={{ span: 24 }}
//                   label="Rating"
//                   name="rating"
//                 >
//                   <InputNumber className="flex w-full" />
//                 </Form.Item>
//               </div>
//             </div>
//           </div>
//           <Form.Item className="flex justify-center mt-6">
//             <Button type="primary" htmlType="submit">
//               Update Motor
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default EditMotorForm;
import React, { useState, useEffect } from "react";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Upload,
  Select,
  message,
  Checkbox,
} from "antd";
import {
  useGetMotorsByIdApiQuery,
  useUpdateMotorApiMutation,
  useGetFeatureApiQuery,
} from "../../../redux/features/motors/motorsApi";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import "moment/locale/en-gb"; // import your desired locale

moment.locale("en-gb"); // set your desired locale globally

const { TextArea } = Input;

const MOTOR_TYPE_CHOICES = [
  { value: "car", label: "Car" },
  { value: "motorcycle", label: "Motorcycle" },
  { value: "truck", label: "Truck" },
  // Add more motor type choices
];

const FUEL_TYPE_CHOICES = [
  { value: "petrol", label: "Petrol" },
  { value: "diesel", label: "Diesel" },
  { value: "electric", label: "Electric" },
  { value: "hybrid", label: "Hybrid" },
  // Add more fuel type choices
];

const CURRENCY_CHOICES = [
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
  { value: "GBP", label: "GBP" },
  // Add more currency choices
];

const EditMotorForm = () => {
  const { id: motorId } = useParams();
  const [updateMotor] = useUpdateMotorApiMutation();
  const {
    data: motor,
    isLoading: motorLoading,
    error: motorError,
  } = useGetMotorsByIdApiQuery(motorId);
  const { data: featureData } = useGetFeatureApiQuery();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [features, setFeatures] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (motor) {
      form.setFieldsValue({
        ...motor,
        available_from: motor.available_from
          ? moment(motor.available_from)
          : null,
        insurance_expiry_date: motor.insurance_expiry_date
          ? moment(motor.insurance_expiry_date)
          : null,
        features: motor.features.map((feature) => feature.id), // Set selected features
      });

      setFileList(
        motor.motor_images?.map((img) => ({
          uid: img.id.toString(), // Unique identifier for each file
          name: img.image.split("/").pop(), // Name of the file
          status: "done", // Mark file as already uploaded
          url: img.image, // URL of the image
        })) || []
      );
    }
  }, [motor]);

  useEffect(() => {
    if (featureData) {
      setFeatures(featureData);
    }
  }, [featureData]);

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

    for (let key in values) {
      if (key === "images") {
        values[key].forEach((file) => {
          if (file.originFileObj) {
            formData.append("images", file.originFileObj);
          } else {
            formData.append("existing_images", file.url);
          }
        });
      } else if (key === "features") {
        values[key].forEach((featureId) =>
          formData.append("features", featureId)
        );
      } else {
        formData.append(key, values[key]);
      }
    }

    try {
      await updateMotor({ id: motorId, formData });
      message.success("Motor updated successfully!");
      navigate("/admin/motor");
    } catch (error) {
      message.error("Failed to update motor.");
      console.error(error);
    }
  };

  if (motorLoading) return <p>Loading...</p>;
  if (motorError) return <p>Error loading data</p>;

  return (
    <div className="flex justify-center w-full h-full overflow-auto">
      <div className="flex flex-col mt-2 w-[90%]">
        <Form
          layout="vertical"
          onFinish={onFinish}
          encType="multipart/form-data"
          form={form}
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
            <div className="flex mb-2 text-lg border-b">Motor Information</div>
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
                  label="Motor Type"
                  name="motor_type"
                >
                  <Select options={MOTOR_TYPE_CHOICES} />
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] p-0 mb-1"
                  wrapperCol={{ span: 24 }}
                  label="Fuel Type"
                  name="fuel_type"
                >
                  <Select options={FUEL_TYPE_CHOICES} />
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
                  <Input />
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
                  label="Stock Quantity"
                  name="stock_quantity"
                >
                  <InputNumber className="flex w-full" />
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] p-0 mb-1"
                  wrapperCol={{ span: 24 }}
                  label="Available From"
                  name="available_from"
                >
                  <DatePicker className="flex w-full" />
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] p-0 mb-1"
                  wrapperCol={{ span: 24 }}
                  label="Insurance Expiry Date"
                  name="insurance_expiry_date"
                >
                  <DatePicker className="flex w-full" />
                </Form.Item>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap mt-4">
            <div className="flex justify-between w-full grid grid-cols-3 gap-4">
              <div className="col-span-1">
                <div className="text-lg mb-4 border-b">
                  Additional Information
                </div>
                <Form.Item
                  className="min-w-[280px] p-0 mb-1"
                  wrapperCol={{ span: 24 }}
                  label="Features"
                  name="features"
                >
                  <div>
                    {features.map((feature) => (
                      <Form.Item
                        key={feature.id}
                        name={["features", feature.id]}
                        valuePropName="checked"
                        noStyle
                      >
                        <Checkbox value={feature.id}>{feature.name}</Checkbox>
                      </Form.Item>
                    ))}
                  </div>
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] p-0 mb-1"
                  wrapperCol={{ span: 24 }}
                  label="Rating"
                  name="rating"
                >
                  <InputNumber className="flex w-full" />
                </Form.Item>
              </div>
            </div>
          </div>
          <Form.Item className="flex justify-center mt-6">
            <Button type="primary" htmlType="submit">
              Update Motor
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditMotorForm;
