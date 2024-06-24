import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'cptes_despacho' })
export class EPCpteDespacho {
  constructor() {}
  @PrimaryColumn()
  idEnvio: number;
  @PrimaryColumn()
  idPedido: number;
  @PrimaryColumn()
  idDespacho: number;
  @PrimaryColumn()
  idComprobante: number;
  @Column()
  idOrder: string;
  @Column()
  idShipping: string;
  @Column()
  Codigo_Seguimiento: string;
  @Column()
  Observaciones: string;
  @Column()
  Observacion_Receptor: string;
  @Column()
  Nombre_Receptor: string;
  @Column()
  Apellido_Receptor: string;
  @Column()
  Provincia: string;
  @Column()
  Localidad: string;
  @Column()
  Codigo_Postal: number;
  @Column()
  Calle: string;
  @Column()
  Numero_Puerta: number;
  @Column()
  Piso: string;
  @Column()
  Departamento: string;
  @Column()
  Geo_Lat: string;
  @Column()
  Geo_Lon: string;
  @Column()
  Entre_Calle_1: string;
  @Column()
  Entre_Calle_2: string;
  @Column()
  Despacho_Enviado_A_EP: number;
  @Column()
  Despacho_Fecha_A_EP: Date;
}
