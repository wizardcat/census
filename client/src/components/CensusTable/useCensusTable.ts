import { useAppSelector } from '@app/redux/hooks';
import { Census, CensusData } from '@app/types';

export const useCensusTable = () => {
  const calcTotal = (censusData: CensusData) => {
    return censusData.reduce((prev, cur) => {
      return Number(prev) + Number(cur.males) + Number(cur.females);
    }, 0);
  };

  const censusData = useAppSelector((state) => {
    return state.census.fetchedCensus;
  });

  const total = calcTotal(censusData);

  const getPercentOfTotal = (peopleCount: Pick<Census, 'males' | 'females'>): string | null => {
    const percent =
      peopleCount.males || peopleCount.females
        ? (((Number(peopleCount.males) + Number(peopleCount.females)) * 100) / total).toFixed(3)
        : null;
    return percent;
  };

  return {
    getPercentOfTotal,
    censusData,
  };
};
