import { getRegionsAll } from '@app/services/region.service';
import { QueryGetRegionsParams } from '@app/types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
// import { errorCatch } from '@/api/api.helper';

export const useRegion = (params: QueryGetRegionsParams) => {
  const { data } = useQuery({
    queryKey: ['get regions', params],
    queryFn: () => getRegionsAll(params),
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
