import useUserStore from "@/hooks/useUserStore";
import { AiOutlineNotification } from "react-icons/ai";
import { CiCreditCard1 } from "react-icons/ci";
import { FaRegAddressCard } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { IoShieldOutline } from "react-icons/io5";
import { LuStickyNote } from "react-icons/lu";
import { Link } from "react-router-dom";

const contents = [
  {
    label: "Thông tin cá nhân",
    description:
      "Cung cấp thông tin cá nhân và cách chúng tôi có thể liên hệ với bạn",
    icon: <FaRegAddressCard size={28} />,
    path: "personal-info",
  },
  {
    label: "Đăng nhập và bảo mật",
    description: "Cập nhật mật khẩu và bảo mật tài khoản của bạn",
    icon: <IoShieldOutline size={28} />,
    path: "login-and-security",
  },
  {
    label: "Thanh toán và chi trả",
    description:
      "Xem lại các khoản thanh toán, chi trả, phiếu giảm giá và thẻ quà tặng",
    icon: <CiCreditCard1 size={28} />,
    path: "payment",
  },
  {
    label: "Thông báo",
    description: "Chọn tùy chọn thông báo và cách bạn muốn được liên hệ",
    icon: <AiOutlineNotification size={28} />,
    path: "notifications",
  },
  {
    label: "Thuế",
    description: "Quản lý thông tin người nộp thuế và chứng từ thuế",
    icon: <LuStickyNote size={28} />,
    path: "taxes/taxpayers",
  },
  {
    label: "Quyền riêng tư và chia sẻ",
    description:
      "Quản lý dữ liệu cá nhân, các dịch vụ được kết nối và chế độ cài đặt chia sẻ dữ liệu của bạn",
    icon: <FiEye size={28} />,
    path: "privacy-and-sharing",
  },
];

const Index = () => {
  const { user } = useUserStore();
  return (
    <div className="container mx-auto md:px-40 px-4 mt-10">
      <div className="text-[#222]">
        <h1 className="font-semibold text-[32px] ">Tài khoản</h1>
        <p className="font-semibold text-[18px] leading-6">
          {`${user?.fullName || user?.username},`}
          <span className="font-normal">{` ${user?.email} · `}</span>
          <Link to={`/user/new-info/${user?.id}`}>Truy cập hồ sơ</Link>
        </p>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1   gap-4 md:mt-8 mt-4">
        {contents.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="hover:text-[#222]  hover:bg-slate-50 transition-all"
          >
            <div className="p-6 border min-h-[160px] shadow-lg rounded-lg">
              {item.icon}
              <div className="mt-2">
                <h2 className="mb-1 text-base font-semibold">{item.label}</h2>
                <p>{item.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Index;
