import React, { useState, useRef, useEffect } from "react";
import { get } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { TIME_FORMAT_DATE_TIME } from "../../reducers/constant";
import { PAGINATION } from "../../reducers/constant";
import { DEFAULT_VALUE } from "../../reducers/constant";
import {
  Button,
  Card,
  Table,
  Typography,
  message,
  Col,
  Row,
  Popconfirm,
} from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import EditRoleUser from "./modals/EditRoleUser";
import { AllUser } from "../../actions/users";
import userApi from "../../api/userApi";
const { Text } = Typography;

function Manage_user({
  total,
  onClickRenew,
  loading,
  dataSource,
  onChangeParam,
  params,
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

  const CellAction = ({ record }) => {
    const dispatch = useDispatch();
    const [modal, setModal] = useState({
      visible: false,
      isEdit: true,
      id: null,
      data: null,
    });

    const _handleShowModal = async () => {
      setModal((prev) => ({
        ...prev,
        visible: !prev.visible,
        isEdit: !prev.visible ? true : false,
        id: record.id,
        data: record,
      }));
    };

    const _handleGetUser = async () => {
      await dispatch(AllUser.getAllUser());
    };

    const _handleDeleteuser = async () => {
      const response = await userApi.deleteUser(record._id);
      if (response.status) {
        message.success("Xoa User thanh cong");
        _handleGetUser();
        onChangeParam({
          page: params.page,
          size: params.size,
        });
      } else {
        message.error(get(response, "data.message", "Co loi xay ra"), 5);
      }
    };

    return (
      <Row align="middle" justify="center">
        <Col>
          <Button size="small" type="text" onClick={_handleShowModal}>
            <EditOutlined />
          </Button>
        </Col>
        <Col>
          <Popconfirm
            cancelText="Quay lai"
            okText="xac nhan"
            placement="topRight"
            title="Xac nhan xoa user"
            onConfirm={_handleDeleteuser}
          >
            <Button size="small" type="text">
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Col>
        <EditRoleUser modal={modal} onShowModal={_handleShowModal} />
      </Row>
    );
  };

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
      render: (_, record) => <CellAction record={record} />,
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
    <>
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
            pageSize: params.size,
            current: params.page,
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
    </>
  );
}

export default Manage_user;
