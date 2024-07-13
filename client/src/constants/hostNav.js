import { Link } from "react-router-dom";

export const hostNav = [
    {
        key: 1,
        children: [
            {
                key: 1.1,
                label: <Link to="listing/list">Danh sách</Link>,
                path: "",
            },
            {
                key: 1.2,
                label: <Link to="listing/list">Danh sách</Link>,
                path: "",
            },
        ],
        label: "Cho thuê",
    },
];
