import {IconButton, MD3Colors} from "react-native-paper";

export const useIconButton = (icon: string, onPress: () => void) => {

  const iconButton = (
    <IconButton
      icon={icon}
      iconColor={'#FFAA55'}
      size={20}
      onPress={onPress}
    />
  )
  return {iconButton};
}
