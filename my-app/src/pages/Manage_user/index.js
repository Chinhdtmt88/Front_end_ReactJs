/* eslint-disable no-undef */
/* eslint-disable react/jsx-pascal-case */
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Col,
  Form,
  Input,
  Row,
  DatePicker,
  Button,
  Table,
  Typography,
  Modal,
  message,
} from "antd";
import _ from "lodash";
import Manage_user from "../../components/Manage_user";
import { AllUser } from "../../actions/users";
import { PAGINATION } from "../../reducers/constant";
import moment from "moment";
import userApi from "../../api/userApi";
import { ExclamationCircleOutlined } from "@ant-design/icons";
let timer = null;
function ManageUser() {
  const CARD_STYLE = {
    borderRadius: "0.42rem",
    boxShadow: "0px 0px 30px 0px rgba(82, 63, 105, 0.05)",
  };
  const today = new Date();
  const { RangePicker } = DatePicker;
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { alluser, total } = useSelector((state) => state.user);

  const [param, setParam] = useState({
    size: PAGINATION.size,
    page: PAGINATION.page,
    from: `${moment(today).format("YYY-MM_DD")} 00:00:00`,
    to: `${moment(today).format("YYYY-MM-DD")} 23:59:59`,
  });

  const dataSource = _.map(alluser, (item, index) => ({
    ...item,
    stt:
      param.page === 1 ? index + 1 + (param.page - 1) * param.size : index + 1,
  }));

  const [loading, setLoading] = useState(false);

  const _handleGetUser = async () => {
    await dispatch(AllUser.getAllUser());
  };

  useEffect(() => {
    _handleGetUser();
  }, []);

  const onChangeParam = (param) => {
    if (!param.size && !param.page) {
      param.page = PAGINATION.page;
      param.size = PAGINATION.size;
    }
    setParam((prev) => ({ ...prev, ...param }));
  };

  const handleShowConfirmDelete = (record) => {
    Modal.confirm({
      title: <span>Xác nhận xóa user</span>,
      icon: <ExclamationCircleOutlined />,
      okText: "Xác nhận",
      okType: "danger",
      cancelText: "Hủy",
      content: "",
      onOk() {
        userApi
          .deleteUser(record._id)
          .then(() => {
            message.success("Xóa user thành công.");
            _handleGetUser();
          })
          .catch(() => message.error("Xoá user không thành công"));
      },
      onCancel() {},
    });
  };
  return (
    <div>
      <Manage_user
        loading={loading}
        dataSource={dataSource}
        total={total}
        param={param}
        onChangeParam={onChangeParam}
        onClickRenew={_handleGetUser}
        handleShowConfirmDelete={handleShowConfirmDelete}
      />
    </div>
  );
}

export default ManageUser;
