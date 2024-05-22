import {Link } from "react-router-dom";
import { getUser, getCurrentUser } from "../../apis/user";
import { useEffect, useState } from "react";
import {Button} from "../../components";
import { Form, Input } from "antd";

function Info() {
  const [user, setUser] = useState({});
  useEffect(() => {
    const getInforUser = async () => {
      const currentUser = await getCurrentUser(); 
      const idCurrentUser = currentUser.data.data.id;
      const u = await getUser(idCurrentUser);
      setUser((previusUser) => {
        return { ...u.data };
      });
    };
    getInforUser();
  }, []);


  return (
    <>
      <div className="bg-slate-200 pt-5 pb-20">
        <div className="max-w-[1280px] mx-auto px-10 bg-white pb-3">
          <h1 className="text-2xl font-medium pt-3">Hồ sơ của tôi</h1>
          <h5 className="text-lg ">
            Quản lý thông tin hồ sơ để bảo mật tài khoản{" "}
          </h5>
          <hr className="my-5 border-black " />

          <div className="flex">
            <div className="w-8/12 lg:pl-32">
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
                <Form.Item label="Tên người dùng" className="my-2">
                  <span className="ml-1">{user.username}</span>
                </Form.Item>

                <Form.Item label="Email" className="my-2">
                  <span className="ml-1">{user.email}</span>
                </Form.Item>

                <Form.Item label="Số điện thoại" className="my-2">
                  <span className="ml-1">{user.phoneNumber}</span>
                </Form.Item>

                <Form.Item label="Ngày tạo" className="my-2">
                  <span className="ml-1">{user.createdAt}</span>
                </Form.Item>

                <Form.Item label="Ngày thay đổi gần nhất" className="my-2">
                  <span className="ml-1">{user.updatedAt}</span>
                </Form.Item>

                <Form.Item label="Vai trò" className="my-2">
                  <span className="ml-1">{user.role}</span>
                </Form.Item>

                <Form.Item label="Gói " className="my-2">
                  <span className="ml-1">
                    {user.isPremium ? "Normal" : "Premium"}
                  </span>
                  {user.isPremium ? <Link to="/" className="ml-20 text-sky-400 hover:text-red-700">Hủy gói</Link> : <Link to="/" className="ml-20 text-sky-400 hover:text-red-700">Đăng ký gói Premium</Link>}
                </Form.Item>

                <Form.Item label="Địa chỉ">
                  <Input value={user.address} />
                </Form.Item>
                <div className="flex justify-center">
                    <Button>Xác nhận</Button>
                </div>
                
              </Form>
            </div>

            <div className="w-4/12 border-l-2 border-solid border-black flex justify-center">
                <div className="w-2/3">
                    <img src={user.avatarUrl} alt="Ảnh đại diện" />
                    <Button>Chọn ảnh</Button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Info;
