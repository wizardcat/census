import { LOCALES } from '@app/constants';
import messages from '@app/messages';
import flatten from 'flat';
import { Fragment } from 'react';
import { IntlProvider } from 'react-intl';

interface ProviderData {
  children: JSX.Element;
  locale: (typeof LOCALES)[keyof typeof LOCALES];
}

const Provider = ({ children, locale = LOCALES.ENGLISH }: ProviderData) => (
  <IntlProvider textComponent={Fragment} locale={locale} messages={flatten(messages[locale])}>
    {children}
  </IntlProvider>
);

Provider.displayName = 'I18nProvider';

Provider.defaultProps = {
  locale: LOCALES.ENGLISH,
};

export default Provider;
