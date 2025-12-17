export type OrderDto = {
  address: string;
  deliveryDate: string;
  orders: number[];
  groupTotalQuantity: number;
  groupTotalPrice: number;
  deliveryStatus: string;
}