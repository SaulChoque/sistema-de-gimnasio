import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAdmLimpiezaDto } from './dto/adm-limpieza.dto';

@Injectable()
export class AdmLimpiezaService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.admLimpieza.findMany({ include: { empleado: true } });
  }

  async findOne(id: number) {
    return this.prisma.admLimpieza.findUnique({ where: { idLimpieza: id }, include: { empleado: true } });
  }

  async create(dto: CreateAdmLimpiezaDto) {
    return this.prisma.admLimpieza.create({ data: { idEmpleado: dto.idEmpleado } });
  }

  async remove(id: number) {
    return this.prisma.admLimpieza.delete({ where: { idLimpieza: id } });
  }
}
