import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'cptes_productos' })
export class EPCpteProductos {
  constructor() {}
  @PrimaryGeneratedColumn()
  idComprobante: number;
  @PrimaryColumn()
  codigoProducto: string;
  @Column()
  cantidad: number;
}
