// src/order/dto/create-order.dto.ts
import { IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';
import { OrderState } from '../schema/order.schema';

export class CreateOrderDto {
  @IsMongoId()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  customerName: string;

  @IsString()
  @IsNotEmpty()
  customerEmail: string;

  @IsEnum(OrderState)
  @IsOptional()
  state?: OrderState;
  @IsNotEmpty()
  address: string
}
