import { ApiProperty } from "@nestjs/swagger";
import { tipoTransaccion } from "src/tipoTransaccion";

export class Transacciones {
    @ApiProperty()
    public id: number;
    @ApiProperty()
    public monto: number;
    @ApiProperty({enum: ['deposito', 'retiro', 'transferencia']})
    public tipo: tipoTransaccion;
    @ApiProperty()
    public fecha: Date;
    @ApiProperty()
    public emisor: number;
    @ApiProperty()
    public receptor: number;

}

// Transaccion
// ● id: Integer (identificador único de la transacción, generado automáticamente)
// ● monto: Number (monto de la transacción)
// ● tipo: Enum (tipo de transacción: "deposito", "retiro", "transferencia")
// ● fecha: Date (fecha y hora de la transacción)
// ● emisor: id cuenta vista emisor (cuenta que realiza la transacción)
// ● receptor: id cuenta vista receptor (cuenta que recibe la transacción)