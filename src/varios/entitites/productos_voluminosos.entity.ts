/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({name: 'posts'})
export class ProductosVoluminosos{
    @PrimaryGeneratedColumn()
    ID : number
    @Column()
    post_status : string
    @Column()
    codigo_aguila : string
    @Column()
    ean : string
    @Column()
    tipo_envio : string
    @Column()
    voluminoso : number
}
