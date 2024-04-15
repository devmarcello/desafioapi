// address.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Address, AddressDocument } from '../models/address.model';
import { CreateAddressDto, UpdateAddressDto } from './address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address.name) private readonly addressModel: Model<AddressDocument>,
  ) {}

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    const createdAddress = new this.addressModel(createAddressDto);
    return createdAddress.save();
  }

  async findAll(): Promise<Address[]> {
    return this.addressModel.find().exec();
  }

  async findOne(id: string): Promise<Address> {
    return this.addressModel.findById(id).exec();
  }

  async update(id: string, updateAddressDto: UpdateAddressDto): Promise<Address> {
    return this.addressModel.findByIdAndUpdate(id, updateAddressDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Address> {
    return this.addressModel.findByIdAndDelete(id).exec();
  }
}
