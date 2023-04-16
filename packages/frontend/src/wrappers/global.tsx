import { theme } from "@/config";
import { App, ConfigProvider } from "antd";
import { Helmet, Outlet, useRouteProps } from "umi";

export default () => {
  const { title = "Vanguard" } = useRouteProps();
  return (
    <ConfigProvider theme={theme}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <App>
        <Outlet />
      </App>
    </ConfigProvider>
  );
};
