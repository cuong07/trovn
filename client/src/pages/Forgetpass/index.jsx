import { useState } from "react";
import { Input, Form, Modal } from "antd";
import { Button } from "../../components";
import { getUserByEmail, sendEmail, changePassword } from "../../apis/user";
import { Link, useNavigate } from "react-router-dom";

// const schema = yup
//   .object({
//     email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
//   })
//   .required();

const Forgot = () => {
    const [data, setData] = useState({});
    const [form] = Form.useForm();
    const [user, setUser] = useState({});
    const [confirmOTP, setConfirmOTP] = useState("");
    const [btnInputOTP, setTbnInputOTP] = useState(false);
    const navigate = useNavigate();

    // model
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModelOk = () => {
        if (data.otp == confirmOTP) {
            //update password
            changePassword(user.id, data.password);
            setIsModalOpen(false);
            const confirmSuccess = confirm(
                "Thay đổi mật khẩu thành công, quay lại trang đăng nhập"
            );
            if (confirmSuccess) {
                return navigate("/login");
            }
            return navigate("/forgot");
        } else {
            alert(
                "Mã otp sai, vui lòng kiểm tra lại OTP trong email và nhập lại"
            );
            setIsModalOpen(true);
        }
    };
    const handleModelCancel = () => {
        setIsModalOpen(false);
    };

    //
    const handleChange = (evt) => {
        setData((previusData) => {
            return {
                ...previusData,
                [evt.target.name]: evt.target.value,
            };
        });
    };

    const handleSubmitEmail = async (evt) => {
        evt.preventDefault();
        const u = await getUserByEmail(data.email);
        if (!u) {
            return alert("Không tìm thấy email, vui lòng thử lại");
        }
        setUser(() => ({ ...u }));
        const otp = Math.floor(Math.random() * 9000 + 1000);
        const subject = "Xác thực thay đổi mật khẩu";
        setData((prev) => ({ ...prev, otp: otp, subject: subject }));
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (data.password !== data.confirmPassword) {
            return alert("Mật khẩu xác thực phải giống với mật khẩu mới");
        }
        sendEmail(data);
        setTbnInputOTP(true);
        setIsModalOpen(true);
    };

    return (
        <div className="w-full h-screen lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
            <div className="flex justify-center items-center">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mb-5">
                            Quên mật khẩu
                        </h1>

                        <Form layout="vertical" form={form}>
                            <Form.Item
                                label={
                                    <span className="font-medium">
                                        Email đã đăng ký
                                    </span>
                                }
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Vui lòng nhập email tài khoản của bạn.",
                                    },
                                ]}
                            >
                                <Input
                                    name="email"
                                    onChange={handleChange}
                                    placeholder="example@gmail.com"
                                />
                            </Form.Item>

                            <div className="flex items-center">
                                {user.username ? (
                                    <div>
                                        <span>
                                            Đây có phải là tên tài khoản của
                                            bạn:
                                        </span>
                                        <span className="ml-2 text-lg">
                                            {user.username}
                                        </span>{" "}
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>

                            <Form.Item>
                                <button
                                    onClick={handleSubmitEmail}
                                    className="border-solid border-2 rounded-md p-2 hover:bg-slate-300"
                                >
                                    Xác thực email
                                </button>
                            </Form.Item>

                            <div
                                style={{ display: data.otp ? "block" : "none" }}
                            >
                                <Form.Item
                                    label={
                                        <span className="font-medium">
                                            Mật khẩu mới
                                        </span>
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Vui lòng nhập mật khẩu mới cho tài khoản của bạn.",
                                        },
                                    ]}
                                >
                                    <Input
                                        type="password"
                                        name="password"
                                        onChange={handleChange}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label={
                                        <span className="font-medium">
                                            Mật khẩu xác thực
                                        </span>
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Vui lòng nhập lại mật khẩu mới.",
                                        },
                                    ]}
                                >
                                    <Input
                                        type="password"
                                        name="confirmPassword"
                                        onChange={handleChange}
                                    />
                                </Form.Item>
                                <div>
                                    {btnInputOTP ? (
                                        <Button
                                            onClick={() => setIsModalOpen(true)}
                                            className="w-1/2 mb-3"
                                        >
                                            Nhập mã otp
                                        </Button>
                                    ) : (
                                        ""
                                    )}
                                    <Button
                                        onClick={handleSubmit}
                                        className="my-3"
                                    >
                                        Thay đổi mật khẩu
                                    </Button>
                                </div>
                            </div>
                            <Link to={"/login"}>
                                Quay lại trang <strong>Đăng nhập</strong>
                            </Link>
                        </Form>

                        <Modal
                            title={`Nhập mã otp được gửi tới email: ${data.email}`}
                            open={isModalOpen}
                            onOk={handleModelOk}
                            onCancel={handleModelCancel}
                        >
                            <Input.OTP
                                length={4}
                                name="confirmOTP"
                                onChange={(val) => setConfirmOTP(val)}
                            />
                        </Modal>
                    </div>
                </div>
            </div>
            <div className="flex justify-center flex-1">
                <img
                    className="object-cover size-auto"
                    src="https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1123.jpg?t=st=1716110345~exp=1716113945~hmac=62e5c030bb5a9ba5076e04fa17579c37c571f81daa3f2cab2376ad431c6491a7&w=740"
                    alt=""
                />
            </div>
        </div>
    );
};

export default Forgot;
