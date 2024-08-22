import { Module } from '@nestjs/common';
import { CuentasVistaService } from './cuentas-vista.service';
import { CuentasVistaController } from './cuentas-vista.controller';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  imports: [UsuariosModule],
  controllers: [CuentasVistaController],
  providers: [CuentasVistaService],
})
export class CuentasVistaModule {}
