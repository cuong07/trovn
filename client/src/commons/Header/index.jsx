import { Avatar, Flex } from "antd";
import { Button, SearchInput } from "../../components";
import { CiHeart, CiUser } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";

const Index = () => {
  return (
    <div className="h-full leading-none flex items-center justify-between container mx-auto">
      <div className="flex gap-9">
        <div className="font-bold text-2xl tracking-wider">TROVN</div>
        <div>
          <SearchInput />
        </div>
      </div>
      <Flex gap={24} align="center" justify="center">
        <Button type="primary" className="rounded-full h-9">
          Trở thành chủ nhà
        </Button>
        <div>
          <CiHeart size={24} />
        </div>
        <div>
          <IoIosNotificationsOutline size={24} />
        </div>
        <div>
          <Avatar size={32} icon={<CiUser />} />
        </div>
      </Flex>
    </div>
  );
};

export default Index;
