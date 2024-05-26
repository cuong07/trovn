import {Link } from "react-router-dom";
import { getUser, getListingByUserId, getFavoriteListing } from "../../apis/user";
import { useEffect, useState } from "react";
import {Button} from "../../components";
import { Form, Input } from "antd";
import useUserStore from '../../hooks/userStore';
import {useParams}from 'react-router-dom';
import { Tabs } from 'antd';
import InfoTab from "./info.tab";
import ProductList from "../Home/ProductList";

function Info() {
  const {user} = useUserStore();
  console.log('user in info:', user);
  const { id } = useParams();
  const [listings, setListing] = useState([]);
  const [favoriteListing, setFavoriteListing] = useState([]);

  useEffect(() => {
    const getInforUser = async () => {
      
      await getUser(id);
      const lts = await getListingByUserId(id);
      const fvlts = await getFavoriteListing(id);
      setListing((prev)=> ([...lts]));
      setFavoriteListing((prev)=>([...fvlts]));
    };
    getInforUser();
  },[id]);
  
  
  // tabs
  const onChangeTabs = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: '1',
      label: 'General',
      children: <InfoTab user={user}/>,
    },
    {
      key: '2',
      label: 'Phòng yêu thích',
      children: <ProductList data={favoriteListing} column={2}/>,
    },
    {
      key: '3',
      label: 'Phòng hiện có',
      children: <ProductList data={listings} column={2}/>,
    },
  ];

  return (
    <>
      <div className="bg-slate-200 pt-5 pb-20">
        <div className="max-w-[1280px] mx-auto px-10 bg-white pb-3">
          <h1 className="text-2xl font-medium pt-3">Hồ sơ của tôi</h1>
          <h5 className="text-lg ">
            Quản lý thông tin hồ sơ để bảo mật tài khoảnn
          </h5>
          <hr className="my-5 border-black " />
              {/* left side */}
          <div className="flex ">
            <div className="w-4/12 flex justify-center flex-col">
                  <div className="w-2/3 mx-auto">
                      <img src={user?.avatarUrl} alt="Ảnh đại diện" />
                      <Button>Chọn ảnh</Button>
                  </div>
                  <div>
                    <span>Tổng quan</span>

                  </div>
                  <div>
                    <span>Thẻ</span>
                  </div>
            </div>
                {/* right side */}
            <div className="w-8/12">
              <div className="">
                <p className="text-3xl">{user.username}</p>
                <p className="text-xs text-cyan-400">{user.role}</p> 
                {user.role === 'HOST' ? <label>{user.isPremium ? '- Normal' : 'isPremium'}</label> : ''} 
              </div>

              <div>
                <Tabs defaultActiveKey="1" items={items} onChange={onChangeTabs} />
              </div>
                
              {/* <Form
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
                
              </Form> */}
            </div>
          </div>
        </div>
      </div>

      <h1>info components</h1>
    </>
  );
}

export default Info;
