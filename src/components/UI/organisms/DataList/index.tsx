import React, { memo, ReactNode } from "react";
import { appStates } from "@Constants/appStates";
import { LoadingOutlined } from "@ant-design/icons";
import List from "@Components/UI/molecules/List";
import ListEmpty from "./empty";
import ListError from "./error";
import { ListProps } from 'antd/lib/list';
import { EmptyProps } from "antd";

interface Props extends ListProps<any> {
  showStatusFilter: boolean;
  size?: 'small' | 'default' | 'large';
  data: any;
  state: appStates,
  actions: () => JSX.Element,
  renderActions: () => JSX.Element,
  renderToolbar: (toolbarParams: any) => JSX.Element,
  renderEmpty: () => JSX.Element,
  renderError: () => JSX.Element,
  clickable: any,
  empty: Empty,
  error: any,
}

interface Empty extends EmptyProps {
  icon?: string;
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
}

const DataList = ({
  showStatusFilter = true,
  size,
  data,
  state,
  actions,
  renderActions,
  renderToolbar,
  renderEmpty,
  renderError,
  clickable,
  empty,
  error,
  ...rest
}: Props) => {
  return (
    <div className='list-wrapper'>
      {state === appStates.ERROR && (
        <div className='mb-md'>
          {renderError ? renderError() : <ListError {...error} />}
        </div>
      )}
      <div className='list-container'>
        {renderToolbar && (
          <div className='list-header'>
            <div className='list-toolbar'>{renderToolbar([])}</div>
          </div>
        )}
        <List
          itemLayout='horizontal'
          dataSource={data}
          loading={
            state === appStates.LOADING
              ? {
                  indicator: <LoadingOutlined style={{ fontSize: 32 }} spin />,
                }
              : false
          }
          locale={{
            emptyText: renderEmpty ? renderEmpty() : <ListEmpty {...empty} />,
          }}
          {...rest}
        />
      </div>
    </div>
  );
};

export default memo(DataList);
