import { Module } from '@nestjs/common';
import { RecepcionistaService } from './recepcionista.service';
import { RecepcionistaController } from './recepcionista.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [RecepcionistaController],
  providers: [RecepcionistaService, PrismaService],
  exports: [RecepcionistaService],
})
export class RecepcionistaModule {}
