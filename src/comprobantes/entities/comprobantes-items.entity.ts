import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'comprobantes_items' })
export class Comprobante_items {
  @PrimaryGeneratedColumn()
  idComprobanteItem: number;
  @Column()
  idComprobante: number;
  @Column()
  codigoComprobanteItem: string;
  @Column()
  descripcionComprobanteItem: string;
  @Column()
  cantidadComprobanteItem: number;
  @Column()
  precioComprobanteItem: number;
  @Column()
  totalComprobanteItem: number;
  @Column()
  porcentajeIVAComprobanteItem: number;
  @Column()
  idProducto: number;
  @Column()
  mesesGarantiaComprobanteItem: number;
  @Column()
  descuentaStockComprobanteItem: number;
  @Column()
  idProductoKit: number;
  @Column()
  impuestosInternosComprobanteItem: number;
  @Column()
  idDeposito: number;
}
