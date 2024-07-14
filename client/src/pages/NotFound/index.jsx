import { Button } from "@/components";
import { Result } from "antd";
import { Link } from "react-router-dom";

const Index = () => {
    return (
        <div className="h-[800px]">
            <Result
                status="404"
                title="404"
                subTitle="Xin lỗi, trang bạn truy cập không tồn tại."
                extra={
                    <Link to="/">
                        <Button
                            type="primary"
                            className="max-w-fit h-12 font-semibold text-base"
                        >
                            Trở về trang chủ
                        </Button>
                    </Link>
                }
            />
        </div>
    );
};

export default Index;
