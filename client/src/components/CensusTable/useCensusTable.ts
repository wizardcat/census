import { substitutions } from '@app/constants';
import { useCensus } from '@app/hooks/useCensus';
import { useAppSelector } from '@app/redux/hooks';
import { Census } from '@app/types';
import { useIntl } from 'react-intl';

export const useCensusTable = () => {
  const { formatMessage } = useIntl();

  const locale = useAppSelector((state) => {
    return state.locale.currentLocale;
  });

  const currentRegionId = useAppSelector((state) => {
    return state.region.currentRegionId;
  });

  const censusData = useCensus({
    locale,
    regionId: currentRegionId,
  });

  const calcTotal = (censusData: Census[]) => {
    return censusData.reduce((prev, cur) => {
      return Number(prev) + Number(cur.males) + Number(cur.females);
    }, 0);
  };

  const total = censusData ? calcTotal(censusData) : 0;

  const getPercentOfTotal = (males: number = 0, females: number = 0): string | null => {
    const percent = males || females ? (((males + females) * 100) / total).toFixed(3) : null;
    return percent;
  };

  const getLanguageName = (languageName: string) => {
    const id = substitutions.language.find((w) => w.wordForms.includes(languageName))?.intlId;

    if (id) return formatMessage({ id });

    return languageName;
  };

  const getLanguageGroupName = (languageGroupName: string) => {
    const slg = substitutions.languageGroup;
    const isInclude = slg.wordForms.includes(languageGroupName);

    if (isInclude) return formatMessage({ id: slg.intlId });

    return languageGroupName;
  };

  return {
    censusData,
    getPercentOfTotal,
    getLanguageName,
    getLanguageGroupName,
  };
};
