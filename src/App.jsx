import { useEffect, useState } from "react";
import { Button, Card, Form, Input, InputNumber, Modal, Upload } from "antd";

const { Meta } = Card;
function App() {
  const [flowers, setFlowers] = useState([]);
  const [open, setOpen] = useState(false);
  const onFinish = async (values) => {
    console.log("Received values from form", values);
    console.log(values);
    const shouldUpload = {
      title: values.title,
      price: values.price,
      main_image: values.main_image.file.response.image_url.url,
      discount: false,
      discount_price: "0",
      detailed_images: [
        "https://www.coartsinnovation.com/wp-content/uploads/2021/05/Artificial-Topiary-CAJM-7136.png",
        "https://www.coartsinnovation.com/wp-content/uploads/2021/05/Artificial-Topiary-CAJM-7136.png",
        "https://cdn11.bigcommerce.com/s-2mpfm/images/stencil/640w/products/169512/743847/5965__41958.1630728740.jpg?c=2",
        "https://cdn11.bigcommerce.com/s-2mpfm/images/stencil/640w/products/169089/743279/5493__27309.1630683935.jpg?c=2",
      ],
      rate: 0,
      views: 0,
      tags: [],
      comments: [],
      description: "Description",
      short_description: "Short_description",
    };
    await fetch(
      "http://localhost:8080/api/flower/category/house-plants?access_token=64bebc1e2c6d3f056a8c85b7",
      {
        method: "POST",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0YzAyZDEwMzIwNjk5ODJkYmJhOTRlZiIsIm5hbWUiOiJUZXN0Iiwic3VybmFtZSI6IlRlc3RvdiIsInBhc3N3b3JkIjoidGVzdF90ZXN0IiwicGVybWlzc2lvbiI6eyJjcmVhdGUiOmZhbHNlLCJ1cGRhdGUiOmZhbHNlLCJkZWxldGUiOmZhbHNlLCJyZWFkIjp0cnVlfSwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsInVzZXJfdHlwZSI6Im9ic2VydmVyIiwiY3JlYXRlX3Bvc3RfbGltaXQiOjAsImNyZWF0ZV9hY2NvdW50X2xpbWl0IjowLCJjcmVhdGVfcGxhbnRfbGltaXQiOjAsImhhc2h0YWdzIjpbXSwid2lzaGxpc3QiOltdLCJjcmVhdGVkX2F0IjoiMjAyMy0wNy0yNVQyMDoxNDowOC4wNDhaIiwiX192IjowfSwiaWF0IjoxNjkwMzE2MjY3fQ.Lwf1q47UoD5eUzFp4IXjgCD05xvnDrojZ5lST9mrMfc",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shouldUpload),
      }
    );
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
            rules={[
              {
                required: true,
                message: "Please input your image",
              },
            ]}
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
            rules={[
              {
                required: true,
                message: "Please input your price",
              },
            ]}
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
// finish hometask
// terminalda cd "greenshop-b" deb ochsa boladi
