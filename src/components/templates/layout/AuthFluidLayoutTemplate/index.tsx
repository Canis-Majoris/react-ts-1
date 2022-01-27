import { memo } from 'react';
import Layout from '@Components/containers/shared/layout';
import AuthBakcground from '@Features/auth/shared/AuthBakcground';
import './index.less';

const { Content } = Layout;

const AuthFluidLayoutTemplate = ({ children }) => {
  return (
    <Content className='container-fluid'>
      <div className='auth-fluid-layout-template'>
        <div className='auth-fluid-layout-template-background'>
          <AuthBakcground />
        </div>
        <div className='auth-fluid-layout-template-content'>{children}</div>
      </div>
    </Content>
  );
};

export default memo(AuthFluidLayoutTemplate);
