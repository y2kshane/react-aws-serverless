import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

import { Form, Input, Select, Row, Col, Divider, Checkbox, Button } from "antd";
import styles from "./RegisterForm.module.css";
import config from "../../configs/configs.json";

const { Option } = Select;
const { googleReCaptchaKey } = config;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const RegistrationForm = (props) => {
  const [form] = Form.useForm();

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="94">+94</Option>
      </Select>
    </Form.Item>
  );

  return (
    <>
      <div className={styles.registerFormWrapper}>
        <Row>
          <Col span={24}>
            <Divider>User Registration</Divider>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form
              {...formItemLayout}
              form={form}
              name="register"
              className={styles.registerForm}
              onFinish={props.onSubmit}
              initialValues={{
                prefix: "94",
              }}
              scrollToFirstError
            >
              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                  {
                    pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                    message: "Password is too weak!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        "The two passwords that you entered do not match!"
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="username"
                label="Username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                    whitespace: false,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[
                  {
                    required: true,
                    message: "Please input your first name!",
                    whitespace: false,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[
                  {
                    required: true,
                    message: "Please input your last name!",
                    whitespace: false,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input
                  addonBefore={prefixSelector}
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Captcha"
                extra="We must make sure that your are a human."
              >
                <ReCAPTCHA
                  sitekey={googleReCaptchaKey}
                  onChange={props.onRecaptchaChange}
                />
              </Form.Item>

              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject("Should accept agreement"),
                  },
                ]}
                {...tailFormItemLayout}
              >
                <Checkbox>
                  I have read the <a href="">agreement</a>
                </Checkbox>
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={props.inProgress}
                  className={styles.registerFormButton}
                >
                  Register
                </Button>
                Or <Link to="/login">login!</Link>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

RegistrationForm.propTypes = {
  inProgress: PropTypes.string,
  onSubmit: PropTypes.func,
  onRecaptchaChange: PropTypes.func,
};

export default RegistrationForm;
