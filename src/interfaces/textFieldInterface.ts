import {KeyboardTypeOptions} from 'react-native';

export interface TextField {
  label: string;
  title: string;
  attribute: string;
  keyboardType: KeyboardTypeOptions;
  secure: boolean;
  action: string;
  newTextAttribute: string;
}
