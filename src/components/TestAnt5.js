import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  message,
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

function TestAnt5() {
  const [data, setData] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/data.json");
      setData(response.data);
    } catch (error) {
      console.error("There was an error fetching the orders!", error);
    }
  };
  // Function to add data
  const addData = async (values) => {
    const user = {
      username: values.username,
      password: values.password,
    };
    try {
      const response = await axios.post("/api/data", user);
      setData([...data, response.data]);
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };
  const deleteData = async (id) => {
    try {
      await axios.delete(`/api/data/id`);
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };
  const updateData = async (id, updatedItem) => {
    try {
      const response = await axios.put(`/api/data/id`, updatedItem);
      setData(data.map((item) => (item.id === id ? response.data : item)));
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div>
      <Modal
        title="Mã giảm giá"
        visible={visibleModal}
        onOk={() => setVisibleModal(false)}
        onCancel={() => setVisibleModal(false)}
        footer={[]}
      >
        <div>nội dung modal</div>
      </Modal>
    </div>
  );
}

export default TestAnt5;
