import React, { useState } from "react";
import { Input, Button, message } from "antd";
import { FrownFilled } from "@ant-design/icons";

const DiscountCalculator = () => {
  const [inputValue, setInputValue] = useState(""); // State để lưu mã giảm giá nhập vào
  const [discountAmount, setDiscountAmount] = useState(0); // State để lưu số tiền giảm giá được tính toán

  // Hàm xử lý khi người dùng nhập mã giảm giá
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const key = "loading";
  // Hàm xử lý khi người dùng áp dụng mã giảm giá
  const handleApplyDiscount = () => {
    // Giả sử giá trị đơn hàng là 1,000,000 VND (ví dụ)
    const orderAmount = 1000000;

    // Tính số tiền giảm giá
    let discountPercent = 10; // Phần trăm giảm giá
    let maxDiscountAmount = 150000; // Giá trị tối đa giảm giá (150,000 VND)

    // Tính toán số tiền giảm giá dựa trên phần trăm
    let discountValue = orderAmount * (discountPercent / 100);

    // Kiểm tra nếu giá trị giảm giá vượt quá giá trị tối đa
    if (discountValue > maxDiscountAmount) {
      discountValue = maxDiscountAmount;
    }
    

    // Cập nhật state để hiển thị số tiền giảm giá
    setDiscountAmount(discountValue);

    // Hiển thị thông báo thành công
    message.loading({ content: "Đang tải...", key });

    // Đóng message loading
    message.destroy(key);
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
      <div>
        <p>Số tiền giảm giá: {discountAmount} VND</p>
      </div>
    </div>
  );
};

export default DiscountCalculator;
