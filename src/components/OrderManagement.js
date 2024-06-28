// src/components/OrderManagement.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Tabs,
  Table,
  Tag,
  Space,
  Select,
  Button,
  Modal,
  message,
  Input,
  Image,
  DatePicker,
} from "antd";
import { Typography } from "antd";

import axios from "axios";
import EditOrderModal from "./EditOrderModal";
import { Row, Col } from "antd";
import { useNavigate } from "react-router-dom";

import OrderDetail from "./OrderDetail.js";
const { Title } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const { Column } = Table;
const statusToName = {
  Shipped: "Chờ lấy hàng",
  Pending: "Đang chờ xác nhận",
  Canceled: "Đã hủy",
  Completed: "Hoàn thành",
};
const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [data, setData] = useState([]);
  const [newOrder, setNewOrder] = useState({ id: "", name: "", status: null });
  const [editingOrder, setEditingOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchOption, setSearchOption] = useState("all");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("/orders.json");
      setOrders(response.data);
    } catch (error) {
      console.error("There was an error fetching the orders!", error);
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleSelectChange = (value) => {
    setSearchOption(value);
  };
  const handleStartDateChange = (date) => {
    setStartDate(date);
    console.log(startDate);
    console.log(new Date(orders.order_time));
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };
  // const handleAdd = async () => {
  //   try {
  //     const response = await axios.post('/api/orders', newOrder);
  //     setOrders([...orders, response.data]);
  //     setNewOrder({ id: '', name: '', status: '' });
  //   } catch (error) {
  //     console.error('Lỗi khi thêm đơn hàng:', error);
  //   }
  // };
  const handleAddOrder = () => {
    const orderToAdd = {
      id: newOrder.id,
      name: newOrder.name,
      status: newOrder.status,
    };

    setOrders([...orders, orderToAdd]);
    console.log(orderToAdd);
    setNewOrder({ id: "", name: "", status: "null" });
  };

  const handleEdit = (order) => {
    console.log(order);
    setEditingOrder(order);
    setIsModalVisible(true);
  };

  const handleDelete = async (orderId) => {
    try {
      // await axios.delete(`/orders.json/${orderId}`);
      const updatedOrders = orders.filter((o) => o.id !== orderId);
      setOrders(updatedOrders);
      console.log(updatedOrders);
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };
  const handleUpdate = (updatedOrder) => {
    try {
      // const response = await axios.put(`/orders.json/${editingOrder.id}`, editingOrder);
      // const updatedOrder = response.data;
      console.log(updatedOrder);
      const updatedOrders = orders.map((o) =>
        o.id === updatedOrder.id ? updatedOrder : o
      );
      setOrders(updatedOrders);
      setEditingOrder(null);
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error editing order:", error);
    }
  };
  const navigate = useNavigate();
  const handleRowClick = (record) => {
    // Điều hướng đến trang orderDetails khi nhấp vào một hàng
    switch (record.status) {
      case "Shipped":
        navigate("/child/2");
        break;
      case "Pending":
        navigate("/child/1");
        break;
      case "Completed":
        navigate("/child/3");
        break;
      case "Canceled":
        navigate("/child/4");
        break;
      default:
    }
  };

  const renderTable = (filteredOrders) => (
    <div>
      <Table
        dataSource={filteredOrders}
        rowKey="status"
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        responsive={true}
      >
        <Column width="10%" title="Mã đơn hàng" dataIndex="id" key="id" />
        {/* <Column title="Khách hàng" dataIndex="name" key="name" /> */}

        <Column
          title="Đơn hàng"
          key="details"
          render={(record) => (
            <div>
              <Row>
                <Col xs={0} sm={12} md={7} lg={6} xl={3} xxl={4}>
                  <Tag color={"red"} style={{ marginTop: "30px" }}>
                    Yêu thíchh
                  </Tag>
                </Col>
                <Col xs={0} sm={12} md={17} lg={18} xl={21} style={{}}>
                  <Typography.Title level={4}>
                    <Link style={{}}>{record.shop_name}</Link>
                  </Typography.Title>
                </Col>
              </Row>

              <Row>
                <Col
                  xs={24}
                  sm={12}
                  md={9}
                  lg={7}
                  xl={5}
                  xxl={3}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image width={100} src={record.image} alt="Mô tả ảnh" />
                </Col>

                <Col
                  xs={24}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  style={{ marginTop: "-30px" }}
                >
                  <Typography.Title level={4}>
                    {record.product_name}
                  </Typography.Title>
                  <p>Phân loại hàng : {record.category}</p>
                  <p>x{record.quantity}</p>
                </Col>
                {/* <Col span={6} style={{ marginTop: "-23px" }}>
                 
                </Col> */}
              </Row>
            </div>
          )}
        />
        <Column
          title="Tổng tiền hàng"
          dataIndex="total_order_amount"
          key="name"
          render={(total_order_amount) => (
            <Typography.Title level={5} style={{ marginTop: "-6px" }}>
              <span style={{ color: "#999", fontSize: "12px" }}>
                <strike>{total_order_amount}đ</strike>
              </span>
              <span style={{ color: "red", fontSize: "17px" }}>
                {total_order_amount * 0.8}đ
              </span>
            </Typography.Title>
          )}
        />
        <Column
          title="Vận chuyển"
          dataIndex="shipping_unit"
          key="name"
          render={(shipping_unit) => (
            <Title level={5} style={{ marginTop: "-17px", color: "#0094ff" }}>
              <strong>{shipping_unit}</strong>
            </Title>
          )}
        />
        <Column
          title="Trạng thái"
          dataIndex="status"
          key="status"
          render={(status) => (
            <Tag
              color={
                status === "Shipped"
                  ? "warning"
                  : status === "Pending"
                  ? "blue"
                  : status === "Canceled"
                  ? "red"
                  : status === "Completed"
                  ? "green"
                  : "volcano"
              }
            >
              {statusToName[status] || "Không xác định"}
            </Tag>
          )}
        />
        {/* <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space size="middle" onClick={(e) => e.stopPropagation()}>
              <Button type="primary" onClick={() => handleEdit(record)}>
                Edit
              </Button>
              <Button type="danger" onClick={() => handleDelete(record.id)}>
                Delete
              </Button>
            </Space>
          )}
        /> */}
      </Table>
    </div>
  );
  return (
    <div>
      <h1>Đơn mua</h1>

      <Tabs defaultActiveKey="all">
        <TabPane tab="Tất cả" key="all">
          <Row>
            <Col md={5}>
              <Input
                placeholder="Tìm kiếm đơn hàng"
                onChange={handleSearch}
                style={{ marginBottom: "16px" }}
              />
            </Col>
            <Col md={3} style={{ marginLeft: "5px" }}>
              <Select
                defaultValue="all"
                style={{ width: 150 }}
                onChange={handleSelectChange}
              >
                <Option value="all">Tất cả</Option>
                <Option value="order_id">Mã đơn hàng</Option>
                <Option value="product_name">Tên sản phẩm</Option>
                <Option value="shipping_unit">Đơn vị vận chuyển</Option>
              </Select>
            </Col>
            <Col md={2}>
              <DatePicker
                placeholder="Từ ngày"
                onChange={handleStartDateChange}
                style={{ marginBottom: "16px" }}
              />
            </Col>
            <Col md={5}>
              <DatePicker
                placeholder="Đến ngày"
                onChange={handleEndDateChange}
                style={{ marginBottom: "16px" }}
              />
            </Col>
          </Row>

          {renderTable(
            orders.filter((order) => {
              if (searchOption === "all") {
                // Kiểm tra nếu searchText không tồn tại trong bất kỳ trường nào của đơn hàng
                if (
                  searchText &&
                  !(
                    order.name
                      .toLowerCase()
                      .includes(searchText.toLowerCase()) ||
                    order.product_name
                      .toLowerCase()
                      .includes(searchText.toLowerCase()) ||
                    order.id.toString().includes(searchText.toLowerCase()) ||
                    statusToName[order.status]
                      .toLowerCase()
                      .includes(searchText.toLowerCase()) ||
                    order.shipping_unit
                      .toLowerCase()
                      .includes(searchText.toLowerCase())
                  )
                ) {
                  return false;
                }
              } else if (searchOption === "order_id") {
                if (
                  searchText &&
                  !order.id.toString().includes(searchText.toLowerCase())
                ) {
                  return false;
                }
              } else if (searchOption === "product_name") {
                if (
                  searchText &&
                  !order.product_name
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
                ) {
                  return false;
                }
              } else if (searchOption === "shipping_unit") {
                if (
                  searchText &&
                  !order.shipping_unit
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
                ) {
                  return false;
                }
              }

              // Kiểm tra ngày bắt đầu
              if (startDate && new Date(order.order_time) < startDate) {
                return false;
              }

              // Kiểm tra ngày kết thúc
              if (endDate && new Date(order.order_time) > endDate) {
                return false;
              }

              return true; // Đơn hàng thỏa mãn tất cả các điều kiện
            })
          )}
        </TabPane>
        <TabPane tab="Chờ xác nhận" key="Pending">
          {renderTable(orders.filter((order) => order.status === "Pending"))}
        </TabPane>

        <TabPane tab="Chờ giao hàng" key="Shipped">
          {renderTable(orders.filter((order) => order.status === "Shipped"))}
        </TabPane>
        <TabPane tab="Đã giao" key="Completed">
          {renderTable(orders.filter((order) => order.status === "Completed"))}
        </TabPane>
        <TabPane tab="Đã huỷ" key="Canceled">
          {renderTable(orders.filter((order) => order.status === "Canceled"))}
        </TabPane>
        <TabPane tab="Thêm đơn mới">
          <div>
            <Input
              style={{ marginBottom: "16px" }}
              placeholder="Order ID"
              value={newOrder.id}
              onChange={(e) => setNewOrder({ ...newOrder, id: e.target.value })}
            />
            <Input
              style={{ marginBottom: "16px" }}
              placeholder="Customer Name"
              value={newOrder.name}
              onChange={(e) =>
                setNewOrder({ ...newOrder, name: e.target.value })
              }
            />

            <Select
              value={newOrder.status}
              onChange={(value) => setNewOrder({ ...newOrder, status: value })}
              placeholder="Select Status"
              style={{ width: "200px", marginBottom: "16px" }}
              allowClear
            >
              <Option value="Pending">Pending</Option>
              <Option value="Shipped">Shipped</Option>
              <Option value="Completed">Completed</Option>
              <Option value="Canceled">Canceled</Option>
            </Select>
            <br></br>
            <Button type="primary" onClick={handleAddOrder}>
              Add Order
            </Button>
          </div>
        </TabPane>
      </Tabs>

      <EditOrderModal
        visible={isModalVisible}
        order={editingOrder}
        onUpdate={handleUpdate}
        onCancel={() => setIsModalVisible(false)}
      />
    </div>
  );
};

export default OrderManagement;
