// CouponSelector.js
import React from "react";
import { Select } from "antd";

const { Option } = Select;

const CouponSelector = ({ discountData, onSelectCoupon }) => {
  return (
    <div>
      <h3>Chọn mã giảm giá</h3>
      <Select
        style={{ width: "100%" }}
        placeholder="Chọn mã giảm giá"
        onChange={(value) => onSelectCoupon({ id: value })}
      >
        {discountData.map((coupon) => (
          <Option key={coupon.id} value={coupon.id}>
            {coupon.description} (HSD: {coupon.expiryDate})
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default CouponSelector;
