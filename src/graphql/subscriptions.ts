import {gql} from '@apollo/client';
import {MessageStatus, Role} from '../hooks/ChatManagerHook';

/*
 * Name: Message Sent
 * Description: This is a GraphQL subscription that is used to subscribe to the message sent event.
 * Author: Zouhair Derouich
 */

export const MESSAGE_SENT = gql`
  subscription Subscription($clientId: ID) {
    messageSent(clientId: $clientId) {
      _id
      message
      date
      role
      status
      relatedChat {
        _id
      }
    }
  }
`;

export type MessageSentData = {
  subscriptionData: {
    data: {
      messageSent: {
        _id: string;
        message: string;
        date: string;
        role: Role;
        status: MessageStatus;
        relatedChat: {
          _id: string;
        };
      };
    };
  };
};
