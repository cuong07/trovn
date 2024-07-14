import useUserStore from "@/hooks/useUserStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
    const navigate = useNavigate();
    const { removeToken } = useUserStore();
    // * Handle logout to server
    useEffect(() => {
        localStorage.removeItem("token");
        removeToken();
        navigate("/login");
    }, [navigate, removeToken]);
};

export default Index;
