import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, RegisterDto, AuthResponseDto } from './dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const { correo, passwordHash, nombre, telefono, direccion, rol } = registerDto;

    // Verificar si el usuario ya existe
    const usuarioExistente = await this.prismaService.usuario.findUnique({
      where: { correo },
    });

    if (usuarioExistente) {
      throw new BadRequestException('El correo ya está registrado');
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(passwordHash, 10);

    // Crear usuario
    const usuario = await this.prismaService.usuario.create({
      data: {
        nombre,
        correo,
        passwordHash: hashedPassword,
        telefono: telefono,
        direccion: direccion,
        rol: rol || 'cliente',
      },
    });

    // Generar tokens
    // Determinar role por relaciones (por defecto 'usuario')
    const role = 'usuario';
    const subrole = undefined;

    const { accessToken, refreshToken } = this.generateTokens(
      usuario.idUsuario,
      usuario.correo,
      role,
      subrole,
    );

    // Guardar refresh token en BD
    await this.prismaService.sesion.create({
      data: {
        idUsuario: usuario.idUsuario,
        refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días
      },
    });

    return {
      accessToken,
      refreshToken,
      usuario: {
        idUsuario: usuario.idUsuario,
        nombre: usuario.nombre,
        correo: usuario.correo,
        role,
        subrole: subrole,
      },
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const { correo, passwordHash } = loginDto;

    // Buscar usuario
    const usuario = await this.prismaService.usuario.findUnique({
      where: { correo },
    });

    if (!usuario || !usuario.activo) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verificar contraseña
    const esValida = await bcrypt.compare(passwordHash, usuario.passwordHash);

    if (!esValida) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Generar tokens
    // Obtener relaciones para determinar role
    const usuarioConRelaciones = await this.prismaService.usuario.findUnique({
      where: { correo },
      include: {
        administrador: true,
        empleado: { include: { instructor: true, recepcionista: true, admLimpieza: true } },
      },
    });

    let role = 'usuario';
    let subrole: string | undefined = undefined;

    if (usuarioConRelaciones) {
      if (usuarioConRelaciones.administrador) {
        role = 'administrador';
      } else if (usuarioConRelaciones.empleado) {
        role = 'empleado';
        if (usuarioConRelaciones.empleado.instructor) subrole = 'instructor';
        if (usuarioConRelaciones.empleado.recepcionista) subrole = 'recepcionista';
        if (usuarioConRelaciones.empleado.admLimpieza) subrole = 'adm_limpieza';
      }
    }

    const { accessToken, refreshToken } = this.generateTokens(
      usuario.idUsuario,
      usuario.correo,
      role,
      subrole,
    );

    // Guardar refresh token
    await this.prismaService.sesion.create({
      data: {
        idUsuario: usuario.idUsuario,
        refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return {
      accessToken,
      refreshToken,
      usuario: {
        idUsuario: usuario.idUsuario,
        nombre: usuario.nombre,
        correo: usuario.correo,
        role,
        subrole,
      },
    };
  }

  async logout(idUsuario: number): Promise<void> {
    await this.prismaService.sesion.deleteMany({
      where: { idUsuario },
    });
  }

  async refreshToken(refreshToken: string): Promise<AuthResponseDto> {
    const sesion = await this.prismaService.sesion.findFirst({
      where: { refreshToken },
      include: { usuario: true },
    });

    if (!sesion || sesion.expiresAt < new Date()) {
      throw new UnauthorizedException('Refresh token inválido');
    }

    // Recalcular role en base a relaciones actuales
    const usuarioConRel = await this.prismaService.usuario.findUnique({
      where: { idUsuario: sesion.usuario.idUsuario },
      include: {
        administrador: true,
        empleado: { include: { instructor: true, recepcionista: true, admLimpieza: true } },
      },
    });

    let role = 'usuario';
    let subrole: string | undefined = undefined;
    if (usuarioConRel) {
      if (usuarioConRel.administrador) role = 'administrador';
      else if (usuarioConRel.empleado) {
        role = 'empleado';
        if (usuarioConRel.empleado.instructor) subrole = 'instructor';
        if (usuarioConRel.empleado.recepcionista) subrole = 'recepcionista';
        if (usuarioConRel.empleado.admLimpieza) subrole = 'adm_limpieza';
      }
    }

    const { accessToken, refreshToken: newRefreshToken } = this.generateTokens(
      sesion.usuario.idUsuario,
      sesion.usuario.correo,
      role,
      subrole,
    );

    // Actualizar refresh token
    await this.prismaService.sesion.update({
      where: { idSesion: sesion.idSesion },
      data: {
        refreshToken: newRefreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return {
      accessToken,
      refreshToken: newRefreshToken,
      usuario: {
        idUsuario: sesion.usuario.idUsuario,
        nombre: sesion.usuario.nombre,
        correo: sesion.usuario.correo,
        role,
        subrole,
      },
    };
  }

  private generateTokens(
    idUsuario: number,
    correo: string,
    role?: string,
    subrole?: string | undefined,
  ): { accessToken: string; refreshToken: string } {
    const payload: any = { idUsuario, correo, role };
    if (subrole) payload.subrole = subrole;
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: parseInt(process.env.JWT_EXPIRATION || '3600'),
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: 7 * 24 * 60 * 60,
    });
    return { accessToken, refreshToken };
  }
}
