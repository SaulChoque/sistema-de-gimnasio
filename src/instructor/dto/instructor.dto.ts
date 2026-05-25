import { IsInt, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateInstructorDto {
  @IsInt({ message: 'idEmpleado debe ser un entero' })
  idEmpleado: number;

  @IsString({ message: 'La especialidad debe ser texto' })
  @MinLength(2, { message: 'La especialidad debe tener al menos 2 caracteres' })
  @MaxLength(100, { message: 'La especialidad no puede exceder 100 caracteres' })
  especialidad: string;
}

export class UpdateInstructorDto {
  @IsString({ message: 'La especialidad debe ser texto' })
  @MinLength(2, { message: 'La especialidad debe tener al menos 2 caracteres' })
  @MaxLength(100, { message: 'La especialidad no puede exceder 100 caracteres' })
  especialidad?: string;
}
