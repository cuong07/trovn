import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { InputField } from "@/components";
import { Button } from "antd";

const schema = yup
    .object({
        username: yup.string().min(6).required(),
    })
    .required();

const EditUsername = ({ user, onSubmit }) => {
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
