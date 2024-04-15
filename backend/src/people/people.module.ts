// pessoa/pessoa.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { People, PeopleModel } from '../models/people.model';
import { AddressModule } from 'src/address/address.module'; 

@Module({
  imports: [
    MongooseModule.forFeature([{ name: People.name, schema: PeopleModel }]),
    AddressModule, 
  ],
  controllers: [PeopleController],
  providers: [PeopleService],
})
export class PeopleModule {}
