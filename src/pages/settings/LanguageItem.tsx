import {settingInterface} from '../../interfaces/SettingsInterface';

/*
 * Name: Language Info
 * Description: This file is used to display the language info (english or french).
 * Author: Alessandro van Reusel
 */

export const LanguageInfo: settingInterface[] = [
  {
    index: 0,
    name: 'language.en',
    onPress: {
      type: 'language',
      object: 'en',
    },
    icon: require('../../assets/images/english.png'),
  },
  {
    index: 1,
    name: 'language.fr',
    onPress: {
      type: 'language',
      object: 'fr',
    },
    icon: require('../../assets/images/french.png'),
  },
];
