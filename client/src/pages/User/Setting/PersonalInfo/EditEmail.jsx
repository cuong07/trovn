/* eslint-disable react/prop-types */
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { InputField } from "@/components";
import { Button } from "antd";

const schema = yup
    .object({
        email: yup.string().email().required(),
    })
    .required();

const EditEmail = ({ onSubmit }) => {
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

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
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
    );
};

export default EditEmail;
