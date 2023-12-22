import { MouseEvent, useState } from 'react';
// import { useAppSelector } from '../../redux/hooks';
import { SortOrder } from '../../types';

export const useCensusTableHeader = () => {
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [sortBy, setSortBy] = useState('');

  const messageIds = [
    'tableCensus.header.position',
    'tableCensus.header.language',
    'tableCensus.header.langGroup',
    'tableCensus.header.male',
    'tableCensus.header.female',
    'tableCensus.header.bothSexes',
    'tableCensus.header.percentOfTotal',
  ];

  const handleRequestSort = (event: MouseEvent<unknown>, property: string) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const createSortHandler = (property: string) => (event: MouseEvent<unknown>) => {
    handleRequestSort(event, property);
  };

  const getSortDirection = (mesId: string) => (sortBy === mesId ? sortOrder : false);

  const getActive = (mesId: string) => sortBy === mesId;

  const getDirection = (mesId: string) => (sortBy === mesId ? sortOrder : 'asc');

  return {
    sortOrder,
    sortBy,
    handleRequestSort,
    createSortHandler,
    messageIds,
    getSortDirection,
    getActive,
    getDirection,
  };
};
