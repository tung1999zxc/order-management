import React from "react";
import { Space, Button } from "antd";

const SpaceDemo = () => {
  return (
    <div>
      <h2>Stretch các phần tử trong Space</h2>
      <Space
        size="large"
        direction="vertical"
        style={{ width: "100%", border: "1px solid #ccc", padding: "10px" }}
        align=""
      >
        <Button
          type="primary"
          style={{ width: "100%", border: "1px solid #ccc" }}
        >
          Button 1
        </Button>
        <Button type="default" style={{ border: "1px solid #ccc" }}>
          Button 2
        </Button>
        <Button type="dashed" style={{ border: "1px solid #ccc" }}>
          Button 3
        </Button>
      </Space>

      <h2>Horizontal Space with Medium Size and Center Alignment:</h2>
      <Space size={30} direction="horizontal">
        <Button type="primary">Button 1</Button>
        <h1 class="">tung1999zxc</h1>
        <Button type="default">Button 2</Button>
        <Button type="dashed">Button 3</Button>
      </Space>
      <br></br>
      <Space
        direction=""
        style={{ minHeight: "300px", border: "1px solid #ccc" }}
        wrap
      >
        
        <div
          style={{
            width: "200px",
            Height: "100vh",
            border: "1px solid #ccc",
          }}
        >
          content1111111111111111111111111111111
        </div>
        <p style={{ border: "1px solid #ccc" }}>Card content</p>
        <p style={{ border: "1px solid #ccc" }}>Card content</p>
        <p style={{ border: "1px solid #ccc" }}>Card content</p>
      </Space>
      <br></br>
      <p>tung1999zxc</p>
      <h2 style={{ marginTop: "20px" }}>
        Vertical Space with Small Size and Start Alignment:
      </h2>
      <Space size="large" direction="vertical" baseline>
        <Button type="primary">Button 4</Button>
        <h1 class="">tung1999zxc</h1>

        <Button type="default">Button 5</Button>
        <Button type="dashed">Button 6</Button>
      </Space>

      <h2 style={{ marginTop: "20px" }}>Wrapped Space with Large Size:</h2>
      <Space wrap>
        <Button type="primary">Button 7</Button>
        <Button type="default">Button 8</Button>
        <Button type="dashed">Button 9</Button>
        <Button type="primary">Button 10</Button>
        <Button type="default">Button 11</Button>
        <Button type="dashed">Button 12</Button>
      </Space>
    </div>
  );
};

export default SpaceDemo;
