import { useEffect, useState } from "react";
import { Button, Form, Input, Upload, Card } from "antd";
// import { PlusOutlined } from "@ant-design/icons";

const { Meta } = Card;
function App() {
  const [flowers, setFlowers] = useState([]);
  // const onSubmit = (values) => {
  //   console.log(values);
  // };
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:8080/api/flower/category/house-plants?access_token=64bebc1e2c6d3f056a8c85b7"
      );
      const data = await response.json();
      setFlowers(data.data);
      console.log(data);
    };
    fetchData();
  }, []);
  return (
    <div className="flex justify-center items-center flex-col">
      {/* <Form
        onFinish={onSubmit}
        layout="horizontal"
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input" }]}
        >
          <Input placeholder="Enter title" name="title" />
        </Form.Item>
        <Form.Item
          label="Upload"
          name="main_img"
          rules={[{ required: true, message: "Please upload image" }]}
        >
          <Upload
            name="image"
            action="http://localhost:8080/api/upload?access_token=64bebc1e2c6d3f056a8c85b7"
          >
            <Button>Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Submit</Button>
        </Form.Item>
      </Form> */}

      {flowers.map(({ _id, main_image }) => (
        <Card
          key={_id}
          hoverable
          style={{
            width: 240,
          }}
          cover={<img alt="example" src={main_image} />}
        >
          <Meta title="Europe Street beat" description="www.instagram.com" />
        </Card>
      ))}
    </div>
  );
}

export default App;
// 26-daqiqadan koraver
// terminalda cd "greenshop-b" deb ochsa boladi
