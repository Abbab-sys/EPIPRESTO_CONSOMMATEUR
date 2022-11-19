export type settingInterface = {
    index: number;
    name: string;
    onPress: onPressInterface;
    icon: any;
}

export type onPressInterface = {
    type: string;
    object: any;
}