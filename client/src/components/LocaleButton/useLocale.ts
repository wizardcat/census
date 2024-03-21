import { useAppDispatch, useAppSelector } from '@app/redux/hooks';
import { setLocale } from '@app/redux/localesSlice';
import { useState } from 'react';

export const useLocale = () => {
  const locale = useAppSelector((state) => {
    return state.locale.locale;
  });

  const [selectedLocale, setSelectedLocale] = useState(locale);

  const handleLocaleChange = (event: React.MouseEvent<HTMLElement>, newSelectedLocale: string) => {
    setSelectedLocale(newSelectedLocale);
  };

  const handleLocaleClick = (locale: string) => {
    dispatch(setLocale(locale));
  };

  const dispatch = useAppDispatch();
  return {
    selectedLocale,
    handleLocaleChange,
    handleLocaleClick,
    locale,
  };
};
