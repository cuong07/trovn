import { useEffect, useState } from "react";
import { getUsers } from "../../../apis/user";
import { Avatar, Pagination } from "antd";
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    MessageOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Index = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedUsers = await getUsers();
                setUsers(fetchedUsers);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách người dùng:", error);
            }
        };

        fetchData(); // Gọi hàm để lấy danh sách người dùng khi component được render
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleMessageClick = (userId) => {
        navigate(`/chat/${userId}`);
    };

    const renderUsers = () => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const currentUsers = users.slice(startIndex, endIndex);

        return currentUsers.map((user) => (
            <tr key={user.id} className="bg-white border border-gray-300">
                <td className="py-2 px-4 border border-gray-300">
                    <Avatar src={user.avatarUrl} />
                </td>
                <td className="py-2 px-4 border border-gray-300">
                    {user.username}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                    {user.email}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                    {user.address}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                    {user.phoneNumber}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                    {user.role}
                </td>
                <td
                    className="py-2 px-4 border border-gray-300"
                    style={{ textAlign: "center" }}
                >
                    {user.isPremium ? (
                        <CheckCircleOutlined
                            style={{ fontSize: "24px", color: "green" }}
                        />
                    ) : (
                        <CloseCircleOutlined
                            style={{ fontSize: "24px", color: "red" }}
                        />
                    )}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                    {moment(user.createdAt).format("LL")}
                </td>
                <td
                    className="py-2 px-4 border border-gray-300"
                    style={{ textAlign: "center" }}
                >
                    <MessageOutlined
                        style={{
                            fontSize: "24px",
                            color: "blue",
                            cursor: "pointer",
                        }}
                        onClick={() => handleMessageClick(user.id)}
                    />
                </td>
            </tr>
        ));
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Danh sách người dùng</h2>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 border border-gray-300">
                            Avatar
                        </th>
                        <th className="py-2 px-4 border border-gray-300">
                            Tên đăng nhập
                        </th>
                        <th className="py-2 px-4 border border-gray-300">
                            Email
                        </th>
                        <th className="py-2 px-4 border border-gray-300">
                            Địa chỉ
                        </th>
                        <th className="py-2 px-4 border border-gray-300">
                            Số điện thoại
                        </th>
                        <th className="py-2 px-4 border border-gray-300">
                            Chức vụ
                        </th>
                        <th className="py-2 px-4 border border-gray-300">
                            Tài khoản premium
                        </th>
                        <th className="py-2 px-4 border border-gray-300">
                            Ngày tạo
                        </th>
                        <th className="py-2 px-4 border border-gray-300">
                            Nhắn tin
                        </th>
                    </tr>
                </thead>
                <tbody>{renderUsers()}</tbody>
            </table>
            <div className="flex justify-center mt-4">
                <Pagination
                    current={currentPage}
                    total={users.length}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                />
            </div>
        </div>
    );
};

export default Index;
