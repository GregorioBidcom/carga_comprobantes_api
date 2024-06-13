/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CC_Movimientos_Campos } from './cc-movimientos-campos.entity';


@Entity({name: 'cc_movimientos'})
export class CC_Movimientos{
    @PrimaryGeneratedColumn()
    idCCMovimiento : number
    @Column()
    idCC : number
    @Column()
    idFormaPago : number
    @Column()
    idComprobante : number
    //Estos dos los declaro como string para que me tome los valores decimales correctamente
    @Column()
    sumaCCMovimiento : string
    @Column()
    restaCCMovimiento : string
    @Column()
    conceptoCCMovimiento : string
    @Column('double precision')
    sumaUSDCCMovimiento : number
    @Column('double precision')
    restaUSDCCMovimiento : number
    @Column()
    tasaCambioCCMovimiento : number

    CCMovimientoCampo : CC_Movimientos_Campos
}