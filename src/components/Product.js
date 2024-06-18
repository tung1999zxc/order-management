import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Layout,
  Row,
  Col,
  Image,
  Rate,
  Select,
  Button,
  InputNumber,
  Card,
  Divider,
} from "antd";

const { Header, Content, Footer } = Layout;
const { Option } = Select;

const App = () => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get("/product-data.json")
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the product data!", error);
      });
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Layout className="layout">
      <Content style={{ padding: "0 50px" }}>
        <div className="site-layout-content">
          <Row gutter={16}>
            <Col span={12}>
              <Card>
                <Image width={400} src={product.images[0]} />
                <div className="thumbnails">
                  {product.images.slice(1).map((src, index) => (
                    <Image key={index} width={60} src={src} />
                  ))}
                </div>
              </Card>
            </Col>
            <Col span={12}>
              <h1>{product.name}</h1>
              <Rate disabled defaultValue={product.rating} />
              <p>
                ({product.reviews} đánh giá, {product.sold} đã bán)
              </p>
              <h2 className="price">{product.price}</h2>
              <Divider />
              <div className="product-options">
                <div className="option-group">
                  <strong>Màu sắc: </strong>
                  <Select
                    defaultValue={product.colors[0]}
                    style={{ width: 120 }}
                  >
                    {product.colors.map((color, index) => (
                      <Option key={index} value={color}>
                        {color}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="option-group">
                  <strong>Kích cỡ: </strong>
                  <Select
                    defaultValue={product.sizes[0]}
                    style={{ width: 120 }}
                  >
                    {product.sizes.map((size, index) => (
                      <Option key={index} value={size}>
                        {size}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="option-group">
                  <strong>Số lượng: </strong>
                  <InputNumber
                    min={1}
                    max={product.quantity}
                    defaultValue={1}
                  />
                </div>
              </div>
              <div className="action-buttons">
                <Button type="primary" size="large">
                  Thêm vào giỏ hàng
                </Button>
                <Button
                  type="danger"
                  size="large"
                  style={{ marginLeft: "10px" }}
                >
                  Mua ngay
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}></Footer>
    </Layout>
  );
};

export default App;
