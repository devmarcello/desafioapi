import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { AppService } from './app.service';
import axios from 'axios';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  

  @Get(':cep')
  async getAddressByCEP(@Param('cep') cep: string) {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      return response.data;
    } catch (error) {
      throw new NotFoundException('Endereço não encontrado');
    }
  }
}
