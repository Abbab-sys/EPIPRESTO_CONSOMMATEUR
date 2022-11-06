import { StyleSheet } from "react-native"

export const StoreListStyles = StyleSheet.create({
    root: {
      flex: 1,
    //   margin: 20,
    },
    products: {
      flexDirection: "column"
    },
    surface: {
        flex: 10,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: "white"
    },
    cardStyle: {
        elevation: 4,
        // flex: 10,
        borderRadius: 30,
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        flexWrap: "wrap",
        alignItems: "stretch",
        justifyContent: "center",
        backgroundColor: "#FFA500",
        flexDirection: "column",
    },
    innerView: {
        flexDirection: "row",
    },
    cardContent: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
        margin: 4,
        // width: "inherit"
    },
    view: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    headline: {
        color: "#FFA500"
    },
    cardTitle: {
        color: "white"
    },
    innerCardTitle: {
        color: "black"
    }, 
    data: {
        color: "#FFA500"
    },
    errorText: {
        textAlign: 'center',
    },
    innerContainer: {
        justifyContent: 'center',
        flex: 1
    },
    loading: {
        justifyContent: 'center',
        flex: 1,
        marginBottom: '2%'
    }
})