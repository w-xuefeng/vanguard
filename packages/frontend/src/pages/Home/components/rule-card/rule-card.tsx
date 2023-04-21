import * as React from "react";
import { IGuardRecord } from "@vanguard/shared/models/rule";
import styles from "./rule-card.less";
import { Button, Card, Col, Popconfirm, Row } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

export interface IRuleCardProps {
  rule: IGuardRecord;
  onClick: () => void;
  onRemove: () => void;
}

export default function RuleCard(props: IRuleCardProps) {
  const { rule, onClick, onRemove } = props;
  const title = rule.prefix.toLocaleUpperCase();
  return (
    <Card
      title={title}
      bordered={false}
      className={styles["rule-card"]}
      extra={
        <Popconfirm
          title="删除服务"
          description={`你确定要删除 ${title} 吗?`}
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          okText="确定删除"
          cancelText="取消"
          onConfirm={onRemove}
        >
          <Button type="link" danger>删除</Button>
        </Popconfirm>
      }
    >
      <div onClick={onClick}>
        <Row gutter={16}>
          <Col className={styles["label"]} span={10}>前缀</Col>
          <Col className={styles["value"]} span={14}>/{rule.prefix}</Col>
        </Row>
        <Row gutter={16}>
          <Col className={styles["label"]} span={10}>
            目标服务地址
          </Col>
          <Col className={styles["value"]} span={14}>{rule.nextOrigin}</Col>
        </Row>
        <Row gutter={16}>
          <Col className={styles["label"]} span={10}>
            黑名单数
          </Col>
          <Col className={styles["value"]} span={14}>{rule.banList.length}</Col>
        </Row>
        <Row gutter={16}>
          <Col className={styles["label"]} span={10}>
            白名单数
          </Col>
          <Col className={styles["value"]} span={14}>
            {rule.pickList.length}
          </Col>
        </Row>
        <Row gutter={16}>
          <Col className={styles["label"]} span={10}>
            校验规则数
          </Col>
          <Col className={styles["value"]} span={14}>
            {rule.checkers.length}
          </Col>
        </Row>
      </div>
    </Card>
  );
}
