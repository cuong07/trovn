import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, message } from "antd";
import { Button, InputField } from "../../components";
import useUserStore from "../../hooks/userStore";
import { register } from "../../apis/user";

const schema = yup
  .object({
    username: yup.string().min(6).required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).max(16).required(),
    phoneNumber: yup
      .string()
      .matches(
        /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/
      )
      .required("Số diện thoại không hợp lệ"),
  })
  .required();

const Index = () => {
  const { setToken } = useUserStore();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
    control,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      phoneNumber: "",
      username: "",
    },
    reValidateMode: "onBlur",
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = async () => {
    const value = getValues();
    console.log(value);
    try {
      const { data, success } = await register(value);
      if (success) {
        setToken(data);
        return message.success("Đăng ký thành công");
      }
      message.error("Có lỗi khi đăng ký");
    } catch (error) {
      message.error(error.messaeg);
      console.log(error);
    }
  };
  return (
    <div className="w-full h-screen lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <Form layout="vertical">
              <InputField
                control={control}
                errors={errors.username}
                label="Username"
                name="username"
              />
              <InputField
                control={control}
                errors={errors.email}
                label="email"
                name="email"
              />
              <InputField
                control={control}
                errors={errors.phoneNumber}
                label="phoneNumber"
                name="phoneNumber"
              />
              <InputField
                control={control}
                errors={errors.password}
                label="password"
                name="password"
              />
              <button type="submit">Login</button>
              <div className="mt-8 flex flex-col gap-4">
                <Button
                  type="primary"
                  onClick={onSubmit}
                  loading={isSubmitting}
                >
                  Login
                </Button>
                <Button type="default">Login with Google</Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Index;
