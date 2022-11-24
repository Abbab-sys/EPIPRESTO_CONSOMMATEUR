import {DefaultTheme} from "react-native-paper";

//TODO - change the colors to your liking
export const theme = {
  ...DefaultTheme,
  "colors": {
    // couleur bouton
    "primary": "rgb(32, 27, 23)",
    "onPrimary": "rgb(75, 40, 0)",
    "primaryContainer": "rgb(107, 59, 0)",
    "onPrimaryContainer": "rgb(255, 220, 192)",
    "secondary": "rgb(226, 192, 164)",
    "onSecondary": "rgb(65, 44, 25)",
    "secondaryContainer": "rgb(89, 66, 45)",
    "onSecondaryContainer": "rgb(255, 220, 192)",
    "tertiary": "rgb(194, 204, 153)",
    "onTertiary": "rgb(44, 52, 15)",
    "tertiaryContainer": "rgb(66, 74, 35)",
    "onTertiaryContainer": "rgb(222, 232, 179)",
    "error": "rgb(147, 0, 10)",
    "onError": "rgb(105, 0, 5)",
    "errorContainer": "rgb(147, 0, 10)",
    "onErrorContainer": "rgb(255, 180, 171)",
    "background": "#FFFFFF",
    "onBackground": "rgb(236, 224, 217)",
    "surface": "#F2F4F8",
    // main texte de l'app
    "onSurface": "rgb(32, 27, 23)",
    "surfaceVariant": "rgb(81, 68, 58)",
    "outline": "rgb(158, 142, 129)",
    "outlineVariant": "rgb(81, 68, 58)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(236, 224, 217)",
    "inverseOnSurface": "rgb(53, 47, 43)",
    "inversePrimary": "rgb(140, 79, 0)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(43, 35, 28)",
      "level2": "rgb(50, 40, 31)",
      "level3": "rgb(57, 44, 33)",
      "level4": "rgb(59, 46, 34)",
      "level5": "rgb(63, 49, 36)"
    },
    // couleur boutton (et texte) disabled
    "surfaceDisabled": "rgba(236, 224, 217, 0.12)",
    backdrop: "rgba(57, 46, 37, 0.4)"
  }
};
