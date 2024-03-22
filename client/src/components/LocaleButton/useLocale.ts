import { useAppDispatch, useAppSelector } from '@app/redux/hooks';
import { setCurrentLocale } from '@app/redux/localesSlice';
import { useState } from 'react';

export const useLocale = () => {
  const locale = useAppSelector((state) => {
    return state.locale.currentLocale;
  });

  const [selectedLocale, setSelectedLocale] = useState(locale);

  const handleLocaleChange = (event: React.MouseEvent<HTMLElement>, newSelectedLocale: string) => {
    setSelectedLocale(newSelectedLocale);
  };

  const handleLocaleClick = (locale: string) => {
    dispatch(setCurrentLocale(locale));
  };

  const dispatch = useAppDispatch();
  return {
    selectedLocale,
    handleLocaleChange,
    handleLocaleClick,
    locale,
  };
};
