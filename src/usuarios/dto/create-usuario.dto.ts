import { ApiProperty } from "@nestjs/swagger";

export class CreateUsuarioDto {
    @ApiProperty({default: 'Ányelo Flores'})
    public nombre: string;
    @ApiProperty({default: 'anyelo.flores.con@gmail.com'})
    public correoElectronico: string;
    @ApiProperty({default: '12345'})
    public contrasena: string;

    
    constructor(nombre: string, correoElectronico: string, contrasena: string) {
        this.nombre = nombre;
        this.correoElectronico = correoElectronico;
        this.contrasena = contrasena;
    }
}