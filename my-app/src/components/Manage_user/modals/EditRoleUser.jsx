import React, { useCallback, useEffect, useState } from "react";
import { Form, Input, Button, Modal } from "antd";
import _ from "lodash";
import userApi from "../../../api/userApi";
let timer = null;
function EditRoleUser({ modal, onShowModal }) {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  let { visible, name, email, role, data, passwordChangedAt } = modal;

  const [form] = Form.useForm();
  const title = "Chỉnh sửa thông tin User";

  const [isButtonLoading, setButtonLoading] = useState(false);

  const [loading, setLoading] = useState(false);

  const _callApi = async (id, data, isEdit) => {
    setButtonLoading((prev) => ({
      ...prev,
      value: true,
    }));

    let response = null;
    if (isEdit) {
      response = await userApi.updateUser(id, data);
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
      const { name, email, role } = form.getFieldValue([
        "name",
        "email",
        "role",
      ]);

      const data = {
        name,
        email,
        role,
      };
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
              message: "Vui long nhap ten",
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
              message: "Vui long nhap email",
            },
          ]}
          email={"email"}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={"role"}
          rules={[
            {
              required: true,
              message: "Vui long nhap role",
            },
          ]}
          role={"role"}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
export default EditRoleUser;
