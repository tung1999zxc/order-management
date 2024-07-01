import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Col, Row, Button, Rate, Divider } from "antd";
import {
  UserOutlined,
  ShopOutlined,
  MessageOutlined,
  StarOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

const App = () => {
  const [shopInfo, setShopInfo] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/dataShop.json")
      .then((response) => {
        setShopInfo(response.data.shopInfo);
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <Row gutter={16}>
          <Col span={6}>
            <h1>{shopInfo.name}</h1>
          </Col>
          <Col span={12}>
            <Button type="primary">THEO DÕI</Button>
            <Button type="default">CHAT</Button>
            <div className="shop-info">
              <div>
                <UserOutlined /> {shopInfo.followers} Người Theo Dõi
              </div>
              <div>
                <ShopOutlined /> Sản Phẩm: {shopInfo.productsCount}
              </div>
              <div>
                <MessageOutlined /> Tỉ Lệ Phản Hồi Chat: {shopInfo.responseRate}
                % (Trong Vài Giờ)
              </div>
              <div>
                <ClockCircleOutlined /> Tỉ Lệ Shop Hủy Đơn:{" "}
                {shopInfo.cancellationRate}%
              </div>
              <div>
                <StarOutlined /> Đánh Giá: {shopInfo.rating} (
                {shopInfo.reviewsCount} Đánh Giá)
              </div>
              <div>Tham Gia: {shopInfo.memberSince} Năm Trước</div>
            </div>
          </Col>
        </Row>
      </header>
      <Divider />
      <div className="product-list">
        <Row gutter={[16, 16]}>
          {products.map((product) => (
            <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                
                cover={
                  <img
                    style={{ height: "300px" }}
                    alt={product.name}
                    src={product.image}
                  />
                }
              >
                <Meta title={product.name} />
                <div className="product-price">{product.price} đ</div>
                <Rate disabled defaultValue={product.ratings / 10} />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default App;
