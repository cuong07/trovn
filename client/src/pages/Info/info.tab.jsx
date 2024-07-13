/* eslint-disable react/prop-types */
import { Form } from "antd";
import moment from "moment";

function InfoTab({ user }) {
    return (
        <>
            <Form
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                style={{
                    maxWidth: 600,
                }}
            >
                <p className="text-slate-400 mt-6 mb-4">
                    &lt;Thông tin liên hệ&gt;
                </p>
                <Form.Item label="Địa chỉ" className="my-2">
                    <span className="ml-1">{user.address}</span>
                </Form.Item>

                <Form.Item label="Email" className="my-2">
                    <span className="ml-1">{user.email}</span>
                </Form.Item>

                <Form.Item label="Số điện thoại" className="my-2">
                    <span className="ml-1">{user.phoneNumber}</span>
                </Form.Item>

                <p className="text-slate-400 mt-6 mb-4">
                    &lt;Thông tin cơ bản&gt;
                </p>
                <Form.Item label="Ngày tham gia" className="my-2">
                    <span className="ml-1">
                        {moment(user.createdAt).format("LL")}
                    </span>
                </Form.Item>

                <Form.Item label="Ngày thay đổi gần nhất" className="my-2">
                    <span className="ml-1">
                        {moment(user.updatedAt).format("LL")}
                    </span>
                </Form.Item>

                {/* <Form.Item label="Vai trò" className="my-2">
                    <span className="ml-1">{user.role}</span>
                </Form.Item> */}

                {/* <Form.Item label="Gói " className="my-2">
          <span className="ml-1">{user.isPremium ? "Normal" : "Premium"}</span>
          {user.isPremium ? (
            <Link to="/" className="ml-20 text-sky-400 hover:text-red-700">
              Hủy gói
            </Link>
          ) : (
            <Link to="/" className="ml-20 text-sky-400 hover:text-red-700">
              Đăng ký gói Premium
            </Link>
          )}
        </Form.Item> */}

                {/* <Form.Item label="Địa chỉ">
                    <Input value={user.address} />
                </Form.Item> */}
                {/* <div className="flex justify-center">
                    <Button>Xác nhận</Button>
                </div> */}
            </Form>
        </>
    );
}

export default InfoTab;
