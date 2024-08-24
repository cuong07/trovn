import { ROLE } from "@/constants/role";
import useUserStore from "@/hooks/useUserStore";
import { BiMenu } from "react-icons/bi";
import { CiUser } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { FcSettings } from "react-icons/fc";
import { FiLogIn } from "react-icons/fi";
import { RiAdminLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Index = () => {
    const { user } = useUserStore();
    const links = [
        {
            name: "Thông tin cá nhân",
            icon: <FaUser />,
            href: `/user/new-info/${user?.id}`,
            isAdmin: false,
            hasUser: true,
        },
        {
            name: "Tài khoản",
            icon: <FcSettings />,
            href: `/account-settings`,
            isAdmin: false,
            hasUser: true,
        },
        {
            name: "Trang quản lý",
            icon: <RiAdminLine />,
            href: `/admin`,
            isAdmin: user?.role === ROLE.ADMIN,
            hasUser: true,
        },
        {
            name: "  Đăng ký / Đăng nhập",
            icon: <FiLogIn />,
            href: `/login`,
            isAdmin: false,
            hasUser: false,
        },
    ];
    return (
        <DropdownMenu modal>
            <DropdownMenuTrigger className="focus:ring-0 focus:ring-offset-0 focus-visible:ring-0">
                <div className="flex gap-1 py-1 px-2 border rounded-3xl items-center">
                    <BiMenu size={20} />
                    <Avatar>
                        <AvatarImage
                            src={user?.avatarUrl}
                            alt={user?.fullName}
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Tùy chọn tài khoản</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {links.map((link) => (
                    <>
                        {link.hasUser && (
                            <DropdownMenuItem key={link.icon}>
                                <Link
                                    className="flex gap-2 items-center"
                                    to={link.href}
                                >
                                    {link.icon}
                                    <div>{link.name}</div>
                                </Link>
                            </DropdownMenuItem>
                        )}
                        {!link.hasUser && (
                            <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem key={link.icon}>
                                    <Link
                                        className="flex gap-2 items-center"
                                        to={link.href}
                                    >
                                        {link.icon}
                                        <div>{link.name}</div>
                                    </Link>
                                </DropdownMenuItem>
                            </>
                        )}
                    </>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Index;
