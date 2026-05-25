import { IsInt } from 'class-validator';

export class CreateRecepcionistaDto {
  @IsInt({ message: 'idEmpleado debe ser un entero' })
  idEmpleado: number;
}

export class UpdateRecepcionistaDto {
  // Sin campos adicionales por ahora
}
