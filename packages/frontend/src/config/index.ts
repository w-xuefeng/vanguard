import { useStorage } from "@/utils";
import { ThemeConfig } from "antd";
import { LDK } from "./dict";
import { notification } from "@/utils/toast";
import { history } from "umi";

export const theme: ThemeConfig = {
  token: {
    borderRadius: 2,
  },
};

export function loginAfter(data: { name: string; token: string }) {
  useStorage.setStorage(LDK.USER, data.name);
  useStorage.setStorage(LDK.TOKEN, data.token);
  notification.success({
    message: `${data.name}, 欢迎回来 👏`,
    description: `当前时间：${new Date().toLocaleString()}`,
  });
  history.push("/home");
}

export function logoutAfter() {
  useStorage.removeStorage(LDK.USER);
  useStorage.removeStorage(LDK.TOKEN);
  history.replace("/login");
}
