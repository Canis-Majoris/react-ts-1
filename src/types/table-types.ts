import { ColumnProps } from "@Components/UI/molecules/Table";
import { ReactElement } from "react";

export interface TableColumn extends Omit<ColumnProps<any>, "children"> {
  name?: any;
  formatter?: ({
    value,
  }: {
    value: string | number;
  }) => string | JSX.Element | number;
}

export interface PreAntColumn extends Omit<TableColumn, "fixed"> {
  key?: number | string;
  headerRenderer?: (obj: { column: PreAntColumn }) => any;
  className?: string;
  width?: number | string;
  ellipsis?: boolean | { showTitle?: boolean };
  formatter?: (rows: any) => any;
  sorter?: any;
  sortOrder?: any;
  loading?: boolean;
  state?: string;
  fixed?: string | number;
}

export interface TableAction {
  name: string;
  icon?: ReactElement<any, any>;
  action: (row: any) => void;
  className?: string;
}
