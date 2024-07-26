import React, { useState } from "react";
import { Divider } from "antd";
import { Button, Form, Input } from "antd";
import { Avatar } from "antd";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Form values:", values);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full h-full ">
        <div className="flex items-center flex-col w-[75vw]  mb-4 justify-between">
          <div className="flex justify-between mt-6 items-center w-full  ">
            <span className="flex font-bold text-2xl">Asad😎</span>
            <Avatar className="flex w-24 h-24" src="/avatar.svg" alt="user" />
          </div>
        </div>
        <Form
          layout="vertical"
          labelCol={{ span: 12 }}
          wrapperCol={{ span: 24 }}
          onFinish={onFinish}
        >
          <div className="flex flex-col justify-center mt-4  w-[75vw]">
            <div className="flex flex-col sm:flex-row justify-between  p-0 m-0">
              <Form.Item
                className="min-w-[49%] p-0 mb-2 font-semibold text-myblue"
                wrapperCol={{ span: 24 }}
                label="First Name"
                name="firstName"
                labelCol={{ span: 12 }}
              >
                <Input className="flex p-2 " placeholder="Mehrab" />
              </Form.Item>
              <Form.Item
                className="min-w-[49%] p-0 mb-2  font-semibold"
                wrapperCol={{ span: 24 }}
                label="Last Name"
                name="lastName"
              >
                <Input className="flex p-2 " placeholder="Bozorgi" />
              </Form.Item>
            </div>
            <Form.Item
              className=" p-0 mb-2  font-semibold"
              wrapperCol={{ span: 24 }}
              label="Email"
              name="email"
            >
              <Input
                className="flex p-2 "
                placeholder="Mehrabbozorgi.business@gmail.com"
              />
            </Form.Item>
            <Form.Item
              className=" p-0 mb-2  font-semibold"
              wrapperCol={{ span: 24 }}
              label="Contact Number"
              name="contactNumber"
            >
              <Input className="flex p-2 " placeholder="580778899" />
            </Form.Item>
            <Form.Item
              className=" p-0 mb-2  font-semibold"
              wrapperCol={{ span: 24 }}
              label="Address"
              name="address"
            >
              <Input className="flex p-2 " placeholder="33062 Zboncak isle" />
            </Form.Item>
            <div className="flex justify-between flex-col sm:flex-row p-0 m-0">
              <Form.Item
                className="min-w-[49%] p-0 mb-2  font-semibold"
                wrapperCol={{ span: 24 }}
                label="City"
                name="city"
              >
                <Input className="flex p-2 " placeholder="58077.79" />
              </Form.Item>
              <Form.Item
                className="min-w-[49%] p-0 mb-2  font-semibold"
                wrapperCol={{ span: 24 }}
                label="State"
                name="state"
              >
                <Input className="flex p-2 " placeholder="Mehrab" />
              </Form.Item>
            </div>
            <Form.Item
              className=" p-0 mb-2  font-semibold"
              wrapperCol={{ span: 24 }}
              label="Password"
              name="password"
            >
              <Input className="flex p-2" placeholder="******" />
            </Form.Item>
          </div>
          <div className="flex w-full mt-4">
            <div>
              <Form.Item>
                <Button
                  className="flex px-10 py-5 items-center justify-center font-bold"
                  htmlType="submit"
                >
                  Cancel
                </Button>
              </Form.Item>
            </div>
            <Form.Item>
              <Button
                // className="flex items-center justify-center bg-myRed ml-4 py-5 px-10 font-bold text-white"
                className="flex px-10 py-5 items-center justify-center font-bold"
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
export default () => <Profile />;
