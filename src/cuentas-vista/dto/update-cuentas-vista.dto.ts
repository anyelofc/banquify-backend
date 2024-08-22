import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCuentasVistaDto } from './create-cuentas-vista.dto';

export class UpdateCuentasVistaDto extends PartialType(CreateCuentasVistaDto) {
    @ApiProperty()
    public habilitada: boolean;

    constructor( habilitada: boolean) {
        super();
        this.habilitada = habilitada;
    }
    
}