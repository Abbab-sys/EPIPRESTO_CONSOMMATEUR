import React, {useContext} from "react";
import {Text} from "react-native";
import {ClientAuthenticationContext} from "../../context/ClientAuthenticationContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {BottomNavigation} from "react-native-paper";

const MusicRoute = () => <Text>Music</Text>;

const AlbumsRoute = () => <Text>Albums</Text>;

const RecentsRoute = () => <Text>Recents</Text>;

const NotificationsRoute = () => <Text>Notifications</Text>;

export const Home = () => {
  const {setClientId} = useContext(ClientAuthenticationContext);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'music', title: 'Favorites', focusedIcon: 'heart', unfocusedIcon: 'heart-outline'},
    { key: 'albums', title: 'Albums', focusedIcon: 'album' },
    { key: 'recents', title: 'Recents', focusedIcon: 'history' },
    { key: 'notifications', title: 'Notifications', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },
  ]);
  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
    recents: RecentsRoute,
    notifications: NotificationsRoute,
  });


  const handleLogout = async () => {
      setClientId('');
    AsyncStorage.setItem('@clientId', '').then(r =>
      console.log("client id cleared",r)
    );
  }
  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  )
}
