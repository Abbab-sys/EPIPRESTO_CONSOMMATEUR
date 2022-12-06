/*
 * Name: Settings Interface
 * Description: This file is used to define the interfaces of the settings.
 * Author: Adam Naoui-Busson, Zouhair Derouich
 */

export type settingInterface = {
  index: number;
  name: string;
  onPress: onPressInterface;
  icon: any;
};

export type onPressInterface = {
  type: string;
  object: any;
};
