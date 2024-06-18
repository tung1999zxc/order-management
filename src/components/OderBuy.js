import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Layout,
  Card,
  List,
  Avatar,
  Typography,
  Input,
  Select,
  Button,
} from "antd";

const { Header, Content, Footer } = Layout;
const { TextArea } = Input;
const { Option } = Select;

const App = () => {
  const [data, setData] = useState(null);
  const [note, setNote] = useState("");
  const [shippingMethod, setShippingMethod] = useState("Nhanh");

  useEffect(() => {
    axios
      .get(`${process.env.PUBLIC_URL}/data.json`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handleShippingChange = (value) => {
    setShippingMethod(value);
  };

  return (
    <Layout className="layout">
      <Content style={{ padding: "0 50px" }}>
        <div className="site-layout-content">
          <Card title="Địa Chỉ Nhận Hàng">
            <Typography.Paragraph>
              {data.address.name} ({data.address.phone})
            </Typography.Paragraph>
            <Typography.Paragraph>{data.address.address}</Typography.Paragraph>
          </Card>
          <Card title="Sản phẩm">
            <List
              itemLayout="horizontal"
              dataSource={data.products}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.image} />}
                    title={item.name}
                    description={`Loại: ${item.type}`}
                  />
                  <div>
                    {item.price.toLocaleString()}đ x {item.quantity}
                  </div>
                </List.Item>
              )}
            />
          </Card>
          <Card title="Đơn vị vận chuyển">
            <Select
              defaultValue={shippingMethod}
              onChange={handleShippingChange}
              style={{ width: "100%" }}
            >
              <Option value="Nhanh">Nhanh</Option>
              <Option value="Chậm">Chậm</Option>
            </Select>
            <Typography.Paragraph>
              Đảm bảo nhận hàng vào {data.shipping.arrival}
            </Typography.Paragraph>
            <Typography.Paragraph>
              Phí vận chuyển: {data.shipping.cost.toLocaleString()}đ
            </Typography.Paragraph>
          </Card>
          <Card title="Lời nhắn">
            <TextArea
              rows={4}
              value={note}
              onChange={handleNoteChange}
              placeholder="Lưu ý cho Người bán"
            />
          </Card>
          <Card title="Tổng số tiền">
            <Typography.Paragraph>
              Tổng số tiền (2 sản phẩm): {data.total.toLocaleString()}đ
            </Typography.Paragraph>
            <Button type="primary">Đặt hàng</Button>
          </Card>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Shopee Clone ©2024 Created by Your Name
      </Footer>
    </Layout>
  );
};

export default App;
