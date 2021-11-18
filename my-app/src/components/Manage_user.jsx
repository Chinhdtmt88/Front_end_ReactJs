import React, { useState, useRef, useEffect } from "react";
import _, { includes } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { AllUser } from "../actions/users";
import { TIME_FORMAT_DATE_TIME } from "../reducers/constant";
import { PAGINATION } from "../reducers/constant";
import { DEFAULT_VALUE } from "../reducers/constant";
import {
  Button,
  DatePicker,
  Card,
  Table,
  Typography,
  Modal,
  message,
} from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import userApi from "../api/userApi";

const { Text } = Typography;

function Manage_user({
  total,
  onClickRenew,
  loading,
  dataSource,
  onChangeParam,
  handleShowConfirmDelete,
  param,
}) {
  const CARD_STYLE = {
    borderRadius: "0.42rem",
    boxShadow: "0px 0px 30px 0px rgba(82, 63, 105, 0.05)",
  };
  const CARD_BODY_STYLE = {
    padding: "0px 10px 10px 10px",
  };
  const CARD_HEAD_STYLE = {
    padding: "0px 9px 0px 9px",
    borderBottom: "none",
  };
  const today = new Date();
  // const dispatch = useDispatch();
  // const _handleGetUser = async () => {
  //   await dispatch(AllUser.getAllUser());
  // };
  // const handleShowConfirmDelete = (record) => {
  //   Modal.confirm({
  //     title: <span>Xác nhận xóa user</span>,
  //     icon: <ExclamationCircleOutlined />,
  //     okText: "Xác nhận",
  //     okType: "danger",
  //     cancelText: "Hủy",
  //     content: "",
  //     onOk() {
  //       userApi
  //         .deleteUser(record._id)
  //         .then(() => {
  //           message.success("Xóa user thành công.");
  //           _handleGetUser();
  //         })
  //         .catch(() => message.error("Xoá user không thành công"));
  //     },
  //     onCancel() {},
  //   });
  // };
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: "3%",
      align: "center",
    },

    {
      dataIndex: "name",
      title: "Name",
      width: "8%",
      align: "center",
      render: (name) => name || DEFAULT_VALUE,
    },
    {
      dataIndex: "email",
      title: "Email",
      width: "8%",
      align: "center",
      render: (email) => email || DEFAULT_VALUE,
    },
    {
      dataIndex: "role",
      title: "Role",
      width: "8%",
      align: "center",
      render: (role) => role || DEFAULT_VALUE,
    },
    {
      dataIndex: "passwordChangedAt",
      title: "PasswordChangedAt",
      width: "8%",
      align: "center",
      render: (passwordChangedAt) => {
        // eslint-disable-next-line no-unused-expressions
        return passwordChangedAt
          ? moment(passwordChangedAt).format(TIME_FORMAT_DATE_TIME)
          : DEFAULT_VALUE;
      },
    },
    {
      dataIndex: "",
      title: "Hành động",
      key: "",
      width: "4%",
      align: "center",
      render: (_, record) => {
        // if (!includes(status_allow_delete, record.status)) return null;
        return (
          <div className="d-flex align-items-center justify-content-center">
            <Button
              danger
              size="small"
              type="link"
              onClick={() => handleShowConfirmDelete(record)}
            >
              <span className="d-flex align-items-center">
                <DeleteOutlined />
              </span>
            </Button>
          </div>
        );
      },
    },
  ];
  const renderCardExtra = () => {
    return (
      <div className="d-flex aligns-items-center">
        <Button onClick={onClickRenew}>Làm mới</Button>
      </div>
    );
  };

  return (
    <div>
      <h2>This is ❤❤😊😂😂😂manage_user</h2>

      <Card
        size="small"
        style={CARD_STYLE}
        bodyStyle={CARD_BODY_STYLE}
        headStyle={CARD_HEAD_STYLE}
        extra={renderCardExtra()}
      >
        <Table
          loading={{
            spinning: loading,
            delay: 500,
          }}
          rowKey="_id"
          bordered
          size="small"
          columns={columns}
          dataSource={dataSource}
          pagination={{
            pageSize: param.size,
            current: param.page,
            defaultPageSize: PAGINATION.page,
            total,
            showSizeChanger: true,
            onChange: (page, pageSize) => {
              onChangeParam({
                page: page,
                size: pageSize,
              });
            },
          }}
        />
      </Card>
    </div>
  );
}

export default Manage_user;
