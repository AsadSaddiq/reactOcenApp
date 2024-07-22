import React from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { useLoginUserMutation } from "../../redux/features/auth/authApi";

const Login = () => {
  const navigate = useNavigate();
  const [loginUser, {}] = useLoginUserMutation();
  const onFinish = async (values) => {
    const res = await loginUser(values);
    console.log(res);
    if (res?.data) {
      navigate("/");
    }
  };

  return (
    <div className="flex h-[100vh] bg-slate-50">
      <div className="hidden lg:flex  w-[50vw] justify-center items-center">
        <div className="flex flex-col ml-[4rem] h-[70vh] w-full ">
          <div className="flex flex-col w-full justify-center items-center">
            <h1 className="text-3xl text-blue-500 justify-center items-center pb-4">
              <NavLink to="/">BlueOcean</NavLink>
            </h1>
            <div className="text-3xl font-bold text-blue-700 justify-center items-center text-center">
              KNOW MOVE WITH SPEED OF LIGHT
            </div>
          </div>
          <img src="/images/img.png" />
        </div>
      </div>
      <div className="flex w-full  lg:w-[50vw] flex-column justify-center items-center">
        <div className="flex  justify-center items-center h-[70%] sm:h-[70vh] w-[90%] ts:w-[340px] lg:w-[58%] lg:min-w-[380px] bg-indigo-100 rounded-md flex-col">
          <div className="flex flex-col w-full  items-center justify-center  mb-6">
            <NavLink to="/" className="text-2xl mb-2">
              {/* <img className="flex w-32 h-12 " src="/images/logo.png" alt="" /> */}
              BlueOcean
            </NavLink>
            <div className="flex font-bold">Hello!</div>
            <div className="flex item-center justify-center font-semibold w-[90%] text-center">
              Please enter your credentials to login
            </div>
          </div>
          <Form
            name="normal_login"
            className="login-form min-w-[90%]"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  type: "string",
                  message: "Enter a valid email address!",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="UserName"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <div className=" text-blue-700 flex items-center justify-end w-full border mb-1">
              Forgot password
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button w-full bg-blue-700"
              >
                Log in
              </Button>
            </Form.Item>

            <div className="flex justify-center items-center w-full">
              <div>Don’t have an account?</div>
              <NavLink to="/register" className="flex text-blue-700">
                Sign up
              </NavLink>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Login;
