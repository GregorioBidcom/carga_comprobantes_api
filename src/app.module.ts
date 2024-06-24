import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComprobantesModule } from './comprobantes/comprobantes.module';
import 'dotenv/config';
import { VariosModule } from './varios/varios.module';
import { EPModule } from './envio_pack/ep.module';

@Module({
  imports: [
    // Conexión a la base de datos presupuestos (cnnPres)
    TypeOrmModule.forRoot({
      name: 'cnnPres',
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_PRES_NAME,
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: false,
    }),
    // Conexión a la base de datos envio_pack (cnnEP)
    TypeOrmModule.forRoot({
      name: 'cnnEP',
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER, 
      password: process.env.DB_PASS,
      database: process.env.DB_EP_NAME,
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: false,
    }),
    // Conexión a la base de datos de checkout bidcom
    TypeOrmModule.forRoot({
      name: 'cnnChk',
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER, 
      password: process.env.DB_PASS,
      database: process.env.DB_CHK_NAME,
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: false,
    }),
    ComprobantesModule,
    VariosModule,
    EPModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


 