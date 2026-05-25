import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsEnum,
} from 'class-validator';

export enum RolUsuario {
  CLIENTE = 'cliente',
  EMPLEADO = 'empleado',
  ADMINISTRADOR = 'administrador',
}

export class RegisterDto {
  @IsString({ message: 'El nombre debe ser texto' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
  nombre: string;

  @IsEmail({}, { message: 'El correo debe ser válido' })
  correo: string;

  @IsString({ message: 'La contraseña debe ser texto' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  passwordHash: string;

  @IsString({ message: 'El teléfono debe ser texto' })
  @MinLength(7, { message: 'El teléfono debe tener al menos 7 caracteres' })
  telefono: string;

  @IsString({ message: 'La dirección debe ser texto' })
  @MaxLength(200, { message: 'La dirección no puede exceder 200 caracteres' })
  direccion: string;

  @IsOptional()
  @IsEnum(RolUsuario, { message: 'El rol debe ser cliente, empleado o administrador' })
  rol?: RolUsuario;
}
