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
import Manage_user from "../../components/Manage_user/Manage_user";
import { AllUser } from "../../actions/users";
import { PAGINATION } from "../../reducers/constant";
import moment from "moment";
import userApi from "../../api/userApi";
import { ExclamationCircleOutlined, EditOutlined } from "@ant-design/icons";
import EditRoleUser from "../../components/Manage_user/modals/EditRoleUser";
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

  const [params, setParams] = useState({
    size: PAGINATION.size,
    page: PAGINATION.page,
  });

  const dataSource = _.map(alluser, (item, index) => ({
    ...item,
    stt:
      params.page === 1
        ? index + 1 + (params.page - 1) * params.size
        : index + 1,
  }));

  const [loading, setLoading] = useState(false);

  const _handleGetUser = useCallback(async () => {
    await dispatch(AllUser.getAllUser(params));
  }, [params]);

  // useEffect(() => {
  //   _handleGetUser();
  // }, [_handleGetUser]);

  const onChangeParam = (param) => {
    if (!param.page && !param.size) {
      param.page = PAGINATION.page;
      param.size = PAGINATION.size;
    }
    setParams((prev) => ({ ...prev, ...param }));
  };

  const _handleShowModal = () => {
    setModalState((prev) => ({
      ...prev,
      visible: !prev.visible,
      isEdit: false,
    }));
  };
  const [modalState, setModalState] = useState({
    visible: false,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <Col span={24}>
        <Manage_user
          loading={loading}
          dataSource={dataSource}
          total={total}
          params={params}
          onChangeParam={onChangeParam}
          onClickRenew={_handleGetUser}
          // onClickCreate={_handleShowModal}
        />
      </Col>
      <EditRoleUser modal={modalState} onShowModal={_handleShowModal} />
    </>
  );
}
export default ManageUser;
