import { useAppSelector } from '../../redux/hooks';
import { Censuses } from '../../types';

export const useCensusTable = () => {

  const calcTotal = (rows: Censuses) => {
    return rows.reduce((prev, cur) => {
      return Number(prev) + Number(cur.males) + Number(cur.females);
    }, 0);
  };

  const rows = useAppSelector((state) => {
    return state.census.fetchedCensus;
  });

  const total = calcTotal(rows);

  return {
    total, rows
  }
}