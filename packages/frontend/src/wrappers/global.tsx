import { theme } from "@/config";
import { App, ConfigProvider } from "antd";
import { Outlet } from "umi";

export default () => {
  return (
    <ConfigProvider theme={theme}>
      <App>
        <Outlet />
      </App>
    </ConfigProvider>
  );
};
