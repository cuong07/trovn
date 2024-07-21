import { useEffect, useState } from "react";
import { SearchTable } from "@/components";
import { adminGetListings } from "@/apis/listing";
import useListingStore from "@/hooks/useListingStore";
import Search from "antd/es/input/Search";
import { useDebounce } from "use-debounce";

const Index = () => {
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(false);
    const [value] = useDebounce(keyword, 500);
    const {
        adminListings: { contents },
        setSearchAdminListingKeyword,
    } = useListingStore();

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                await adminGetListings();
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        })();
    }, [value]);

    const handleChangeQuery = async (e) => {
        setKeyword(e.target.value);
    };

    const onSearch = () => {
        setSearchAdminListingKeyword(value);
    };

    return (
        <div className="h-full p-4">
            <div className="mb-2">
                <h1 className="text-xl font-semibold mb-1">Danh sách phòng</h1>
                <Search
                    placeholder="Tìm kiếm phòng"
                    enterButton="Tìm kiếm"
                    size="large"
                    onChange={handleChangeQuery}
                    onSearch={onSearch}
                    loading={loading}
                />
            </div>
            <SearchTable loading={loading} contents={contents} />
        </div>
    );
};

export default Index;
