import { StyleSheet } from "react-native";

export const SnackbarStyles = StyleSheet.create({
    successSnackbar: {
        backgroundColor: '#4caf50',
    },
    errorSnackbar: {
        backgroundColor: '#f44336',
    },
    icon: {
        position: 'absolute',
        left: 10,
        top: 10,
    }
})