import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUsuarioDto } from './create-usuario.dto';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
    @ApiProperty()    
    public nombre: string;
    @ApiProperty()  
    public correoElectronico: string;
    
    constructor( correoElectronico: string, contrasena: string) {
        super();
        this.correoElectronico = correoElectronico;
        this.contrasena = contrasena;
    }
}
