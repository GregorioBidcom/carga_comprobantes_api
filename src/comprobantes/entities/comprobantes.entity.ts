/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Comprobante_items } from './comprobantes-items.entity';
import { Producto_Movimiento } from './productos-movimientos.entity';
import { Despacho } from './despachos.entity';
import { CC_Movimientos } from './cc-movimientos.entity';


@Entity({name: 'comprobantes'})
export class Comprobante{

    constructor() {
        this.comprobanteItems = []
        this.productos_movimiento = []
        this.CCMovimientos = []
    }
    
    @PrimaryGeneratedColumn()
    idComprobante : number
    @Column()
    idOperacion : number
    @Column()
    fechaComprobante : Date
    @Column()
    tipoComprobante : string
    @Column()
    letraComprobante : string
    @Column()
    pvComprobante : number
    @Column()
    numeroComprobante : number
    @Column()
    netoComprobante : number
    @Column()
    ivaComprobante : number
    @Column()
    totalComprobante : number
    @Column()
    idAgenda : number
    @Column()
    idFuenteVenta : number
    @Column()
    idEnvio : number
    @Column()
    idUsuarioAlta : number
    @Column()
    idUsuarioModifica : number
    @Column()
    idUsuarioBaja : number
    @Column()
    fechaUsuarioModifica : Date
    @Column()
    fechaBajaComprobante : Date
    @Column()
    CAEComprobante : string
    @Column()
    vtoCAEComprobante : string
    @Column()
    PercepcionIBComprobante : number
    @Column()
    ImpuestosInternosComprobante : number
    @Column()
    proformaComprobante : number
    @Column()
    forwarderComprobante : number
    @Column()
    trackingComprobante : number
    @Column()
    pesoOMedidasComprobante : number
    @Column()
    fechaSalidaComprobante : Date
    @Column()
    fechaEstimadaArriboComprobante : Date
    @Column()
    idProveedor : number
    @Column()
    facturacionPendienteComprobante : number
    @Column()
    idFactura : number
    @Column()
    idEmpresaFactura : number
    @Column()
    numeroFactura : number
    @Column()
    uuidComprobante : string
    @Column()
    errorCAEComprobante : string
    @Column()
    fechaContabilizacionComprobante : Date
    @Column()
    descripcionComprobante : string
    @Column()
    fechaComprobanteExterno : Date
    @Column()
    numeroComprobanteExterno : number
    @Column()
    idAgendaFacturacion : number
    @Column()
    idComprobanteNC : number
    @Column()
    Vinculo_Facturacion : number
    @Column()
    idFuenteVentaCierre : number
    @Column()
    idEstadoPercepcion : number
    @Column()
    Order_ID_Producteca : string

    comprobanteItems : Comprobante_items[]
    productos_movimiento : Producto_Movimiento[]
    CCMovimientos : CC_Movimientos[]

    despacho : Despacho
}