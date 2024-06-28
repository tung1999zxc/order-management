import React, { useState, useEffect } from "react";
import { Image } from "antd";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useParams,
} from "react-router-dom";
import { Tag } from "antd";
import axios from "axios";
import { Steps, Descriptions, Card, Space, Row, Col, Statistic } from "antd";
import { DollarOutlined } from "@ant-design/icons";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "../App.css";
import { Button } from "antd";
import { Typography } from "antd";
import { Table } from "antd";

const { Title } = Typography;

const { Step } = Steps;

const OrderDetail = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    fetchOrders();
    console.log("ID:", id);
    console.log(data.image);
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("/orderDetail.json");
      setData(response.data[id - 1]);
      console.log(data);
    } catch (error) {
      console.error("There was an error fetching the orders!", error);
    }
  };

  const steps = [
    { title: "Đơn hàng đã đặt", description: data.order_time },
    {
      title:
        data.order_status === "Canceled"
          ? "Đơn hàng đã được huỷ"
          : "Đã xác nhận thông tin",
      description: data.information_confirmation_time,
    },
    { title: "Đã giao cho ĐVVC", description: data.delivery_time },
    { title: "Đã nhận được hàng", description: data.receipt_time },
    { title: "Đánh giá", description: "" },
  ];

  const statusToName = {
    Shipped: "Đang lấy hàng",
    Pending: "Đang chờ xác nhận",
    OrderConfirmed: "Đã xác nhận",
    Canceled: "Đã hủy",
    Completed: "Hoàn thành",
    Delivered: "Đơn hàng hoàn thành",
  };
  const getStatusIndex = (status) => {
    switch (status) {
      case "OrderPlaced":
        return 0;
      case "OrderConfirmed":
        return 1;
      case "Canceled":
        return 1;
      case "Shipped":
        return 2;
      case "Delivered":
        return 3;
      case "Reviewed":
        return 4;
      default:
        return 0;
    }
  };
  const dataSource = [
    {
      key: "1",
      name: "Tổng tiền hàng",
      price: `₫${data.total_amount}`,
    },
    {
      key: "2",
      name: "Phí vận chuyển ",
      price: `₫${data.shipping_fee}`,
    },
    {
      key: "2",
      name: "Giảm giá phí vận chuyển",
      price: `-₫${data.discount_shipping_fee}`,
    },
    {
      key: "2",
      name: "Thành tiền",
      price: (
        <strong style={{ color: "red" }}>
          ₫{data.total_order_amount * 0.8}
        </strong>
      ),

      //   render: text => <span className="custom-order-amount">{text}</span>,
    },
    {
      key: "2",
      name: "Phương thức Thanh toán",
      price: data.payment_method,
    },
  ];

  const columns = [
    {
      title: "",
      dataIndex: "name",
      key: "name",
      width: "70%",
      align: "right",
    },
    {
      title: "",
      dataIndex: "price",
      key: "price",
      width: "30%",
      align: "right",
      className: "my-custom-column no-hover",
    },
  ];
  const stepsData = data.ship_time
    ? data.ship_time.map((detail, index) => ({
        title: detail.time,
        description: detail.status,
      }))
    : [];

  return (
    <div className="order-detail">
      <Row>
        <Col>
          <Link to="/" className="nav-link" style={{ fontSize: "30px" }}>
            <ArrowLeftOutlined />
          </Link>
        </Col>
        <Col offset={15}>
          <span style={{ fontSize: "17px" }}>
            Mã đơn hàng: {data.order_code}
          </span>
          <span> | </span>
          <span style={{ fontSize: "17px" }}>
            <strong>
              {statusToName[data.order_status] || "Không xác định"}
            </strong>
          </span>
        </Col>
      </Row>

      <Card title="Order Progress" style={{ marginTop: 24 }}>
        <Steps current={getStatusIndex(data.order_status)}>
          {steps.map((step, index) => (
            <Step
              key={index}
              title={step.title}
              description={step.description}
            />
          ))}
        </Steps>
      </Card>
      <Row>
        <Col md={17}>
          <Title level={5} style={{ marginLeft: "20px", marginTop: "50px" }}>
            Đánh giá sản phẩm trước ngày <u>{data.review_time} </u>để nhận 200
            Shopee xu!
          </Title>
        </Col>
        <Col md={7}>
          <div>
            <Button
              type="primary"
              style={{
                margin: "40px 10px 10px 10px",
                padding: "5px 16px",
                width: "200px",
                // color: "#ee4d2d",
              }}
            >
              Đánh giá
            </Button>
          </div>
          <div>
            <Button
              type=""
              style={{
                margin: "10px ",
                padding: "5px 16px",
                width: "200px",
              }}
            >
              Liên hệ người bán
            </Button>
          </div>
          <div>
            <Button
              type=""
              style={{
                margin: "10px ",
                padding: "5px 16px",
                width: "200px",
              }}
            >
              Mua lại
            </Button>
          </div>
        </Col>
      </Row>
      <br></br>
      <hr></hr>
      <Row>
        <Col md={6}>
          <Title level={3} style={{}}>
            Địa chỉ nhận hàng:
          </Title>
          <Title level={4} style={{}}>
            {data.client_name}
          </Title>
          <Title level={5} style={{ fontSize: "13px" }}>
            {data.phone_number}
          </Title>
          <Title level={5} style={{ fontSize: "13px" }}>
            {data.shipping_address}
          </Title>
        </Col>
        <Col md={18} style={{ padding: "30px" }}>
          <Title level={5} style={{ marginBottom: "20px", color: "#0094ff" }}>
            <strong>
              {data.shipping_unit} - {data.order_code}
            </strong>
          </Title>
          <Title level={4}>Thông tin vận chuyển</Title>
          <Steps
            progressDot
            current={1}
            direction="vertical"
            items={stepsData.map((step) => ({
              ...step,
              title: (
                <span>
                  {step.title} - {step.description}
                </span>
              ),
              description: "",
            }))}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={5} sm={3} md={2} lg={2} xl={1}>
          <Tag color={"red"} style={{ marginTop: "30px" }}>
            Yêu thích{"  "}
          </Tag>
        </Col>
        <Col
          xs={19}
          sm={15}
          md={20}
          lg={8}
          xl={8}
          style={{ marginLeft: "-15px" }}
        >
          <Title level={4}>
            <Link style={{}}>{data.shop_name}</Link>
          </Title>
        </Col>
      </Row>

      <Row>
        <Col xs={7} sm={4} md={2} lg={2} xl={2} xxl={1}>
          <Image width={100} src={data.image} alt="Mô tả ảnh" />
        </Col>

        <Col
          xs={6}
          sm={8}
          md={17}
          lg={6}
          xl={17}
          style={{ marginTop: "-30px", marginLeft: "20px" }}
        >
          <Title level={4}>{data.product_name}</Title>
          <p>Phân loại hàng : {data.category}</p>
          <p>x{data.quantity}</p>
        </Col>
        <Col xs={10} sm={7} md={4} lg={6} xl={4} style={{ textAlign: "right" }}>
          <Title level={5}>
            <span style={{ color: "#999" }}>
              <strike>đ{data.total_order_amount}</strike>
            </span>
            <span style={{ color: "red", fontSize: "20px" }}>
              đ{data.total_order_amount * 0.8}
            </span>
          </Title>
        </Col>
      </Row>

      <Table
        dataSource={dataSource}
        columns={columns}
        bordered
        className="tHoverNo"
        pagination={false}
      />
    </div>
  );
};

export default OrderDetail;
