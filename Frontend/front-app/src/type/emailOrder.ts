export type EmailOrderDto = {
    orderId: number,
    address: String,
    zipCode: String,
    email: String,
    totalQuantity: number,
    totalPrice: number,
    modifyDate: number,
    createDate: number,
    deliveryDate: number,
    deliveryStatus: string
}