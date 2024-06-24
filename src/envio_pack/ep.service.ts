import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EPCpte } from './entities/cptes-ep.entity';

@Injectable()
export class EPService {
  constructor(
    @InjectRepository(EPCpte, 'cnnEP')
    public EPCpteRepository: Repository<EPCpte>,
  ) {}

  async getOneEPComprobante(idComprobante: number): Promise<any> {
    const pEPComprobante = await this.EPCpteRepository.findOne({
      where: {
        idComprobante: idComprobante,
      },
    });
    if (pEPComprobante) {
      return pEPComprobante;
    } else {
      return 'null';
    }
  }
}
