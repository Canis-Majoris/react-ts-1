import { ChangeEventHandler, useRef } from "react";
import Input, { SearchProps } from "@Components/UI/atoms/Input";
import { useUI } from "@Providers/UIProvider";
import { AppWidth } from "@Types/app";
import { useTranslation } from "react-i18next";
import "./index.less";

export interface SearchBarProps extends SearchProps {
  value?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onSearch?: any;
  placeholder?: string;
  className?: string;
  enterButton?: boolean;
}

const { Search } = Input;

const SearchBar = ({
  value,
  onChange,
  onSearch,
  placeholder,
  className,
  enterButton,
  ...rest
}: SearchBarProps) => {
  const searchBarRef = useRef(null);
  const { width } = useUI();
  const { t } = useTranslation();

  const handleSearch = (e) => {
    if (onSearch) {
      onSearch(e);
    } else {
      if (width < AppWidth.md_min && searchBarRef.current) {
        searchBarRef.current.focus();
      }
    }
  };

  return (
    <Search
      ref={searchBarRef}
      value={value && value}
      placeholder={placeholder || t("general_search")}
      className={`searchbar ${className ? className : ""} ${
        enterButton ? "primary" : ""
      }`}
      onChange={onChange}
      onSearch={onSearch}
      {...rest}
    />
  );
};

export default SearchBar;
