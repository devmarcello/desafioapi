import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CreatePeopleDto, UpdatePeopleDto } from './people.dto';
import { PeopleService } from './people.service';
import { CreateAddressDto } from 'src/address/address.dto';


@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Post() //cria pessoa
  async create(@Body() createPeopleDto: CreatePeopleDto) {
    return this.peopleService.create(createPeopleDto);
  }

  @Post(':id/addresses') //Rota para adicionar endereços a um usuário já existente
async addAddress(@Param('id') id: string, @Body() createAddressDto: CreateAddressDto) {
  return this.peopleService.addAddressToPerson(id, createAddressDto);
}


  @Get('people') // acha todas as pessoas
  async findAll() {
    return this.peopleService.findAll();
  }

  @Get(':id') //acha uma pessoa
  async findOne(@Param('id') id: string) {
    return this.peopleService.findOne(id);
  }

  @Put(':id') //atualiza dados -edita
  async update(@Param('id') id: string, @Body() updatePeopleDto: UpdatePeopleDto) {
    return this.peopleService.update(id, updatePeopleDto);
  }

  @Delete(':id') //deleta pessoa
  async remove(@Param('id') id: string) {
    return this.peopleService.remove(id);
  }

  @Delete(':personId/addresses/:addressId') //desvincula endereço de uma pessoa
async removeAddressFromPerson(@Param('personId') personId: string, @Param('addressId') addressId: string) {
  return this.peopleService.removeAddressFromPerson(personId, addressId);
}

}
