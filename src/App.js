// src/App.js
import React from "react";
import { Layout, Menu } from "antd";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import OrderDetail from "./components/OrderDetail.js";
import { UnorderedListOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import OrderManagement from "./components/OrderManagement";
import OrderManagement2 from "./components/OrderManagement2";
import TestAnt from "./components/TestAnt.js";
import TestAnt2 from "./components/TestAnt2.js";

const { Header, Content, Footer, Sider } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        {/* <Sider collapsible>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1" icon={<UnorderedListOutlined />}>
              <Link to="1">Orders</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<ShoppingCartOutlined />}>
              <Link to="/2">OrderDetail</Link>
            </Menu.Item>
          </Menu>
        </Sider> */}
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{ padding: 0, background: "#ee4d2d" }}
          />
          <Content style={{ margin: "16px" }}>
            <Routes>
              <Route path="/1" element={<OrderManagement />} />
              <Route path="/" element={<OrderManagement2 />} />
              <Route path="/cart" element={<TestAnt />} />
              <Route path="/4" element={<TestAnt2 />} />
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
