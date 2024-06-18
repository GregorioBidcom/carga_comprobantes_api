/* eslint-disable prettier/prettier */
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { VariosService } from "./varios.service";
import { VariosController } from "./varios.controller";
import { Fuentes_Venta } from "./entitites/fuentes_venta.entity";
import { Fuentes_Venta_Cierre } from "./entitites/fuentes_venta_cierre.entity";
import { Operacion } from "./entitites/operaciones.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Fuentes_Venta, Fuentes_Venta_Cierre, Operacion])],
    controllers: [VariosController],
    providers: [VariosService],
})
export class VariosModule {} 