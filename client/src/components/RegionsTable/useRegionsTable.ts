import { useRegion } from '@app/hooks/useRegion';
import { useAppDispatch, useAppSelector } from '@app/redux/hooks';
import { setCurrentRegionId } from '@app/redux/regionsSlice';
import { MouseEvent, useEffect, useRef, useState } from 'react';

export const useRegionsTable = () => {
  const [regionId, setRegionId] = useState(0);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(0);
  const prevPage = useRef(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [lastIdList, setLastIdList] = useState([]);

  const locale = useAppSelector((state) => {
    return state.locale.currentLocale;
  });

  const regionNameFilter = useAppSelector((state) => {
    return state.region.regionNameFilter;
  });

  const [params, setParams] = useState({
    lastId: lastIdList[page - 1],
    skip: rowsPerPage,
    take: rowsPerPage,
    locale,
    region: regionNameFilter,
  });

  const regs = useRegion(params);

  useEffect(() => {
    let idx = 0;
    if (page > prevPage.current) {
      idx = page <= 1 ? 0 : page - 1;
    } else {
      idx = page;
    }
    if (lastIdList.length === 0 || lastIdList[idx] >= 0) {
      setParams({
        lastId: lastIdList[page - 1],
        skip: rowsPerPage,
        take: rowsPerPage,
        locale,
        region: regionNameFilter,
      });
    }
  }, [locale, page, rowsPerPage, lastIdList, regionNameFilter]);

  useEffect(() => {
    if (regs?.regions.length > 0) {
      setRegionId(regs?.regions[0].id);
    }
  }, [page, regs]);

  useEffect(() => {
    if (regionId > 0) {
      dispatch(setCurrentRegionId(regionId));
    }
  }, [dispatch, regionId]);

  const handleListItemClick = (event: MouseEvent<HTMLElement>, id: number) => {
    setRegionId(id);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    prevPage.current = page;

    setLastIdList((prev) => {
      let newList: any = prev;
      if (prev.length === 0 || page === 0) {
        newList[0] = regs.regions[regs.regions.length - 1].id;
      } else {
        newList[page] = regs.regions[regs.regions.length - 1].id;
      }

      return newList;
    });

    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setLastIdList([]);
  };

  return {
    // regData, isLoading, error, isFetching,
    regs,
    handleListItemClick,
    regionId,
    rowsPerPage,
    page,
    handleChangePage,
    handleChangeRowsPerPage,
  };
};
