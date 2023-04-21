import * as React from "react";
import classNames from "classnames";
import RuleCard from "./components/rule-card/rule-card";
import { Drawer, message, Spin } from "antd";
import { addRule, getAllRules, modifyRule, removeRule } from "@/services";
import { Footer } from "./components/footer/footer";
import { Editor, editor } from "./components/editor/editor";
import { JSONSafeParse, vIf } from "@/utils";
import { CloseOutlined, SaveOutlined } from "@ant-design/icons";
import type { IGuardRecord } from "@vanguard/shared/models/rule";
import styles from "./index.less";

const MEDIA_QUERY_WIDTH = 740;
const MIN_RULE_CARD_WIDTH = 350;

const CREATE_RULE_TEMPLATE = {
  prefix: "prefix",
  nextOrigin: "https://example.com:8080",
  banList: [],
  pickList: [],
  checkers: [],
};

interface IHomeProps {}

const Home: React.FC<IHomeProps> = (props) => {
  const [rules, setRules] = React.useState<IGuardRecord[]>([]);
  const [currentRule, setCurrentRule] = React.useState<IGuardRecord>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [saving, setSaving] = React.useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [isCreate, setIsCreate] = React.useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const closeDrawer = () => {
    setCurrentRule(void 0);
    setOpenDrawer(false);
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

  const handleCardClick = (e: IGuardRecord) => {
    setCurrentRule(e);
  };

  const handleRemove = async (e: IGuardRecord) => {
    setLoading(true);
    const rs = await removeRule(e.prefix).req();
    setLoading(false);
    if (rs.success) {
      getRules();
      messageApi.success("服务删除成功");
    }
  };

  const getDrawerWidth = () => {
    const clientWidth = document.documentElement.clientWidth;
    return clientWidth <= MEDIA_QUERY_WIDTH
      ? "100%"
      : `${(clientWidth - MIN_RULE_CARD_WIDTH)}px`;
  };

  const saveRule = async () => {
    const code = editor?.getValue();
    const rule = JSONSafeParse<IGuardRecord>(code);
    if (!rule) {
      return;
    }
    setSaving(true);
    if (isCreate) {
      const rs = await addRule(rule).req();
      if (rs?.success) {
        messageApi.success("新规则添加成功");
        setIsCreate(false);
        closeDrawer();
        getRules();
      }
    } else if (currentRule) {
      const rs = await modifyRule(currentRule.prefix, rule).req();
      if (rs?.success) {
        messageApi.success("规则修改成功");
        closeDrawer();
        getRules();
      }
    }
    setSaving(false);
  };

  const onCreate = () => {
    setIsCreate(true);
    setCurrentRule(CREATE_RULE_TEMPLATE);
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
      {contextHolder}
      <div
        className={classNames(styles["card-list"], {
          [styles["card-list-open"]]: openDrawer,
        })}
      >
        {rules.map((e) => (
          <RuleCard
            onClick={() => handleCardClick(e)}
            onRemove={() => handleRemove(e)}
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
        <Spin tip="Loading..." spinning={saving}>
          <div className={styles["editor-header"]}>
            <div className={styles["editor-header-left"]}>
              <CloseOutlined onClick={closeDrawer} />
            </div>
            <div className={styles["editor-header-right"]}>
              <SaveOutlined onClick={saveRule} />
            </div>
          </div>
          <div
            className={styles["editor-container"]}
          >
            {vIf(!loading && !!currentRule, <Editor code={currentRule!} />)}
          </div>
        </Spin>
      </Drawer>
      <Footer onCreate={onCreate} />
    </div>
  );
};

export default Home;
