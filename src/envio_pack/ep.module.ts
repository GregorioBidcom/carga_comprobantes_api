import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { EPController } from './ep.controller';
import { EPService } from './ep.service';
import { EPCpte } from './entities/cptes-ep.entity';
import { EPCpteDespacho } from './entities/cptes-despacho-ep.entity';
import { EPCpteProductos } from './entities/cpte-productos-ep.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [EPCpte, EPCpteDespacho, EPCpteProductos],
      'cnnEP',
    ),
  ],
  controllers: [EPController],
  providers: [EPService],
})
export class EPModule {}
