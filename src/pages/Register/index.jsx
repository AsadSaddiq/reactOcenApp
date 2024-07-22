import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { useRegisterUserMutation } from "../../redux/features/auth/authApi";

const Register = () => {
  const navigate = useNavigate();
  const [registerUser, {}] = useRegisterUserMutation();
  const onFinish = async (values) => {
    const res = await registerUser(values);
    if (res?.data) {
      navigate("/login");
    }
    console.log("Received values of form: ", res);
  };

  return (
    <div className="flex h-[100vh] bg-slate-50">
      <div className="hidden lg:flex  w-[50vw]  justify-center items-center">
        <div className="flex flex-col ml-[4rem] h-[70vh] w-full ">
          <div className="flex flex-col w-full justify-center items-center">
            <h1 className="text-3xl text-blue-500 justify-center items-center pb-4">
              <NavLink to="/">BlueOcean</NavLink>
            </h1>
            <h2 className="text-3xl font-bold text-blue-700 justify-center items-center text-center">
              FILL YOR NEED WITH SPEED OF LIGHT
            </h2>
          </div>
          <img src="/images/img.png" />
        </div>
      </div>
      <div className="flex w-full lg:w-[50vw]  flex-column justify-center items-center">
        <div className="flex border justify-center items-center h-[80vh] w-[90%] ts:w-[340px] lg:w-[58%] lg:min-w-[380px] bg-indigo-100 rounded-md flex-col">
          <div className="flex flex-col w-full items-center justify-center  mb-6">
            <NavLink to="/" className="text-2xl mb-2">
              {/* <img className="flex w-32 h-12 " src="/images/logo.png" alt="" /> */}
              BlueOcean
            </NavLink>
            <div className="flex font-bold">Hello!</div>
            <div className="flex w-[90%]  font-semibold text-center">
              Please enter your personal detail to your account
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
              name="first_name"
              rules={[
                {
                  required: true,
                  message: "Place Enter First Name!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="First Name"
              />
            </Form.Item>
            <Form.Item
              name="last_name"
              rules={[
                {
                  required: true,
                  message: "Place Enter your Last Name!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Last Name"
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Enter a valid email address!",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
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
            <Form.Item
              // name={"VerifyPassword"}
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
                placeholder="Conform Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button w-full bg-blue-700"
              >
                Sign Up
              </Button>
            </Form.Item>
            <div className="flex justify-center items-center w-full">
              <div>I have an account?</div>
              <NavLink to="/login" className="flex text-blue-700">
                Sign in
              </NavLink>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Register;
