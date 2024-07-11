import { Avatar, Divider, List, message, Skeleton } from "antd";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import { getReports, loadMoreReport } from "@/apis/report";
import useReportStore from "@/hooks/useReportStore";

const Index = () => {
    const {
        setReport,
        reports: { contents, currentPage, totalElement },
        filters: { page, limit, isActive, reporterId, reportedId },
        updatePagination,
        updateLoadMoreReport,
    } = useReportStore();

    useEffect(() => {
        (async () => {
            try {
                const { data, success } = await getReports();
                if (success) {
                    setReport(data);
                    return;
                }
                message.error("Có lỗi xảy ra");
            } catch (error) {
                message.error(error.response.data.message);
                console.log(error);
            }
        })();
    }, [setReport, isActive, reporterId, reportedId]);

    const handleLoadMoreReport = async () => {
        try {
            const nextPage = currentPage + 1;
            updatePagination(nextPage);

            const { data, success } = await loadMoreReport(
                nextPage,
                limit,
                isActive,
                reporterId,
                reportedId
            );
            if (success) {
                updateLoadMoreReport(data);
            } else {
                message.error("Có lỗi xảy ra khi tải thêm báo cáo");
            }
        } catch (error) {
            message.error(error.response.data.message);
            console.log(error);
        }
    };

    return (
        <div id="scrollableDiv" style={{ height: 800, overflow: "auto" }}>
            <InfiniteScroll
                dataLength={contents?.length || 0}
                next={handleLoadMoreReport}
                hasMore={contents?.length < totalElement}
                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                scrollableTarget="scrollableDiv"
            >
                <List
                    className="demo-loadmore-list"
                    itemLayout="horizontal"
                    dataSource={contents}
                    renderItem={(item) => (
                        <List.Item
                            actions={[
                                <a key="list-loadmore-edit">edit</a>,
                                <a key="list-loadmore-more">more</a>,
                            ]}
                        >
                            <List.Item.Meta
                                className="w-1/3"
                                avatar={
                                    <Avatar
                                        className="w-16 h-16"
                                        shape="square"
                                        src={item.reporterUser.avatarUrl}
                                    />
                                }
                                title={
                                    <Link
                                        to={`/user/info/${item.reporterUser?.id}`}
                                        className="text-xl"
                                    >
                                        {item.reporterUser?.fullName ||
                                            item.reporterUser?.username}
                                    </Link>
                                }
                                description={item?.content}
                            />
                        </List.Item>
                    )}
                />
            </InfiniteScroll>
        </div>
    );
};

export default Index;
