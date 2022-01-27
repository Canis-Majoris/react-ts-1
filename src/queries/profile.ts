import endpoints from '@Modules/api/endpoints';
import request from '@Modules/api/request';
import qs from 'qs';

/* getProfileInvestmentsDistributionQuery */
export interface ProfileInvestmentsDistributionQueryFilters {
  portalUserId?: string;
  userProfileIds: string[];
  legalEntityIds: string[];
}

export const getProfileInvestmentsDistributionQuery = async ({
  portalUserId,
  userProfileIds,
  legalEntityIds,
}: ProfileInvestmentsDistributionQueryFilters): Promise<any> => {
  const { data } = await request.get(
    `${endpoints.api.investor_portal.profile.investments.distributions_over_time(
      {
        portalUserId,
      }
    )}?${qs.stringify({
      userProfileId: userProfileIds,
      legalEntityId: legalEntityIds,
    })}`
  );
  return data;
};

export interface ProfileInvestmentsSummaryQueryFilters {
  portalUserId?: string;
  userProfileIds: string[];
  legalEntityIds: string[];
}

/* getProfilePortfolioAllocationQuery */
export interface ProfilePortfolioAllocationQueryFilters {
  portalUserId?: string;
  userProfileIds: string[];
  legalEntityIds: string[];
}

export const getProfilePortfolioAllocationQuery = async ({
  portalUserId,
  userProfileIds,
  legalEntityIds,
}: ProfilePortfolioAllocationQueryFilters): Promise<any> => {
  const { data } = await request.get(
    `${endpoints.api.investor_portal.profile.portfolio_allocation({
      portalUserId,
    })}?${qs.stringify({
      userProfileId: userProfileIds,
      legalEntityId: legalEntityIds,
    })}`
  );
  return data;
};

/* getProfileStatisticsQuery */
export interface ProfileStatisticsQueryFilters {
  portalUserId?: string;
  userProfileIds: string[];
  legalEntityIds: string[];
}

export const getProfileStatisticsQuery = async ({
  portalUserId,
  userProfileIds,
  legalEntityIds,
}: ProfileStatisticsQueryFilters): Promise<any> => {
  const { data } = await request.get(
    `${endpoints.api.investor_portal.profile.stats({
      portalUserId,
    })}?${qs.stringify({
      userProfileId: userProfileIds,
      legalEntityId: legalEntityIds,
    })}`
  );
  return data;
};
