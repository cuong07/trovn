import React from "react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input, Form, message } from "antd";
import { Button } from "@/components";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Email không hợp lệ")
      .required("Email là bắt buộc"),
  })
  .required();

const Forgetpass = () => {
  const [email, setEmail] = useState("");
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [messageApi] = message.useMessage();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm({
    defaultValues: {
      email: "",
    },
    reValidateMode: "onBlur",
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="w-full h-screen lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Quên mật khẩu</h1>
            <p className="text-balance text-muted-foreground">
              Điền vào email đã đăng ký
            </p>
            <Form onSubmit={handleSubmit(onSubmit)} layout="vertical">
              <Form.Item
                label="Email"
                validateStatus={errors.email ? "error" : ""}
                help={errors.email ? errors.email.message : ""}
              >
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Nhập email" />
                  )}
                />
              </Form.Item>
              <div className="flex justify-center">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isSubmitting}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Tiếp tục
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <div className="flex justify-center flex-1">
        <img
          className="object-cover size-auto"
          src="https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1123.jpg?t=st=1716110345~exp=1716113945~hmac=62e5c030bb5a9ba5076e04fa17579c37c571f81daa3f2cab2376ad431c6491a7&w=740"
          alt=""
        />
      </div>
    </div>
  );
};

export default Forgetpass;
