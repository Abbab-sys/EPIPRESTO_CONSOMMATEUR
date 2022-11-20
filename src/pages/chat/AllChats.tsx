import {useNavigation} from "@react-navigation/native";
import React, {useContext, useState} from "react";
import {useTranslation} from "react-i18next";
import {FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, View} from "react-native"
import {ChatContext} from "../../context/ChatContext";
import ChatSection from "./subsections/ChatSection";
import Chat from "./subsections/Chat";
import {IconButton} from "react-native-paper";
import Loading from "../../components/cart/Loading";

const AllChats = () => {
  const {t} = useTranslation('translation')

  const navigation = useNavigation()

  const [chats, {loading, refreshChats, error}] = useContext(ChatContext);


  const [currChatId, setCurrChatId] = useState('')
  if (currChatId)
    return <Chat navigation={navigation} chatId={currChatId} goBack={() => setCurrChatId('')}
    ></Chat>
  return (
    <SafeAreaView style={styles.root}>
      {loading ? (
        <Loading/>
      ) : error ? (
        <View style={styles.innerView}>
          <Text>{t("chat.error")}</Text>
          <IconButton
            icon="reload"
            iconColor="orange"
            size={30}
            onPress={() => {
              refreshChats();
            }}
          />
        </View>
      ) : chats.length === 0 ?
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
        ) : (
          <FlatList
            data={chats}
            renderItem={({item, index}) => {
              if (item.messages.length === 0) return null
              return (
                <ChatSection
                  key={index}
                  orderNum={item.relatedOrderNumber}
                  lastMessage={
                    item.messages.length > 0 ? item.messages[0].message : ''
                  }
                  date={item.messages.length > 0 ? item.messages[item.messages.length - 1].date : null}
                  goToChat={() => setCurrChatId(item.id)}/>)
            }}
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
      </View>
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
  },
  titleView: {
    flex: 88,
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 36,
    includeFontPadding: false,
    color: '#000000',
    textAlignVertical: 'center',
  },
  restMargin: {
    flex: 671,
  },
})

export default AllChats
