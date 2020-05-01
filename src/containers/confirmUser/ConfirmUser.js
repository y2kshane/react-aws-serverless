import React from "react";
import { Form, Input, Button, Checkbox, Alert } from "antd";
import { UserOutlined } from "@ant-design/icons";

const ConfirmUser = () => {
  const loginInProgress = false;
  return (
    <div>
      <Form
        name="confirm_signup"
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          name="Confirmation Code"
          rules={[
            {
              required: true,
              message: "Please input your confirmation code!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loginInProgress}>
            Confirm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ConfirmUser;
