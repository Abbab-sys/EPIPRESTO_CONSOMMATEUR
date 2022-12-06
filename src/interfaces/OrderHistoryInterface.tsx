/*
 * Name: Order History Interface
 * Description: This file is used to define the interfaces of the order history.
 * Author: Ryma Messedaa, Alessandro van Reusel
 */

export type OrderHistory = {
  id: string;
  orderNumber: number;
  status: string;
  time: Date;
  numberOfProducts: number;
  price: number;
};
