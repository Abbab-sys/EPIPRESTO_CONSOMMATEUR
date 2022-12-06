import {Dimensions, StyleSheet} from 'react-native';

/*
 * Name: Product Styles
 * Description: This file is used to display the product styles.
 * Author: Khalil Zriba, Ryma Messedaa
 */

const width = Dimensions.get('window').width;

export const productStyles = StyleSheet.create({
  root: {
    width: width / 2,
    flex: 1,
  },
  productInfo: {
    textAlign: 'center',
    height: 40,
    marginVertical: '2%',
  },
  cardStyle: {
    flex: 1,
    elevation: 4,
    borderRadius: 30,
    margin: '5%',
    paddingRight: '5%',
    paddingBottom: '5%',
    paddingLeft: '5%',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 360,
  },
  buttonStyle: {
    borderRadius: 30,
    color: 'white',
    backgroundColor: '#FFA500',
    width: 'auto',
  },
  image: {
    resizeMode: 'contain',
    height: 100,
    width: '100%',
    marginTop: '3%',
  },
  buttonText: {
    color: 'white',
  },
  icon: {
    alignSelf: 'center',
  },
});
