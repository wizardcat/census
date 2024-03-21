import { getCensus } from '@app/services/census.service';
import { Census, QueryGetCensusParams } from '@app/types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
// import { errorCatch } from '@/api/api.helper';

export const useCensus = (params: QueryGetCensusParams): Census[] => {
  const { data } = useQuery({
    queryKey: ['get census', params],
    queryFn: () => getCensus(params),
    placeholderData: keepPreviousData,
    // staleTime: 5000,
    //   , {
    //   // select: ({ data }) => data,
    //   onError: (error) => {
    //     // console.log(errorCatch(error));
    //   },
    //   enabled: true,
    // }
  });

  return data?.data;
};
