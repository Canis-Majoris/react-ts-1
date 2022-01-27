import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Offering } from '@Types/offering';
import Button from '@Components/UI/atoms/Button';
import BulletNavigation from '@Components/UI/organisms/BulletNavigation';
import './index.less';

export interface LiveOfferingsPanelActionsrProps {
  loading?: boolean;
  offeringsList: any[];
  onChangeItem: (index: number) => void;
  index: number;
  dataLength: number;
}

export const LiveOfferingsPanelActions = memo(
  ({
    offeringsList,
    onChangeItem,
    index,
    dataLength,
  }: LiveOfferingsPanelActionsrProps) => {
    const { t,i18n } = useTranslation();
    const isHebrew = i18n.language === "he"

    const handleNavigationChange = (newIndex: number) => {
      onChangeItem && onChangeItem(newIndex);
    };

    const handlePreviousClick = (e) => {
      e.stopPropagation();
      onChangeItem && onChangeItem(Math.max(0, index - 1));
    };
    const handleNextClick = (e) => {
      e.stopPropagation();
      onChangeItem &&
        onChangeItem(Math.min(offeringsList?.length - 1, index + 1));
    };

    //(TBD)
    return (
      <div className='live-offerings-panel-actions'>
        <Button
          type='text'
          size='small'
          className='font-size-sm'
          onClick={handlePreviousClick}
          disabled={index === 0}
        >
          <LeftOutlined rotate={isHebrew ? 180: 0} style={{ fontSize: 12 }} />
          {t("osp_previous_button")}
        </Button>
        <BulletNavigation
          index={index}
          items={
            offeringsList
              ? offeringsList.map(
                  ({ offeringName }: Offering) => offeringName
                )
              : []
          }
          onChange={handleNavigationChange}
        />
        <Button
          type='text'
          size='small'
          className='font-size-sm'
          onClick={handleNextClick}
          disabled={index === dataLength - 1}
        >
          {t("osp_next_button")}
          <RightOutlined rotate={isHebrew ? 180: 0} style={{ fontSize: 12 }} />
        </Button>
      </div>
    );
  }
);

export default LiveOfferingsPanelActions;
