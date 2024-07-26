import React from "react";
import { MailOutlined, LockOutlined, KeyOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { useConfirmForgotPasswordMutation } from "../../redux/features/auth/authApi";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [confirmForgotPassword, { isLoading, isError, error }] =
    useConfirmForgotPasswordMutation();

  const onFinish = async (values) => {
    try {
      const res = await confirmForgotPassword(values).unwrap();
      if (res) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  return (
    <div className="flex h-[100vh] bg-slate-50">
      <div className="hidden lg:flex w-[50vw] justify-center items-center">
        <div className="flex flex-col ml-[4rem] h-[70vh] w-full">
          <div className="flex flex-col w-full justify-center items-center">
            <h1 className="text-3xl text-blue-500 pb-4">
              <NavLink to="/">BlueOcean</NavLink>
            </h1>
            <div className="text-3xl font-bold text-blue-700 text-center">
              KNOW MOVE WITH SPEED OF LIGHT
            </div>
          </div>
          <img src="/images/img.png" alt="Description" />
        </div>
      </div>
      <div className="flex w-full lg:w-[50vw] justify-center items-center">
        <div className="flex justify-center items-center h-[70%] sm:h-[80vh] w-[90%] ts:w-[340px] lg:w-[58%] lg:min-w-[380px] bg-indigo-100 rounded-md flex-col">
          <div className="flex flex-col w-full items-center justify-center mb-6">
            <NavLink to="/" className="text-2xl mb-2">
              <img className="w-32 h-12" src="/images/logo.png" alt="Logo" />
              BlueOcean
            </NavLink>
            <div className="font-bold">Reset Your Password</div>
            <div className="font-semibold w-[90%] text-center">
              Please enter your email, OTP, and new password
            </div>
          </div>
          <Form
            name="resetpassword"
            className="min-w-[90%]"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
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
              name="otp"
              rules={[
                {
                  required: true,
                  message: "Enter the OTP sent to your email!",
                },
              ]}
            >
              <Input
                prefix={<KeyOutlined className="site-form-item-icon" />}
                placeholder="OTP"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Enter your new password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="New Password"
              />
            </Form.Item>
            <Form.Item
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Confirm your new password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two passwords do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Confirm Password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-blue-700"
              >
                Reset Password
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
