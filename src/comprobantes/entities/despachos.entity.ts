/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity({name: 'despachos'})
export class Despacho{
    @PrimaryGeneratedColumn()
    idDespacho : number
    @Column()
    idDespachoTipo : number
    @Column()
    idDespachoMedioResponsable : number
    @Column()
    idAgenda : number
    @Column()
    idDomicilio : number
    @Column()
    idDespachoEstado : number
    @Column()
    codigoSeguimientoDespacho : string
    @Column()
    costoDespacho : number
    @Column()
    idUsuario_AltaDespacho : number
    @Column()
    fechaAltaDespacho : Date
    @Column()
    idUsuario_EnvioDespacho : number
    @Column()
    fechaEnvioDespacho : Date
    @Column()
    idUsuario_AnulaDespacho : number
    @Column()
    fechaAnulaDespacho : Date
    @Column()
    observacionesDespacho : string
    @Column()
    montoContrareembolsoDespacho : number
    @Column()
    idUsuario_PagoMotosDespacho : number
    @Column()
    fechaPagoMotosDespacho : Date
    @Column()
    idComprobante_Administrativo : number
    @Column()
    idComprobante : number
    @Column()
    idDespachoSucursal : number
    @Column()
    CodDespachoSucursal : number
    @Column()
    nombreReceptorDespacho : string
    @Column()
    apellidoReceptorDespacho : string
    @Column()
    horarioEntregaDespacho : string
    @Column()
    fechaRecepcionDespacho   : Date
    @Column()
    montoRendidoDespacho : number
    @Column()
    nombreDespachoEmpresa : string
    @Column()
    despachoTerminal : string
    @Column()
    idUsuarioResponsable : number
    @Column()
    fechaEntregaDespacho : Date
    @Column()
    idDepositoDespacho : number
    @Column()
    TipoDomicilioEntrega : string
    @Column()
    Domicilio_Entrega_Valido : number
}