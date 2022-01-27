import { memo } from "react";
import { Row, Col } from "@Components/containers/shared/Grid";
import Layout from "@Components/containers/shared/layout";
import AuthBakcground from "@Features/auth/shared/AuthBakcground";
import "./index.less";

const { Content } = Layout;

const AuthLayoutTemplate = ({ children }) => {
  return (
    <Content className='container-fluid'>
      <div className='auth-layout-template'>
        <Row className='h-100'>
          <Col className='auth-layout-template-content'>{children}</Col>
          <Col flex={1}>
            <AuthBakcground />
          </Col>
        </Row>
      </div>
    </Content>
  );
};

export default memo(AuthLayoutTemplate);
