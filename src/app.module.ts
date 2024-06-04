/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComprobantesModule } from './comprobantes/comprobantes.module';
import 'dotenv/config'; //Con esto defino las variables de entorno de mi archivo .env en el proyecto

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [__dirname + '/**/*.entity.{js, ts}'], //Esto hace que tome todos los archivos .entity.ts o .js del proyecto
    synchronize: false,
  }), 
  ComprobantesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


 