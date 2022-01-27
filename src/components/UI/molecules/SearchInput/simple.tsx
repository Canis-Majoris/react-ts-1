import Input, { InputProps } from "@Components/UI/atoms/Input";
import Icon from "@Components/UI/atoms/Icon";
import { SizeType } from "antd/lib/config-provider/SizeContext";

interface Props extends InputProps {
  placeholder?: string;
  size: SizeType;
  onSearch?: () => void;
}

const SearchInputSimple = ({ placeholder, size = "large", onSearch, ...rest }: Props) => {
  return (
    <Input
      size={size}
      placeholder={placeholder}
      prefix={<Icon name='search-1' size={'15'} />}
      onChange={onSearch}
      allowClear
      {...rest}
    />
  );
};

export default SearchInputSimple;
