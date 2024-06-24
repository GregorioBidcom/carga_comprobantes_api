import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Comprobante } from './entities/comprobantes.entity';
import { ComprobanteService } from './comprobantes.service';

@Controller('comprobantes')
export class ComprobantesController {
  constructor(private compService: ComprobanteService) {}

  @Get(':idComprobante') readComprobante(
    @Param('idComprobante') idComprobante: number,
  ): Promise<Comprobante[]> {
    return this.compService.getOneComprobante(idComprobante);
  }

  @Post('nuevoComprobante')
  createComprobante(@Body() newComprobante: Comprobante) {
    return this.compService.createComprobante(newComprobante);
  }

  @Post('editarComprobante')
  editComprobante(@Body() editComprobante: Comprobante) {
    return this.compService.editarComprobante(editComprobante);
  }
}
