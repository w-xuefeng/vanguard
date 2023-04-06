import { Outlet } from "umi";
import styles from "./index.less";

export interface ILayoutProps {}

export default function Layout(_props: ILayoutProps) {
  return (
    <div className={styles.layout}>
      <Outlet />
    </div>
  );
}
