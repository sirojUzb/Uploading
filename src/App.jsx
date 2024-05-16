import { useEffect, useState } from "react";
import { Button, Card, Form, Input, InputNumber, Modal, Upload } from "antd";
// import { PlusOutlined } from "@ant-design/icons";

const { Meta } = Card;
function App() {
  const [flowers, setFlowers] = useState([]);
  const [open, setOpen] = useState(false);
  const onFinish = (values) => {
    console.log(values);
    const shouldUpload = {
      title: values.title,
      price: values.price,
      main_image: values.main_image.file.response.image_url.url,
    };
    setOpen(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:8080/api/flower/category/house-plants?access_token=64bebc1e2c6d3f056a8c85b7"
      );
      const data = await response.json();
      setFlowers(data.data);
    };
    fetchData();
  }, []);
  return (
    <div className="flex justify-center items-center flex-col">
      <Modal
        okText="Create"
        onOk={() => {
          setOpen(false);
        }}
        open={open}
        onCancel={() => setOpen(false)}
        title="Add flower"
        footer={false}
      >
        <Form onFinish={onFinish}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input your title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Upload"
            name="main_image"
            rules={[{ required: true, message: "Please upload your image" }]}
          >
            <Upload
              action={
                "http://localhost:8080/api/upload?access_token=64bebc1e2c6d3f056a8c85b7"
              }
              name="image"
            >
              <Button>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please input your price" }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item>
            <Button danger onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button htmlType="submit">Create</Button>
          </Form.Item>
        </Form>
      </Modal>
      <div className="absolute top-2 right-2">
        <Button onClick={() => setOpen(true)}>Add</Button>
      </div>
      <div className="flex flex-col gap-[20px] mt-[20px]">
        {flowers.map(({ _id, main_image, title, short_description }) => (
          <Card
            key={_id}
            hoverable
            style={{
              width: 439,
            }}
            cover={<img alt="example" src={main_image} />}
          >
            <Meta title={title} description={short_description} />
          </Card>
        ))}
      </div>
    </div>
  );
}

export default App;
// 2-videodan koraver
// bugun tugatish kk
// terminalda cd "greenshop-b" deb ochsa boladi
