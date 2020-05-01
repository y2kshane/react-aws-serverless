import { notification } from "antd";

const ERROR_TYPE = "error";

const openNotification = (type, message, description) => {
  notification[type]({
    message,
    description,
  });
};

export default openNotification;
export { ERROR_TYPE };
