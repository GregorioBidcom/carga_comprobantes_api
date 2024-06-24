/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, EntityManager, In, Like, Not, And, IsNull  } from "typeorm";
import { Fuentes_Venta } from "./entitites/fuentes_venta.entity";
import { Fuentes_Venta_Cierre } from "./entitites/fuentes_venta_cierre.entity";
import { Operacion } from "./entitites/operaciones.entity";
import { ProductosVoluminosos } from "./entitites/productos_voluminosos.entity";

@Injectable()
export class VariosService{

    constructor(@InjectRepository(Fuentes_Venta, 'cnnPres') public fuentesVentaRepository: Repository<Fuentes_Venta>,
                @InjectRepository(Fuentes_Venta_Cierre, 'cnnPres') public fuentesVentaCierreRepository: Repository<Fuentes_Venta_Cierre>,
                @InjectRepository(Operacion, 'cnnPres') public operacionesRepository: Repository<Operacion>,
                @InjectRepository(ProductosVoluminosos, 'cnnChk') public prodVoluminososRepository: Repository<ProductosVoluminosos>) {}

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

    async getProductosVoluminosos(pWhere: string): Promise<ProductosVoluminosos[]> {
      //Esta query esta fea, habria que optimizarla
      const query = `
        (
          SELECT
            p.ID,
            p.post_status,
            p.codigo_aguila AS SKU,
            p.ean,
            p.tipo_envio,
            p.voluminoso,
            'p' AS t
          FROM bidcom.posts AS p
          WHERE ${pWhere}
        )
        UNION DISTINCT
        (
          SELECT
            IFNULL(m.post_id, p.ID) AS ID,
            p.post_status,
            m.codigo_aguila AS SKU,
            m.ean,
            IFNULL(p.tipo_envio, '') AS tipo_envio,
            IFNULL(p.voluminoso, 0) AS voluminoso,
            'm' AS t
          FROM bidcom.models AS m
          LEFT JOIN bidcom.posts AS p ON p.ID = m.post_id
          WHERE ${pWhere}
        )
        ORDER BY SKU;
      `;
  
      const pVoluminosos: ProductosVoluminosos[] = await this.prodVoluminososRepository.query(query);
      return pVoluminosos;
    }


}