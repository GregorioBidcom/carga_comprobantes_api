import { TypeOrmModule } from '@nestjs/typeorm';
import { Comprobante } from './entities/comprobantes.entity';
import { ComprobantesController } from './comprobantes.controller';
import { ComprobanteService } from './comprobantes.service';
import { Module } from '@nestjs/common';
import { Comprobante_items } from './entities/comprobantes-items.entity';
import { Producto_Movimiento } from './entities/productos-movimientos.entity';
import { Despacho } from './entities/despachos.entity';
import { CC_Movimientos } from './entities/cc-movimientos.entity';
import { CC_Movimientos_Campos } from './entities/cc-movimientos-campos.entity';
import { EPCpte } from '../envio_pack/entities/cptes-ep.entity';
import { EPCpteDespacho } from '../envio_pack/entities/cptes-despacho-ep.entity';
import { EPCpteProductos } from 'src/envio_pack/entities/cpte-productos-ep.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Comprobante,
        Despacho,
        CC_Movimientos_Campos,
        Comprobante_items,
        Producto_Movimiento,
        CC_Movimientos,
      ],
      'cnnPres',
    ),
    TypeOrmModule.forFeature([EPCpte, EPCpteDespacho, EPCpteProductos], 'cnnEP'),
  ],
  controllers: [ComprobantesController],
  providers: [ComprobanteService],
})
export class ComprobantesModule {}
