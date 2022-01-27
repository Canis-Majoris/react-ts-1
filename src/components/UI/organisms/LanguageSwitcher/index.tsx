import { useClientSettingsOptionState } from "@State/useSettingsConfigState";
import { useUI } from "@Providers/UIProvider";
import Icon from "@Components/UI/atoms/Icon";
import Image from "@Components/UI/atoms/Image";
import Select, { SelectProps } from "@Components/UI/molecules/Select";
import { Languages } from "@Types/shared-types";
import "./index.less";

const { Option } = Select;

const LanguageSwitcher = (props: SelectProps<any>) => {
  const { className } = props || {};
  const { showLanguageSwitcher, language, setLanguage, languages } = useUI();
  const { data: showLanguage, error, isLoading } =
    useClientSettingsOptionState("show_language") || {};

  if (!showLanguageSwitcher && (!showLanguage?.booleanValue || error)) {
    return null;
  }

  const handleLanguageChange = (value: Languages) => {
    setLanguage(value);
  };

  return (
    <Select
      placeholder={<Icon name="add" />}
      defaultValue={language || "none"}
      bordered={false}
      onChange={handleLanguageChange}
      className={`language-select ${className ? className : ""}`}
      {...props}
    >
      {languages.map((lang, index) => (
        <Option value={lang.value} key={index} className="language-select-item">
          <Image width={25} preview={false} src={lang.icon} />
        </Option>
      ))}
    </Select>
  );
};

export default LanguageSwitcher;
