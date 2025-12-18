import { OrderProductDto } from "./orderProduct"; // 가정

export type OrderResponseDto = {
    totalQuantity: number;
    totalPrice: number;    
    deliveryDate: string;     
    deliveryStatus: string; 
    address: string;
    zipCode : string;
    email : string;
    // OrderProductDto 리스트 포함
    products: OrderProductDto[]; 
};