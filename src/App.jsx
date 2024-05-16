import { useEffect, useState } from "react";
import { Button, Card, Modal } from "antd";
// import { PlusOutlined } from "@ant-design/icons";

const { Meta } = Card;
function App() {
  const [flowers, setFlowers] = useState([]);
  const [open, setOpen] = useState(false);
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
      <Modal
        okText="create"
        onOk={() => {
          setOpen(false);
        }}
        open={open}
        onCancel={() => setOpen(false)}
        title="Add flower"
      >
        123
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
// 31-daqiqadan koraver
// terminalda cd "greenshop-b" deb ochsa boladi
