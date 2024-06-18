/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({name: 'fuentes_venta'})
export class Fuentes_Venta{
    @PrimaryGeneratedColumn()
    idFuenteVenta : number
    @Column()
    nombreFuenteVenta : string
    @Column()
    fechaBajaVenta : Date
}
