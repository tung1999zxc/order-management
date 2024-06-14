import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@ant-design/icons";

import {
  Card,
  Popover,
  Tooltip,
  Modal,
  Form,
  Select,
  Input,
  Table,
  Space,
  Row,
  Col,
  Typography,
  Button,
  InputNumber,
  Checkbox,
  Tag,
  Image,
} from "antd";
import axios from "axios";
const { Title } = Typography;
const { Option } = Select;
const Cart = () => {
  // Giả định dữ liệu giỏ hàng
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    fetchOrders();
    console.log(uniqueStores);
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("/orders.json");
      setCartData(response.data[0].cartData);
    } catch (error) {
      console.error("There was an error fetching the orders!", error);
    }
  };
  const shippingMethods = [
    { id: "ship001", name: "Giao hàng nhanh", price: 50000 },
    { id: "ship002", name: "Giao hàng tiêu chuẩn", price: 30000 },
  ];
  const [searchText, setSearchText] = useState("");
  const [selectedSize, setSelectedSize] = useState(cartData.slSize);
  const [selectedColor, setSelectedColor] = useState(cartData.slColor);
  const discountCode = "SUMMER10";
  const discountAmount = 85000;
  const [total, setTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  // Hàm cập nhật số lượng sản phẩm
  const handleQuantityChange = (key, newQuantity) => {
    const updatedCart = cartData.map((item) => {
      if (item.key === key) {
        const updatedItem = { ...item, quantity: newQuantity };
        updatedItem.subtotal = updatedItem.quantity * updatedItem.price;
        return updatedItem;
      }
      return item;
    });
    setCartData(updatedCart);
    updateTotals(updatedCart);
  };
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };
  // Hàm cập nhật tổng tiền và tổng thanh toán
  const updateTotals = (updatedCart) => {
    // Lọc ra các sản phẩm đã được chọn
    const selectedItems = updatedCart.filter((item) => item.checked);

    // Tính tổng tiền cho các sản phẩm đã được chọn
    const newTotal = selectedItems.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.subtotal;
    }, 0);

    // Cập nhật tổng tiền
    setTotal(newTotal);

    let shippingCost = 0;
    // Giả sử vận chuyển là giao hàng tiêu chuẩn
    if (shippingMethods.length > 0) {
      shippingCost = shippingMethods[1].price; // Chọn phương thức giao hàng tiêu chuẩn
    }

    const newGrandTotal = newTotal + shippingCost - discountAmount;
    setGrandTotal(newGrandTotal);
    if (selectedItems.length === 0) {
      setGrandTotal(0);
    }
  };

  // Xử lý chọn hoặc bỏ chọn sản phẩm
  // const handleCheckboxChange = (key) => {
  //   const updatedCart = cartData.map((item) => {
  //     if (item.key === key) {
  //       return { ...item, checked: !item.checked };
  //     }
  //     return item;
  //   });
  //   setCartData(updatedCart);
  //   // const allChecked = updatedCart.every((item) => item.checked);
  //   // setSelectAllChecked(allChecked);

  //   // Tính tổng tiền chỉ khi có thay đổi trong trạng thái của checkbox của sản phẩm
  //   updateTotals(updatedCart);
  // };
  // Xử lý chọn hoặc bỏ chọn tất cả sản phẩm
  const handleSelectAllChange = (e) => {
    const checked = e.target.checked;
    const updatedCart = cartData.map((item) => ({ ...item, checked }));
    setCartData(updatedCart);
    setSelectAllChecked(checked);
    updateTotals(updatedCart);
  };

  // Xử lý xoá sản phẩm
  const handleDelete = (key) => {
    const updatedCart = cartData.filter((item) => item.key !== key);
    setCartData(updatedCart);
    const allChecked = updatedCart.every((item) => item.checked);
    setSelectAllChecked(allChecked);
    updateTotals(updatedCart);
  };
  const colors = ["Xanh", "Trắng", "Đen", "Vàng"];
  const sizes = ["38", "39", "40", "41", "42", "43"];
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };
  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };
  const content = (
    <div>
      <Title level={4}>Màu sắc : </Title>
      {colors.map((color, index) => (
        <span key={index}>
          <Button
            type={selectedColor === color ? "primary" : "default"}
            onClick={() => handleColorSelect(color)}
          >
            {color}
          </Button>
        </span>
      ))}
      <Title level={4}>Size</Title>
      {sizes.map((size, index) => (
        <span key={index}>
          <Button
            type={selectedSize === size ? "primary" : "default"}
            onClick={() => handleSizeSelect(size)}
          >
            {size}
          </Button>
        </span>
      ))}
    </div>
  );
  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div>
          <Row>
            <Col
              xs={0}
              sm={12}
              md={7}
              lg={6}
              xl={4}
              style={{ marginTop: "30px", marginRight: "10px" }}
            >
              <Tag color={"red"}>Yêu thích</Tag>
            </Col>
            <Col xs={0} sm={12} md={17} lg={18} xl={18} style={{}}>
              <Link>
                {" "}
                <Typography.Title level={4}>{record.name}</Typography.Title>
              </Link>
            </Col>
          </Row>

          <Row>
            <Col
              xs={24}
              sm={12}
              md={9}
              lg={7}
              xl={5}
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
              {/* <Typography.Title level={4}>
                {record.product_name}
              </Typography.Title>
              <p>Phân loại hàng : {record.category}</p>
              <p>x{record.quantity}</p> */}
            </Col>
          </Row>
        </div>
      ),
    },
    {
      title: "Phân loại hàng",
      dataIndex: "color",
      key: "color",
      render: (text, record) => (
        <Popover
          content={content}
          placement="bottom"
          title="Tiêu đề của Popover"
          trigger="click"
        >
          <h3>Phân loại hàng :</h3>

          <span>{record.slColor}, </span>
          <span>{record.slSize}</span>
        </Popover>
      ),
    },

    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => (
        <Space size="middle">
          <Button
            size="small"
            onClick={() =>
              handleQuantityChange(record.key, record.quantity - 1)
            }
            disabled={record.quantity <= 1}
          >
            -
          </Button>
          <InputNumber
            style={{ width: "60px" }}
            min={1}
            value={record.quantity}
            onChange={(value) => handleQuantityChange(record.key, value)}
          />
          <Button
            size="small"
            onClick={() =>
              handleQuantityChange(record.key, record.quantity + 1)
            }
          >
            +
          </Button>
        </Space>
      ),
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      render: (text, record) => (
        <Space size="small">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(text)}
        </Space>
      ),
    },
    {
      title: "Thành tiền",
      dataIndex: "subtotal",
      key: "subtotal",
      render: (text, record) => (
        <Space size="small">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(text)}
        </Space>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          {/* <Checkbox
            checked={record.checked}
            onChange={() => handleCheckboxChange(record.key)}
          /> */}
          <Button type="link" onClick={() => handleDelete(record.key)}>
            Xoá
          </Button>
        </Space>
      ),
    },
  ];
  const uniqueStores = [...new Set(cartData.map((item) => item.store))];
  // Xử lý sự kiện khi thay đổi lựa chọn các hàng
  const handleRowSelectionChange = (selectedRowKeys, selectedRows, store) => {
    const updatedCart = cartData.map((item) => {
      // Kiểm tra xem sản phẩm có thuộc cửa hàng cần xử lý không
      if (item.store === store) {
        // Nếu sản phẩm được chọn, cập nhật trạng thái checked là true
        if (selectedRowKeys.includes(item.key)) {
          return { ...item, checked: true };
        }
        // Nếu sản phẩm không được chọn, cập nhật trạng thái checked là false
        return { ...item, checked: false };
      }
      // Không thay đổi trạng thái checked cho các sản phẩm không thuộc cửa hàng cần xử lý
      return item;
    });

    // Cập nhật lại danh sách sản phẩm
    setCartData(updatedCart);

    // Kiểm tra xem tất cả các sản phẩm thuộc cùng cửa hàng đã được chọn hay không
    const allChecked = updatedCart
      .filter((item) => item.store === store)
      .every((item) => item.checked);
    // setSelectAllChecked(allChecked);

    // Cập nhật tổng tiền
    updateTotals(updatedCart);
  };
  const countSelectedProducts = (cartData) => {
    const SelectedProducts = cartData.filter(
      (product) => (product.checked = true)
    );
  };
  return (
    <div style={{ padding: "20px" }}>
      <Row justify="center">
        <Col span={20}>
          <Row gutter={16}>
            <Col span={17}>
              {/* <Input
                placeholder="Tìm kiếm đơn hàng"
                onChange={handleSearch}
                style={{ marginBottom: "16px" }}
              /> */}
            </Col>
            <Col
              span={6}
              style={{ marginLeft: "20px", fontSize: "25px", color: "#0094ff" }}
            >
              <span>
                <Link to="/">
                  <strong>Shopee</strong>
                </Link>
              </span>
              <span> | Giỏ hàng </span>
            </Col>
          </Row>

          {uniqueStores.map((store) => (
            <div key={store}>
              <Link>
                {" "}
                <h2 class="">
                  <strong>{store}</strong>
                </h2>
              </Link>
              {cartData.length > 0 && (
                <>
                  <Table
                    columns={columns}
                    dataSource={cartData.filter((item) => item.store === store)}
                    pagination={false}
                    checked={cartData.checked && cartData.checked}
                    rowSelection={{
                      type: "checkbox",
                      onChange: (selectedRowKeys, selectedRows) =>
                        handleRowSelectionChange(
                          selectedRowKeys,
                          selectedRows,
                          store
                        ),
                      selectedRowKeys: cartData
                        .filter((item) => item.checked)
                        .map((item) => item.key),
                    }}
                  />
                  <Title level={4} style={{ marginBottom: "50px" }}>
                    Giảm ₫300.000 phí vận chuyển đơn tối thiểu ₫0
                    <Tooltip title="Nhấn vào mục Mã giảm giá ở cuối trang để hưởng miễn phí vận chuyển bạn nhé!">
                      <Link> Tìm hiểu thêm</Link>
                    </Tooltip>
                  </Title>
                </>
              )}
            </div>
          ))}
        </Col>
      </Row>
      <div
        style={{
          position: "fixed",
          bottom: "0",
          left: "50%",
          transform: "translateX(-50%)",
          height: "150px",
          width: "80%",
          backgroundColor: "#ffffff",
        }}
      >
        <Row style={{ marginTop: "10px" }}>
          <Col
            xl={12}
            style={{
              fontSize: "20px",
              marginTop: "100px",
            }}
          >
            <Checkbox
              style={{
                fontSize: "20px",
                marginRight: "20px",
              }}
              checked={selectAllChecked}
              onChange={handleSelectAllChange}
            >
              Chọn tất cả ({cartData.length})
            </Checkbox>
            <span style={{ marginRight: "20px" }}>Xoá</span>
            <span>Lưu vào mục đã thích</span>
          </Col>
          <Col xl={12}>
            <Row>
              <Col
                style={{
                  fontSize: "20px",
                }}
                span={16}
              >
                Shopee Voucher
              </Col>
              <Col
                style={{
                  fontSize: "18px",
                }}
                span={6}
              >
                <Link>Chọn hoặc nhập mã</Link>
              </Col>
            </Row>
            <Row
              justify={"space-around"}
              style={{
                marginTop: "5px",
                fontSize: "20px",
              }}
            >
              <Col xl={5}>
                <Checkbox>Shopee Xu</Checkbox>
              </Col>
              {/* <Col xl={4}>Shopee Xu</Col> */}
              <Col xl={19}>Bạn chưa có Shopee Xu</Col>
            </Row>
            <Row>
              <Col xl={15}>
                <Title level={4}>
                  Tổng thanh toán (
                  {
                    cartData.filter((product) => product.checked === true)
                      .length
                  }
                  sản phẩm ) :
                  <span style={{ color: "red", marginLeft: "5px" }}>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(total)}
                  </span>
                </Title>
              </Col>
              <Col xl={9}>
                <Button
                  style={{ width: " 250px", height: "40px", fontSize: "20px" }}
                  type="primary"
                >
                  Mua hàng
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>

      {/* {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(total)}
           
              Phương thức vận chuyển
            
              <Space size="small">
                {shippingMethods.map((method) => (
                  <div key={method.id}>
                    {method.name}:{" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(method.price)}
                  </div>
                ))}
              </Space>
            
          {discountCode && (
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}>
                Mã giảm giá ({discountCode})
              </Table.Summary.Cell>
              <Table.Summary.Cell colSpan={2}></Table.Summary.Cell>
              <Table.Summary.Cell>
                <Space size="small">
                  -{" "}
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(discountAmount)}
                </Space>
              
          )}
          Tổng thanh toán
            
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(grandTotal)}
           
        </>
      )} */}
    </div>
  );
};

export default Cart;
