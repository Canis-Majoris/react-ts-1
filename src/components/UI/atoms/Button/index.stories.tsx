import Button, { ButtonProps } from './index';

export default {
  title: 'app/Button',
  component: Button,
  argTypes: {
    type: 'primary',
  },
};

const Template = (args: ButtonProps) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  type: 'primary',
  label: 'Button',
  children: 'Test',
};

export const Secondary = Template.bind({});
Secondary.args = {
  type: 'secondary',
  label: 'Button',
  children: 'Test',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button',
  children: 'Test',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
  children: 'Test',
};
