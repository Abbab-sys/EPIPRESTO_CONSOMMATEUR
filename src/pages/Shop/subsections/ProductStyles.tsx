import { Dimensions, StyleSheet } from "react-native"

const width = Dimensions.get('window').width

export const productStyles = StyleSheet.create({
  root: {
    width: width / 2,
    flex: 1
  },
  productName: {
    textAlign: 'center',
    marginVertical: '4%'
  },
  cardStyle: {
    flex: 1,
    elevation: 4,
    borderRadius: 30,
    margin: '5%',
    padding: '5%',
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonStyle: {
    borderRadius: 30,
    color: "white",
    backgroundColor: "#FFA500",
    width: "auto"
  },
  image: {
    resizeMode:'contain',
    height: 100,
    width: '100%',
  },
  buttonText: {
    color: 'white'
  },
  icon: {
    alignSelf: "center"
  }
})