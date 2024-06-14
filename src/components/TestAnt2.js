import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import React from 'react';

function CartIcon() {
    return (
        <Badge count={4}> {/* Số lượng sản phẩm trong giỏ hàng */}
            <ShoppingCartOutlined style={{ fontSize: '24px', color: '#08c' }} />
        </Badge>
    );
}

export default CartIcon;
