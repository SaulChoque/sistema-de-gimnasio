import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUsuarioDto, UpdateUsuarioDto } from './dto';

@Injectable()
export class UsuariosService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.usuario.findMany();
  }

  async findOne(id: number) {
    return this.prismaService.usuario.findUnique({
      where: { idUsuario: id },
    });
  }

  async create(createUsuarioDto: CreateUsuarioDto) {
    return this.prismaService.usuario.create({
      data: {
        nombre: createUsuarioDto.nombre,
        correo: createUsuarioDto.correo,
        telefono: createUsuarioDto.telefono,
        direccion: createUsuarioDto.direccion,
        rol: createUsuarioDto.rol || 'cliente',
        passwordHash: '', // Will be set by auth service
      },
    });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return this.prismaService.usuario.update({
      where: { idUsuario: id },
      data: updateUsuarioDto,
    });
  }

  async remove(id: number) {
    return this.prismaService.usuario.delete({
      where: { idUsuario: id },
    });
  }
}
