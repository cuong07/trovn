import { useCallback, useState } from "react";
import React from "react";
import { Form, Input, message } from "antd";
import { Button } from "@/components";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@/apis/user";

function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleChange = (evt) => {
        setFormData((previusData) => {
            return {
                ...previusData,
                [evt.target.name]: evt.target.value,
            };
        });
    };
    // ? update handle error
    // const handleSubmit = async (evt) => {
    //     evt.preventDefault();
    //     const { data, success } = await login(formData);
    //     if (success) {
    //         return navigate("/");
    //     }
    //     return message.error("Sai tài khoản hoặc mật khẩu");
    // };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const user = await login(formData);
            if (user.success) {
                return navigate("/");
            }
            return message.error(user.message);
        } catch (error) {
            return console.log("Login error", error);
        }
    };

    const loginWithGoogle = useCallback(() => {
        window.open(
            "http://localhost:8888/api/v1/auth/google/callback",
            "_self"
        );
    }, []);

    return (
        <>
            <div className="w-full h-screen overflow-hidden flex">
                <div className="flex items-center justify-center w-1/2 flex-col">
                    <h1 className="font-[600] mb-3 text-2xl">Đăng nhập</h1>
                    <Form
                        className="w-1/2"
                        layout="vertical"
                        form={form}
                        initialValues={{ layout: "vertical" }}
                    >
                        <Form.Item
                            label="Tên đăng nhập"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập tên đăng nhập!",
                                },
                            ]}
                        >
                            <Input
                                name="email"
                                onChange={handleChange}
                                className="mr-9"
                                placeholder="Email hoạc username"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập mật khẩu!",
                                },
                            ]}
                        >
                            <Input.Password
                                name="password"
                                placeholder="Mật khẩu"
                                onChange={handleChange}
                            />
                        </Form.Item>

                        <Form.Item className="">
                            <Button
                                type="primary"
                                htmlType="submit"
                                onClick={handleSubmit}
                                className="w-full h-10"
                            >
                                Đăng nhập
                            </Button>

                            <Button
                                type="default"
                                htmlType="submit"
                                onClick={loginWithGoogle}
                                className="w-full h-10 mt-4"
                            >
                                Đăng nhập bằng google
                            </Button>
                        </Form.Item>
                        <div className="flex justify-between">
                            <Link to="/register">Đăng ký tài khoản</Link>
                            <Link to="/forgot">Quên mật khẩu</Link>
                        </div>
                    </Form>
                </div>
                <div className="flex justify-center flex-1">
                    <img
                        className="object-cover"
                        src="https://static.vecteezy.com/system/resources/previews/005/879/539/non_2x/cloud-computing-modern-flat-concept-for-web-banner-design-man-enters-password-and-login-to-access-cloud-storage-for-uploading-and-processing-files-illustration-with-isolated-people-scene-free-vector.jpg"
                        alt=""
                    />
                </div>
            </div>
        </>
    );
}

export default Login;
