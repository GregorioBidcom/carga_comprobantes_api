import { Controller, Get, Param } from '@nestjs/common';
import { EPService } from './ep.service';
import { EPCpte } from './entities/cptes-ep.entity';

@Controller('envio_pack')
export class EPController {
  constructor(private EPService: EPService) {}

  @Get(':idComprobante') //Todos los Link
  readEPComprobante(
    @Param('idComprobante') idComprobante: number,
  ): Promise<EPCpte> {
    const data = this.EPService.getOneEPComprobante(idComprobante);

    return data;
  }
}
