import {IconButton, MD3Colors} from "react-native-paper";

export const useIconButton = (icon: string, onPress: () => void) => {

  const iconButton = (
    <IconButton
      icon={icon}
      iconColor={MD3Colors.error50}
      size={20}
      onPress={onPress}
    />
  )
  return {iconButton};
}
