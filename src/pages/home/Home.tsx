import React, {useContext} from "react";
import {SafeAreaView, Text} from "react-native";
import {ClientAuthenticationContext} from "../../context/ClientAuthenticationContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {BottomNavigation} from "react-native-paper";
import {useIconButton} from "../../atoms/IconButton";
import Dashboard from "../dashboard/Dashboard";
import ShoppingCart from "../shoppingCart/ShoppingCart";
import AllChats from "../chat/AllChats";
import OrdersHistory from "../ordersHistory/OrdersHistory";
import Stores from "../stores/Stores";
import Search from "../search/Search";


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
    {key: 'search', epiprestoTitle: 'Search', focusedIcon: 'magnify'},
    {key: 'stores', epiprestoTitle: 'Albums', focusedIcon: 'hamburger'},
    {key: 'cart', epiprestoTitle: 'Favorites', focusedIcon: 'cart', unfocusedIcon: 'cart-outline'},
    {key: 'orders', epiprestoTitle: 'Notifications', focusedIcon: 'basket'},
    {key: 'chats', epiprestoTitle: 'Chats', focusedIcon: 'message'},
  ]);
  const renderScene = BottomNavigation.SceneMap({
    cart: ShoppingCart,
    search: Search,
    stores: Stores,
    home: Dashboard,
    orders: OrdersHistory,
    chats: AllChats,
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
