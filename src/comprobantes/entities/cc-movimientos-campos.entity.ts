/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity({name: 'cc_movimientos_campos'})
export class CC_Movimientos_Campos{
    @PrimaryGeneratedColumn()
    idCCMovimientoCampo : number
    @Column()
    idCCMovimiento : number
    @Column()
    numeroOperacionCCMovimientoCampo : string
    @Column()
    numeroChequeCCMovimientoCampo : string
    @Column()
    fechaEmisionCCMovimientoCampo : Date
    @Column()
    fechaCobroCCMovimientoCampo : Date
    @Column()
    bancoCCMovimientoCampo : string
    @Column()
    tipoCambioCCMovimientoCampo : number
}