import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import e, { Response } from 'express';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @ApiResponse({ status: 201, description: 'Usuario creado.' })
  @ApiResponse({ status: 400, description: 'El correo electrónico ya está registrado.' })
  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto, @Res() res: Response) {
    const usuarioCreado = this.usuariosService.create(createUsuarioDto);
    if (usuarioCreado) {
      res.status(201).send(usuarioCreado); 
    }else{
      res.status(400).send('El correo electrónico ya está registrado.');
    }
  }

  @ApiQuery({ name: 'nombre', required: false })
  @Get()
  findAll(@Query('nombre') nombre: string) {
        return this.usuariosService.findAll(nombre);
  }

  @ApiResponse({ status: 200, description: 'Usuario encontrado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @Get(':id')
  findOne(@Param('id') id: number, @Res() res: Response) {
    const usuarioEncotrado = this.usuariosService.findOne(+id);
    if (usuarioEncotrado) {
      res.status(200).send(usuarioEncotrado);
    }else{
      res.status(404).send('Usuario no encontrado.');
    }
  }

  @ApiResponse({ status: 200, description: 'Usuario actualizado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto, @Res() res: Response) {
    const usuarioActualizado = this.usuariosService.update(+id, updateUsuarioDto);
    if (usuarioActualizado) {
      res.status(200).send(usuarioActualizado);
    }else{
      res.status(404).send('Usuario no encontrado.');
    }
  }

  @ApiResponse({ status: 200, description: 'Usuario eliminado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    const usuarioEliminado = this.usuariosService.remove(+id);
    if (usuarioEliminado) {
      res.status(200).send('Usuario eliminado.');
    }else{  
      res.status(404).send('Usuario no encontrado.');
    }
  }
}
