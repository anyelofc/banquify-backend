import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { CuentasVistaService } from './cuentas-vista.service';
import { CreateCuentasVistaDto } from './dto/create-cuentas-vista.dto';
import { UpdateCuentasVistaDto } from './dto/update-cuentas-vista.dto';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { query, Response } from 'express';

@Controller('cuentas-vista')
export class CuentasVistaController {
  constructor(private readonly cuentasVistaService: CuentasVistaService,
    private readonly usuariosService: UsuariosService 
    ) {}

  @ApiOperation({ summary: 'Crear cuenta vista.' })
  @ApiResponse({ status: 201, description: 'Cuenta vista creada.' })
  @ApiResponse({ status: 404, description: 'Usuario no existe.' })
  @Post(':idUsuario')
  create(@Param('idUsuario') idUsuario: number,  @Body() createCuentasVistaDto: CreateCuentasVistaDto, @Res() res: Response) {
    const usuarioExiste = this.usuariosService.findOne(+idUsuario);

    if (usuarioExiste) {
      createCuentasVistaDto.idUsuario = idUsuario;
      const nuevaCtaVista = this.cuentasVistaService.create(createCuentasVistaDto);
      if (nuevaCtaVista) {
        usuarioExiste.cuentaVista = nuevaCtaVista;
        res.status(201).send(nuevaCtaVista);
      } else {
        res.status(404).send('Usuario ya posee una cuenta vista.');
      }
    } else {
      res.status(404).send('Usuario no encontrado.');
    }
  }
  
  @ApiOperation({ summary: 'Muestra todas las cuentas vistas existentes.' })
  @ApiQuery({ name: 'estaHabilitada', required: false, type: Boolean})
  @Get()
  findAll(@Query('estaHabilitada') estaHabilitada: string) {
    const estaHabilitadaBool: boolean = estaHabilitada === 'true';
    return this.cuentasVistaService.findAll(estaHabilitadaBool);
  }


  @ApiOperation({ summary: 'Buscar cuenta vista por id. ' })
  @ApiResponse({ status: 200, description: 'Cuenta vista encontrada.' })
  @ApiResponse({ status: 404, description: 'Cuenta vista no encontrada.' })
  @Get(':id')
  findOne(@Param('id') id: number, @Res() res: Response) {
    const cuentaVista = this.cuentasVistaService.findOne(+id);
    if (cuentaVista) {
      res.status(200).send(cuentaVista);
    } else {
      res.status(404).send('Cuenta vista no encontrada.');
    }
  }

  @ApiOperation({ summary: 'Actualizar cuenta vista por id.' })
  @ApiResponse({ status: 200, description: 'Cuenta vista actualizada.' })
  @ApiResponse({ status: 404, description: 'Cuenta vista no encontrada.' })
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCuentasVistaDto: UpdateCuentasVistaDto, @Res() res: Response) {
    const idCuentaVista = this.cuentasVistaService.findOne(+id);
    if (idCuentaVista) {
      const cuentaVistaActualizada = this.cuentasVistaService.update(+id, updateCuentasVistaDto);
      res.status(200).send(cuentaVistaActualizada);
    } else {  
      res.status(404).send('Cuenta vista no encontrada.');
    }
  }

  @ApiOperation({ summary: 'Eliminar cuenta vista por id.' })
  @Delete(':idCuenta')
  remove(@Param('idCuenta') idCuenta: number, @Res() res: Response) {
    const cuentaVista = this.cuentasVistaService.findOne(+idCuenta);
    if (cuentaVista) {
      this.cuentasVistaService.remove(+idCuenta);
      this.usuariosService.remove(cuentaVista.idUsuario);
      res.status(200).send('Cuenta vista eliminada.');
    } else {
      res.status(404).send('Cuenta vista no encontrada.');
    }
  }
}
