import { ApiProperty } from "@nestjs/swagger";
import { CuentasVista } from "src/cuentas-vista/entities/cuentas-vista.entity";

export class Usuario {
    @ApiProperty()
    public id: number;
    @ApiProperty()
    public nombre: string;
    @ApiProperty()
    public correoElectronico: string;
    @ApiProperty()
    public contrasena: string;
    @ApiProperty()
    public puntosAcumulados: number;
    @ApiProperty()
    public cuentaVista: CuentasVista;
    
}