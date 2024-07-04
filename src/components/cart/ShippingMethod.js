// ShippingMethod.js
import React from "react";
import { Select, Typography } from "antd";

const { Option } = Select;
const { Title } = Typography;

const ShippingMethod = ({ shippingMethods, onShippingChange }) => {
  return (
    <div>
      <Title level={4}>Phương thức vận chuyển</Title>
      <Select
        defaultValue={shippingMethods[0].id}
        style={{ width: 200 }}
        onChange={onShippingChange}
      >
        {shippingMethods.map((method) => (
          <Option key={method.id} value={method.id}>
            {method.name} -{" "}
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(method.price)}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default ShippingMethod;
