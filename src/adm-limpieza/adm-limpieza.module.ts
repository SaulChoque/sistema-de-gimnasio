import { Module } from '@nestjs/common';
import { AdmLimpiezaService } from './adm-limpieza.service';
import { AdmLimpiezaController } from './adm-limpieza.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [AdmLimpiezaController],
  providers: [AdmLimpiezaService, PrismaService],
  exports: [AdmLimpiezaService],
})
export class AdmLimpiezaModule {}
