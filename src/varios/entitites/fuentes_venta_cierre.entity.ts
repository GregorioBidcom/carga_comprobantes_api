/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({name: 'fuentes_venta_cierre'})
export class Fuentes_Venta_Cierre{
    @PrimaryGeneratedColumn()
    idFuenteVentaCierre : number
    @Column()
    nombreFuenteVentaCierre : string
    @Column()
    fechaBajaVentaCierre : Date
}
