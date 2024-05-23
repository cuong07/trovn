import { Avatar, Flex, Popover } from "antd";
import { Button, SearchInput } from "../../components";
import { CiHeart, CiUser } from "react-icons/ci";
import { IoIosNotificationsOutline, IoIosHelpCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const Index = () => {
  const contents = (
    <div className="flex flex-col gap-2 p-2 ">
      <Link to="/user/info" className="flex gap-2 items-center">
        <div>
          <FaUser />
        </div>
        Thông tin cá nhân
      </Link>
      <Link to="/user/help" className="flex gap-1 items-center">
        <div>
          <IoIosHelpCircle size={20} />
        </div>
        Trung tâm trợ giúp
      </Link>
    </div>
  );

  return (
    <div className="h-full leading-none flex items-center justify-between container mx-auto">
      <div className="flex gap-9">
        <div className="font-bold text-2xl tracking-wider">
          <Link to="/">TROVN</Link>
        </div>
        <div>
          <SearchInput />
        </div>
      </div>
      <Flex gap={24} align="center" justify="center">
        <Link to="/host">
          <Button type="primary" className="rounded-full h-9">
            Trở thành chủ nhà
          </Button>
        </Link>
        <div>
          <CiHeart size={24} />
        </div>
        <div>
          <IoIosNotificationsOutline size={24} />
        </div>
        <Popover placement="bottomRight" content={contents} arrow={false}>
          <Avatar size={32} icon={<CiUser />} />
        </Popover>
      </Flex>
    </div>
  );
};

export default Index;
