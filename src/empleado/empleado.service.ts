import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmpleadoDto, UpdateEmpleadoDto } from './dto/empleado.dto';

@Injectable()
export class EmpleadoService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.empleado.findMany({ include: { usuario: true } });
  }

  async findOne(id: number) {
    return this.prisma.empleado.findUnique({ where: { idEmpleado: id }, include: { usuario: true } });
  }

  async create(dto: CreateEmpleadoDto) {
    return this.prisma.empleado.create({ data: { idUsuario: dto.idUsuario, salario: dto.salario, fechaContrato: new Date(dto.fechaContrato) } });
  }

  async update(id: number, dto: UpdateEmpleadoDto) {
    const data: any = { ...dto };
    if (dto.fechaContrato) data.fechaContrato = new Date(dto.fechaContrato);
    return this.prisma.empleado.update({ where: { idEmpleado: id }, data });
  }

  async remove(id: number) {
    return this.prisma.empleado.delete({ where: { idEmpleado: id } });
  }
}
