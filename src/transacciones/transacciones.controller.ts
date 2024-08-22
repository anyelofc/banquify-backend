import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { TransaccionesService } from './transacciones.service';
import { CreateTransaccioneDto } from './dto/create-transaccione.dto';
import { UpdateTransaccioneDto } from './dto/update-transaccione.dto';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('transacciones')
export class TransaccionesController {
  constructor(private readonly transaccionesService: TransaccionesService) {}

  @ApiOperation({ summary: 'Crear transacción.' })
  @Post()
  create(@Body() createTransaccioneDto: CreateTransaccioneDto) {
    return this.transaccionesService.create(createTransaccioneDto);
  }

  @ApiOperation({ summary: 'Muestra todas las transacciones existentes.' })
  @ApiQuery({ name: 'tipoTransaccion', required: false, type: String})
  @Get()
  findAll(@Query('tipoTransaccion') tipoTransaccion: string, @Res() res: Response) {

    return this.transaccionesService.findAll(tipoTransaccion);
  }

  // @ApiOperation({ summary: 'Muestra todas las cuentas vistas existentes.' })
  // @ApiQuery({ name: 'estaHabilitada', required: false, type: Boolean})
  // @Get()
  // findAll(@Query('estaHabilitada') estaHabilitada: string) {
  //   const estaHabilitadaBool: boolean = estaHabilitada === 'true';
  //   return this.cuentasVistaService.findAll(estaHabilitadaBool);
  // }


  // 4.5.1. Obtener Transacción según id
  // 4.5.1.1. si no se encuentra el id debe devolver 404 y un mensaje de error.
  // (Se debe documentar el código de respuesta)

  @ApiOperation({ summary: 'Buscar transacción por id. ' })
  @ApiResponse({ status: 200, description: 'Transacción encontrada.' })
  @ApiResponse({ status: 404, description: 'Transacción no encontrada.' })
  @Get(':idTransaccion')
  findOne(@Param('idTransaccion') idTransaccion: number, @Res() res: Response) {
    const transaccion = this.transaccionesService.findOne(+idTransaccion);
    if (transaccion) {
      res.status(200).send(transaccion);
    } else {
      res.status(404).send('Transacción no encontrada.'); 
    }
  }

  @ApiOperation({ summary: 'Actualizar transacción por id.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransaccioneDto: UpdateTransaccioneDto) {
    return this.transaccionesService.update(+id, updateTransaccioneDto);
  }

  @ApiOperation({ summary: 'Eliminar transacción por id.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transaccionesService.remove(+id);
  }
}
