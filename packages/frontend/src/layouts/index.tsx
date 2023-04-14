import { Outlet } from "umi";
import styles from "./index.less";
import { ConfigProvider } from "antd";
import { theme } from "@/config";

export interface ILayoutProps {}

export default function Layout(_props: ILayoutProps) {
  return (
    <ConfigProvider theme={theme}>
      <div className={styles.layout}>
        <Outlet />
      </div>
    </ConfigProvider>
  );
}
