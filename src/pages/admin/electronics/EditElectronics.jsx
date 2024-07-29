import React, { useState, useEffect } from "react";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  message,
  Space,
} from "antd";
import moment from "moment";
import {
  useUpdateElectronicsApiMutation,
  useGetElectronicsByIdApiQuery,
} from "../../../redux/features/electronics/electronics.service";
import { useParams, useNavigate } from "react-router-dom";

const { TextArea } = Input;
const { Option } = Select;
const POWER_UNIT_CHOICES = [
  ["watt", "Watt"],
  ["kilowatt", "Kilowatt"],
];
const ELECTRONICS_TYPE_CHOICES = [
  ["tv", "Television"],
  ["phone", "Phone"],
  ["laptop", "Laptop"],
  ["tablet", "Tablet"],
  ["smartwatch", "Smartwatch"],
  ["camera", "Camera"],
  ["headphone", "Headphone"],
  ["speaker", "Speaker"],
  ["console", "Game Console"],
  ["appliance", "Home Appliance"],
  ["drone", "Drone"],
  ["printer", "Printer"],
  ["projector", "Projector"],
  ["monitor", "Monitor"],
  ["router", "Router"],
  ["smart_home", "Smart Home Device"],
  ["wearable", "Wearable Device"],
  ["other", "Other"],
];

const BRAND_CHOICES = [
  ["apple", "Apple"],
  ["samsung", "Samsung"],
  ["sony", "Sony"],
  ["lg", "LG"],
  ["dell", "Dell"],
  ["hp", "HP"],
  ["lenovo", "Lenovo"],
  ["asus", "Asus"],
  ["acer", "Acer"],
  ["huawei", "Huawei"],
  ["xiaomi", "Xiaomi"],
  ["nintendo", "Nintendo"],
  ["microsoft", "Microsoft"],
  ["google", "Google"],
  ["amazon", "Amazon"],
  ["other", "Other"],
];

const COLOR_CHOICES = [
  ["black", "Black"],
  ["white", "White"],
  ["silver", "Silver"],
  ["grey", "Grey"],
  ["gold", "Gold"],
  ["blue", "Blue"],
  ["red", "Red"],
  ["green", "Green"],
  ["yellow", "Yellow"],
  ["purple", "Purple"],
  ["pink", "Pink"],
  ["other", "Other"],
];

const CURRENCY_CHOICES = [
  ["USD", "US Dollar"],
  ["EUR", "Euro"],
  ["GBP", "British Pound"],
  ["JPY", "Japanese Yen"],
  ["CNY", "Chinese Yuan"],
  ["INR", "Indian Rupee"],
  ["AUD", "Australian Dollar"],
  ["CAD", "Canadian Dollar"],
  ["CHF", "Swiss Franc"],
  ["NZD", "New Zealand Dollar"],
  ["SEK", "Swedish Krona"],
  ["NOK", "Norwegian Krone"],
  ["DKK", "Danish Krone"],
  ["HKD", "Hong Kong Dollar"],
  ["SGD", "Singapore Dollar"],
  ["other", "Other"],
];

const OPERATING_SYSTEM_CHOICES = [
  ["windows", "Windows"],
  ["macos", "macOS"],
  ["android", "Android"],
  ["ios", "iOS"],
  ["linux", "Linux"],
  ["chrome_os", "Chrome OS"],
  ["other", "Other"],
];

const CONNECTIVITY_CHOICES = [
  ["wifi", "WiFi"],
  ["bluetooth", "Bluetooth"],
  ["nfc", "NFC"],
  ["usb", "USB"],
  ["ethernet", "Ethernet"],
  ["hdmi", "HDMI"],
  ["vga", "VGA"],
  ["thunderbolt", "Thunderbolt"],
  ["audio_jack", "Audio Jack"],
  ["other", "Other"],
];

const WARRANTY_PERIOD_CHOICES = [
  [0, "No Warranty"],
  [6, "6 Months"],
  [12, "1 Year"],
  [24, "2 Years"],
  [36, "3 Years"],
  [48, "4 Years"],
  [60, "5 Years"],
  ["other", "Other"],
];

const DIMENSION_UNIT_CHOICES = [
  ["cm", "Centimeters"],
  ["in", "Inches"],
  ["mm", "Millimeters"],
  ["ft", "Feet"],
  ["m", "Meters"],
  ["other", "Other"],
];

const WEIGHT_UNIT_CHOICES = [
  ["kg", "Kilograms"],
  ["g", "Grams"],
  ["lb", "Pounds"],
  ["oz", "Ounces"],
  ["other", "Other"],
];

const POWER_CONSUMPTION_UNIT_CHOICES = [
  ["w", "Watts"],
  ["kw", "Kilowatts"],
  ["mw", "Megawatts"],
  ["other", "Other"],
];

