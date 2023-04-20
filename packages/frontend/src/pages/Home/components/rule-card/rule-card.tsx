import * as React from "react";
import { IGuardRecord } from "@vanguard/shared/models/rule";
import styles from "./rule-card.less";
import { Card, Col, Row } from "antd";

export interface IRuleCardProps {
  rule: IGuardRecord;
  onClick: () => void;
}

export default function RuleCard(props: IRuleCardProps) {
  const { rule, onClick } = props;
  return (
    <Card
      title={rule.prefix.toLocaleUpperCase()}
      bordered={false}
      className={styles["rule-card"]}
      onClick={onClick}
    >
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
        <Col className={styles["value"]} span={14}>{rule.pickList.length}</Col>
      </Row>
    </Card>
  );
}
