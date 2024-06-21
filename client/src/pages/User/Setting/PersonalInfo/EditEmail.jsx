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
        email: yup.string().email().required(),
    })
    .required();

const EditEmail = ({ user }) => {
    const { setUser } = useUserStore();
    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        control,
    } = useForm({
        defaultValues: {
            email: "",
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
        // <Form layout="horizontal" className="mt-2">
        <form onSubmit={handleSubmit(onSubmit)}>
            <InputField control={control} errors={errors.email} name="email" />
            <Button
                type="primary"
                className="max-w-fit mt-2 h-12"
                loading={isSubmitting}
                htmlType="submit"
            >
                Lưu
            </Button>
        </form>
        // </Form>
    );
};

export default EditEmail;
