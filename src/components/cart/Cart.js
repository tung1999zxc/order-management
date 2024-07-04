import React, { useState } from "react";
import { Typography, Row, Col, Divider } from "antd";
import CartTable from "./CartTable";
import CartSummary from "./CartSummary";
import ShippingMethod from "./ShippingMethod";
import CouponSelector from "./CouponSelector";
import CartActions from "./CartActions";

const { Title } = Typography;

const Cart = () => {
  const [cartData, setCartData] = useState([
    {
      key: "1",
      name: "Sản phẩm A",
      image: "link_to_image_A.jpg",
      color: ["Xanh", "Đỏ", "Trắng"],
      size: ["S", "M", "L"],
      slColor: "Xanh",
      slSize: "M",
      price: 500000,
      quantity: 1,
    },
    {
      key: "2",
      name: "Sản phẩm B",
      image: "link_to_image_B.jpg",
      color: ["Đen", "Vàng"],
      size: ["M", "L", "XL"],
      slColor: "Đen",
      slSize: "L",
      price: 750000,
      quantity: 2,
    },
  ]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedColor, setSelectedColor] = useState({});
  const [selectedSize, setSelectedSize] = useState({});
  const [visiblePopover, setVisiblePopover] = useState({});
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [shippingMethod, setShippingMethod] = useState(null);

  // Các phương thức vận chuyển mẫu
  const shippingMethods = [
    { id: "1", name: "Giao hàng nhanh", price: 30000 },
    { id: "2", name: "Giao hàng thường", price: 15000 },
  ];

  // Các mã giảm giá mẫu
  const discountData = [
    {
      id: "1",
      description: "Giảm 10% cho đơn hàng trên 1 triệu",
      expiryDate: "30/07/2024",
    },
    {
      id: "2",
      description: "Giảm 50k cho đơn hàng trên 500k",
      expiryDate: "30/08/2024",
    },
  ];

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Thành tiền",
      dataIndex: "total",
      key: "total",
    },
  ];

  // Xử lý khi thay đổi số lượng
  const handleQuantityChange = (key, newQuantity) => {
    setCartData((prevData) =>
      prevData.map((item) =>
        item.key === key ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Xử lý khi chọn màu sắc
  const handleColorSelect = (item, color) => {
    setSelectedColor((prevColors) => ({
      ...prevColors,
      [item.key]: color,
    }));
  };

  // Xử lý khi chọn kích cỡ
  const handleSizeSelect = (item, size) => {
    setSelectedSize((prevSizes) => ({
      ...prevSizes,
      [item.key]: size,
    }));
  };

  // Xử lý khi hiển thị hoặc ẩn popover
  const handlePopoverVisibleChange = (item, visible) => {
    setVisiblePopover((prevPopover) => ({
      ...prevPopover,
      [item.key]: visible,
    }));
  };

  // Xử lý khi chọn tất cả hoặc bỏ chọn tất cả
  const handleSelectAllChange = (e) => {
    if (e.target.checked) {
      setSelectedRowKeys(cartData.map((item) => item.key));
    } else {
      setSelectedRowKeys([]);
    }
  };

  // Xử lý khi chọn mã giảm giá
  const handleSelectCoupon = (coupon) => {
    setSelectedCoupon(coupon.id);
  };

  // Xử lý khi chọn phương thức vận chuyển
  const handleShippingChange = (value) => {
    setShippingMethod(value);
  };

  // Xử lý khi xoá sản phẩm
  const handleDelete = (key) => {
    setCartData((prevData) => prevData.filter((item) => item.key !== key));
  };

  // Xử lý khi xoá tất cả sản phẩm
  const handleDeleteAll = () => {
    setCartData([]);
    setSelectedRowKeys([]);
  };

  // Tính tổng giá trị của giỏ hàng
  const total = cartData.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Tính tổng thanh toán sau khi áp dụng giảm giá và phí vận chuyển
  const discountAmount = selectedCoupon
    ? selectedCoupon === "1"
      ? 10
      : 50000
    : 0; // Giả định giá trị giảm giá mẫu
  const discountValue =
    selectedCoupon === "1" ? (total * discountAmount) / 100 : discountAmount;
  const shippingPrice = shippingMethod
    ? shippingMethods.find((method) => method.id === shippingMethod).price
    : 0;
  const grandTotal = total - discountValue + shippingPrice;

  return (
    <div>
      <Title level={2}>Giỏ hàng của bạn</Title>
      <Divider />
      <CartActions
        onSelectAll={handleSelectAllChange}
        onDeleteAll={handleDeleteAll}
        isAllSelected={selectedRowKeys.length === cartData.length}
        onUpdate={() => console.log("Cập nhật giỏ hàng")}
      />
      <CartTable
        cartData={cartData}
        columns={columns}
        onRowSelectionChange={(keys) => setSelectedRowKeys(keys)}
        visiblePopover={visiblePopover}
        handlePopoverVisibleChange={handlePopoverVisibleChange}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
        onQuantityChange={handleQuantityChange}
        onDelete={handleDelete}
        onColorSelect={handleColorSelect}
        onSizeSelect={handleSizeSelect}
      />
      <Divider />
      <Row gutter={16}>
        <Col span={12}>
          <ShippingMethod
            shippingMethods={shippingMethods}
            onShippingChange={handleShippingChange}
          />
        </Col>
        <Col span={12}>
          <CouponSelector
            discountData={discountData}
            onSelectCoupon={handleSelectCoupon}
          />
        </Col>
      </Row>
      <Divider />
      <CartSummary
        total={total}
        discountValue={discountValue}
        shippingPrice={shippingPrice}
        grandTotal={grandTotal}
      />
    </div>
  );
};

export default Cart;
