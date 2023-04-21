import * as React from "react";
import styles from "./footer.less";
import { useStorage } from "@/utils";
import { LDK } from "@/config/dict";
import { logoutAfter } from "@/config";
import { Button } from "antd";
import { AppstoreAddOutlined } from "@ant-design/icons";

export interface IFooterProps {
  onCreate?: () => void;
}

export function Footer(props: IFooterProps) {
  const user = useStorage.getStorage<string>(LDK.USER);
  const { onCreate } = props;
  return (
    <div className={styles.footer}>
      <div className={styles.avatar}>
        {user?.substring(0, 1)}
      </div>
      <div className={styles.name}>
        {user}
      </div>
      <div className={styles.actions}>
        <AppstoreAddOutlined
          className={styles["icon-btn"]}
          onClick={onCreate}
        />
        <svg
          className={styles["icon-btn"]}
          onClick={logoutAfter}
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
        >
          <path d="M835.669333 554.666667h-473.173333A42.453333 42.453333 0 0 1 320 512a42.666667 42.666667 0 0 1 42.474667-42.666667h473.173333l-161.813333-161.834666a42.666667 42.666667 0 0 1 60.330666-60.330667l234.666667 234.666667a42.666667 42.666667 0 0 1 0 60.330666l-234.666667 234.666667a42.666667 42.666667 0 0 1-60.330666-60.330667L835.669333 554.666667zM554.666667 42.666667a42.666667 42.666667 0 1 1 0 85.333333H149.525333C137.578667 128 128 137.578667 128 149.482667v725.034666C128 886.4 137.6 896 149.525333 896H554.666667a42.666667 42.666667 0 1 1 0 85.333333H149.525333A106.816 106.816 0 0 1 42.666667 874.517333V149.482667A106.773333 106.773333 0 0 1 149.525333 42.666667H554.666667z">
          </path>
        </svg>
      </div>
    </div>
  );
}
