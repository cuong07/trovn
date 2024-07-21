import * as yup from "yup";
import { Form, message, Input } from "antd";
import { Button, InputField } from "@/components";
import { createAmenity } from "@/apis/amenities";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

const schema = yup
    .object({
        name: yup.string().min(2).required(),
        description: yup.string().min(2).required(),
    })
    .required();

//main
function AddAmenities() {
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const {
        formState: { errors, isSubmitting },
        reset,
        getValues,
        control,
    } = useForm({
        defaultValues: {
            name: "",
            description: "",
        },
        reValidateMode: "onBlur",
        mode: "onBlur",
        resolver: yupResolver(schema),
    });

    const onSubmit = async () => {
        if (!selectedFile) {
            return message.error("Vui lòng chọn file");
        }
        if (Object.keys(errors).length > 0) {
            console.log("ERRORS:", errors);
            const keys = Object.keys(errors);
            return message.error(
                `Nhập sai thông tin: ${errors[keys[0]]?.message}`
            );
        }
        const values = getValues();
        values.file = selectedFile;
        try {
            const { success } = await createAmenity(values);
            if (success) {
                reset();
                return message.success("Thêm tiện nghi thành công");
            }
            message.error("Có lỗi khi đăng ký");
        } catch (error) {
            message.error(error.message);
            console.log(error);
        }
    };

    return (
        <div className=" flex">
            <Form layout="vertical">
                <InputField
                    control={control}
                    errors={errors.name}
                    label="Tên tiện nghi"
                    name="name"
                />
                <InputField
                    control={control}
                    errors={errors.description}
                    label="Mô tả tiện nghi"
                    name="description"
                />
                <Form.Item label="Ảnh" rules={[{ required: true }]}>
                    <Input type="file" onChange={handleFileChange} />
                </Form.Item>
                <Button
                    className={{ display: isSubmitting ? "none" : "block" }}
                    type="primary"
                    onClick={onSubmit}
                    loading={isSubmitting}
                >
                    Thêm
                </Button>
            </Form>
        </div>
    );
}

export default AddAmenities;
