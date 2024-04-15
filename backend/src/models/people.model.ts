import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type PeopleDocument = People & Document;

@Schema()
export class People {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  birthdayDate: Date;

  @Prop({ required: true })
  status: string;

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Address' }])
  addresses: MongooseSchema.Types.ObjectId[];
}

export const PeopleModel = SchemaFactory.createForClass(People); 