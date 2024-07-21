import { ROLE } from "@/constants/role";
import useUserStore from "@/hooks/useUserStore";
import { Avatar, Popover } from "antd";
import { BiMenu } from "react-icons/bi";
import { CiUser } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { FcSettings } from "react-icons/fc";
import { FiLogIn } from "react-icons/fi";
import { IoLogOutOutline } from "react-icons/io5";
import { RiAdminLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Index = () => {
    const { user } = useUserStore();

    const contents = (
        <div className="flex flex-col p-2 md:w-[300px] text-lg  ">
            {user && (
                <>
                    <Link
                        to={`/user/info/${user?.id}`}
                        className="flex gap-2 items-center  p-2 rounded-md hover:bg-slate-100 hover:text-[#222]"
                    >
                        <div>
                            <FaUser />
                        </div>
                        Thông tin cá nhân
                    </Link>
                    <Link
                        to={`/account-settings`}
                        className="flex gap-2 items-center  p-2 rounded-md hover:bg-slate-100 hover:text-[#222]"
                    >
                        <div>
                            <FcSettings />
                        </div>
                        Tài khoản
                    </Link>
                    <hr />
                    <div className="text-[#717171]">
                        {user?.role === ROLE.ADMIN && (
                            <Link
                                to="/admin"
                                className="flex gap-2 items-center p-2 rounded-md hover:bg-slate-100 hover:text-[#222]"
                            >
                                <div>
                                    <RiAdminLine />
                                </div>
                                Trang quản lý
                            </Link>
                        )}
                        <Link
                            to="/logout"
                            className="flex gap-2 items-center  p-2 rounded-md hover:bg-slate-100 hover:text-[#222]"
                        >
                            <div>
                                <IoLogOutOutline />
                            </div>
                            Đăng xuất
                        </Link>
                    </div>
                </>
            )}
            {!user && (
                <>
                    <Link
                        to="/login"
                        className="flex gap-2 items-center  p-2 rounded-md hover:bg-slate-100 hover:text-[#222]"
                    >
                        <div>
                            <FiLogIn />
                        </div>
                        Đăng ký / Đăng nhập
                    </Link>
                </>
            )}
        </div>
    );
    return (
        <Popover placement="bottomRight" content={contents} arrow={false}>
            <div className="flex gap-1 py-1 px-2 border rounded-3xl items-center">
                <BiMenu size={20} />
                <Avatar size={32} src={user?.avatarUrl} icon={<CiUser />} />
            </div>
        </Popover>
    );
};

export default Index;
