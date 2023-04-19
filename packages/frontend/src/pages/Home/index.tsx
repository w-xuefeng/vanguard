import * as React from "react";
import { getAllRules } from "@/services";
import { IGuardRecord } from "@vanguard/shared/models/rule";
import { Footer } from "./components/footer/footer";
import { Editor } from "./components/editor/editor";
import { vIf } from "@/utils";
import styles from "./index.less";

interface IHomeProps {}

const Home: React.FC<IHomeProps> = (props) => {
  const [rules, setRules] = React.useState<IGuardRecord[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  async function getRules() {
    if (loading) {
      return;
    }
    setLoading(true);
    const rs = await getAllRules().req();
    if (rs.data?.length) {
      setRules(rs.data);
    }
    setLoading(false);
  }

  React.useEffect(() => {
    getRules();
  }, []);

  return (
    <div className={styles.home}>
      {vIf(!loading, <Editor code={rules} />)}
      <Footer />
    </div>
  );
};

export default Home;
