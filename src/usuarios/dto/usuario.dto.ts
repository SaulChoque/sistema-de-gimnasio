import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  IsBoolean,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsString({ message: 'El nombre debe ser texto' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
  nombre: string;

  @IsEmail({}, { message: 'El correo debe ser válido' })
  correo: string;

  @IsOptional()
  @IsString({ message: 'El teléfono debe ser texto' })
  @MinLength(7, { message: 'El teléfono debe tener al menos 7 caracteres' })
  telefono?: string;

  @IsOptional()
  @IsString({ message: 'La dirección debe ser texto' })
  @MaxLength(200, { message: 'La dirección no puede exceder 200 caracteres' })
  direccion?: string;
}

export class UpdateUsuarioDto {
  @IsOptional()
  @IsString({ message: 'El nombre debe ser texto' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
  nombre?: string;

  @IsOptional()
  @IsString({ message: 'El teléfono debe ser texto' })
  @MinLength(7, { message: 'El teléfono debe tener al menos 7 caracteres' })
  telefono?: string;

  @IsOptional()
  @IsString({ message: 'La dirección debe ser texto' })
  @MaxLength(200, { message: 'La dirección no puede exceder 200 caracteres' })
  direccion?: string;

  @IsOptional()
  @IsBoolean({ message: 'El campo activo debe ser booleano' })
  activo?: boolean;
}
