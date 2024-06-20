/* eslint-disable react/prop-types */
import { Form, Input } from "antd";
import { Controller } from "react-hook-form";
import { BsEye, BsEyeSlashFill } from "react-icons/bs";

const Index = ({ label, control, name, errors, type, icon }) => {
    return (
        <Form.Item label={label} className="m-2">
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <div className="">
                        {type !== "password" && (
                            <Input
                                {...field}
                                prefix={icon}
                                type={type}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        )}
                        {type === "password" && (
                            <Input.Password
                                {...field}
                                prefix={icon}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                iconRender={(visible) =>
                                    visible ? <BsEye /> : <BsEyeSlashFill />
                                }
                            />
                        )}
                        <p className="text-xs text-red-500 ">
                            {errors?.message}
                        </p>
                    </div>
                )}
            />
        </Form.Item>
    );
};

export default Index;
