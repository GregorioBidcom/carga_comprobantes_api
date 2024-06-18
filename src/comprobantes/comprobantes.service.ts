/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Comprobante } from "./entities/comprobantes.entity";
import { Repository, EntityManager, In  } from "typeorm";
import { Comprobante_items } from "./entities/comprobantes-items.entity";
import { Producto_Movimiento } from "./entities/productos-movimientos.entity";
import { Despacho } from "./entities/despachos.entity";
import { CC_Movimientos } from "./entities/cc-movimientos.entity";
import { CC_Movimientos_Campos } from "./entities/cc-movimientos-campos.entity";

@Injectable()
export class ComprobanteService{

    constructor(@InjectRepository(Comprobante) public compRepository: Repository<Comprobante>, 
                @InjectRepository(Comprobante_items) public compItemRepository: Repository<Comprobante_items>,
                @InjectRepository(Producto_Movimiento) public compProdMovRepository: Repository<Producto_Movimiento>,
                @InjectRepository(CC_Movimientos) public compCCMovRepository: Repository<CC_Movimientos>,
                @InjectRepository(CC_Movimientos_Campos) public compCCMovCamposRepository: Repository<CC_Movimientos_Campos>,
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
                pComprobante.comprobanteItems.push(item)
            });
            //Cargo el despacho
            const pDespacho = await this.compDespachoRepository.findOne({
                where:{
                    idComprobante : idComprobante
                }
            })
            if (pDespacho){
                //Si tiene despacho se lo añado
                pComprobante.despacho = pDespacho
            }
            //Cargo los cc_movimientos
            const pCCMovimientos = await this.compCCMovRepository.find({
                where:{
                    idComprobante : idComprobante
                }
            })
            for (const pMov of pCCMovimientos){
                const pCCMovimientosCampos = await this.compCCMovCamposRepository.findOne({
                    where:{
                        idCCMovimiento : pMov.idCCMovimiento
                    }
                })
                if (pCCMovimientosCampos){
                    //Si tiene ccMovCampos se lo añado al pMov
                    pMov.CCMovimientoCampo = pCCMovimientosCampos
                }
                pComprobante.CCMovimientos.push(pMov)
            }
            return pComprobante
        }
        else{
            return 'null'
        }
    }

  async editarComprobante(editarComprobante: Comprobante){
    try{
        //========================ACTUALIZO comprobantes========================
        //cleanComprobante no tiene despacho, prodMov, ccMov, items
        const cleanComprobante = this.cleanComprobanteForUpdate(editarComprobante);
        await this.compRepository.update({ idComprobante: editarComprobante.idComprobante }, cleanComprobante);

        //En esta lista actualItems estan los items registrados en la base de datos antes de actulizar
        const actualItems = await this.compItemRepository.find({
          where:{
              idComprobante : editarComprobante.idComprobante
          }
        })

        //========================ACTUALIZO comprobantes_items========================
        for (const item of editarComprobante.comprobanteItems) {
          const exists = actualItems.some(
            //Aca busco si en la lista de items del comprobante, esta el item de la base de datos
            (actItem) => actItem.idComprobanteItem === item.idComprobanteItem
          );

          if (exists) {
            //Si esta lo actualizo
            await this.compItemRepository.update({ idComprobanteItem: item.idComprobanteItem }, item);
          }
          else {    
            //Si no esta es porque es nuevo. Lo creo
            item.idComprobante = editarComprobante.idComprobante
            const pNewCompItem = await this.compItemRepository.create(item);
            await this.compItemRepository.save(pNewCompItem);   
            
            //Tambien creo el productoMovimiento asociado en esta instancia
            const prodMov: Producto_Movimiento = new Producto_Movimiento();
            prodMov.idProducto = item.idProducto;
            prodMov.idDeposito = item.idDeposito;
            prodMov.idComprobanteItem = pNewCompItem.idComprobanteItem;
            prodMov.cantidadProductoMovimiento = item.cantidadComprobanteItem;
            prodMov.precioProductoMovimiento = item.precioComprobanteItem;
            prodMov.proformaProductoMovimiento = null;
            prodMov.forwarderProductoMovimiento = null;
            prodMov.pesoOMedidasProductoMovimiento = null;
            prodMov.fechaSalidaProductoMovimiento = null;
            prodMov.fechaArriboProductoMovimiento = null;
            prodMov.trackingProductoMovimiento = null;
            prodMov.idProveedor = null;
            prodMov.pendienteDespachoProductoMovimiento = 0;
            prodMov.idBoStUbicacion = 0;
            const pNewProdMov = await this.compProdMovRepository.create(prodMov);
            await this.compProdMovRepository.save(pNewProdMov);             
          }
        }
        //Elimino los comprobante_items que ya no estan mas
        // Obtengo los id de los items en comprobanteItems
        const newComprobanteItemIds = new Set(editarComprobante.comprobanteItems.map(item => item.idComprobanteItem));
        // Filtro los items que no están en comprobanteItems
        const itemsToDelete = actualItems.filter(item => !newComprobanteItemIds.has(item.idComprobanteItem));
        // Elimino los items filtrados
        if (itemsToDelete.length > 0) {
          const idsToDelete = itemsToDelete.map(item => item.idComprobanteItem);
          await this.compItemRepository.delete(idsToDelete);
        }

        //========================ACTUALIZO producto_movimientos========================
        const listaIdCompItems = actualItems.map(item => item.idComprobanteItem);
        const actualMovs = await this.compProdMovRepository.find({
          where: {
            idComprobanteItem: In(listaIdCompItems),
          },
        });
        for (const prodMov of editarComprobante.productos_movimiento) {
          const exists = actualMovs.some(
            //Aca busco si en la lista de items del comprobante, esta el item de la base de datos
            (actMov) => actMov.idProductoMovimiento === prodMov.idProductoMovimiento
          );

          if (exists) {
            //Si esta lo actualizo, si no esta ya se creo antes con el comprobanteItem
            await this.compProdMovRepository.update({ idProductoMovimiento: prodMov.idProductoMovimiento }, prodMov);
          }
        }
        //Elimino los productos_movimientos que ya no estan mas
        const newProdMovIds = new Set(editarComprobante.productos_movimiento.map(item => item.idProductoMovimiento));
        const movsToDelete = actualMovs.filter(item => !newProdMovIds.has(item.idProductoMovimiento));
        if (movsToDelete.length > 0) {
          const idsToDelete = movsToDelete.map(item => item.idProductoMovimiento);
          await this.compProdMovRepository.delete(idsToDelete);
        }

        //======================== ACTUALIZO despachos si tiene ========================
        if (editarComprobante.despacho){            
            await this.compDespachoRepository.update({ idDespacho: editarComprobante.despacho.idDespacho }, editarComprobante.despacho);
        }

        //========================ACTUALIZO cc_movimientos========================
        const actualCCMovimientos = await this.compCCMovRepository.find({
          where: {
            idComprobante: editarComprobante.idComprobante,
          },
        });
        const actualCCMovIds = new Set(actualCCMovimientos.map(mov => mov.idCCMovimiento));
        const newCCMovimientos = editarComprobante.CCMovimientos.filter(mov => !actualCCMovIds.has(mov.idCCMovimiento));
        //Primero modifico los movimientos que cambiaron y elimino los que no estan mas
        for (const item of actualCCMovimientos) {
          const exists = editarComprobante.CCMovimientos.some(
            //Aca busco si en la lista de items del comprobante, esta el item de la base de datos
            (newMov) => newMov.idCCMovimiento === item.idCCMovimiento
          );

          if (exists) {
            //Si esta lo actualizo
            //cMovModified tiene CCMovimientoCampos, entonces lo uso para ver los datos
            //pero cleanCCMovModified no lo tiene, entonces lo uso para el update
            const ccMovModified = editarComprobante.CCMovimientos.find(mov => mov.idCCMovimiento === item.idCCMovimiento);
            const cleanCCMovModified = this.cleanCCMovimientoForUpdate(ccMovModified)
            await this.compCCMovRepository.update({ idCCMovimiento: item.idCCMovimiento }, cleanCCMovModified);
            if (ccMovModified.CCMovimientoCampo){
              await this.compCCMovCamposRepository.update({ idCCMovimiento: item.idCCMovimiento }, ccMovModified.CCMovimientoCampo);
            }
          }
          else {
            //Lo elimino
            await this.compCCMovRepository.delete({idCCMovimiento: item.idCCMovimiento});
            await this.compCCMovCamposRepository.delete({idCCMovimiento: item.idCCMovimiento});
          }
        }
        for (const newCCMov of newCCMovimientos){
          const cleanCCMovimiento = this.cleanCCMovimientoForUpdate(newCCMov);
          const pNewCCMov = await this.compCCMovRepository.create(cleanCCMovimiento);
          await this.compCCMovRepository.save(pNewCCMov);  
          if(newCCMov.CCMovimientoCampo){
            //Tambien creo el ccMovimientoCampos asociado en esta instancia si tiene
            const pNewCCMovCampo = await this.compCCMovCamposRepository.create(newCCMov.CCMovimientoCampo);
            pNewCCMovCampo.idCCMovimiento = pNewCCMov.idCCMovimiento
            await this.compCCMovCamposRepository.save(pNewCCMovCampo);   
          }
        }
    }
    catch(error){
      console.error(error);
      throw new Error('Error creating comprobante: ' + error.message);
    }   
  }

  private cleanComprobanteForUpdate(comprobante: Partial<Comprobante>): Partial<Comprobante> {
    //Esta funcion le saca las propepiedades que no se actualizan en la base de datos para evitar errores
    const { comprobanteItems, productos_movimiento, CCMovimientos, despacho, ...cleanComprobante } = comprobante;
    return cleanComprobante;
  }

  private cleanCCMovimientoForUpdate(CC_Movimientos: Partial<CC_Movimientos>): Partial<CC_Movimientos> {
      // Esta función elimina las propiedades que no se actualizan en la base de datos para evitar errores
      const { CCMovimientoCampo, ...cleanCCMovimiento } = CC_Movimientos;
      return cleanCCMovimiento;
  }

  // POST Comprobantes -- Comprobantes-items -- productos-movimientos
  async createComprobante(newComprobante: Comprobante) {
    try {
      // EntityManager para la transacción
      return await this.compRepository.manager.transaction(async (entityManager: EntityManager) => {
        // Creamos el comprobante
        const pNewComp = entityManager.create(Comprobante, newComprobante);
        await entityManager.save(pNewComp);

        // Obtenemos el idComprobante generado
        const idComprobante = pNewComp.idComprobante;
        let idCompItem = 0;

        // Creamos los comprobantes_items y asignamos el idComprobante
        for (const item of newComprobante.comprobanteItems) {
          const pNewCompItem = entityManager.create(Comprobante_items, item);
          pNewCompItem.idComprobante = idComprobante;
          await entityManager.save(pNewCompItem);

          idCompItem = pNewCompItem.idComprobanteItem;

          // Creamos los producto movimiento y le asignamos cada comprobante_item
          const prodMov: Producto_Movimiento = new Producto_Movimiento();
          prodMov.idProducto = item.idProducto;
          prodMov.idDeposito = item.idDeposito;
          prodMov.idComprobanteItem = idCompItem;
          prodMov.cantidadProductoMovimiento = item.cantidadComprobanteItem;
          prodMov.precioProductoMovimiento = item.precioComprobanteItem;
          prodMov.proformaProductoMovimiento = null;
          prodMov.forwarderProductoMovimiento = null;
          prodMov.pesoOMedidasProductoMovimiento = null;
          prodMov.fechaSalidaProductoMovimiento = null;
          prodMov.fechaArriboProductoMovimiento = null;
          prodMov.trackingProductoMovimiento = null;
          prodMov.idProveedor = null;
          prodMov.pendienteDespachoProductoMovimiento = 0;
          prodMov.idBoStUbicacion = 0;

          const pNewProdMov = entityManager.create(Producto_Movimiento, prodMov);
          await entityManager.save(pNewProdMov);
        }

        if (newComprobante.despacho) {
          // Tiene despacho entonces lo cargo
          const pNewDespacho = entityManager.create(Despacho, newComprobante.despacho);
          pNewDespacho.idComprobante = idComprobante;
          await entityManager.save(pNewDespacho);
        }

        // Agrego los cc_movimientos (pagos)
        for (const ccMov of newComprobante.CCMovimientos) {
          const newCCMov = entityManager.create(CC_Movimientos, ccMov);
          if (newCCMov.idComprobante == 0) {
            newCCMov.idComprobante = idComprobante;
          }
          await entityManager.save(newCCMov);
          if (ccMov.CCMovimientoCampo) {
            // Y creo el cc_movimientos_campos del mov
            const CCMovCampo: CC_Movimientos_Campos = new CC_Movimientos_Campos();
            CCMovCampo.idCCMovimiento = ccMov.idCCMovimiento;
            CCMovCampo.bancoCCMovimientoCampo = ccMov.CCMovimientoCampo.bancoCCMovimientoCampo;
            CCMovCampo.numeroOperacionCCMovimientoCampo = ccMov.CCMovimientoCampo.numeroOperacionCCMovimientoCampo;
            CCMovCampo.numeroChequeCCMovimientoCampo = ccMov.CCMovimientoCampo.numeroChequeCCMovimientoCampo;
            CCMovCampo.fechaCobroCCMovimientoCampo = ccMov.CCMovimientoCampo.fechaCobroCCMovimientoCampo;
            CCMovCampo.fechaEmisionCCMovimientoCampo = ccMov.CCMovimientoCampo.fechaEmisionCCMovimientoCampo;
            CCMovCampo.tipoCambioCCMovimientoCampo = ccMov.CCMovimientoCampo.tipoCambioCCMovimientoCampo;

            const newCCMovCampo = entityManager.create(CC_Movimientos_Campos, CCMovCampo);
            newCCMovCampo.idCCMovimiento = newCCMov.idCCMovimiento;
            await entityManager.save(newCCMovCampo);
          }
        }
        return pNewComp.idComprobante;
      });
    } catch (error) {
      console.error(error);
      throw new Error('Error creating comprobante: ' + error.message);
    }
  }
}