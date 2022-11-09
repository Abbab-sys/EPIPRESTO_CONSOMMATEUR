import { gql } from "@apollo/client";
import { Role } from "../../hooks/ChatManagerHook";

export const GET_INITIAL_CHATS = gql`
  query Query($idClient: ID!) {
    getClientAccountById(idClient: $idClient) {
      code
      message
      clientAccount {
        _id
        chats {
          _id
          messages {
            _id
            message
            date
            role
            status
          }
          relatedOrder {
            _id
            orderNumber
          }
          relatedVendor {
            _id
            name
          }
        }
      }
    }
  }
`;

export type GetInitialChatsData = {
  getClientAccountById: {
    code: number;
    message: string;
    clientAccount: {
      _id: string;
      chats: [
        {
          _id: string;
          messages: [
            {
              _id: string;
              message: string;
              date: string;
              role: Role;
              status: string;
            }
          ]
          relatedOrder: {
            _id: string;
            orderNumber: string;
          }
          relatedVendor: {
            _id: string;
            name: string;
          }
        }
      ]
    }
  }
}