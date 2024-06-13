/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post} from "@nestjs/common";
import { Comprobante } from "./entities/comprobantes.entity";
import { ComprobanteService } from "./comprobantes.service";


@Controller('comprobantes')
export class ComprobantesController{

    constructor (private compService: ComprobanteService) {}

    @Get(':idComprobante') //Todos los Link
    readComprobante(
        @Param('idComprobante') idComprobante: number, 
    ) : Promise<Comprobante[]>{
        const data = this.compService.getOneComprobante(idComprobante)

        return data
    }

    @Post('nuevoComprobante')
    createComprobante(
        @Body() newComprobante: Comprobante
    ){
        return this.compService.createComprobante(newComprobante)    
    }

    @Post('editarComprobante')
    editComprobante(
        @Body() editComprobante: Comprobante
    ){
        return this.compService.editarComprobante(editComprobante)    
    }
}