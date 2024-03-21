import { locales } from '@app/constants';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useLocale } from './useLocale';

export const LocaleButton = () => {
  const { selectedLocale, handleLocaleChange, handleLocaleClick, locale } = useLocale();

  return (
    <ToggleButtonGroup
      color="primary"
      value={selectedLocale}
      exclusive
      onChange={handleLocaleChange}
      aria-label="Platform"
      defaultValue={locale}
      sx={{ height: '20px', marginBottom: '20px' }}
    >
      <ToggleButton value="uk" onClick={() => handleLocaleClick(locales.UKRAINIAN)}>
        UK
      </ToggleButton>
      <ToggleButton value="en" onClick={() => handleLocaleClick(locales.ENGLISH)}>
        EN
      </ToggleButton>
      <ToggleButton value="ru" onClick={() => handleLocaleClick(locales.RUSSIAN)}>
        RU
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
