import { useCensus } from '@app/hooks/useCensus';
import { useAppSelector } from '@app/redux/hooks';
import { Census } from '@app/types';

export const useCensusTable = () => {
  const locale = useAppSelector((state) => {
    return state.locale.currentLocale;
  });

  const currentRegionId = useAppSelector((state) => {
    return state.region.currentRegionId;
  });

  const calcTotal = (censusData: Census[]) => {
    return censusData.reduce((prev, cur) => {
      return Number(prev) + Number(cur.males) + Number(cur.females);
    }, 0);
  };

  const censusData = useCensus({
    locale,
    regionId: currentRegionId,
  });

  const total = censusData ? calcTotal(censusData) : 0;

  const getPercentOfTotal = (males: number | null, females: number | null): string | null => {
    const percent =
      males || females ? (((Number(males) + Number(females)) * 100) / total).toFixed(3) : null;
    return percent;
  };

  return {
    getPercentOfTotal,
    censusData,
  };
};