const VOLTAGE_UNIT_CHOICES = [
  ["v", "Volts"],
  ["kv", "Kilovolts"],
  ["mv", "Millivolts"],
  ["other", "Other"],
];

const RESOLUTION_CHOICES = [
  ["hd", "HD"],
  ["full_hd", "Full HD"],
  ["2k", "2K"],
  ["4k", "4K"],
  ["8k", "8K"],
  ["other", "Other"],
];

const SCREEN_TYPE_CHOICES = [
  ["lcd", "LCD"],
  ["led", "LED"],
  ["oled", "OLED"],
  ["qled", "QLED"],
  ["plasma", "Plasma"],
  ["crt", "CRT"],
  ["other", "Other"],
];

const BATTERY_TYPE_CHOICES = [
  ["li_ion", "Lithium Ion"],
  ["li_poly", "Lithium Polymer"],
  ["ni_mh", "Nickel Metal Hydride"],
  ["ni_cd", "Nickel Cadmium"],
  ["lead_acid", "Lead Acid"],
  ["other", "Other"],
];

const EditElectronicsForm = () => {
  const { ElectronicsId } = useParams();
  const [updateElectronics] = useUpdateElectronicsApiMutation();
  const {
    data: electronics,
    isLoading: electronicsLoading,
    error: electronicsError,
  } = useGetElectronicsByIdApiQuery(ElectronicsId);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (electronics) {
      form.setFieldsValue({
        ...electronics,
        available_from: electronics.available_from
          ? moment(electronics.available_from)
          : null,
      });

      setFileList(
        electronics.images?.map((img) => ({
          uid: img.id.toString(), // Unique identifier for each file
          name: img.image.split("/").pop(), // Name of the file
          status: "done", // Mark file as already uploaded
          url: img.image, // URL of the image
        })) || []
      );
    }
  }, [electronics]);

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
    imgWindow.document.write(<img src={src} style={{ width: "100%" }} />);
  };

  const dummyRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  //   const onFinish = async (values) => {
  //     console.log(values);
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
  //       await updateElectronics({ id: ElectronicsId, formData });
  //       message.success("Electronics updated successfully!");
  //       navigate("/admin");
  //     } catch (error) {
  //       message.error("Failed to update electronics.");
  //       console.error(error);
  //     }
  //   };

  const onFinish = async (values) => {
    const formData = new FormData();

    // Include the ID in the formData
    formData.append("id", ElectronicsId);

    // Append other form values to formData
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
      await updateElectronics({ id: ElectronicsId, formData });
      message.success("Electronics updated successfully!");
      navigate("/admin");
    } catch (error) {
      message.error("Failed to update electronics.");
      console.error(error);
    }
  };

  if (electronicsLoading) return <p>Loading...</p>;
  if (electronicsError) return <p>Error loading data</p>;
  return (
    <div className="flex justify-center w-full h-full overflow-auto">
      <div className="flex flex-col mt-2 w-[90%]">
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          style={{ maxWidth: 800, margin: "0 auto" }}
          encType="multipart/form-data"
        >
          <div className="flex flex-col font-14">
            <div className="flex mb-4 mt-4 text-lg border-b">Upload Images</div>
            <div className="flex mt-2 items-center">
              <Form.Item
                name="images"
                valuePropName="fileList"
                getValueFromEvent={(e) => e?.fileList || []}
                className="min-w-[280px] p-0 mb-4"
                wrapperCol={{ span: 24 }}
              >
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={handleChange}
                  onPreview={handlePreview}
                  customRequest={dummyRequest}
                >
                  {fileList.length >= 8 ? null : (
                    <Button icon={<PlusOutlined />}>Upload</Button>
                  )}
                </Upload>
              </Form.Item>
            </div>

            {/* Electronics Information Section */}
            <div className="flex mb-4 text-lg border-b">
              Electronics Information
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Form.Item
                className="min-w-[280px] p-0 mb-2"
                label="Name"
                name="name"
                rules={[{ required: true, message: "This field is required." }]}
              >
                <Input placeholder="Enter the name of the electronics" />
              </Form.Item>

              <Form.Item
                className="min-w-[280px] p-0 mb-2"
                label="Type"
                name="electronics_type"
                rules={[{ required: true, message: "This field is required." }]}
              >
                <Select placeholder="Select Type">
                  {ELECTRONICS_TYPE_CHOICES.map(([value, label]) => (
                    <Option key={value} value={value}>
                      {label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                className="min-w-[280px] p-0 mb-2"
                label="Model Number"
                name="model_number"
                rules={[{ required: true, message: "This field is required." }]}
              >
                <Input placeholder="Enter the model number" />
              </Form.Item>

              <Form.Item
                className="min-w-[280px] p-0 mb-2"
                label="Price"
                name="price"
                rules={[{ required: true, message: "This field is required." }]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="Enter the price"
                  min={0}
                  step={0.01}
                />
              </Form.Item>

              <Form.Item
                className="min-w-[280px] p-0 mb-2"
                label="Brand"
                name="brand"
              >
                <Select placeholder="Select Brand">
                  {BRAND_CHOICES.map(([value, label]) => (
                    <Option key={value} value={value}>
                      {label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                className="min-w-[280px] p-0 mb-2"
                label="Color"
                name="color"
              >
                <Select placeholder="Select Color">
                  {COLOR_CHOICES.map(([value, label]) => (
                    <Option key={value} value={value}>
                      {label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                className="min-w-[280px] p-0 mb-2"
                label="Currency"
                name="currency"
              >
                <Select placeholder="Select Currency">
                  {CURRENCY_CHOICES.map(([value, label]) => (
                    <Option key={value} value={value}>
                      {label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                className="min-w-[280px] p-0 mb-2"
                label="Operating System"
                name="operatingSystem"
              >
                <Select placeholder="Select Operating System">
                  {OPERATING_SYSTEM_CHOICES.map(([value, label]) => (
                    <Option key={value} value={value}>
                      {label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                className="min-w-[280px] p-0 mb-2"
                label="Connectivity"
                name="connectivity"
              >
                <Select placeholder="Select Connectivity">
                  {CONNECTIVITY_CHOICES.map(([value, label]) => (
                    <Option key={value} value={value}>
                      {label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                className="min-w-[280px] p-0 mb-2"
                label="Warranty Period"
                name="warranty_period"
              >
                <Select placeholder="Select Warranty Period">
                  {WARRANTY_PERIOD_CHOICES.map(([value, label]) => (
                    <Option key={value} value={value}>
                      {label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                className="min-w-[280px] p-0 mb-2"
                label="Dimensions"
                name="dimensions"
              >
                <Input placeholder="Enter dimensions (e.g., 20x30 cm)" />
              </Form.Item>

              <Form.Item
                className="min-w-[280px] p-0 mb-2"
                label="Dimension Unit"
                name="dimension_unit"
              >
                <Select placeholder="Select Dimension Unit">
                  {DIMENSION_UNIT_CHOICES.map(([value, label]) => (
                    <Option key={value} value={value}>
                      {label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                className="min-w-[280px] p-0 mb-2"
                label="Weight"
                name="weight"
              >
                <Input placeholder="Enter weight (e.g., 1.5 kg)" />
              </Form.Item>

              <Form.Item
                className="min-w-[280px] p-0 mb-2"
                label="Weight Unit"
                name="weight_unit"
              >
                <Select placeholder="Select Weight Unit">
                  {WEIGHT_UNIT_CHOICES.map(([value, label]) => (
                    <Option key={value} value={value}>
                      {label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                className="min-w-[280px] p-0 mb-2"
                label="Power Consumption"
                name="power_consumption"
              >
                <Input placeholder="Enter power consumption (e.g., 50W)" />
              </Form.Item>

              <Form.Item
                className="min-w-[280px] p-0 mb-2"
                label="Power Unit"
                name="power_unit"
              >
                <Select placeholder="Select Power Unit">
                  {POWER_UNIT_CHOICES.map(([value, label]) => (
                    <Option key={value} value={value}>
                      {label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                className="min-w-[280px] p-0 mb-2"
                label="Voltage"
                name="voltage"
              >
                <Input placeholder="Enter voltage (e.g., 220V)" />
              </Form.Item>

              <Form.Item
                className="min-w-[280px] p-0 mb-2"
                label="Voltage Unit"
                name="voltage_unit"
              >
                <Select placeholder="Select Voltage Unit">
                  {VOLTAGE_UNIT_CHOICES.map(([value, label]) => (
                    <Option key={value} value={value}>
                      {label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                className="min-w-[280px] p-0 mb-2"
                label="Resolution"
                name="resolution"
              >
                <Input placeholder="Enter resolution (e.g., 1920x1080)" />
              </Form.Item>

              <Form.Item
                className="min-w-[280px] p-0 mb-2"
                label="Screen Type"
                name="screen_type"
              >
                <Select placeholder="Select Screen Type">
                  {SCREEN_TYPE_CHOICES.map(([value, label]) => (
                    <Option key={value} value={value}>
                      {label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                className="min-w-[280px] p-0 mb-2"
                label="Battery Type"
                name="battery_type"
              >
                <Select placeholder="Select Battery Type">
                  {BATTERY_TYPE_CHOICES.map(([value, label]) => (
                    <Option key={value} value={value}>
                      {label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            {/* Additional Features Section */}
            <div className="flex mb-4 mt-4 text-lg border-b">
              Additional Features
            </div>
            <Form.Item className="p-0 mb-4" label="Features" name="features">
              <TextArea rows={4} placeholder="Enter additional features" />
            </Form.Item>
          </div>

          {/* Submit Button */}
          <Form.Item style={{ marginTop: 20 }}>
            <Button ttype="primary" htmlType="submit" style={{ width: "100%" }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditElectronicsForm;
