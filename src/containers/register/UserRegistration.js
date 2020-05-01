import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import notificationSender, { ERROR_TYPE } from "../../libs/notificationHelper";
import RegistrationForm from "../../components/registrationForm/RegistrationForm";

import {
  Form,
  Input,
  Select,
  Row,
  Col,
  Divider,
  Checkbox,
  Button,
  message,
} from "antd";

import { signUp } from "../../apis/userApi";
import {
  CAPTCHA_VERIFICATION_FAILED,
  REGISTER_FAILED_GENERIC_MSG,
} from "../../components/registrationForm/constants";

const UserRegistration = () => {
  const history = useHistory();

  const [regInProgress, setRegInProgress] = useState(false);
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);

  const onRecaptchaChange = (value) => {
    if (value) setRecaptchaVerified(true);
    else setRecaptchaVerified(false);
  };

  const handleRegister = (signUpData) => {
    signUpData.phone = `+${signUpData.prefix}${signUpData.phone}`;
    setRegInProgress(true);
    console.log("Received values of form: ", signUpData);
    if (!recaptchaVerified) {
      setRegInProgress(false);
      notificationSender(
        ERROR_TYPE,
        REGISTER_FAILED_GENERIC_MSG,
        CAPTCHA_VERIFICATION_FAILED
      );
      return;
    }
    signUp(signUpData)
      .then((data) => {
        message.success("Registration successful!");
        history.push("/confirmUser");
        setRegInProgress(false);
      })
      .catch((error) => {
        console.error("Registration Error", error);
        const { code, name, message } = error || {};
        setRegInProgress(false);
        notificationSender(
          ERROR_TYPE,
          REGISTER_FAILED_GENERIC_MSG,
          message || ""
        );
        // message.error(REGISTER_FAILED_GENERIC_MSG);
      });
  };

  return (
    <Row justify="space-around" align="middle">
      <Col span={12}>
        <RegistrationForm
          onSubmit={handleRegister}
          inProgress={regInProgress}
          onRecaptchaChange={onRecaptchaChange}
        />
      </Col>
    </Row>
  );
};

export default UserRegistration;
