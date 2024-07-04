// CartItem.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Popover,
  Button,
  Space,
  InputNumber,
  Image,
  Row,
  Col,
  Tag,
  Typography,
} from "antd";

const { Title } = Typography;

const CartItem = ({
  item,
  onQuantityChange,
  onDelete,
  onColorSelect,
  onSizeSelect,
  visiblePopover,
  handlePopoverVisibleChange,
  selectedColor,
  selectedSize,
}) => {
  const colors = ["Xanh", "Trắng", "Đen", "Vàng"];
  const sizes = ["38", "39", "40", "41", "42", "43"];

  return (
    <div>
      <Row>
        <Col xs={24} sm={12} md={7} lg={6} xl={4} xxl={3}>
          <Image width={100} src={item.image} alt="Mô tả ảnh" />
        </Col>
        <Col xs={24} sm={12} md={17} lg={18} xl={18}>
          <Link to="/product">
            <Title className="hand-cursor" level={4}>
              {item.name}
            </Title>
          </Link>
          <Tag color={"red"}>Đổi ý miễn phí 15 ngày</Tag>
          <img style={{ width: "80px" }} src="dongkiem2.jpg" />
        </Col>
      </Row>

      <Popover
        placement="bottom"
        content={
          <div>
            <Title level={4}>Màu sắc :</Title>
            {item.color.map((color, index) => (
              <span key={index}>
                <Button
                  type={
                    selectedColor[item.key] === color ||
                    (!selectedColor[item.key] && item.slColor === color)
                      ? "primary"
                      : "default"
                  }
                  onClick={() => onColorSelect(item, color)}
                >
                  {color}
                </Button>
              </span>
            ))}
            <Title level={4}>Size :</Title>
            {item.size.map((size, index) => (
              <span key={index}>
                <Button
                  type={
                    selectedSize[item.key] === size ||
                    (!selectedSize[item.key] && item.slSize === size)
                      ? "primary"
                      : "default"
                  }
                  onClick={() => onSizeSelect(item, size)}
                >
                  {size}
                </Button>
              </span>
            ))}
          </div>
        }
        trigger="click"
        visible={visiblePopover[item.key]}
        onVisibleChange={(visible) => handlePopoverVisibleChange(item, visible)}
      >
        <Button
          type="default"
          style={{ borderColor: "#52c41a", color: "#000" }}
        >
          Phân loại hàng
        </Button>
        <span style={{ marginLeft: 10 }} className="hand-cursor">
          {selectedColor[item.key] ? selectedColor[item.key] : item.slColor},{" "}
          {selectedSize[item.key] ? selectedSize[item.key] : item.slSize}
        </span>
      </Popover>

      <Space size="middle">
        <Button
          size="small"
          onClick={() => onQuantityChange(item.key, item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          -
        </Button>
        <InputNumber
          style={{ width: "60px" }}
          min={1}
          value={item.quantity}
          onChange={(value) => onQuantityChange(item.key, value)}
        />
        <Button
          size="small"
          onClick={() => onQuantityChange(item.key, item.quantity + 1)}
        >
          +
        </Button>
      </Space>

      <div>
        <span>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(item.price)}
        </span>
        <span style={{ color: "red" }}>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(item.price * item.quantity)}
        </span>
        <Button type="link" onClick={() => onDelete(item.key)}>
          Xoá
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
