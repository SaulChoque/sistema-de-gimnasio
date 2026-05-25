import { IsInt, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateAdministradorDto {
  @IsInt({ message: 'idUsuario debe ser un entero' })
  idUsuario: number;

  @IsString({ message: 'El cargo debe ser texto' })
  @MinLength(2, { message: 'El cargo debe tener al menos 2 caracteres' })
  @MaxLength(100, { message: 'El cargo no puede exceder 100 caracteres' })
  cargo: string;
}

export class UpdateAdministradorDto {
  @IsString({ message: 'El cargo debe ser texto' })
  @MinLength(2, { message: 'El cargo debe tener al menos 2 caracteres' })
  @MaxLength(100, { message: 'El cargo no puede exceder 100 caracteres' })
  cargo?: string;
}
