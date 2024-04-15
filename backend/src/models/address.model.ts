
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AddressDocument = Address & Document;
@Schema()
export class Address {
    _id: string;

    @Prop({ required: true })
    zipcode: number;

    @Prop({ required: true })
    address: string;

    @Prop({ required: true })
    number: number;

    @Prop()
    complement: string;

    @Prop({ required: true })
    neighborhood: string;

    @Prop({ required: true })
    state: string;

    @Prop({ required: true })
    city: string;
}
export const AddressSchema = SchemaFactory.createForClass(Address);
