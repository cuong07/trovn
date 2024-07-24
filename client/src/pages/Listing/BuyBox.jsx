/* eslint-disable react/prop-types */
import { formatMoney } from "@/utils/helpers";
import { Button } from "@/components";
import { Link, useNavigate } from "react-router-dom";
import { IoCallOutline } from "react-icons/io5";
import { CiChat1, CiMail } from "react-icons/ci";
import { SiZalo } from "react-icons/si";
import { message } from "antd";

const BuyBox = ({ listing, user }) => {
  const navigate = useNavigate();
  const handleChat = (userId) => {
    if (!user) {
      return message.warning("Vui lòng đăng nhập");
    }
    navigate("/chat/" + userId);
  };
  return (
    <div className="relative h-full w-full  ">
      <div className=" sticky rounded-lg overflow-hidden shadow-lg top-[100px] border-t-4 border-[#A86FF7]">
        <div className="w-full p-4  shadow-md flex flex-col gap-4 ">
          <div>
            <div className="uppercase tracking-widest mb-2 ">Giá phòng</div>
            <div className="text-4xl font-medium leading-none ">
              {formatMoney(listing.price)}{" "}
              <span className="font-light text-2xl">/ Tháng</span>
            </div>
          </div>
          <div>
            <div className="uppercase tracking-widest mb-2 ">
              Thông tin liên hệ
            </div>
            <div className="flex flex-col gap-2">
              <Button
                type="primary"
                onClick={() => handleChat(listing?.user?.id)}
              >
                <CiChat1 className="mr-2 " size={18} />
                Nhắn với chủ nhà
              </Button>
              <Link
                target="_blank"
                to={`https://zalo.me/${listing?.user?.phoneNumber}`}
              >
                <Button>
                  <SiZalo className="mr-2 " size={18} />
                  Zalo
                </Button>
              </Link>
              <Link to={`tel:${listing?.user?.phoneNumber}`}>
                <Button type="ghost">
                  <IoCallOutline className="mr-2 " size={18} />
                  {!user
                    ? `${listing?.user?.phoneNumber.slice(0, 6)}****`
                    : listing?.user?.phoneNumber}
                </Button>
              </Link>
              <Link to={`mail:to${listing?.user?.email}`}>
                <Button type="ghost">
                  <CiMail className="mr-2 " size={18} />
                  {!user
                    ? `${listing?.user?.email.slice(0, 8)}****`
                    : listing?.user?.email}
                </Button>
              </Link>
            </div>
            {!user && (
              <div className=" text-center">
                <Link to="/login" className="text-xs underline">
                  để xem đầu đủ thông tin vui lòng đăng nhập
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyBox;
