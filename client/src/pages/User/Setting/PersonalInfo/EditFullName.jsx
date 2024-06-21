import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { InputField } from "@/components";
import { Button, Form, message } from "antd";
import { updateUser } from "@/apis/user";
import useUserStore from "@/hooks/userStore";

const schema = yup
    .object({
        fullName: yup.string().min(6).required(),
    })
    .required();

const EditFullName = ({ user }) => {
    const { setUser } = useUserStore();
    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        control,
    } = useForm({
        defaultValues: {
            fullName: "",
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
                errors={errors.fullName}
                name="fullName"
            />
            <Button
                type="primary"
                htmlType="submit"
                className="max-w-fit mt-2 h-12"
                loading={isSubmitting}
            >
                Lưu
            </Button>
        </form>
    );
};

export default EditFullName;
