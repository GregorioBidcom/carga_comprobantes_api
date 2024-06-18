/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({name: 'operaciones'})
export class Operacion{
    @PrimaryGeneratedColumn()
    idOperacion : number
    @Column()
    idOperacionTipo : number
    @Column()
    idPV : number
    @Column()
    idOperacionComprobante : number
    @Column()
    nombreOperacion : string
    @Column()
    permiteCambiarDepositosOperacion : number
    @Column()
    idDepositoOrigen : number
    @Column()
    idDepositoDestino : number
    @Column()
    correspondeAEnvioOperacion : number
    @Column()
    habilitadaParaSTOperacion : number
    @Column()
    habilitadaParaDespachosOperacion : number
    @Column()
    tipoComprobanteExterno : string
    @Column()
    esMayoristaOperacion : number
}
