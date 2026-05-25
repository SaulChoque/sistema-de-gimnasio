import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClaseDto, UpdateClaseDto } from './dto';

@Injectable()
export class ClasesService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.clases.findMany({
      include: { instructor: true, asistencias: true },
    });
  }

  async findOne(id: number) {
    return this.prismaService.clases.findUnique({
      where: { idClases: id },
      include: { instructor: true, asistencias: true },
    });
  }

  async create(createClaseDto: CreateClaseDto) {
    return this.prismaService.clases.create({
      data: createClaseDto,
      include: { instructor: true },
    });
  }

  async update(id: number, updateClaseDto: UpdateClaseDto) {
    return this.prismaService.clases.update({
      where: { idClases: id },
      data: updateClaseDto,
      include: { instructor: true },
    });
  }

  async remove(id: number) {
    return this.prismaService.clases.delete({
      where: { idClases: id },
    });
  }

  async agregarAsistencia(idClase: number, idCliente: number) {
    return this.prismaService.asiste.create({
      data: {
        idClases: idClase,
        idCliente: idCliente,
        fecha: new Date(),
      },
    });
  }

  async obtenerAsistencias(idClase: number) {
    return this.prismaService.asiste.findMany({
      where: { idClases: idClase },
      include: { cliente: true },
    });
  }
}
