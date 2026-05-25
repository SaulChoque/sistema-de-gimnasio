export class AuthResponseDto {
  accessToken: string;
  refreshToken?: string;
  usuario: {
    idUsuario: number;
    nombre: string;
    correo: string;
    role?: string;
    subrole?: string;
  };
}
