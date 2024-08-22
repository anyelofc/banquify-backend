import { ApiProperty } from "@nestjs/swagger";
import { Transacciones } from "src/transacciones/entities/transaccione.entity";

export class CuentasVista {

    @ApiProperty()
    public idUsuario: number;
    @ApiProperty()
    public id: number;
    @ApiProperty()
    public saldo: number;
    @ApiProperty()
    historialTransacciones: Transacciones[];
    @ApiProperty()
    public habilitada: boolean;


    // ● id: Integer (identificador único de la cuenta, generado automáticamente)
    // ● idUsuario: id del Usuario (id del usuario al que pertenece la cuenta)
    // ● saldo: Number (saldo de la cuenta, inicialmente 0)
    // ● historialTransacciones: array<Transaccion> (registro de todas las transacciones
    // realizadas en la cuenta)
    // ● habilitada: boolean

}
