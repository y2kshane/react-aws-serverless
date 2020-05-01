import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Form, Input, Button, Checkbox, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styles from "./LoginForm.module.css";

import { signIn } from "../../apis/userApi";
import {
  NOT_AUTHORIZED_EXCEPTION,
  USER_NOT_CONFIRMED_EXCEPTION,
  LOGIN_FAILED_GENERIC_MSG,
  INCORRECT_CREDENTIALS_MSG,
} from "./constants";

const LoginForm = () => {
  const history = useHistory();
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const errorAlert = (
    <Alert
      className={styles.errorAlert}
      message="Login Error"
      description={errorMsg}
      type="error"
      showIcon
    />
  );

  const handleLogin = (values) => {
    setLoginInProgress(true);
    const { username, password } = values;

    signIn(username, password)
      .then((data) => {
        console.log("data");
        history.push("/");
        setHasError(false);
        // setLoginInProgress(false)
      })
      .catch((error) => {
        console.log(error);
        const { code } = error || {};
        if (code === USER_NOT_CONFIRMED_EXCEPTION) history.push("/confirmUser");
        else
          setErrorMsg(
            code === NOT_AUTHORIZED_EXCEPTION
              ? INCORRECT_CREDENTIALS_MSG
              : LOGIN_FAILED_GENERIC_MSG
          );
        setHasError(true);
        setLoginInProgress(false);
      });
  };

  return (
    <div className={styles.loginFormWrapper}>
      <Form
        name="normal_login"
        className={styles.loginForm}
        initialValues={{
          remember: true,
        }}
        onFinish={handleLogin}
      >
        {hasError ? errorAlert : null}

        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className={styles.loginFormForgot} href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loginInProgress}
            className={styles.loginFormButton}
          >
            Log in
          </Button>
          Or <Link to="/register">register now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
