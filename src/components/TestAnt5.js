import React, { useState } from "react";
import { Input, Button, message } from "antd";

const DiscountCalculator = () => {
  const [inputValue, setInputValue] = useState(""); // State để lưu mã giảm giá nhập vào
  const [discountAmount, setDiscountAmount] = useState(0); // State để lưu số tiền giảm giá được tính toán
  const [orderAmount, setOrderAmount] = useState(0); // State để lưu giá trị đơn hàng

  // Hàm xử lý khi người dùng nhập mã giảm giá
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Hàm xử lý khi người dùng áp dụng mã giảm giá
  const handleApplyDiscount = () => {
    // Kiểm tra nếu không có giá trị đơn hàng, không thực hiện tính toán
    if (orderAmount === 0) {
      message.error(
        "Vui lòng nhập giá trị đơn hàng trước khi áp dụng mã giảm giá!"
      );
      return;
    }

    // Tính toán số tiền giảm giá
    let discountPercent = 10; // Phần trăm giảm giá
    let maxDiscountAmount = 150000; // Giá trị tối đa giảm giá (150,000 VND)

    let discountValue = orderAmount * (discountPercent / 100);

    if (discountValue > maxDiscountAmount) {
      discountValue = maxDiscountAmount;
    }

    // Cập nhật state để hiển thị số tiền giảm giá
    setDiscountAmount(discountValue);

    // Hiển thị thông báo thành công
    message.success(
      `Đã áp dụng mã giảm giá thành công! Số tiền giảm giá: ${discountValue} VND`
    );
  };

  return (
    <div>
      <Input
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Nhập mã giảm giá"
      />
      <Button type="primary" onClick={handleApplyDiscount}>
        Áp dụng
      </Button>
      <div style={{ marginTop: "10px" }}>
        <Input
          type="number"
          value={orderAmount}
          onChange={(e) => setOrderAmount(parseInt(e.target.value) || 0)}
          placeholder="Nhập giá trị đơn hàng"
        />
      </div>
      <div>
        <p style={{ marginTop: "10px" }}>
          Số tiền giảm giá: {discountAmount} VND
        </p>
      </div>
    </div>
  );
};

export default DiscountCalculator;
