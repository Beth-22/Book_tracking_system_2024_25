
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


export type OrderDocument = Order & Document;

export enum OrderState {
  PENDING = 'Pending',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  productId: Types.ObjectId;

  @Prop({ type: String, enum: OrderState, default: OrderState.PENDING })
  state: OrderState;

  @Prop({ required: true })
  quantity: number;

  @Prop()
  customerName: string;

  @Prop()
  customerEmail: string;
  @Prop()
  address: string;
  
}

export const OrderSchema = SchemaFactory.createForClass(Order);
