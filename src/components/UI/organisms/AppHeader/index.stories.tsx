import { HashRouter, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AppHeader, { AppHeaderProps } from './index';

export default {
  title: 'app/Header',
  component: AppHeader,
  argTypes: {
    type: 'default',
  },
  decorators: [(story) => <HashRouter>{story()}</HashRouter>],
};

const Template = (args: AppHeaderProps) => <AppHeader {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: 'default',
  //   label: 'Button',
  //   children: 'Test',
};
