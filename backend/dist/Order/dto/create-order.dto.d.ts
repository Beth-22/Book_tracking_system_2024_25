import { OrderState } from '../schema/order.schema';
export declare class CreateOrderDto {
    productId: string;
    quantity: number;
    customerName: string;
    customerEmail: string;
    state?: OrderState;
    address: string;
}
