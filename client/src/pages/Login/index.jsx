import { useCallback, useState } from "react";
// import { Form, Input, message } from "antd";
import { InputField } from "@/components";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@/apis/user";
import { BsGoogle } from "react-icons/bs";
import { LuLogIn } from "react-icons/lu";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { CiMail } from "react-icons/ci";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { RiLockPasswordLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";

const schema = yup.object({
    email: yup
        .string()
        .required("Email là bắt buộc")
        .email("Email không hợp lệ")
        .required("Email không hợp lệ"),
    password: yup
        .string()
        .required("Mật khẩu là bắt buộc")
        .min(8, "Mật khẩu tối thiểu 8 ký tự")
        .max(16, "Mật khẩu tối đa 16 ký tự"),
});

function Login() {
    const navigate = useNavigate();

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        reValidateMode: "onChange",
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const formData = form.getValues();
        try {
            const user = await login(formData);
            if (user.success) {
                return navigate("/");
            }
            // return message.error(user.message);
        } catch (error) {
            // message.error(error.response.data.message);
            return console.log("Login error", error);
        }
    };

    const loginWithGoogle = useCallback(() => {
        window.open(
            "http://localhost:8891/api/v1/auth/google/callback",
            "_self"
        );
    }, []);

    return (
        <div className="grid grid-cols-2 gap-6 h-svh">
            <div className="mx-auto flex flex-col justify-center gap-6 w-[400px] ">
                <div className="grid gap-2 text-center">
                    <h1 className="text-3xl font-bold">Đăng nhập</h1>
                    <p className="text-balance text-muted-foreground">
                        Nhập email của bạn dưới đây để đăng nhập vào tài khoản
                        của bạn
                    </p>
                </div>
                <Form {...form}>
                    <form>
                        <InputField
                            control={form.control}
                            errors={form.formState.errors.email}
                            label="Email"
                            name="email"
                            icon={<CiMail size={18} />}
                        />
                        <InputField
                            control={form.control}
                            errors={form.formState.errors.password}
                            label="Mật khẩu"
                            name="password"
                            type="password"
                            icon={<RiLockPasswordLine size={18} />}
                        />
                        <div className="flex justify-between">
                            <Link to="/register">Đăng ký tài khoản</Link>
                            <Link to="/forgot">Quên mật khẩu</Link>
                        </div>
                    </form>
                </Form>
                <div>
                    <Button
                        type="primary"
                        className="mt-2 h-12 font-semibold flex gap-2 items-center w-full justify-center"
                        onClick={handleSubmit}
                    >
                        <LuLogIn className="" size={18} /> Đăng nhập
                    </Button>
                    <Button
                        type="default"
                        variant="secondary"
                        className="mt-2 h-12 font-semibold flex gap-2 items-center w-full justify-center"
                        onClick={loginWithGoogle}
                    >
                        <BsGoogle className="" size={18} /> Đăng nhập với Google
                    </Button>
                </div>
            </div>
            <div className="md:flex hidden justify-center flex-1">
                <img
                    className="object-contain w-[70%]"
                    src="/login2.svg"
                    alt="login"
                />
            </div>
        </div>
    );
}

export default Login;
