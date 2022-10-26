import React, {useContext} from "react";
import {Button, Text, View} from "react-native";
import {ClientAuthenticationContext} from "../../context/ClientAuthenticationContext";

export const Home = () => {
  const {setClientId} = useContext(ClientAuthenticationContext);

  const handleLogout = async () => {
      setClientId('');
  }
  return (
    <View style={{flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
      <Text>Home</Text>
      <Button title={"LOG OUT"} onPress={handleLogout}/>
    </View>
  )
}
