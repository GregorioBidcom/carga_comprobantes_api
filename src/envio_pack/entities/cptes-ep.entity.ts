import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { EPCpteDespacho } from './cptes-despacho-ep.entity';
import { EPCpteProductos } from './cpte-productos-ep.entity';

@Entity({ name: 'cptes' })
export class EPCpte {
  constructor() {
    this.cpte_productos = [];
  }

  @Column()
  idPedido: number;
  @PrimaryGeneratedColumn()
  idComprobante: number;
  @Column()
  idDespacho: number;
  @Column()
  idOrder: string;
  @Column()
  fechaComprobante: Date;
  @Column()
  idFuenteVenta: number;
  @Column()
  idShipping: number;
  @Column()
  Cliente_ID: number;
  @Column()
  nombreCliente: string;
  @Column()
  apellidoCliente: string;
  @Column()
  emailCliente: string;
  @Column()
  telefonoCliente: string;
  @Column()
  montoTotal: number;
  @Column()
  Enviado_A_EP: number;
  @Column()
  Modo: string;
  @Column()
  Seller_ID: number;
  @Column()
  Fecha_A_EP: Date;

  cpte_despacho: EPCpteDespacho;
  cpte_productos: EPCpteProductos[];
}
