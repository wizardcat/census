import { MouseEvent, useState } from 'react';
import messages from '../../messages';
import { SortOrder } from '../../types';
import { getPropertyChains } from '../../utils';

export const useCensusTableHeader = () => {
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [sortBy, setSortBy] = useState('');
  const messageIds = getPropertyChains(messages.uk, 'tableCensus');

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
