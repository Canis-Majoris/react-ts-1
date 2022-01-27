import { memo } from 'react';
import { Col, Row } from '@Components/containers/shared/Grid';
import DashboardToolbar from '@Features/dashboard/shared/DashboardToolbar';
import DashboardTotalValuesPanel from '@Features/dashboard/panels/DashboardTotalValuesPanel';
import DashboardSummaryPanel from '@Features/dashboard/panels/DashboardSummaryPanel';
import DashboarDistributionPanel from '@Features/dashboard/panels/DashboardDistributionPanel';
import DashboarAllocationPanel from '@Features/dashboard/panels/DashboardAllocationPanel';
import DashboarInvestmentsPanel from '@Features/dashboard/panels/DashboardInvestmentsPanel';
import LiveOfferingsPanel from '@Components/UI/organisms/LiveOfferingsPanel';
import RecentUpdatesPanel from '@Components/UI/organisms/RecentUpdatesPanel';
import './index.less';

interface DashboarPageTemplateProps {
  showAllocationPanel?: boolean;
  showRightPanel?: boolean;
}

const DashboarPageTemplate = memo((props: DashboarPageTemplateProps) => {
  return (
    <div className='dashboard-page-template w-100'>
      <Row gutter={[24, 24]}>
        <Col span={24} md={16}>
          <div className='dashboard-page-template-statistics'>
            <DashboardToolbar />
            <Row
              gutter={[{ xs: 0, sm: 24 }, 24]}
              className='dashboard-page-template-grid-stats'
            >
              <Col span={24} sm={24} lg={12}>
                <DashboardTotalValuesPanel />
              </Col>
              <Col span={24} sm={24} lg={12}>
                <DashboardSummaryPanel />
              </Col>
              <Col span={24} sm={24} lg={12}>
                <DashboarAllocationPanel />
              </Col>
              <Col span={24} sm={24} lg={12}>
                <DashboarDistributionPanel />
              </Col>
              <Col span={24}>
                <DashboarInvestmentsPanel />
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={24} md={8}>
          <div className='dashboard-page-template-info'>
            <LiveOfferingsPanel mb='lg' />
            <RecentUpdatesPanel />
          </div>
        </Col>
      </Row>
    </div>
  );
});

export default DashboarPageTemplate;
