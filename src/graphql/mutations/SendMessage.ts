import {gql} from '@apollo/client';

/*
 * Name: Send Message
 * Description: This is a GraphQL mutation that is used to send a message to a chat.
 * Author: Zouhair Derouich
 */

export const SEND_MESSAGE = gql`
  mutation Mutation($message: MessageInput!) {
    sendMessageToChat(message: $message) {
      code
      message
    }
  }
`;

export type SendMessageData = {
  sendMessageToChat: {
    code: number;
    message: string;
  };
};
