/* eslint-disable prettier/prettier */
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comprobante } from "./entities/comprobantes.entity";
import { ComprobantesController } from "./comprobantes.controller";
import { ComprobanteService } from "./comprobantes.service";
import { Module } from "@nestjs/common";
import { Comprobante_items } from "./entities/comprobantes-items.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Comprobante, Comprobante_items])],
    controllers: [ComprobantesController],
    providers: [ComprobanteService],
})
export class ComprobantesModule {} 