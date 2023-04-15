import * as React from "react";
import classNames from "classnames";
import logo from "@/assets/logo.png";
import { useRef, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { ConfigProvider, Input, type InputRef } from "antd";
import { theme } from "@/config";
import { login } from "@/services";
import { useStorage } from "@/utils";
import { useAuth } from "@/hooks/use-auth";
import { LDK } from "@/config/dict";
import { history } from "umi";
import styles from "./style.less";

interface ILoginProps {}

const Login: React.FC<ILoginProps> = (props) => {
  if (useAuth().isLogin) {
    history.back();
  }
  /**
   * UI begin
   */
  const [dividerExtend, setDividerExtend] = useState(false);
  const [inputExtend, setInputExtend] = useState(false);
  const [passwordIsFocus, setPasswordIsFocus] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const dividerClassName = classNames([
    styles["divider"],
    { [styles["divider-open"]]: dividerExtend },
  ]);

  const inputClassName = classNames([
    styles["input"],
    { [styles["input-open"]]: inputExtend },
  ]);

  const coverClassName = classNames([
    styles["cover"],
    { [styles["cover-close"]]: passwordIsFocus },
  ]);

  const passwordFocus = () => {
    setPasswordIsFocus(true);
  };

  const passwordBlur = () => {
    setPasswordIsFocus(false);
  };

  /**
   * UI end
   */

  /**
   * Data begin
   */
  const [name, setName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const nameRef = useRef<InputRef>(null);
  const passwordRef = useRef<InputRef>(null);

  const onNameInput = (e: React.FormEvent<HTMLInputElement>) => {
    setName((e.target as HTMLInputElement).value);
    if (nameError) {
      setNameError(false);
    }
  };

  const onPasswordInput = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword((e.target as HTMLInputElement).value);
    if (passwordError) {
      setPasswordError(false);
    }
  };

  const submit = async () => {
    if (!name) {
      nameRef.current?.focus({ cursor: "end" });
      setNameError(true);
      return;
    }
    if (!password) {
      passwordRef.current?.focus({ cursor: "end" });
      setPasswordError(true);
      return;
    }

    const rs = await login({ name, password }).req();

    if (rs?.data) {
      useStorage.setStorage(LDK.USER, rs.data.name);
      useStorage.setStorage(LDK.TOKEN, rs.data.token);
      history.push("/home");
    }
  };

  const onPasswordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key.toLocaleUpperCase() === "ENTER") {
      submit();
    }
  };
  /**
   * Data end
   */

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
        <div className={coverClassName}>
          <img
            src={logo}
            alt="logo"
            className={styles["logo"]}
            onClick={submit}
          />
          <div className={dividerClassName}></div>
          <div className={styles["panel"]}>
            <Input
              className={inputClassName}
              placeholder="请输入用户名"
              prefix={<UserOutlined />}
              value={name}
              onInput={onNameInput}
              ref={nameRef}
              status={nameError ? "error" : void 0}
            />
            <Input.Password
              className={inputClassName}
              onFocus={passwordFocus}
              onBlur={passwordBlur}
              placeholder="请输入密码"
              value={password}
              onInput={onPasswordInput}
              onKeyDownCapture={onPasswordKeyDown}
              ref={passwordRef}
              status={passwordError ? "error" : void 0}
            />
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Login;
