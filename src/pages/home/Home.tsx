import React, {useContext} from "react";
import {SafeAreaView, Text} from "react-native";
import {ClientAuthenticationContext} from "../../context/ClientAuthenticationContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {BottomNavigation} from "react-native-paper";
import {useIconButton} from "../../atoms/IconButton";
import Dashboard from "../dashboard/Dashboard";
import {Cart} from "../../components/cart/Cart";
import ShoppingCart from "../shoppingCart/ShoppingCart";


const AlbumsRoute = () => <Text>Albums</Text>;

const RecentsRoute = () => <Text>Recents</Text>;

const HomeRoute = () => <Dashboard />



const NotificationsRoute = () => {
  const {setClientId} = useContext(ClientAuthenticationContext);
  const handleLogout = async () => {
    setClientId('');
    AsyncStorage.setItem('@clientId', '').then(r =>
      console.log("client id cleared", r)
    );
  }
  const bellButton = useIconButton('logout', () => {
    handleLogout();
  });
  return (
    <SafeAreaView>
      <Text>Notifications {bellButton.iconButton}</Text>
    </SafeAreaView>

  )
}

export const Home = () => {

  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    {key: 'home', epiprestoTitle: 'Home', focusedIcon: 'home'},
    {key: 'stores', epiprestoTitle: 'Albums', focusedIcon: 'hamburger'},
    {key: 'cart', epiprestoTitle: 'Favorites', focusedIcon: 'cart', unfocusedIcon: 'cart-outline'},
    {key: 'orders', epiprestoTitle: 'Notifications', focusedIcon: 'basket'},
    {key: 'menu', epiprestoTitle: 'Notifications', focusedIcon: 'menu'},
  ]);
  const renderScene = BottomNavigation.SceneMap({
    cart: ShoppingCart,
    stores: Cart,
    home: RecentsRoute,
    orders: NotificationsRoute,
    menu: RecentsRoute,
  });

  return (
    <BottomNavigation
      barStyle={{ backgroundColor: '#FFAA55' }}
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  )
}
