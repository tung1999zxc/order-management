// src/App.js
import React from "react";
import { Layout, Menu } from "antd";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import OrderDetail from "./components/OrderDetail.js";
import { UnorderedListOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { HomeOutlined } from "@ant-design/icons";
import OrderManagement from "./components/OrderManagement";
import OrderManagement2 from "./components/OrderManagement2";
import TestAnt from "./components/TestAnt.js";
import Product from "./components/Product.js";
import TestAnt3 from "./components/TestAnt3.js";
import TestAnt4 from "./components/TestAnt4.js";
import TestAnt5 from "./components/TestAnt5.js";
import TestAnt6 from "./components/TestAnt6.js";
import OderBuy from "./components/OderBuy.js";
import Cart from "./components/cart/Cart.js";

const { Header, Content, Footer, Sider } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        {/* <Sider collapsible> */}

        {/* <div
          style={{
            position: "absolute ",
            left: "120px",
            top: "13px",
          }}
        >
          <Link to="/">
            <HomeOutlined
              style={{
                fontSize: "35px",
                color: "#08c",
              }}
            />
          </Link>
        </div> */}
        {/* <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1" icon={<UnorderedListOutlined />}>
              <Link to="1">Orders</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<ShoppingCartOutlined />}>
              <Link to="/2">OrderDetail</Link>
            </Menu.Item>
          </Menu> */}
        {/* </Sider> */}
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{ padding: 0, background: "#ee4d2d" }}
            //   <HomeOutlined />
          />
          <Content style={{ margin: "16px" }}>
            <Routes>
              <Route path="/1" element={<OrderManagement />} />
              <Route path="/" element={<OrderManagement2 />} />
              <Route path="/cart" element={<TestAnt />} />
              <Route path="/cart2" element={<Cart />} />
              <Route path="/product" element={<Product />} />
              <Route path="/oderBuy" element={<OderBuy />} />
              <Route path="/4" element={<TestAnt4 />} />
              <Route path="/5" element={<TestAnt5 />} />
              <Route path="/6" element={<TestAnt6 />} />
              <Route path="/shop" element={<TestAnt3 />} />
              <Route path="/child/:id" element={<OrderDetail />} />
            </Routes>
          </Content>
          <Footer style={{ textAlign: "center" }}></Footer>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
