import React, { useState } from "react";
import { Button, Form, Input, Avatar, Radio } from "antd";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState("/avatar.svg"); // Default avatar image

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onFinish = (values) => {
    console.log("Form values:", values);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full h-full">
        <div className="flex items-center flex-col w-[75vw] mb-4 justify-between">
          <div className="flex justify-between mt-6 items-center w-full">
            <span className="flex font-bold text-2xl">Asad😎</span>
            <div className="relative">
              <Avatar className="flex w-24 h-24" src={image} alt="user" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute bottom-0 right-0 opacity-0 cursor-pointer w-24 h-24"
              />
            </div>
          </div>
        </div>
        <Form
          layout="vertical"
          labelCol={{ span: 12 }}
          wrapperCol={{ span: 24 }}
          onFinish={onFinish}
        >
          <div className="flex flex-col justify-center mt-4 w-[75vw]">
            <div className="flex flex-col sm:flex-row justify-between p-0 m-0">
              <Form.Item
                className="min-w-[49%] p-0 mb-2 font-semibold text-myblue"
                wrapperCol={{ span: 24 }}
                label="First Name"
                name="firstName"
                labelCol={{ span: 12 }}
              >
                <Input className="flex p-2" placeholder="Mehrab" />
              </Form.Item>
              <Form.Item
                className="min-w-[49%] p-0 mb-2 font-semibold"
                wrapperCol={{ span: 24 }}
                label="Last Name"
                name="lastName"
              >
                <Input className="flex p-2" placeholder="Bozorgi" />
              </Form.Item>
            </div>
            <Form.Item
              className="p-0 mb-2 font-semibold"
              wrapperCol={{ span: 24 }}
              label="Email"
              name="email"
            >
              <Input
                className="flex p-2"
                placeholder="Mehrabbozorgi.business@gmail.com"
              />
            </Form.Item>
            <Form.Item
              className="p-0 mb-2 font-semibold"
              wrapperCol={{ span: 24 }}
              label="Contact Number"
              name="contactNumber"
            >
              <Input className="flex p-2" placeholder="580778899" />
            </Form.Item>
            <Form.Item
              className="p-0 mb-2 font-semibold"
              wrapperCol={{ span: 24 }}
              label="Address"
              name="address"
            >
              <Input className="flex p-2" placeholder="33062 Zboncak isle" />
            </Form.Item>
            <div className="flex justify-between flex-col sm:flex-row p-0 m-0">
              <Form.Item
                className="min-w-[49%] p-0 mb-2 font-semibold"
                wrapperCol={{ span: 24 }}
                label="City"
                name="city"
              >
                <Input className="flex p-2" placeholder="58077.79" />
              </Form.Item>
              <Form.Item
                className="min-w-[49%] p-0 mb-2 font-semibold"
                wrapperCol={{ span: 24 }}
                label="State"
                name="state"
              >
                <Input className="flex p-2" placeholder="Mehrab" />
              </Form.Item>
            </div>
            <Form.Item
              className="p-0 mb-2 font-semibold"
              wrapperCol={{ span: 24 }}
              label="Gender"
              name="gender"
            >
              <Radio.Group>
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
                <Radio value="other">Other</Radio>
              </Radio.Group>
            </Form.Item>
          </div>
          <div className="flex w-full mt-4">
            <div>
              <Form.Item>
                <Button
                  className="flex px-10 py-5 items-center justify-center font-bold"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
              </Form.Item>
            </div>
            <Form.Item>
              <Button
                className="flex px-10 py-5 items-center justify-center font-bold"
                type="primary"
                htmlType="submit"
              >
                Save
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Profile;
