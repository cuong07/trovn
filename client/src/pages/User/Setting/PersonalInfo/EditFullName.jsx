/* eslint-disable react/prop-types */
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { InputField } from "@/components";
import { Button } from "antd";

const schema = yup
    .object({
        fullName: yup.string().min(6).required(),
    })
    .required();

const EditFullName = ({ onSubmit }) => {
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
