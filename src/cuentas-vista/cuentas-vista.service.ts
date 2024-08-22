import { Injectable } from '@nestjs/common';
import { CreateCuentasVistaDto } from './dto/create-cuentas-vista.dto';
import { UpdateCuentasVistaDto } from './dto/update-cuentas-vista.dto';
import { CuentasVista } from './entities/cuentas-vista.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class CuentasVistaService {
  cuentasVistas: CuentasVista[] = [];
  
  constructor(
      private readonly usuariosService: UsuariosService
  ) {}


  create(createCuentasVistaDto: CreateCuentasVistaDto) {
    const cuentasVista: CuentasVista = new CuentasVista();
    if (this.cuentasVistas.find(cuentasVista => cuentasVista.idUsuario === createCuentasVistaDto.idUsuario)) {
      return null;
    } else {
      cuentasVista.id = this.cuentasVistas.length + 100000;
      cuentasVista.idUsuario = createCuentasVistaDto.idUsuario;
      cuentasVista.saldo = 0;
      cuentasVista.habilitada = createCuentasVistaDto.habilitada;
      this.cuentasVistas.push(cuentasVista);
      return cuentasVista;
    }
  }

 
  findAll(estaHabilitada: boolean): CuentasVista[] {
    if (estaHabilitada) {
      return this.cuentasVistas.filter(cuentasVista => cuentasVista.habilitada === estaHabilitada);
    } else {
      return this.cuentasVistas;
    }
  } 

  findOne(id: number) {
    for (let i = 0; i < this.cuentasVistas.length; i++) {
      if (this.cuentasVistas[i].id === +id) {
        return this.cuentasVistas[i];
      }
    }
    return null;
  }

  update(id: number, updateCuentasVistaDto: UpdateCuentasVistaDto) {
    const cuentasVista = this.findOne(id);
    if (cuentasVista) {
      cuentasVista.habilitada = updateCuentasVistaDto.habilitada;
      this.cuentasVistas[id] = cuentasVista;
      return cuentasVista;
      }
      return null;
  }


  remove(id: number) {
    const cuentasVista = this.findOne(id);
    if (cuentasVista) {

      const iCuentaVista = this.cuentasVistas.indexOf(cuentasVista);
      if (iCuentaVista > -1) {
        this.cuentasVistas.splice(iCuentaVista, 1);
        return true
      }
      return false;
    }
  }
}
