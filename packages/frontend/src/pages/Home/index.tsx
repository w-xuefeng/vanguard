import * as React from "react";
import { getAllRules } from "@/services";
import { IGuardRecord } from "@vanguard/shared/models/rule";
import { Footer } from "./components/footer/footer";
import { Editor } from "./components/editor/editor";
import { vIf } from "@/utils";
import { Button, Drawer } from "antd";
import RuleCard from "./components/rule-card/rule-card";
import styles from "./index.less";
import classNames from "classnames";

const MEDIA_QUERY_WIDTH = 740;

interface IHomeProps {}

const Home: React.FC<IHomeProps> = (props) => {
  const [rules, setRules] = React.useState<IGuardRecord[]>([]);
  const [currentRule, setCurrentRule] = React.useState<IGuardRecord>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const closeDrawer = () => {
    setOpenDrawer(false);
  };

  const handleCardClick = (e: IGuardRecord) => {
    setCurrentRule(e);
  };

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

  const getDrawerWidth = () => {
    const clientWidth = document.documentElement.clientWidth;
    return clientWidth <= MEDIA_QUERY_WIDTH
      ? "100%"
      : `${(clientWidth - 350)}px`;
  };

  React.useEffect(() => {
    getRules();
  }, []);

  React.useEffect(() => {
    if (currentRule) {
      showDrawer();
    }
  }, [currentRule]);

  return (
    <div className={styles.home}>
      <div
        className={classNames(styles["card-list"], {
          [styles["card-list-open"]]: openDrawer,
        })}
      >
        {rules.map((e) => (
          <RuleCard
            onClick={() => handleCardClick(e)}
            rule={e}
            key={e.prefix}
          />
        ))}
      </div>

      <Drawer
        rootClassName={styles["editor-drawer"]}
        placement="right"
        width={getDrawerWidth()}
        onClose={closeDrawer}
        open={openDrawer}
        closable={false}
      >
        <div
          className={styles["editor-container"]}
        >
          {vIf(!loading && !!currentRule, <Editor code={currentRule!} />)}
        </div>
      </Drawer>

      <Footer />
    </div>
  );
};

export default Home;
