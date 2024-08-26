import { Avatar, Button, Divider, List, message } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import {
  acceptReport,
  getReports,
  loadMoreReport,
  refuseReport,
} from "@/apis/report";
import useReportStore from "@/hooks/useReportStore";

const Index = () => {
  const {
    setReport,
    reports: { contents, currentPage, totalElement },
    filters: { limit, isActive, reporterId, reportedId },
    updatePagination,
    updateLoadMoreReport,
    removeReport,
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
        reportedId,
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

  const handleAccept = async (id, userId) => {
    try {
      const { success } = await acceptReport(id, userId);
      if (success) {
        removeReport(id);
        return message.success("Cập nhật thành công");
      }
      return message.info("Có lỗi khi cập nhât");
    } catch (error) {
      message.error(error.response.data.message);
      console.log(error);
    }
  };
  const handleRefuse = async (id) => {
    try {
      const { success } = await refuseReport(id);
      if (success) {
        removeReport(id);
        return message.success("Cập nhật thành công");
      }
      return message.info("Có lỗi khi cập nhât");
    } catch (error) {
      message.error(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <div>
      <h2 className="font-semibold text-2xl mb-8">Báo cáo</h2>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        header={
          <div className="grid grid-cols-7 gap-4">
            <div className="col-span-2 text-base font-medium">
              Người báo cáo
            </div>
            <div className="col-span-2 text-base font-medium">
              Người bị báo cáo
            </div>
            <div className="col-span-2 text-base font-medium">Nội dung</div>
            <div className="col-span-1 text-base font-medium">Xử lý</div>
          </div>
        }
        dataSource={contents}
        renderItem={(item) => (
          <>
            <div className="grid grid-cols-7 gap-4">
              <div className="flex gap-4 items-center col-span-2">
                <Avatar
                  className="w-16 h-16"
                  shape="square"
                  src={item.reporterUser.avatarUrl}
                />
                <div>
                  <Link
                    to={`/user/new-info/${item.reporterUser?.id}`}
                    className="text-lg font-medium"
                  >
                    {item.reporterUser?.fullName || item.reporterUser?.username}
                  </Link>
                  <div>{item.reporterUser?.email}</div>
                </div>
              </div>
              <div className="flex gap-4 items-center col-span-2">
                <Avatar
                  className="w-16 h-16"
                  shape="square"
                  src={item.reportedUser.avatarUrl}
                />
                <div>
                  <Link
                    to={`/user/new-info/${item.reportedUser?.id}`}
                    className="text-lg font-medium"
                  >
                    {item.reportedUser?.fullName || item.reportedUser?.username}
                  </Link>
                  <div>{item.reportedUser?.email}</div>
                </div>
              </div>
              <div className="flex gap-4 col-span-2 text-base items-center ">
                {item.content}
              </div>
              <div className="flex gap-4 items-center col-span-1">
                <Button
                  type="primary"
                  onClick={() => handleAccept(item.id, item.reportedUser?.id)}
                >
                  Chấp nhận
                </Button>
                <Button onClick={() => handleRefuse(item.id)}>Từ chối</Button>
              </div>
            </div>
            <Divider type="horizontal" />
          </>
        )}
      />
      {contents?.length < totalElement && (
        <div className="flex items-center justify-center">
          <Button type="default" onClick={handleLoadMoreReport}>
            Xem thêm
          </Button>
        </div>
      )}
    </div>
  );
};

export default Index;
