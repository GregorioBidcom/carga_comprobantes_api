/* eslint-disable prettier/prettier */
import { Controller, Get, Param} from "@nestjs/common";
import { VariosService } from "./varios.service";
import { Fuentes_Venta } from "./entitites/fuentes_venta.entity";
import { Fuentes_Venta_Cierre } from "./entitites/fuentes_venta_cierre.entity";
import { ProductosVoluminosos } from "./entitites/productos_voluminosos.entity";


@Controller('varios')
export class VariosController{

    constructor (private variosService: VariosService) {}

    @Get('fuenteventa/:nombreOperacion?')
    async readFuentesVentas(
      @Param('nombreOperacion') nombreOperacion?: string,
    ): Promise<Fuentes_Venta[]> {
      const nOperacion = nombreOperacion || '';
      const FuentesVenta = await this.variosService.getFuentesVentas(nOperacion);
      return FuentesVenta
    }

    @Get('fuenteventacierre/:nombreOperacion?')
    async readFuentesVentasCierre(
      @Param('nombreOperacion') nombreOperacion?: string,
    ): Promise<Fuentes_Venta_Cierre[]> {
      const nOperacion = nombreOperacion || '';      
      const FuentesVentaCierre = await this.variosService.getFuentesVentasCierre(nOperacion);
      return FuentesVentaCierre
    }

    @Get('voluminosos/:where')
    async readVoluminosos(
      @Param('where') pWhere: string,
    ): Promise<ProductosVoluminosos[]> {
      const prodVoluminosos = await this.variosService.getProductosVoluminosos(pWhere);
      return prodVoluminosos
    }
}