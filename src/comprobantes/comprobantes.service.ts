/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Comprobante } from "./entities/comprobantes.entity";
import { Repository } from "typeorm";
import { Comprobante_items } from "./entities/comprobantes-items.entity";

@Injectable()
export class ComprobanteService{

    constructor(@InjectRepository(Comprobante) public compRepository: Repository<Comprobante>, 
                @InjectRepository(Comprobante_items) public compItemRepository: Repository<Comprobante_items>) {}

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
    
            // Creamos los comprobantes_items y asignamos el idComprobante
            for (const item of newComprobante.comprobantes_items) {
                const pNewCompItem = this.compItemRepository.create(item);
                pNewCompItem.idComprobante = idComprobante;
                await this.compItemRepository.save(pNewCompItem);

                const idComprobanteItem = pNewCompItem.idComprobanteItem
                
            }


        } catch (error) {
            console.log(error)
        }
    }
}