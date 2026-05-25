import {
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class CreateClaseDto {
  @IsNumber({}, { message: 'idInstructor debe ser un número' })
  idInstructor: number;

  @IsString({ message: 'El nombre debe ser texto' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
  nombre: string;

  @IsString({ message: 'El horario debe ser texto' })
  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, {
    message: 'El horario debe estar en formato HH:mm (ej: 14:30)',
  })
  horario: string;
}

export class UpdateClaseDto {
  @IsString({ message: 'El nombre debe ser texto' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
  nombre?: string;

  @IsString({ message: 'El horario debe ser texto' })
  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, {
    message: 'El horario debe estar en formato HH:mm (ej: 14:30)',
  })
  horario?: string;
}
