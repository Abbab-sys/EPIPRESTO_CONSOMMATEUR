import {KeyboardTypeOptions} from 'react-native';

/*
 * Name: Text Field Interface
 * Description: This is the interface for the Text Field.
 * Author: Alessandro van Reusel
 */

export interface TextField {
  label: string;
  title: string;
  attribute: string;
  keyboardType: KeyboardTypeOptions;
  secure: boolean;
  action: string;
  newTextAttribute: string;
}
