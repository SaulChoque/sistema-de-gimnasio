import { Module } from '@nestjs/common';
import { ClasesService } from './clases.service';
import { ClasesController } from './clases.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ClasesController],
  providers: [ClasesService, PrismaService],
  exports: [ClasesService],
})
export class ClasesModule {}
