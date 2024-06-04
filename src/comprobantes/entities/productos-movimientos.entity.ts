/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({name: 'productos_movimientos'})
export class Productos_Movimientos{

    @PrimaryGeneratedColumn()
    idProductoMovimiento : number
    @Column()
    idProducto : number
    @Column()
    idDeposito : number
    @Column()
    idComprobanteItem : number
    @Column()
    cantidadProductoMovimiento : number
    @Column()
    precioProductoMovimiento : number
    @Column()
    proformaProductoMovimiento : string
    @Column()
    forwarderProductoMovimiento : string
    @Column()
    pesoOMedidasProductoMovimiento : string
    @Column()
    fechaSalidaProductoMovimiento : Date
    @Column()
    fechaArriboProductoMovimiento : Date
    @Column()
    trackingProductoMovimiento : string
    @Column()
    idProveedor : string
    @Column()
    pendienteDespachoProductoMovimiento : number
    @Column()
    idBoStUbicacion : number
}
