import React, {Fragment, useCallback, useContext} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {Image, SafeAreaView, TouchableOpacity, View} from 'react-native';
import {Button} from 'react-native-paper';
import {Message, MessageStatus, Role} from '../../../hooks/ChatManagerHook';
import {ChatContext} from '../../../context/ChatContext';
import {ClientAuthenticationContext} from '../../../context/ClientAuthenticationContext';

interface message {
  _id: string;
  text: string;
  createdAt: Date;
  role: Role;
  status: MessageStatus;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
}

const Chat = ({navigation,chatId,goBack,route }: any) => {
 let finalChatId = chatId;
  if (route?.params?.chatId) {
    finalChatId = route.params.chatId;
  }
  let finalGoBack = goBack;
  if (route?.params?.goBack) {
    finalGoBack = route.params.goBack;
  }
  const [_,{sendMessage, getChatById}] = useContext(ChatContext);

  const {clientId} = useContext(ClientAuthenticationContext);

  const onSend = useCallback(
    (newMessage: message[]) => {
      sendMessage(finalChatId, newMessage[0].text);
    },
    [finalChatId, sendMessage],
  );

  const chat = getChatById(finalChatId);
  const navigateToOrder = () => {
    console.log("chat orderId : ", chat?.relatedOrderId)
    navigation.navigate('Order', {orderId: chat?.relatedOrderId,goBack:navigation.goBack})
  };
  const messages = chat?.messages.map((message: Message) => {
    return {
      _id: message.id,
      text: message.message,
      createdAt: new Date(message.date),
      role: message.role,
      status: message.status,
      user: {
        _id: message.role === Role.VENDOR ? chat.relatedVendorId : clientId,
        name: message.role === Role.VENDOR ? chat.relatedStoreName : 'Me',
        avatar:''
      },
    };
  });
  return (
    <Fragment>
      <SafeAreaView
        style={{
          flex: 0,
          backgroundColor: '#FF9933',
        }}
      />
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            backgroundColor: '#FF9933',
            elevation: 4,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{marginLeft: '2%', position: 'absolute', left: 0}}
            onPress={finalGoBack}>
            <Image
              style={{
                width: 35,
                height: 35,
                tintColor: 'black',
              }}
              source={require('../../../assets/icons/back.png')}
            />
          </TouchableOpacity>
          <Button
            style={{
              margin: 10,
            }}
            mode={'elevated'}
            compact={true}
            buttonColor={'#FFFFFF'}
            textColor={'#000000'}
            onPress={navigateToOrder}>
            View Order
          </Button>
        </View>
        <GiftedChat
          messages={messages}
          onSend={(messagesToSend: message[]) => onSend(messagesToSend)}
          user={{
            _id: clientId,
          }}
        />
      </SafeAreaView>
    </Fragment>
  );
};

export default Chat;
