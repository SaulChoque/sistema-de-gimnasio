import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAdministradorDto, UpdateAdministradorDto } from './dto/administrador.dto';

@Injectable()
export class AdministradorService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.administrador.findMany({ include: { usuario: true } });
  }

  async findOne(id: number) {
    return this.prisma.administrador.findUnique({ where: { idAdministrador: id }, include: { usuario: true } });
  }

  async create(dto: CreateAdministradorDto) {
    return this.prisma.administrador.create({ data: { idUsuario: dto.idUsuario, cargo: dto.cargo } });
  }

  async update(id: number, dto: UpdateAdministradorDto) {
    return this.prisma.administrador.update({ where: { idAdministrador: id }, data: dto });
  }

  async remove(id: number) {
    return this.prisma.administrador.delete({ where: { idAdministrador: id } });
  }
}
