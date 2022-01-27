import Spin from "@Components/UI/atoms/Spin";
import { LoadingOutlined } from "@ant-design/icons";
import { SpinProps } from "antd/lib/spin";
import { useUI } from "@Providers/UIProvider";
interface Props extends SpinProps {
  size: any;
}

const Loading = ({ size, ...rest }: Props) => {
  const { colors } = useUI();

  return (
    <Spin
      indicator={
        <LoadingOutlined
          style={{ fontSize: size, color: colors?.primaryColor }}
          spin
        />
      }
      {...rest}
    />
  );
};

export default Loading;
