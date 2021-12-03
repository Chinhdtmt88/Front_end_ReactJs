import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Modal, message } from "antd";
import _ from "lodash";
import { AllUser } from "../../../actions/users";
import userApi from "../../../api/userApi";

function EditRoleUser({ modal, onShowModal }) {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  let { visible, data, id } = modal;

  const [form] = Form.useForm();
  const title = "Chỉnh sửa thông tin User";

  const [isButtonLoading, setButtonLoading] = useState(false);
  const dispatch = useDispatch();

  const _handleGetUser = async () => {
    await dispatch(AllUser.getAllUser());
  };
  const _callApi = async (data) => {
    setButtonLoading((prev) => ({
      ...prev,
      value: true,
    }));

    let response = null;
    console.log(id);
    response = await userApi.updateUser(id, data);
    if (response.status) {
      message.success("update User thành công");
      _handleGetUser();
    } else {
      message.error("data.message", "Có lỗi xảy ra");
    }
    setButtonLoading((prev) => ({
      ...prev,
      value: false,
    }));

    if (response && response.data && response.data.success) {
      onShowModal();
    }
  };

  const _handleSubmit = async () => {
    let validate = await form.validateFields();
    if (!validate.outofDate) {
      const { name, email, role } = form.getFieldsValue([
        "name",
        "email",
        "role",
      ]);

      const data = {
        name,
        email,
        role,
      };

      _callApi(data);
      console.log(data);
    }
  };

  const _handleCancel = () => {
    form.resetFields();
    onShowModal();
  };

  const _handleReset = () => {
    form.resetFields();
  };

  return (
    <Modal
      destroyOnClose={true}
      width={600}
      onCancel={() => {
        _handleCancel();
      }}
      title={title}
      visible={visible}
      maskClosable={false}
      footer={[
        <Button key="back" onClick={_handleReset} type="dashed" danger>
          Làm mới
        </Button>,
        <Button
          key="submit"
          type="default"
          onClick={_handleSubmit}
          loading={isButtonLoading.value}
        >
          Lưu
        </Button>,
      ]}
    >
      <Form
        {...layout}
        autoComplete="off"
        layout="horizontal"
        form={form}
        onFinish={_handleSubmit}
        initialValues={{
          ["name"]: data?.name,
          ["email"]: data?.email,
          ["role"]: data?.role,
        }}
        labelAlign={"left"}
      >
        <Form.Item
          label={"Username"}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên",
            },
          ]}
          name={"name"}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={"Email"}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập email",
            },
          ]}
          name={"email"}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={"Role"}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập vị trí",
            },
          ]}
          name={"role"}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
export default EditRoleUser;
