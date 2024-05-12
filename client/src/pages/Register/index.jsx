import React from "react";
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Input } from 'antd';

const schema = yup.object({
  username: yup.string().min(6).required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).max(16).required(),
  phoneNumber: yup.string().matches(/^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/).required(),

})
  .required()

const index = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      phoneNumber: "",
      username: ""
    },
    reValidateMode: "onBlur",
    mode: "onBlur",
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    console.log(data);
  }

  return <div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="Basic usage" {...register("username")} />
      <p>{errors.username?.message}</p>
      <input placeholder="Basic usage" {...register("email")} />
      <p>{errors.email?.message}</p>
      <input placeholder="Basic usage" {...register("phoneNumber")} />
      <p>{errors.phoneNumber?.message}</p>
      <input placeholder="Basic usage" {...register("password")} />
      <p>{errors.password?.message}</p>
      <input type="submit" title="submit" />
    </form>
  </div>;
};

export default index;
