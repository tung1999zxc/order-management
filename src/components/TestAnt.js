import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@ant-design/icons";
import { CheckCircleOutlined } from "@ant-design/icons";
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
    updateTotals(cartData, discountAmount);
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
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const [visibleModal, setVisibleModal] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [visiblePopover, setVisiblePopover] = useState({});
  const [selectedSize, setSelectedSize] = useState({});
  const [selectedColor, setSelectedColor] = useState({});

  const discountCode = "SUMMER10";

  const [total, setTotal] = useState(0);
  const [totalCheck, settotalCheck] = useState(0);

  const [grandTotal, setGrandTotal] = useState(0);
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const discountData = [
    {
      id: 1,
      type: "percent",
      discount: 10,
      description: "Giảm 10% tối đa ₫150k",
      expiryDate: "Đã dùng 61%, HSD: 24.06.2024",
    },
    {
      id: 2,
      type: "percent",
      discount: 20,
      description: "Giảm 20% tối đa ₫200k",
      expiryDate: "Đã dùng 99%, Sắp hết hạn: Còn 7 giờ",
    },
    {
      id: 3,
      type: "percent",
      discount: 15,
      description: "Giảm 15% Giảm tối đa ₫100k",
      expiryDate: "Sắp hết hạn: Còn 7 giờ",
    },
  ];
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

  const handleSelectCoupon = (coupon) => {
    if (selectedCoupon === coupon.id) {
      // Nếu mã giảm giá đang chọn được bấm lại, bỏ chọn nó
      setSelectedCoupon(null);
      setDiscountAmount(0);
      updateTotals(cartData, 0); // Cập nhật lại tổng tiền với giảm giá = 0
    } else {
      // Chọn mã giảm giá mới
      setSelectedCoupon(coupon.id);
      setDiscountAmount(coupon.discount);
      updateTotals(cartData, coupon.discount); // Cập nhật lại tổng tiền với giảm giá mới
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const updateTotals = (updatedCart, discountValue = 0) => {
    // Lọc ra các sản phẩm đã được chọn
    const selectedItems = updatedCart.filter((item) => item.checked);

    // Tính tổng tiền cho các sản phẩm đã được chọn
    const newTotal = selectedItems.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.subtotal;
    }, 0);
    settotalCheck(newTotal);

    // Cập nhật tổng tiền
    setTotal(newTotal);

    // Tính toán giá trị giảm giá (nếu có)
    // let appliedDiscount = 0;
    // if (selectedCoupon) {
    //   const coupon = discountData.find((c) => c.id === selectedCoupon);
    //   if (coupon && coupon.type === "percent") {
    //     appliedDiscount = (coupon.discount / 100) * newTotal;
    //   } else if (coupon && coupon.type === "fixed") {
    //     appliedDiscount = coupon.discount;
    //   }
    // }

    // Nếu hàm được truyền `discountValue`, sử dụng nó thay vì `appliedDiscount`
    // const discountToApply = (discountValue / 100) * newTotal || appliedDiscount;
    const discountToApply = (discountValue / 100) * newTotal;
    // Giả sử vận chuyển là giao hàng tiêu chuẩn
    let shippingCost = shippingMethods[1].price;

    // Tính tổng tiền cuối cùng
    const newGrandTotal = newTotal - discountToApply;
    setGrandTotal(newGrandTotal > 0 ? newGrandTotal : 0);
  };

  // const updateTotals = (updatedCart, discount = 0) => {
  //   // Tính tổng tiền của các sản phẩm đã chọn
  //   const selectedItems = updatedCart.filter((item) => item.checked);
  //   const newSubtotal = selectedItems.reduce((accumulator, currentValue) => {
  //     return accumulator + currentValue.subtotal;
  //   }, 0);

  //   setTotal(newSubtotal);

  //   // Tính giá trị giảm giá
  //   let discountValue = 0;
  //   if (selectedCoupon) {
  //     // Nếu mã giảm giá là phần trăm, tính phần trăm giảm giá
  //     discountValue = (discount / 100) * newSubtotal;
  //   }

  //   // Tính phí vận chuyển
  //   let shippingCost = 0;
  //   if (shippingMethods.length > 0) {
  //     shippingCost = shippingMethods[1].price; // Phí giao hàng tiêu chuẩn
  //   }

  //   // Tính tổng tiền cuối cùng
  //   const newGrandTotal = newSubtotal - discountValue;
  //   setGrandTotal(newGrandTotal > 0 ? newGrandTotal : 0);
  // };

  // Hàm cập nhật tổng tiền và tổng thanh toán
  // const updateTotals = (updatedCart) => {
  //   // Lọc ra các sản phẩm đã được chọn
  //   const selectedItems = updatedCart.filter((item) => item.checked);

  //   // Tính tổng tiền cho các sản phẩm đã được chọn
  //   const newTotal = selectedItems.reduce((accumulator, currentValue) => {
  //     return accumulator + currentValue.subtotal;
  //   }, 0);
  //   settotalCheck(newTotal);
  //   // Cập nhật tổng tiền
  //   setTotal(newTotal);
  //   // Tính toán giảm giá
  //   let discountValue = 0;
  //   if (selectedCoupon) {
  //     const coupon = discountData.find(
  //       (coupon) => coupon.id === selectedCoupon
  //     );
  //     if (coupon && coupon.type === "percent") {
  //       discountValue = (coupon.discountAmount / 100) * newTotal;
  //     } else if (coupon && coupon.type === "fixed") {
  //       discountValue = coupon.discountAmount;
  //     }
  //   }
  //   let shippingCost = 0;
  //   // Giả sử vận chuyển là giao hàng tiêu chuẩn
  //   if (shippingMethods.length > 0) {
  //     shippingCost = shippingMethods[1].price; // Chọn phương thức giao hàng tiêu chuẩn
  //   }

  //   const newGrandTotal = newTotal - discountValue;
  //   setGrandTotal(newGrandTotal > 0 ? newGrandTotal : 0);
  //   // if (selectedItems.length === 0) {
  //   //   setGrandTotal(0);
  //   // }
  // };

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
  const handleDeleteALL = (key) => {
    // const updatedCart = cartData.filter((item) => item.key !== key);
    if (selectAllChecked) {
      setCartData([]);
    }
    // const allChecked = updatedCart.every((item) => item.checked);
    // setSelectAllChecked(allChecked);
    // updateTotals(updatedCart);
  };
  const colors = ["Xanh", "Trắng", "Đen", "Vàng"];
  const sizes = ["38", "39", "40", "41", "42", "43"];
  // const handleSizeSelect = (size) => {
  //   setSelectedSize(size);
  // };

  const handlePopoverVisibleChange = (record, visible) => {
    setVisiblePopover((prevState) => ({
      ...prevState,
      [record.key]: visible,
    }));
  };

  // Hàm để xử lý khi chọn màu sắc của sản phẩm
  const handleColorSelect = (record, color) => {
    setSelectedColor((prevState) => ({
      ...prevState,
      [record.key]: color,
    }));
  };

  // Hàm để xử lý khi chọn kích thước của sản phẩm
  const handleSizeSelect = (record, size) => {
    setSelectedSize((prevState) => ({
      ...prevState,
      [record.key]: size,
    }));
  };

  // Hàm để xác nhận hành động khi click vào nút xác nhận trong Popover
  const handleConfirm = () => {
    console.log("Confirmed action");
    closeAllPopovers();
  };
  const handleConfirmModal = () => {
    setVisibleModal(false);
  };
  // Hàm để đóng tất cả Popover
  const closeAllPopovers = () => {
    setVisiblePopover({});
  };

  // const handleVoucher = (discount) => {
  //   setVoucher(discount);
  //   let TotalALL = totalCheck * ((100 - selectedCoupon) * 0.01);
  //   setTotal(TotalALL);
  // };
  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div>
          <Row>
            <Col
              className="hand-cursor"
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
              <Link to="/product">
                <Title className="hand-cursor" level={4}>
                  {record.name}
                </Title>
              </Link>
            </Col>
          </Row>

          <Row>
            <Col
              xs={24}
              sm={12}
              md={9}
              lg={7}
              xl={7}
              onClick={(e) => e.stopPropagation()}
            >
              <Image width={100} src={record.image} alt="Mô tả ảnh" />
            </Col>

            <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{}}>
              <Tag color={"red"}>Đổi ý miễn phí 15 ngày</Tag>

              <img style={{ width: "80px" }} src="dongkiem2.jpg" />
            </Col>
          </Row>
        </div>
      ),
    },
    {
      title: "Phân loại hàng",
      dataIndex: "color",

      render: (text, record) => (
        <div>
          {/* {record.map((record) => ( */}
          <Popover
            placement="bottom"
            key={record.key}
            content={
              <div>
                <Title level={4}>Màu sắc :</Title>
                {record.color.map((color, index) => (
                  <span key={index}>
                    <Button
                      type={
                        selectedColor[record.key] === color ||
                        (!selectedColor[record.key] && record.slColor === color)
                          ? "primary"
                          : "default"
                      }
                      onClick={() => handleColorSelect(record, color)}
                    >
                      {color}
                    </Button>
                  </span>
                ))}
                <Title level={4}>Size :</Title>
                {record.size.map((size, index) => (
                  <span key={index}>
                    <Button
                      type={
                        selectedSize[record.key] === size ||
                        (!selectedSize[record.key] && record.slSize === size)
                          ? "primary"
                          : "default"
                      }
                      onClick={() => handleSizeSelect(record, size)}
                    >
                      {size}
                    </Button>
                  </span>
                ))}
                <br></br>
                <br></br>
                {/* <Button
                  type=""
                  onClick={handleCancell(record, color ,size)}
                  style={{ marginRight: "" }}
                >
                  Trở lại
                </Button>
                <Button
                  type="primary"
                  style={{ marginLeft: "100px" }}
                  onClick={handleConfirm}
                >
                  Xác nhận
                </Button> */}
              </div>
            }
            trigger="click"
            visible={visiblePopover[record.key]}
            onVisibleChange={(visible) =>
              handlePopoverVisibleChange(record, visible)
            }
          >
            <Title
              level={5}
              className="hand-cursor"
              onClick={() =>
                handlePopoverVisibleChange(record, !visiblePopover[record.key])
              }
            >
              Phân loại hàng :<br></br>
            </Title>
            <span>
              {selectedColor[record.key]
                ? selectedColor[record.key]
                : record.slColor}
              ,{" "}
              {selectedSize[record.key]
                ? selectedSize[record.key]
                : record.slSize}
            </span>
          </Popover>
        </div>
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
        <Space size="small" style={{ color: "red" }}>
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
        <>
          {/* <Checkbox
            checked={record.checked}
            onChange={() => handleCheckboxChange(record.key)}
          /> */}
          <Button type="link" onClick={() => handleDelete(record.key)}>
            Xoá
          </Button>{" "}
          <br></br>
        </>
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
        setSelectAllChecked(false);
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
              <Link to="/shop">
                {" "}
                <h2 className="hand-cursor">
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
                marginRight: "10px",
              }}
              checked={selectAllChecked}
              onChange={handleSelectAllChange}
            >
              Chọn tất cả ({cartData.length})
            </Checkbox>
            <span style={{ marginRight: "10px", fontSize: "20px" }}>
              {" "}
              <Button
                type="link"
                onClick={() => handleDeleteALL()}
                style={{ fontSize: "20px" }}
              >
                Xoá
              </Button>
            </span>
            <span className="hand-cursor">Lưu vào mục đã thích</span>
          </Col>
          <Col xl={12}>
            <Row>
              <Col
                style={{
                  fontSize: "20px",
                }}
                xl={16}
              >
                Shopee Voucher
              </Col>
              <Col
                style={{
                  fontSize: "18px",
                }}
                xl={7}
              >
                <Link onClick={() => setVisibleModal(true)}>
                  Chọn hoặc nhập mã
                </Link>

                <Modal
                  title="Mã giảm giá"
                  visible={visibleModal}
                  onOk={() => setVisibleModal(false)}
                  onCancel={() => setVisibleModal(false)}
                  footer={[]}
                >
                  <div
                    style={{
                      padding: "20px",
                      display: "flex",
                      justifyContent: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    {discountData.map((coupon, index) => (
                      <Card
                        key={coupon.id}
                        onClick={() => handleSelectCoupon(coupon)}
                        style={{
                          width: 500,
                          margin: "10px",
                          border:
                            selectedCoupon === coupon.id
                              ? "2px solid #52c41a"
                              : "1px solid #d9d9d9",
                        }}
                        className="hand-cursor"
                      >
                        <Row>
                          <Col span={6}>
                            <div
                              style={{
                                fontSize: "24px",
                                fontWeight: "bold",
                                color: "#f5222d",
                              }}
                            >
                              {coupon.discount}%
                            </div>
                            <div style={{ color: "#8c8c8c" }}>Discount</div>
                          </Col>
                          <Col span={18}>
                            <div
                              style={{ fontSize: "16px", fontWeight: "bold" }}
                            >
                              {coupon.description}
                            </div>
                            <div style={{ color: "#8c8c8c" }}>
                              Expiry: {coupon.expiryDate}
                            </div>
                          </Col>
                        </Row>
                        {/* <Button
                          type="primary"
                          icon={<CheckCircleOutlined />}
                          style={{ marginTop: "10px" }}
                        >
                          Apply Coupon
                        </Button> */}
                      </Card>
                    ))}
                  </div>
                </Modal>
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
                    }).format(grandTotal)}
                  </span>
                </Title>
              </Col>
              <Col xl={9}>
                <Link to="/oderBuy">
                  <Button
                    style={{
                      width: " 250px",
                      height: "40px",
                      fontSize: "20px",
                    }}
                    type="primary"
                  >
                    Mua hàng
                  </Button>
                </Link>
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
      <br></br>
      <br></br>
    </div>
  );
};

export default Cart;
