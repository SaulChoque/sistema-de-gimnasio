import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    try {
      await this.$connect();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error desconocido';

      throw new Error(
        [
          'No se pudo conectar a la base de datos.',
          'Verifica DATABASE_URL en el archivo .env (host, usuario del proyecto y password).',
          `Detalle original: ${message}`,
        ].join(' '),
      );
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
