import {useNavigation} from "@react-navigation/native";
import React, {useContext, useState} from "react";
import {useTranslation} from "react-i18next";
import {FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, View} from "react-native"
import {ChatContext} from "../../context/ChatContext";
import ChatSection from "./subsections/ChatSection";
import Chat from "./subsections/Chat";
import { IconButton } from "react-native-paper";

const AllChats = () => {
  const {t} = useTranslation('translation')

  const navigation = useNavigation()

  const [chats, {loading, refreshChats}] = useContext(ChatContext);


  console.log('CHAT MANAGER: ', chats);

  const [currChatId,setCurrChatId] = useState('')
  if (currChatId)
    return <Chat navigation={navigation}  chatId={currChatId} goBack={() => setCurrChatId('')}
    ></Chat>
  return(
    <SafeAreaView style={styles.root}>
      {chats.length === 0 ?
        (
          <View style={styles.innerView}>
            <Text>{t('chat.noChats')}</Text>
            <IconButton
              icon="reload"
              iconColor="orange"
              size={30}
              onPress={() => {
                refreshChats();
              }}
            />
          </View>
        ):(
          <FlatList
            data={chats}
            renderItem={({item, index}) => (
              <ChatSection
                key={index}
                orderNum={item.relatedOrderNumber}
                lastMessage={
                  item.messages.length > 0 ? item.messages[0].message : ''
                }
                date={item.messages.length > 0 ? item.messages[item.messages.length - 1].date : null}
               goToChat={()=>setCurrChatId(item.id)}/>
            )}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => {
                  refreshChats();
                }}
              />
            }
            keyExtractor={item => item.id}
          />
        )
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    margin: '4%'
  },
  innerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default AllChats
