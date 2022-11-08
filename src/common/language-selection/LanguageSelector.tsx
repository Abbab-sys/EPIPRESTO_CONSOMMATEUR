import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {SegmentedButtons} from 'react-native-paper';

const LanguageSelector = () => {
  const {t, i18n} = useTranslation('translation');
  const [value, setValue] = React.useState<string>('fr');

  useEffect(() => {
    i18n.changeLanguage(value);
  }, [i18n, value]);
  
  return (
    <SegmentedButtons
      value={value}
      onValueChange={setValue}
      buttons={[
        {
          value: 'fr',
          label: t('language.fr'),
          icon: require('../../assets/images/french.png'),
        },
        {
          value: 'en',
          label: t('language.en'),
          icon: require('../../assets/images/english.png'),
        },
      ]}
    />
  );
};

export default LanguageSelector;
