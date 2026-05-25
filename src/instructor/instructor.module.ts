import { Module } from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { InstructorController } from './instructor.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [InstructorController],
  providers: [InstructorService, PrismaService],
  exports: [InstructorService],
})
export class InstructorModule {}
