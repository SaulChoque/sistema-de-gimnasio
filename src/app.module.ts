import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ClasesModule } from './clases/clases.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [AuthModule, UsuariosModule, ClasesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
