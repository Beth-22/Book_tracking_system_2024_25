import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    create(createOrderDto: CreateOrderDto): Promise<import("./schema/order.schema").Order>;
    findAll(): Promise<import("./schema/order.schema").Order[]>;
    findOne(id: string): Promise<import("./schema/order.schema").Order>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<import("./schema/order.schema").Order>;
    remove(id: string): Promise<void>;
}
