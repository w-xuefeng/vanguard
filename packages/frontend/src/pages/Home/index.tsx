import * as React from "react";
import { getAllRules } from "@/services";
import { IGuardRecord } from "@vanguard/shared/models/rule";
import { Footer } from "./components/footer/footer";
import styles from './index.less';

interface IHomeProps {}

const Home: React.FC<IHomeProps> = (props) => {
  const [rules, setRules] = React.useState<IGuardRecord[]>([]);
  React.useEffect(() => {
    getAllRules()
      .req()
      .then((rs) => {
        if (rs.data?.length) {
          setRules(rs.data);
        }
      });
  }, []);

  return (
    <div className={styles.home}>
      <Footer />
    </div>
  );
};

export default Home;
