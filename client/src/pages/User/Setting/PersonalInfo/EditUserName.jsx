import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { InputField } from "@/components";
import { Button, Form } from "antd";
import useUserStore from "@/hooks/userStore";

const schema = yup
    .object({
        username: yup.string().min(6).required(),
    })
    .required();

const EditUsername = ({ user }) => {
    const { setUser } = useUserStore();
    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        control,
    } = useForm({
        defaultValues: {
            username: "",
        },
        reValidateMode: "onBlur",
        mode: "onBlur",
        resolver: yupResolver(schema),
    });

    const onSubmit = async (value) => {
        try {
            const { success, data } = await updateUser(value);
            if (success) {
                message.success("Thành công");
                setUser(data);
            }
        } catch (error) {
            message.error(error.message);
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
            <InputField
                control={control}
                errors={errors.username}
                name="Username"
            />
            <Button
                htmlType="submit"
                loading={isSubmitting}
                type="primary"
                className="max-w-fit mt-2 h-12"
            >
                Lưu
            </Button>
        </form>
    );
};

export default EditUsername;
