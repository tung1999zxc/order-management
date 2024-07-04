// CartTable.js
import React from "react";
import { Table, Checkbox } from "antd";
import CartItem from "./CartItem";

const CartTable = ({
  cartData,
  columns,
  onRowSelectionChange,
  visiblePopover,
  handlePopoverVisibleChange,
  selectedColor,
  selectedSize,
  onQuantityChange,
  onDelete,
  onColorSelect,
  onSizeSelect,
}) => {
  // Tạo dữ liệu cho table từ các sản phẩm trong giỏ hàng
  const dataSource = cartData.map((item, index) => ({
    key: item.key,
    product: (
      <CartItem
        key={item.key}
        item={item}
        onQuantityChange={onQuantityChange}
        onDelete={onDelete}
        onColorSelect={onColorSelect}
        onSizeSelect={onSizeSelect}
        visiblePopover={visiblePopover}
        handlePopoverVisibleChange={handlePopoverVisibleChange}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
      />
    ),
    price: new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(item.price),
    quantity: item.quantity,
    total: new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(item.price * item.quantity),
  }));

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowSelection={{
        type: "checkbox",
        onChange: onRowSelectionChange,
      }}
      pagination={false}
      bordered
    />
  );
};

export default CartTable;
