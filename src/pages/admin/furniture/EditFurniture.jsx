import React, { useState, useEffect } from "react";
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
  message,
} from "antd";
import {
  useGetFurnitureByIdApiQuery,
  useUpdateFurnitureApiMutation,
} from "../../../redux/features/furniture/furnitureApi";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import "moment/locale/en-gb"; // import your desired locale

moment.locale("en-gb"); // set your desired locale globally

const { TextArea } = Input;
const apiUrl = import.meta.env.VITE_API_URL;

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

const EditFurnitureForm = () => {
  const { FurnitureId } = useParams();

  const [updateFurniture] = useUpdateFurnitureApiMutation();
  const {
    data: furniture,
    isLoading: furnitureLoading,
    error: furnitureError,
  } = useGetFurnitureByIdApiQuery(FurnitureId);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (furniture) {
      form.setFieldsValue({
        ...furniture,
        available_from: furniture.available_from
          ? moment(furniture.available_from)
          : null,
        insurance_expiry_date: furniture.insurance_expiry_date
          ? moment(furniture.insurance_expiry_date)
          : null,
      });

      //   setFileList(
      //     furniture.furniture_images?.map((img) => ({
      //       uid: img.id.toString(), // Unique identifier for each file
      //       name: img.image.split("/").pop(), // Name of the file
      //       status: "done", // Mark file as already uploaded
      //       url: `http://localhost:8000/${img.image}`,
      //     })) || []
      //   );
      // }
      if (furniture.images) {
        console.log("Furniture images:", furniture.images); // Log images array
        const newFileList = furniture.images.map((img) => ({
          uid: img.id.toString(), // Unique identifier for each file
          name: img.image.split("/").pop(), // Name of the file
          status: "done", // Mark file as already uploaded
          url: `${apiUrl}${img.image}`, // URL of the image
        }));
        setFileList(newFileList);
        console.log("Updated fileList state:", newFileList); // Log the new fileList state
      } else {
        console.warn(
          "images property is missing in furniture object or is empty."
        );
      }
    } else {
      console.warn("Furniture data is not available.");
    }
  }, [furniture]);

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
    // values.insurance_expiry_date =
    //   values.insurance_expiry_date.format("YYYY-MM-DD");
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
      } else {
        formData.append(key, values[key]);
      }
    }
    try {
      await updateFurniture({ id: FurnitureId, formData });
      message.success("Furniture updated successfully!");
      navigate("/admin");
    } catch (error) {
      message.error("Failed to update furniture.");
      console.error(error);
    }
  };

  if (furnitureLoading) return <p>Loading...</p>;
  if (furnitureError) return <p>Error loading data</p>;

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
                {" "}
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
            <div className="flex mb-2 text-lg border-b">Furniture Features</div>
            <Form.List name="features">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey }) => (
                    <div key={key} className="flex items-center">
                      <Form.Item
                        name={[name, "feature"]}
                        fieldKey={[fieldKey, "feature"]}
                        rules={[{ required: true, message: "Missing feature" }]}
                      >
                        <Input placeholder="Feature" />
                      </Form.Item>
                      <MinusOutlined onClick={() => remove(name)} />
                    </div>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                    >
                      Add feature
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <div className="flex mb-2 text-lg border-b">Additional Details</div>
            <div className="flex justify-center">
              <Form.Item
                className="min-w-[95%] flex justify-center"
                name="description"
                label="Description"
              >
                <TextArea rows={4} />
              </Form.Item>
            </div>
            <div className="flex justify-center">
              <Form.Item
                className="min-w-[95%] flex justify-center"
                name="additional_details"
                label="Additional Details"
              >
                <TextArea rows={4} />
              </Form.Item>
            </div>
            <div className="flex justify-center">
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

export default EditFurnitureForm;
