/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Comprobante } from "./entities/comprobantes.entity";
import { Repository } from "typeorm";
import { Comprobante_items } from "./entities/comprobantes-items.entity";
import { Producto_Movimiento } from "./entities/productos-movimientos.entity";
import { Despacho } from "./entities/despachos.entity";

@Injectable()
export class ComprobanteService{

    constructor(@InjectRepository(Comprobante) public compRepository: Repository<Comprobante>, 
                @InjectRepository(Comprobante_items) public compItemRepository: Repository<Comprobante_items>,
                @InjectRepository(Producto_Movimiento) public compProdMovRepository: Repository<Producto_Movimiento>,
                @InjectRepository(Despacho) public compDespachoRepository: Repository<Despacho>
            ) {}

    getAllComprobantes() : any{
        return 'Test'
    }

    async getOneComprobante(idComprobante : number) : Promise<any> {
        const pComprobante = await this.compRepository.findOne({
            where: {
                idComprobante: idComprobante
            }
        });

        if (pComprobante){
            //Si existe el comprobante, busco los items del mismo
            const pCompItems = await this.compItemRepository.find({
                where:{
                    idComprobante : idComprobante
                }
            })

            pCompItems.forEach(item => {
                pComprobante.comprobantes_items.push(item)
            });

            return pComprobante
        }
        else{
            return 'null'
        }
    }

    //POST Comprobantes -- Comprobantes-items -- productos-movimientos
    async createComprobante(newComprobante : Comprobante){
        try {
            // Creamos el comprobante
            const pNewComp = await this.compRepository.create(newComprobante);
            await this.compRepository.save(pNewComp);
    
            // Obtenemos el idComprobante generado
            const idComprobante = pNewComp.idComprobante;

            let idCompItem = 0
    
            // Creamos los comprobantes_items y asignamos el idComprobante
            for (const item of newComprobante.comprobantes_items) {
                const pNewCompItem = this.compItemRepository.create(item);
                pNewCompItem.idComprobante = idComprobante;
                await this.compItemRepository.save(pNewCompItem); 

                idCompItem = pNewCompItem.idComprobanteItem

                console.log("IDCOMPITEM: " + idCompItem)

                //Creamos los producto movimiento y le asignamos cada comprobante_item
                const prodMov : Producto_Movimiento = new Producto_Movimiento()
                prodMov.idProducto = item.idProducto
                prodMov.idDeposito = item.idDeposito
                prodMov.idComprobanteItem = idCompItem
                prodMov.cantidadProductoMovimiento = item.cantidadComprobanteItem
                prodMov.precioProductoMovimiento = item.precioComprobanteItem
                prodMov.proformaProductoMovimiento = null
                prodMov.forwarderProductoMovimiento = null
                prodMov.pesoOMedidasProductoMovimiento = null
                prodMov.fechaSalidaProductoMovimiento = null
                prodMov.fechaArriboProductoMovimiento = null
                prodMov.trackingProductoMovimiento = null
                prodMov.idProveedor = null
                prodMov.pendienteDespachoProductoMovimiento = 0
                prodMov.idBoStUbicacion = 0

                const pNewProdMov = this.compProdMovRepository.create(prodMov);
                await this.compProdMovRepository.save(pNewProdMov);
            }

            if (newComprobante.despacho){ 
                //Tiene despacho entonces lo cargo
                const pNewDespacho = this.compDespachoRepository.create(newComprobante.despacho); 
                pNewDespacho.idComprobante = idComprobante
                await this.compDespachoRepository.save(pNewDespacho);
            }

            return pNewComp.idComprobante

        } catch (error) {
            console.log(error)
            return "Error- " +  error.sqlMessage
        }
    }

    async createDespacho(){

    }
}