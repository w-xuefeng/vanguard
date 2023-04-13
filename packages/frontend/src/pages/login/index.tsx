import * as React from "react";
import classNames from "classnames";
import logo from "@/assets/logo.png";
import styles from "./style.less";
import { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { ConfigProvider, Input } from "antd";
import { theme } from "@/config";

interface ILoginProps {}

const Login: React.FC<ILoginProps> = (props) => {
  const [dividerExtend, setDividerExtend] = useState(false);
  const [inputExtend, setInputExtend] = useState(false);

  const dividerClassName = classNames([
    styles["divider"],
    { [styles["divider-open"]]: dividerExtend },
  ]);

  const inputClassName = classNames([
    styles["input"],
    { [styles["input-open"]]: inputExtend },
  ]);

  React.useEffect(() => {
    const timerDivider = setTimeout(() => {
      setDividerExtend(true);
    }, 100);

    const timerPanel = setTimeout(() => {
      setInputExtend(true);
    }, 500);

    return () => {
      clearTimeout(timerDivider);
      clearTimeout(timerPanel);
    };
  }, []);

  return (
    <ConfigProvider theme={theme}>
      <div className={styles["login-page"]}>
        <div className={styles["cover"]}>
          <img src={logo} alt="logo" className={styles["logo"]} />
          <div className={dividerClassName}></div>
          <div className={styles["panel"]}>
            <Input
              className={inputClassName}
              placeholder="请输入用户名"
              prefix={<UserOutlined />}
            />
            <Input.Password
              className={inputClassName}
              placeholder="请输入密码"
            />
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Login;
