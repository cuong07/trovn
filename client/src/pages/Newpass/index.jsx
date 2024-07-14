import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input, Button, Form } from "antd";

const schema = yup
    .object({
        newPassword: yup
            .string()
            .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
            .required("Mật khẩu mới là bắt buộc"),
        confirmPassword: yup
            .string()
            .oneOf(
                [yup.ref("newPassword"), null],
                "Xác thực mật khẩu không khớp"
            )
            .required("Xác thực mật khẩu là bắt buộc"),
    })
    .required();

const Newpass = () => {
    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        control,
    } = useForm({
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
        },
        reValidateMode: "onBlur",
        mode: "onBlur",
        resolver: yupResolver(schema),
    });

    const onSubmit = () => {};

    return (
        <div className="w-full h-screen flex items-center justify-center py-12">
            <div className="mx-auto grid w-[350px] gap-6">
                <div className="grid gap-2 text-center">
                    <h1 className="text-3xl font-bold">Đặt mật khẩu mới</h1>
                    <p className="text-balance text-muted-foreground">
                        Nhập mật khẩu mới và xác thực
                    </p>
                </div>
                <Form onSubmit={handleSubmit(onSubmit)} layout="vertical">
                    <Form.Item
                        label="New Password"
                        validateStatus={errors.newPassword ? "error" : ""}
                        help={
                            errors.newPassword ? errors.newPassword.message : ""
                        }
                    >
                        <Controller
                            name="newPassword"
                            control={control}
                            render={({ field }) => (
                                <Input {...field} type="password" />
                            )}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Confirm Password"
                        validateStatus={errors.confirmPassword ? "error" : ""}
                        help={
                            errors.confirmPassword
                                ? errors.confirmPassword.message
                                : ""
                        }
                    >
                        <Controller
                            name="confirmPassword"
                            control={control}
                            render={({ field }) => (
                                <Input {...field} type="password" />
                            )}
                        />
                    </Form.Item>
                    <div className="flex justify-center">
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isSubmitting}
                        >
                            Đổi mật khẩu
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Newpass;
