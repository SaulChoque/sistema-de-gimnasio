import { IsInt } from 'class-validator';

export class CreateAdmLimpiezaDto {
  @IsInt({ message: 'idEmpleado debe ser un entero' })
  idEmpleado: number;
}

export class UpdateAdmLimpiezaDto {}
