import { gql } from "@apollo/client";

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
}