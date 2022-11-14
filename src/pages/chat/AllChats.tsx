import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native"
import { ChatContext } from "../../context/ChatContext";
import ChatSection from "./subsections/ChatSection";

const AllChats = () => {
  const {t} = useTranslation('translation')

  const navigation = useNavigation()

  const [chats, {sendMessage, getChatById}] = useContext(ChatContext);

  console.log('CHAT MANAGER: ', chats);

  return(
    <SafeAreaView style={styles.root}>
      {chats.length === 0 ?
        (
          <View style={styles.innerView}>
            <Text>{t('chat.noChats')}</Text>
          </View>
        ):(
          <FlatList
            data={chats}
            renderItem={({item, index}) => (
              <ChatSection
                key={index}
                id={item.id}
                navigation={navigation}
                orderNum={item.relatedOrderNumber}
                lastMessage={
                  item.messages.length > 0 ? item.messages[0].message : ''
                }
                date={item.messages.length > 0 ? item.messages[item.messages.length - 1].date : null}
              />
            )}
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