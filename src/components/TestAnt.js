import React, { useState } from "react";
import {
  Layout,
  Menu,
  Breadcrumb,
  Button,
  Form,
  Input,
  Table,
  Modal,
  Dropdown,
  Select,
  DatePicker,
  Progress,
  Avatar,
  Badge,
  Tooltip,
  Alert,
  Spin,
  Tabs,
  Collapse,
} from "antd";
import { SmileOutlined, DownOutlined } from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { Option } = Select;
const { TabPane } = Tabs;
const { Panel } = Collapse;

const dataSource = [
  { key: "1", name: "Mike", age: 32, address: "10 Downing Street" },
  { key: "2", name: "John", age: 42, address: "20 Downing Street" },
];

const columns = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Age", dataIndex: "age", key: "age" },
  { title: "Address", dataIndex: "address", key: "address" },
];

const menu = (
  <Menu>
    <Menu.Item key="1">Option 1</Menu.Item>
    <Menu.Item key="2">Option 2</Menu.Item>
    <Menu.Item key="3">Option 3</Menu.Item>
  </Menu>
);

const TestAnt = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => setIsModalVisible(true);
  const handleOk = () => setIsModalVisible(false);
  const handleCancel = () => setIsModalVisible(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1">Home</Menu.Item>
          <Menu.Item key="2">About</Menu.Item>
          <Menu.Item key="3">Contact</Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu mode="inline" style={{ height: "100%", borderRight: 0 }}>
            <SubMenu key="sub1" icon={<SmileOutlined />} title="Submenu">
              <Menu.Item key="1">Option 1</Menu.Item>
              <Menu.Item key="2">Option 2</Menu.Item>
              <Menu.Item key="3">Option 3</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <h1>Welcome to My Ant Design Page</h1>
            <Button type="primary" onClick={showModal}>
              Open Modal
            </Button>
            <Modal
              title="Basic Modal"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <p>Some contents...</p>
            </Modal>
            <Form>
              <Form.Item label="Username">
                <Input />
              </Form.Item>
              <Form.Item label="Password">
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
            <Table dataSource={dataSource} columns={columns} />
            <Dropdown overlay={menu}>
              <Button>
                Dropdown <DownOutlined />
              </Button>
            </Dropdown>
            <Select defaultValue="lucy" style={{ width: 120 }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="disabled" disabled>
                Disabled
              </Option>
              <Option value="yiminghe">yiminghe</Option>
            </Select>
            <DatePicker />
            <Progress percent={75} />
            <Avatar src="https://joeschmoe.io/api/v1/random" />
            <Badge count={5}>
              <a href="#" className="head-example" />
            </Badge>
            <Tooltip title="Prompt Text">
              <span>Tooltip will show when mouse enter.</span>
            </Tooltip>
            <Alert message="Success Text" type="success" />
            <Spin />
            <Tabs defaultActiveKey="1">
              <TabPane tab="Tab 1" key="1">
                Content of Tab 1
              </TabPane>
              <TabPane tab="Tab 2" key="2">
                Content of Tab 2
              </TabPane>
              <TabPane tab="Tab 3" key="3">
                Content of Tab 3
              </TabPane>
            </Tabs>
            <Collapse>
              <Panel header="This is panel header 1" key="1">
                <p>Content of Panel 1</p>
              </Panel>
              <Panel header="This is panel header 2" key="2">
                <p>Content of Panel 2</p>
              </Panel>
            </Collapse>
          </Content>
          <Button type="default">tung1999</Button>

          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2024 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default TestAnt;
