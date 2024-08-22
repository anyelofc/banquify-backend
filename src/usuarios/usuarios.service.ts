import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { CuentasVista } from 'src/cuentas-vista/entities/cuentas-vista.entity';

@Injectable()
export class UsuariosService {
  usuarios: Usuario[] = [];


  //correo electrónico del usuario, único
  create(createUsuarioDto: CreateUsuarioDto) {
    const usuario: Usuario =  new Usuario();
    if (this.usuarios.find(usuario => usuario.correoElectronico === createUsuarioDto.correoElectronico)) {
      return null;
    }else{
      usuario.id = this.usuarios.length + 1;
      usuario.nombre = createUsuarioDto.nombre;
      usuario.correoElectronico = createUsuarioDto.correoElectronico;
      usuario.contrasena = createUsuarioDto.contrasena;
      usuario.puntosAcumulados = 0;
     // usuario.cuentaVista = "";
      this.usuarios.push(usuario);
      return usuario;
    }
  }

  findAll(nombre: string): Usuario[] {
    if (nombre) {
      return this.usuarios.filter(usuario => usuario.nombre.toLowerCase().includes(nombre.toLowerCase()));
    }else{
      return this.usuarios
    }
  }

  findOne(id: number) {
    for (let i = 0; i < this.usuarios.length; i++) {
      if (this.usuarios[i].id === +id) {
        return this.usuarios[i];
      }
    }
    return null;
  }

  // UPDATE USUARIO BY ID
  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = this.findOne(id);
    if (usuario) {
      usuario.correoElectronico = updateUsuarioDto.correoElectronico;
      usuario.contrasena = updateUsuarioDto.contrasena;
      this.usuarios[id] = usuario;
      return usuario;
    }else{
      return null;
    }
  }

  remove(id: number): boolean {
// delete user if exist
   for (let i = 0; i < this.usuarios.length; i++) {
      if (this.usuarios[i].id === +id) {
        this.usuarios.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  // asignarCuetnaVista(idUsuario: number, cuentaVista: CuentasVista) {
  //   const usuario = this.findOne(idUsuario);
  //   if (usuario) {
  //     usuario.cuentaVista = cuentaVista;
  //     this.usuarios[idUsuario] = usuario;
  //     return usuario;
  //   }else{
  //     return null;
  //   }
  // }
}
