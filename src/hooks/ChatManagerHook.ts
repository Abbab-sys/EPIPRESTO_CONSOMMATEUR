import {useState} from 'react';
import {useQuery, useSubscription} from '@apollo/client';
import {useMutation} from '@apollo/client/react';
import {GET_INITIAL_CHATS} from '../graphql/queries/GetInitChats';
import {SEND_MESSAGE} from '../graphql/mutations/SendMessage';
import {MESSAGE_SENT} from '../graphql/subscriptions';

export type Chat = {
  id: string;
  relatedVendorId: string;
  relatedStoreName: string;
  relatedOrderId: string;
  relatedOrderNumber: string;
  messages: Message[];
};

export interface Message {
  relatedChatId: string;
  id: string;
  message: string;
  date: string;
  role: Role;
  status: MessageStatus;
  avatar: string;
}

export enum Role {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
  VENDOR = 'VENDOR',
}

export enum MessageStatus {
  SENT = 'SENT',
  RECEIVED = 'RECEIVED',
  READ = 'READ',
}

export type ChatManager = [
  Chat[],
  {
    sendMessage: (channelId: string, content: string) => void;
    getChatById: (id: string) => Chat | undefined;
  },
];

export const useChatManager = (clientId: string): ChatManager => {
  const chatsById = useStateMap<string, Chat>(new Map<string, Chat>());
  const [chats, setChats] = useState<Chat[]>([]);

  const onInitialFetchComplete = (data: any) => {
    chatsById.clear();
    ///TODO check query result
    if (!data || data.getClientAccountById.code !== 200) {
      console.log('ERROR');
      return;
    }

    const chatsPulled = data.getClientAccountById.clientAccount.chats;

    chatsPulled.forEach((chat: any) => {
      const chatId = chat._id;
      const relatedVendorId = chat.relatedVendor._id;
      const relatedOrderId = chat.relatedOrder._id;
      const relatedStoreName = chat.relatedVendor.name;

      let messages = chat.messages.map((message: any) => ({
        relatedChatId: chatId,
        id: message._id,
        ...message,
        avatar: '',
      }));
      messages = messages.reverse();
      const chatToAdd: Chat = {
        id: chatId,
        relatedVendorId,
        relatedStoreName,
        relatedOrderId,
        relatedOrderNumber: chat.relatedOrder.orderNumber,
        messages,
      };

      chatsById.set(chatId, chatToAdd);
    });

    const chatsSortedByDate = Array.from(chatsById.values()).sort((a, b) => {
      if (a.messages.length === 0) {
        return 1;
      }
      if (b.messages.length === 0) {
        return -1;
      }
      return (
        new Date(b.messages[0].date).getTime() -
        new Date(a.messages[0].date).getTime()
      );
    });
    setChats(chatsSortedByDate);
  };

  useQuery(GET_INITIAL_CHATS, {
    variables: {idClient: clientId},
    onCompleted: onInitialFetchComplete,
  });

  const onMessageCorrectlySent = (data: any) => {
    ///TODO DO ACCUSED CHECK
    console.log('onMessageCorrectlySent', data);
  };
  const [publishMessage] = useMutation(SEND_MESSAGE, {
    onCompleted: onMessageCorrectlySent,
  });

  const sendMessage = (channelId: string, content: string) => {
    const noContent: boolean = !content || content.trim().length === 0;
    const nonexistentChannel: boolean = !chatsById.has(channelId);
    if (noContent || nonexistentChannel) {
      return;
    }

    const relatedChat = chatsById.get(channelId);
    if (!relatedChat) {
      return;
    }
    const newMessage: Message = {
      relatedChatId: relatedChat.id,
      id: '',
      message: content,
      date: new Date().toUTCString(),
      role: Role.CLIENT,
      status: MessageStatus.SENT,
      avatar: '',
    };
    const newMessages: Message[] = [newMessage, ...relatedChat.messages];
    publishMessage({
      variables: {
        message: {relatedChatID: channelId, content, role: Role.CLIENT},
      },
    });
    const newChat: Chat = {...relatedChat, messages: newMessages};
    chatsById.set(channelId, newChat);
    const newChats = [
      newChat,
      ...chats.filter(currChat => currChat.id !== newChat.id),
    ];
    setChats(newChats);
  };

  const onNewMessageReceived = (data: any) => {
    console.log('DATA: ', data.data.data);
    const newMessage = data.data.data.messageSent;
    const relatedChatId = newMessage?.relatedChat._id;
    const message: Message = {
      relatedChatId,
      id: newMessage._id,
      ...newMessage,
      avatar: '',
    };
    const relatedChat = chatsById.get(relatedChatId);
    if (!relatedChat) {
      return;
    }
    const messageIsFromThisUser = newMessage.role === 'CLIENT';
    if (messageIsFromThisUser) {
      relatedChat.messages[0].id = message.id;
      chatsById.set(relatedChatId, relatedChat);
      return;
    }
    const newMessages: Message[] = [message, ...relatedChat.messages];
    const newChat: Chat = {...relatedChat, messages: newMessages};
    chatsById.set(relatedChatId, newChat);
    const newChats = [
      newChat,
      ...chats.filter(currChat => currChat.id !== newChat.id),
    ];
    setChats(newChats);
  };
  useSubscription(MESSAGE_SENT, {
    variables: {clientId},
    onData: onNewMessageReceived,
  });

  const getChatById = (id: string) => {
    return chatsById.get(id);
  };

  return [chats, {sendMessage, getChatById}];
};

export const useStateMap = <KEY, VALUE>(initialMap: Map<KEY, VALUE>) => {
  const [map, setMap] = useState<Map<KEY, VALUE>>(initialMap);
  const set = (key: KEY, value: VALUE) => {
    // const newMap = new Map(map);
    map.set(key, value);
    setMap(map);
  };
  const get = (key: KEY) => {
    return map.get(key);
  };
  const deleteKey = (key: KEY) => {
    const newMap = new Map(map);
    newMap.delete(key);
    setMap(newMap);
  };
  const clear = () => {
    setMap(new Map());
  };

  const items = (): [KEY, VALUE][] => {
    return Array.from(map.entries());
  };
  const values = (): VALUE[] => {
    return Array.from(map.values());
  };
  const keys = (): KEY[] => {
    return Array.from(map.keys());
  };
  const has = (key: KEY) => {
    return map.has(key);
  };
  return {set, get, deleteKey, clear, items, values, keys, has} as const;
};
