import {IconButton} from 'react-native-paper';

/*
 * Name: use Icon Button
 * Description: This hook is used to create an icon button
 * Author: Adam Naoui-Busson, Zouhair Derouich
 */

export const useIconButton = (icon: string, onPress: () => void) => {
  const iconButton = (
    <IconButton icon={icon} iconColor={'#FFAA55'} size={20} onPress={onPress} />
  );
  return {iconButton};
};
