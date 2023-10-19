import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { LOCALES } from '../../const';
import { useLocale } from './useLocale';

const LocaleButton = () => {
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
      <ToggleButton value="uk" onClick={() => handleLocaleClick(LOCALES.UKRAINIAN)}>
        UK
      </ToggleButton>
      <ToggleButton value="en" onClick={() => handleLocaleClick(LOCALES.ENGLISH)}>
        EN
      </ToggleButton>
      <ToggleButton value="ru" onClick={() => handleLocaleClick(LOCALES.RUSSIAN)}>
        RU
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default LocaleButton;

