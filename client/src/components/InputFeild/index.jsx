import { Form, Input } from "antd";
import React from "react";
import { Controller } from "react-hook-form";

const Index = ({ label, control, name, errors }) => {
  return (
    <Form.Item label={label} className="m-2">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="">
            <Input
              {...field}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <p className="text-xs text-red-500 ">{errors?.message}</p>
          </div>
        )}
      />
    </Form.Item>
  );
};

export default Index;
