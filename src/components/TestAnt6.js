import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  message,
  Card,
  Popover,
  Tooltip,
  Modal,
  Form,
  Select,
  Input,
  Table,
  Space,
  Row,
  Col,
  Typography,
  Button,
  InputNumber,
  Checkbox,
  Tag,
  Image,
  Switch,
  DatePicker,
} from "antd";
import Password from "antd/es/input/Password";

function TestAnt6() {
  const [visibleModal, setVisibleModal] = useState(true);
  const [isChecked, setIsChecked] = useState(null);

  const [formA] = Form.useForm();
  const [formb] = Form.useForm();
  const onFinishb = async (values) => {
    const user = {
      username: values.username,
      password: values.password,
    };
    console.log(values);
    console.log(isChecked);
    // try {
    //   const response = await axios.post("/api/data", user);
    //   console.log("Login successfully:", response.data);
    //   // Xử lý logic sau khi gửi dữ liệu thành công
    // } catch (error) {
    //   console.error("Error adding data:", error);
    //   // Xử lý logic khi có lỗi xảy ra
    // }
  };

  const onFinish = (values) => {
    // Hiển thị một modal thông báo đơn giản
    Modal.info({
      title: "Received values",
      content: (
        <div>
          <p>Received values:</p>
          <pre>{values.email}</pre>
        </div>
      ),
      width: 600,
      onOk() {
        console.log("OK");
      },
    });
  };
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    console.log(isChecked);
  };
  const handleClick = () => {
    if (formA.validateFields()) {
      const values = formA.getFieldValue();
      console.log(values);
    }
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        Checkbox
      </label>

      <Modal
        title="Đăng nhập"
        visible={visibleModal}
        onOk={() => setVisibleModal(false)}
        onCancel={() => setVisibleModal(false)}
        width={300}
        footer={[]}
      >
        <div>
          <Form
            form={formb}
            // labelCol={{ span: 8 }}
            // wrapperCol={{ span: 16 }}
            onFinish={onFinishb}
            initialValues={{
              gender: "male",
              agreement: false,
              notifications: true,
            }}
            layout="vertical"
          >
            <Form.Item name="checkbox"></Form.Item>

            <Form.Item
              name="username"
              label={<span style={{ fontWeight: "bold" }}>Username</span>}
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input placeholder="Enter your username" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 6, message: "Password must be at least 6 characters" },
              ]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>
            <Form.Item
              name="agreement"
              valuePropName="checked"
              // rules={[
              //   {
              //     validator: (_, value) =>
              //       value
              //         ? Promise.resolve()
              //         : Promise.reject(
              //             new Error("You must accept the agreement!")
              //           ),
              //   },
              // ]}
            >
              <Checkbox>I have read and accept the agreement</Checkbox>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 17 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <Form
        form={formA}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        initialValues={{}}
        layout="vertical"
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="Enter your username" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email address!" },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 6, message: "Password must be at least 6 characters" },
          ]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>
        <Form.Item
          name="notifications"
          label="Receive Notifications"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item
          name="country"
          label="Country"
          rules={[{ required: true, message: "Please select your country!" }]}
        >
          <Select placeholder="Select your country">
            <Select.Option value="usa">USA</Select.Option>
            <Select.Option value="canada">Canada</Select.Option>
            <Select.Option value="uk">UK</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        <Form.Item
          name="birthdate"
          label="Birthdate"
          rules={[{ required: true, message: "Please select your birthdate!" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </div>
  );
}

export default TestAnt6;
