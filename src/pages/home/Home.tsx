import React, {useContext} from "react";
import {Button, Text, View} from "react-native";
import {ClientAuthenticationContext} from "../../context/ClientAuthenticationContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Home = () => {
  const {setClientId} = useContext(ClientAuthenticationContext);

  const handleLogout = async () => {
      setClientId('');
    AsyncStorage.setItem('@clientId', '').then(r =>
      console.log("client id cleared",r)
    );
  }
  return (
    <View style={{flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
      <Text>Home</Text>
      <Button title={"LOG OUT"} onPress={handleLogout}/>
    </View>
  )
}
