// CartSummary.js
import React from "react";
import { List, Typography } from "antd";

const { Text } = Typography;

const CartSummary = ({ total, discountValue, shippingPrice, grandTotal }) => {
  return (
    <div>
      <h3>Tóm tắt đơn hàng</h3>
      <List>
        <List.Item>
          <Text strong>Tổng giá trị:</Text>
          <Text>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(total)}
          </Text>
        </List.Item>
        <List.Item>
          <Text strong>Giảm giá:</Text>
          <Text>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(discountValue)}
          </Text>
        </List.Item>
        <List.Item>
          <Text strong>Phí vận chuyển:</Text>
          <Text>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(shippingPrice)}
          </Text>
        </List.Item>
        <List.Item>
          <Text strong>Tổng thanh toán:</Text>
          <Text>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(grandTotal)}
          </Text>
        </List.Item>
      </List>
    </div>
  );
};

export default CartSummary;
