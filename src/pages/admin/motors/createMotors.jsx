import React, { useEffect, useState } from "react";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { useCreateMotorsApiMutation } from "../../../redux/features/motors/motorsApi";
import { useGetFeatureApiQuery } from "../../../redux/features/motors/motorsApi";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Upload,
  Space,
  Checkbox,
  Select,
} from "antd";

const PART_TYPE_CHOICES = [
  { value: "tire", label: "Tire" },
  { value: "pump", label: "Gas Pump" },
  { value: "battery", label: "Battery" },
  { value: "brake", label: "Brake" },
  { value: "filter", label: "Filter" },
  { value: "light", label: "Light" },
  { value: "oil", label: "Oil" },
  { value: "other", label: "Other" },
];
import { useNavigate } from "react-router-dom";
import { date } from "yup";

const { TextArea } = Input;

const MotorsForm = () => {
  const [registerMotors] = useCreateMotorsApiMutation();
  const { data: features, isError, isLoading } = useGetFeatureApiQuery();
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(features);
  }, [isLoading]);

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
      } else if (key === "ratings") {
        values[key].forEach((item) => {
          formData.append("ratings", JSON.stringify(item));
        });
      } else if (key === "repaints") {
        values[key].forEach((item) => {
          item.date = item.date.format("YYYY-MM-DD");
          formData.append("repaints", JSON.stringify(item));
        });
      } else if (key === "spare_parts_related") {
        values[key].forEach((item) => {
          formData.append("spare_parts_related", JSON.stringify(item));
        });
      } else if (key === "features") {
        values[key].forEach((item) => {
          formData.append("features", +item);
        });
      } else {
        formData.append(key, values[key]);
      }
    }
    console.log("formData");
    console.log(formData);

    const res = await registerMotors(formData);
    if (res) {
      // navigate("/admin");
    } else {
      console.error("Error submitting the form:", res);
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
                  <Select
                    options={[
                      { label: "Audi", value: "audi" },
                      { label: "BMW", value: "bmw" },
                      { label: "Ford", value: "ford" },
                      { label: "Honda", value: "honda" },
                      { label: "Hyundai", value: "hyundai" },
                      { label: "Mercedes-Benz", value: "mercedes" },
                      { label: "Toyota", value: "toyota" },
                      { label: "Volkswagen", value: "volkswagen" },
                      { label: "Volvo", value: "volvo" },
                      { label: "Other", value: "other" },
                    ]}
                  />
                </Form.Item>

                <Form.Item
                  className="min-w-[280px] p-0 mb-1"
                  wrapperCol={{ span: 24 }}
                  label="Vehicle Type"
                  name="vehicle_type"
                >
                  <Select
                    options={[
                      { label: "Car", value: "car" },
                      { label: "Truck", value: "truck" },
                      { label: "Motorcycle", value: "motorcycle" },
                      { label: "Bus", value: "bus" },
                      { label: "Van", value: "van" },
                      { label: "SUV", value: "suv" },
                      { label: "Pickup", value: "pickup" },
                      { label: "Bike", value: "bike" },
                      { label: "Boat", value: "boat" },
                      { label: "Bicycle", value: "bicycle" },
                    ]}
                  />
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] p-0 mb-1"
                  wrapperCol={{ span: 24 }}
                  label="Engine Capacity"
                  name="engine_capacity"
                >
                  <InputNumber className="flex w-full" />
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] p-0 mb-1"
                  wrapperCol={{ span: 24 }}
                  label="Horsepower"
                  name="horsepower"
                >
                  <InputNumber className="flex w-full" />
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] p-0 mb-1"
                  wrapperCol={{ span: 24 }}
                  label="Torque"
                  name="torque"
                >
                  <InputNumber className="flex w-full" />
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] p-0 mb-1"
                  wrapperCol={{ span: 24 }}
                  label="Fuel Type"
                  name="fuel_type"
                >
                  <Select
                    options={[
                      { label: "Petrol", value: "petrol" },
                      { label: "Diesel", value: "diesel" },
                      { label: "Electric", value: "electric" },
                      { label: "Hybrid", value: "hybrid" },
                      { label: "CNG", value: "cng" },
                      { label: "LPG", value: "lpg" },
                    ]}
                  />
                </Form.Item>

                <Form.Item
                  className="min-w-[280px] p-0 mb-1"
                  wrapperCol={{ span: 24 }}
                  label="Transmission"
                  name="transmission"
                >
                  <Select
                    options={[
                      { label: "Manual", value: "manual" },
                      { label: "Automatic", value: "automatic" },
                      { label: "Semi-Automatic", value: "semiautomatic" },
                      { label: "CVT", value: "cvt" },
                    ]}
                  />
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
                  label="Weight"
                  name="weight"
                >
                  <InputNumber className="flex w-full" />
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
                  label="Max Speed"
                  name="max_speed"
                >
                  <InputNumber className="flex w-full" />
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] p-0 mb-1"
                  wrapperCol={{ span: 24 }}
                  label="Acceleration"
                  name="acceleration"
                >
                  <InputNumber className="flex w-full" />
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] p-0 mb-1"
                  wrapperCol={{ span: 24 }}
                  label="Fuel Capacity"
                  name="fuel_capacity"
                >
                  <InputNumber className="flex w-full" />
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] p-0 mb-1"
                  wrapperCol={{ span: 24 }}
                  label="Mileage"
                  name="mileage"
                >
                  <InputNumber className="flex w-full" />
                </Form.Item>
                <Form.Item
                  className="min-w-[280px] p-0 mb-1"
                  wrapperCol={{ span: 24 }}
                  label="Currency"
                  name="currency"
                >
                  <Select
                    options={[
                      { label: "US Dollar", value: "USD" },
                      { label: "Euro", value: "EUR" },
                      { label: "British Pound", value: "GBP" },
                      { label: "Japanese Yen", value: "JPY" },
                      { label: "Chinese Yuan", value: "CNY" },
                      { label: "Indian Rupee", value: "INR" },
                      { label: "Australian Dollar", value: "AUD" },
                      { label: "Canadian Dollar", value: "CAD" },
                      { label: "Other", value: "other" },
                    ]}
                  />
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
                  label="Color"
                  name="color"
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
                  label="Warranty Years"
                  name="warranty_years"
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
              </div>
            </div>
            <Form.Item className="min-w-[100px] mb-3" name="features">
              <Checkbox.Group className="justify-between gap-x-8 grid grid-cols-2 gap-3">
                {features?.map((feature) => (
                  <Checkbox key={feature.id} value={feature.id.toString()}>
                    {feature.name}
                  </Checkbox>
                ))}
              </Checkbox.Group>
            </Form.Item>
            {/* Additional sections for Ratings, Spare Parts, and Repaints */}
            <div className="flex mb-2 text-lg border-b">Ratings</div>
            <Form.List name="ratings">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <Space
                      key={key}
                      className="flex flex-wrap"
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "part"]}
                        key={`${fieldKey}_part`}
                        label="Part"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "rating"]}
                        key={`${fieldKey}_rating`}
                        label="Rating"
                      >
                        <InputNumber />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "review"]}
                        key={`${fieldKey}_review`}
                        label="Review"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "rated_by"]}
                        key={`${fieldKey}_rated_by`}
                        label="Rated By"
                      >
                        <Input />
                      </Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => remove(name)}
                        icon={<MinusOutlined />}
                      >
                        Remove
                      </Button>
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                    >
                      Add Rating
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <div className="flex mb-2 text-lg border-b">Spare Parts</div>
            <Form.List name="spare_parts_related">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <Space
                      key={key}
                      className="flex flex-wrap"
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "name"]}
                        key={`${fieldKey}_name`}
                        label="Name"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "part_type"]}
                        key={`${fieldKey}_part_type`}
                        label="Part Type"
                      >
                        <Select>
                          {PART_TYPE_CHOICES.map((choice) => (
                            <Select.Option
                              key={choice.value}
                              value={choice.value}
                            >
                              {choice.label}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "brand_name"]}
                        key={`${fieldKey}_brand_name`}
                        label="Brand Name"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "description"]}
                        key={`${fieldKey}_description`}
                        label="Description"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "manufacturer"]}
                        key={`${fieldKey}_manufacturer`}
                        label="Manufacturer"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "model_number"]}
                        key={`${fieldKey}_model_number`}
                        label="Model Number"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "warranty_period"]}
                        key={`${fieldKey}_warranty_period`}
                        label="Warranty Period"
                      >
                        <InputNumber />
                      </Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => remove(name)}
                        icon={<MinusOutlined />}
                      >
                        Remove
                      </Button>
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                    >
                      Add Spare Part
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <div className="flex mb-2 text-lg border-b">Repaints</div>
            <Form.List name="repaints">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <Space
                      key={key}
                      className="flex flex-wrap"
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "color_brand"]}
                        key={`${fieldKey}_color_brand`}
                        label="ColorBrand"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "color_Name"]}
                        key={`${fieldKey}_color_name`}
                        label="Color"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "date"]}
                        key={`${fieldKey}_date`}
                        label="Date"
                        className="min-w-[280px] p-0 mb-1"
                      >
                        <DatePicker format="YYYY-MM-DD" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "repaint_shop"]}
                        key={`${fieldKey}_repaint_shop`}
                        label="Repaint Shop"
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, "description"]}
                        key={`${fieldKey}_description`}
                        label="Description"
                      >
                        <Input />
                      </Form.Item>

                      <Button
                        type="dashed"
                        onClick={() => remove(name)}
                        icon={<MinusOutlined />}
                        align="baseline"
                      >
                        Remove
                      </Button>
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                    >
                      Add Repaint
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <div className="flex w-full">
              <Form.Item>
                <Button htmlType="submit">Submit</Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default MotorsForm;
