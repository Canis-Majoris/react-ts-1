import { QueryCache, QueryClient } from 'react-query';

export const queryClientSetup = ({ queryCahceOnError }) =>
  new QueryClient({
    queryCache: new QueryCache({
      onError: queryCahceOnError,
    }),
  });
