import messages from '@app/messages';
import { SortOrder } from '@app/types';
import { getPropertyChains } from '@app/utils';
import { MouseEvent, useState } from 'react';

export const useCensusTableHeader = () => {
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [sortBy, setSortBy] = useState('');
  const messageIds = getPropertyChains(messages.uk, 'tableCensus').filter(
    (id) => id !== 'tableCensus.total',
  );

  const handleRequestSort = (event: MouseEvent<unknown>, property: string) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const createSortHandler = (property: string) => (event: MouseEvent<unknown>) => {
    handleRequestSort(event, property);
  };

  const getSortDirection = (id: string) => (sortBy === id ? sortOrder : false);

  const getActive = (id: string) => sortBy === id;

  const getDirection = (id: string) => (sortBy === id ? sortOrder : 'asc');

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
