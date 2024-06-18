/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, EntityManager, In, Like, Not, And, IsNull  } from "typeorm";
import { Fuentes_Venta } from "./entitites/fuentes_venta.entity";
import { Fuentes_Venta_Cierre } from "./entitites/fuentes_venta_cierre.entity";
import { Operacion } from "./entitites/operaciones.entity";

@Injectable()
export class VariosService{

    constructor(@InjectRepository(Fuentes_Venta) public fuentesVentaRepository: Repository<Fuentes_Venta>,
                @InjectRepository(Fuentes_Venta_Cierre) public fuentesVentaCierreRepository: Repository<Fuentes_Venta_Cierre>,
                @InjectRepository(Operacion) public operacionesRepository: Repository<Operacion>) {}

    async getFuentesVentas(nombreOperacion: string = ''): Promise<Fuentes_Venta[]> {
      // Construimos la consulta inicial con la condición de fechaBajaVenta null
      let query = this.fuentesVentaRepository.createQueryBuilder('fuentes_venta')
          .where('fuentes_venta.fechaBajaVenta IS NULL');
    
      // Agregamos condiciones adicionales basadas en el valor de nombreOperacion
      if (nombreOperacion !== '') {
          if (nombreOperacion === 'FACTURA ANTICIPADA') {
              query = query.andWhere('fuentes_venta.nombreFuenteVenta NOT LIKE :marketplace', { marketplace: '%MARKETPLACE%' });
          } else {
              query = query.andWhere('fuentes_venta.nombreFuenteVenta LIKE :nombreOperacion', { nombreOperacion: `%${nombreOperacion}%` });
          }
      } else {
          query = query.andWhere('fuentes_venta.nombreFuenteVenta NOT LIKE :marketplace', { marketplace: '%MARKETPLACE%' });
      }
    
      const pFuentesVenta: Fuentes_Venta[] = await query.getMany();
    
      return pFuentesVenta;
    }
              
    async getFuentesVentasCierre(nombreOperacion: string = ''): Promise<Fuentes_Venta_Cierre[]> {
      let query = this.fuentesVentaCierreRepository.createQueryBuilder('fuentes_venta_cierre')
      .where('fuentes_venta_cierre.fechaBajaVentaCierre IS NULL');

      if (nombreOperacion !== '') {
        if (nombreOperacion === 'FACTURA ANTICIPADA') {
            query = query.andWhere('fuentes_venta_cierre.nombreFuenteVentaCierre NOT LIKE :marketplace', { marketplace: '%MARKETPLACE%' });
        } else {
          query = query.andWhere('fuentes_venta_cierre.nombreFuenteVentaCierre LIKE :nombreOperacion', { nombreOperacion: `%${nombreOperacion}%` });
        }
      } 
      else {
        query = query.andWhere('fuentes_venta_cierre.nombreFuenteVentaCierre NOT LIKE :marketplace', { marketplace: '%MARKETPLACE%' });
      }
    
      const pFuentesVentaCierre: Fuentes_Venta_Cierre[] = await query.getMany();
    
      return pFuentesVentaCierre;
    }

    async getOperaciones(): Promise<Operacion[]> {
      return
    }

}