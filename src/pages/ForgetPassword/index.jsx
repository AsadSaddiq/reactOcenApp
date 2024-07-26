// import React from "react";
// import { MailOutlined } from "@ant-design/icons";
// import { Button, Form, Input } from "antd";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useLoginUserMutation } from "../../redux/features/auth/authApi";

// const ForgetPassword = () => {
//   const navigate = useNavigate();
//   const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();

//   const onFinish = async (values) => {
//     try {
//       const res = await loginUser(values);
//       if (res?.data) {
//         navigate("/reset-password");
//       }
//     } catch (error) {
//       console.error("Error sending email:", error);
//     }
//   };

//   return (
//     <div className="flex h-[100vh] bg-slate-50">
//       <div className="hidden lg:flex w-[50vw] justify-center items-center">
//         <div className="flex flex-col ml-[4rem] h-[70vh] w-full">
//           <div className="flex flex-col w-full justify-center items-center">
//             <h1 className="text-3xl text-blue-500 pb-4">
//               <NavLink to="/">BlueOcean</NavLink>
//             </h1>
//             <div className="text-3xl font-bold text-blue-700 text-center">
//               KNOW MOVE WITH SPEED OF LIGHT
//             </div>
//           </div>
//           <img src="/images/img.png" alt="Description" />
//         </div>
//       </div>
//       <div className="flex w-full lg:w-[50vw] justify-center items-center">
//         <div className="flex justify-center items-center h-[70%] sm:h-[70vh] w-[90%] ts:w-[340px] lg:w-[58%] lg:min-w-[380px] bg-indigo-100 rounded-md flex-col">
//           <div className="flex flex-col w-full items-center justify-center mb-6">
//             <NavLink to="/" className="text-2xl mb-2">
//               <img className="w-32 h-12" src="/images/logo.png" alt="Logo" />
//               BlueOcean
//             </NavLink>
//             <div className="font-bold">Hello!</div>
//             <div className="font-semibold w-[90%] text-center">
//               Please enter your email
//             </div>
//           </div>
//           <Form
//             name="forgotpassword"
//             className="min-w-[90%]"
//             initialValues={{ remember: true }}
//             onFinish={onFinish}
//           >
//             <Form.Item
//               name="email"
//               rules={[
//                 {
//                   required: true,
//                   type: "email",
//                   message: "Enter a valid email address!",
//                 },
//               ]}
//             >
//               <Input
//                 prefix={<MailOutlined className="site-form-item-icon" />}
//                 placeholder="Email"
//               />
//             </Form.Item>

//             <Form.Item>
//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 className="w-full bg-blue-700"
//                 loading={isLoading}
//               >
//                 Send OTP
//               </Button>
//             </Form.Item>
//             {isError && <div className="text-red-500">{error.message}</div>}
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgetPassword;
import React from "react";
import { MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../redux/features/auth/authApi";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [resetPassword, { isLoading, isError, error }] =
    useResetPasswordMutation();

  const onFinish = async (values) => {
    try {
      const res = await resetPassword(values).unwrap();
      if (res) {
        navigate("/reset-password");
      }
    } catch (error) {
      console.error("Error sending email:", error);
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
        <div className="flex justify-center items-center h-[70%] sm:h-[70vh] w-[90%] ts:w-[340px] lg:w-[58%] lg:min-w-[380px] bg-indigo-100 rounded-md flex-col">
          <div className="flex flex-col w-full items-center justify-center mb-6">
            <NavLink to="/" className="text-2xl mb-2">
              <img className="w-32 h-12" src="/images/logo.png" alt="Logo" />
              BlueOcean
            </NavLink>
            <div className="font-bold">Hello!</div>
            <div className="font-semibold w-[90%] text-center">
              Please enter your email
            </div>
          </div>
          <Form
            name="forgotpassword"
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

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-blue-700"
                loading={isLoading}
              >
                Send OTP
              </Button>
            </Form.Item>
            {isError && <div className="text-red-500">{error.message}</div>}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
