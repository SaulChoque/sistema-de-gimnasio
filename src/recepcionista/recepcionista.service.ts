import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRecepcionistaDto } from './dto/recepcionista.dto';

@Injectable()
export class RecepcionistaService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.recepcionista.findMany({ include: { empleado: true } });
  }

  async findOne(id: number) {
    return this.prisma.recepcionista.findUnique({ where: { idRecepcionista: id }, include: { empleado: true } });
  }

  async create(dto: CreateRecepcionistaDto) {
    return this.prisma.recepcionista.create({ data: { idEmpleado: dto.idEmpleado } });
  }

  async remove(id: number) {
    return this.prisma.recepcionista.delete({ where: { idRecepcionista: id } });
  }
}
