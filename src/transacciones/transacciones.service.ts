import { Injectable } from '@nestjs/common';
import { CreateTransaccioneDto } from './dto/create-transaccione.dto';
import { UpdateTransaccioneDto } from './dto/update-transaccione.dto';
import { Transacciones } from './entities/transaccione.entity';

@Injectable()
export class TransaccionesService {
  transacciones: Transacciones[] = [];

  create(createTransaccioneDto: CreateTransaccioneDto) {
    return 'This action adds a new transaccione';
  }

  findAll(tipoTransaccion: string): Transacciones[] {

    if (tipoTransaccion) {
      return this.transacciones.filter(transacciones => transacciones.tipo === tipoTransaccion);
    } 
    return this.transacciones;
  }

  // findAll(estaHabilitada: boolean): CuentasVista[] {
  //   if (estaHabilitada) {
  //     return this.cuentasVistas.filter(cuentasVista => cuentasVista.habilitada === estaHabilitada);
  //   } else {
  //     return this.cuentasVistas;
  //   }
  // } 

  findOne(id: number) {
    for (let i = 0; i < this.transacciones.length; i++) {
      if (this.transacciones[i].id === +id) {
        return this.transacciones[i];
      }
    }
    return null
  }

  update(id: number, updateTransaccioneDto: UpdateTransaccioneDto) {
    return `This action updates a #${id} transaccione`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaccione`;
  }
}
