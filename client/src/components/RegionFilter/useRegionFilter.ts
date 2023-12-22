import debounce from '@mui/utils/debounce';
import { ChangeEvent, useRef } from 'react';
import { useIntl } from 'react-intl';
import { useAppDispatch } from '../../redux/hooks';
import { setRegionNameFilter } from '../../redux/regionsSlice';

export const useRegionFilter = () => {
  const dispatch = useAppDispatch();
  const intl = useIntl();

  const placeholderText = intl.formatMessage({
    id: 'regionFilterPlaceholder',
  });

  const changeRegion = useRef(
    debounce((value) => dispatch(setRegionNameFilter(value)), 500),
  ).current;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => changeRegion(event.target.value);

  return {
    handleChange,
    placeholderText,
  };
};
