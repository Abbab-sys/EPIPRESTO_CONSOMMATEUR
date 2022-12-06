import React, {createContext, useContext} from 'react';
import {Chat, ChatManager, useChatManager} from '../hooks/ChatManagerHook';
import {ClientAuthenticationContext} from './ClientAuthenticationContext';

/*
 * Name: Chat Context
 * Description: This context is used to store the chats of the user
 * Author: Adam Naoui-Busson, Zouhair Derouich
 */

const defaultContext: ChatManager = [
  [] as Chat[],
  {
    sendMessage: (channelId: string, content: string) => {},
    getChatById: (chatId: string) => {},
    refreshChats: () => {},
  },
] as ChatManager;

export const ChatContext = createContext<ChatManager>(defaultContext);

export const ChatProvider = ({children}: {children: React.ReactNode}) => {
  const {clientId} = useContext(ClientAuthenticationContext);
  const chatManager = useChatManager(clientId);

  return (
    <ChatContext.Provider value={chatManager}>{children}</ChatContext.Provider>
  );
};
