// CartActions.js
import React from "react";
import { Button, Checkbox, Row, Col } from "antd";

const CartActions = ({ onSelectAll, onDeleteAll, isAllSelected, onUpdate }) => {
  return (
    <Row justify="space-between" align="middle">
      <Col>
        <Checkbox checked={isAllSelected} onChange={onSelectAll}>
          Chọn tất cả
        </Checkbox>
      </Col>
      <Col>
        <Button type="link" onClick={onDeleteAll}>
          Xoá tất cả
        </Button>
        <Button type="primary" onClick={onUpdate}>
          Cập nhật giỏ hàng
        </Button>
      </Col>
    </Row>
  );
};

export default CartActions;
