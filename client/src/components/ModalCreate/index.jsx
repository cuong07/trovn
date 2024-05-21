/* eslint-disable react/prop-types */
import { Modal } from "antd";

function Index({ handleOk, confirmLoading, handleCancel, children, ...props }) {
  return (
    <Modal
      title="Title"
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      {...props}
    >
      {children}
    </Modal>
  );
}

export default Index;
