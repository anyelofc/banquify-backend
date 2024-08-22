import { ApiProperty } from "@nestjs/swagger";

export class CreateCuentasVistaDto {

    @ApiProperty({default: 1})
    public idUsuario: number;
    @ApiProperty({default: true})
    public habilitada: boolean;

    constructor(idUsuario: number, habilitada: boolean) {
        this.idUsuario = idUsuario;
        this.habilitada = habilitada;
    }
    
}
