import React, {useContext} from "react";
import {SafeAreaView, Text} from "react-native";
import {ClientAuthenticationContext} from "../../context/ClientAuthenticationContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {BottomNavigation} from "react-native-paper";
import {useIconButton} from "../../atoms/IconButton";

const MusicRoute = () => <Text>Music</Text>;

const AlbumsRoute = () => <Text>Albums</Text>;

const RecentsRoute = () => <Text>Recents</Text>;

const NotificationsRoute = () => {
  const {setClientId} = useContext(ClientAuthenticationContext);
  const handleLogout = async () => {
    setClientId('');
    AsyncStorage.setItem('@clientId', '').then(r =>
      console.log("client id cleared", r)
    );
  }
  const bellButton=useIconButton('logout', () => {
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
    {key: 'recents', epiprestoTitle: 'Recents', focusedIcon: 'home'},
    {key: 'albums', epiprestoTitle: 'Albums', focusedIcon: 'hamburger'},
    {key: 'music', epiprestoTitle: 'Favorites', focusedIcon: 'cart', unfocusedIcon: 'cart-outline'},
    {key: 'notifications', epiprestoTitle: 'Notifications', focusedIcon: 'basket'},
    {key: 'menu', epiprestoTitle: 'Notifications', focusedIcon: 'menu'},
  ]);
  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
    recents: RecentsRoute,
    notifications: NotificationsRoute,
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
