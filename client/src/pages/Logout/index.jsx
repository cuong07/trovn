import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
    const navigate = useNavigate();
    // * Handle logout to server
    useEffect(() => {
        localStorage.removeItem("token");
        navigate("/login");
    }, [navigate]);
};

export default Index;
