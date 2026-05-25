import { IsInt, IsNumber, IsString, IsDateString } from 'class-validator';

export class CreateEmpleadoDto {
  @IsInt({ message: 'idUsuario debe ser un entero' })
  idUsuario: number;

  @IsNumber({}, { message: 'salario debe ser numérico' })
  salario: number;

  @IsDateString({}, { message: 'fechaContrato debe ser una fecha válida' })
  fechaContrato: string;
}

export class UpdateEmpleadoDto {
  @IsNumber({}, { message: 'salario debe ser numérico' })
  salario?: number;

  @IsDateString({}, { message: 'fechaContrato debe ser una fecha válida' })
  fechaContrato?: string;
}
