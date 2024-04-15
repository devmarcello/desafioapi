import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { People, PeopleDocument } from '../models/people.model';
import { CreatePeopleDto, UpdatePeopleDto } from './people.dto';
import { AddressService } from 'src/address/address.service';
import { CreateAddressDto } from 'src/address/address.dto';

@Injectable()
export class PeopleService {
  constructor(
    @InjectModel(People.name) private readonly peopleModel: Model<PeopleDocument>,
    private readonly addressService: AddressService, 
  ) {}

  async create(createPeopleDto: CreatePeopleDto): Promise<People> {

    console.log('Dados recebidos para criar uma pessoa:', createPeopleDto);
    
    const addressesPromises = createPeopleDto.addresses.map(async address => {
      const createdAddress = await this.addressService.create(address);
      return createdAddress._id; 
    });
    const addressesIds = await Promise.all(addressesPromises);

    console.log('IDs dos endereços criados:', addressesIds);

    
    const createdPeople = new this.peopleModel({
      ...createPeopleDto,
      addresses: addressesIds, 
    });

    console.log('Pessoa a ser salva:', createdPeople);

    return createdPeople.save();
  }

  async addAddressToPerson(personId: string, createAddressDto: CreateAddressDto): Promise<People> {
    // Verifique se a pessoa existe
    const existingPerson = await this.peopleModel.exists({ _id: personId });
    if (!existingPerson) {
      throw new NotFoundException('Pessoa não encontrada');
    }
  
   
    const createdAddress = await this.addressService.create(createAddressDto);
  
    
    const updatedPerson = await this.peopleModel.findByIdAndUpdate(
      personId,
      { $push: { addresses: createdAddress._id } }, 
      { new: true } 
    ).populate('addresses').exec(); 
  
    return updatedPerson;
  }

  async removeAddressFromPerson(personId: string, addressId: string): Promise<People> {
    
    const existingPerson = await this.peopleModel.findById(personId);
    if (!existingPerson) {
      throw new NotFoundException('Pessoa não encontrada');
    }
  
   
    existingPerson.addresses = existingPerson.addresses.filter(address => address.toString() !== addressId);
    await existingPerson.save();
  
    return existingPerson;
  }
  
  
  
  

  async findAll(): Promise<People[]> {
    return this.peopleModel.find().populate('addresses').exec();
  }

  async findOne(id: string): Promise<People> {
    return this.peopleModel.findById(id).populate('addresses').exec();
  }

  async update(id: string, updatePeopleDto: UpdatePeopleDto): Promise<People> {
    return this.peopleModel.findByIdAndUpdate(id, updatePeopleDto, { new: true }).exec();
  }

  async remove(id: string): Promise<People> {
    return this.peopleModel.findByIdAndDelete(id).exec();
  }
}
