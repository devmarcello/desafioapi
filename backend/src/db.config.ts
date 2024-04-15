import { MongooseModuleOptions } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export const databaseConfig: MongooseModuleOptions = {
  uri: 'mongodb://admin:a1b2c3d4@localhost/projibm'
};


mongoose.connect(databaseConfig.uri);

mongoose.connection.once('connected', () => {
  console.log('Conexão com o banco de dados estabelecida com sucesso!');
});

mongoose.connection.on('error', (err) => {
  console.error('Erro ao conectar ao banco de dados:', err);
});