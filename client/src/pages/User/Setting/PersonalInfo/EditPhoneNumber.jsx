import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { InputField } from "@/components";
import { Button } from "antd";

const schema = yup
    .object({
        phoneNumber: yup
            .string()
            .matches(
                /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/
            )
            .required("Số diện thoại không hợp lệ"),
    })
    .required();

// eslint-disable-next-line react/prop-types
const EditPhoneNumber = ({ onSubmit }) => {
    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        control,
    } = useForm({
        defaultValues: {
            phoneNumber: "",
        },
        reValidateMode: "onBlur",
        mode: "onBlur",
        resolver: yupResolver(schema),
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
            <InputField
                control={control}
                errors={errors.phoneNumber}
                name="phoneNumber"
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

export default EditPhoneNumber;
