import { useNavigation } from '@react-navigation/native';
import {settingInterface} from '../../interfaces/SettingsInterface';
import { LanguageInfo } from './LanguageItem';



export const SettingsItemInfo: settingInterface[] = [
  {
    index: 0,
    name: 'settings.account.title',
    onPress: {
      type: 'navigation',
      object: {
        routeName: 'Account',
        params : {}
      },
    },
    icon: 'account',
  },
  {
    index: 1,
    name: 'settings.language',
    onPress: {
      type: 'navigation',
      object: {
        routeName: 'Settings',
        params: {
          title: 'settings.language',
          items: LanguageInfo,
      },
    },
  },
    icon: 'earth',
  },
  {
    index: 2,
    name: 'settings.logout',
    onPress: {
      type: 'logout',
      object: {},
    },
    icon: 'logout',
  },
];