import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Comprobante } from './entities/comprobantes.entity';
import { ComprobanteService } from './comprobantes.service';

@Controller('comprobantes')
export class ComprobantesController {
    constructor(private service: ComprobanteService) {
    }

    @Get(':id') getOne(
        @Param('id') id: number,
    ): Promise<Comprobante[]> {
        return this.service.getOne(id);
    }

    @Post('')
    create(@Body() newComprobante: Comprobante) { // Aca en vez de usar la entity deberia usar un DTO con los campos esperado en la request
//createComprobante(@Body() comprobanteRequest: ComprobanteDto) {
        return this.service.create(newComprobante);
    }

    @Post('editarComprobante')
    editComprobante(@Body() editComprobante: Comprobante) {
        return this.service.editarComprobante(editComprobante);
    }

    // Editar comprobante lo editaria totalmente de esta forma:
    // Puede ser un PUT o Patch
    //@Put(':id')
    //updateComprobante(
    //    @Param('id') id: number,
    //) {
    //    return this.service.update;
    //}
}
