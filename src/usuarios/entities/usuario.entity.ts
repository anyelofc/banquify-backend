import { ApiProperty } from "@nestjs/swagger";

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
    
}