export class CreateUsuarioDto {
  nombre: string;
  correo: string;
  telefono?: string;
  direccion?: string;
}

export class UpdateUsuarioDto {
  nombre?: string;
  telefono?: string;
  direccion?: string;
  activo?: boolean;
}
