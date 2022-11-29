import {StyleSheet} from 'react-native';

const text_font_family = 'Lato';
const text_font_style = 'normal';

export const storeStyles = StyleSheet.create({
  root: {
    flex: 1,
    //   margin: 20,
  },
  products: {
    flexDirection: 'column',
  },
  surface: {
    flex: 10,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  cardStyle: {
    elevation: 4,
    // flex: 10,
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    flexWrap: 'wrap',
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  innerView: {
    flexDirection: 'row',
  },
  cardContent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    margin: 4,
    // width: "inherit"
  },
  view: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headline: {
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    fontFamily: text_font_family,
    fontStyle: text_font_style,
  },
  category: {
    fontFamily: text_font_family,
    fontStyle: text_font_style,
  },
  cardTitle: {},
  innerCardTitle: {},
  data: {},
  errorText: {
    textAlign: 'center',
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  loading: {
    justifyContent: 'center',
    flex: 1,
    marginBottom: '2%',
  },
  searchBar: {
    marginBottom: '2%',
    marginTop: '1%',
    marginHorizontal: '2%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(242, 244, 248, 0.93)',
    elevation: 5,
  },
  titleWrapper: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  back_button: {
    width: 50,
    zIndex: 1,
    height: 50,
    marginLeft: '2%',
    position: 'absolute',
    left: 0,
    alignSelf: 'flex-start'
  },
  back_button_icon: {
    width: 35,
    height: 35,
    tintColor: '#FFA500',
  },
  title: {
    flex: 1,
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 36,
    includeFontPadding: false,
    textAlignVertical: 'center',
    textAlign: "center",
    marginRight: 50,
    color: '#000000',
  },
});
