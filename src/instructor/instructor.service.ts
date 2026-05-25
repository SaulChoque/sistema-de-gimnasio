import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInstructorDto, UpdateInstructorDto } from './dto/instructor.dto';

@Injectable()
export class InstructorService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.instructor.findMany({ include: { empleado: true } });
  }

  async findOne(id: number) {
    return this.prisma.instructor.findUnique({ where: { idInstructor: id }, include: { empleado: true } });
  }

  async create(dto: CreateInstructorDto) {
    return this.prisma.instructor.create({ data: { idEmpleado: dto.idEmpleado, especialidad: dto.especialidad } });
  }

  async update(id: number, dto: UpdateInstructorDto) {
    return this.prisma.instructor.update({ where: { idInstructor: id }, data: dto });
  }

  async remove(id: number) {
    return this.prisma.instructor.delete({ where: { idInstructor: id } });
  }
}
