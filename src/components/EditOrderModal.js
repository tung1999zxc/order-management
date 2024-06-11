// src/components/EditOrderModal.js
import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";

const { Option } = Select;

const EditOrderModal = ({ visible, order, onUpdate, onCancel }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (order) {
      form.setFieldsValue(order);
    }
  }, [order]);

  const onOk = () => {
    form
      .validateFields()
      .then((values) => {
        onUpdate({ ...order, ...values });
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      visible={visible}
      title="Edit Order"
      okText="Update"
      onCancel={onCancel}
      onOk={onOk}
    >
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="name"
          label="Customer Name"
          rules={[
            {
              required: true,
              message: "Please input the name of the customer!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: "Please select the status!" }]}
        >
          <Select>
            <Option value="Pending">Pending</Option>
            <Option value="Shipped">Shipped</Option>
            <Option value="Completed">Completed</Option>
            <Option value="Canceled">Canceled</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditOrderModal;
