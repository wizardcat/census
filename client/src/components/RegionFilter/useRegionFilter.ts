import { ChangeEvent, useRef } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import debounce from '@mui/utils/debounce';
import { setRegionNameFilter } from '../../redux/regionsSlice';

export const useRegionFilter = () => {
  const dispatch = useAppDispatch();
  const changeRegion = useRef(debounce((value) => dispatch(setRegionNameFilter(value)), 500)).current;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    changeRegion(event.target.value);

  return {
    handleChange
  }
}