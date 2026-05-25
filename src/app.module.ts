import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ClasesModule } from './clases/clases.module';
import { AdministradorModule } from './administrador/administrador.module';
import { EmpleadoModule } from './empleado/empleado.module';
import { InstructorModule } from './instructor/instructor.module';
import { RecepcionistaModule } from './recepcionista/recepcionista.module';
import { AdmLimpiezaModule } from './adm-limpieza/adm-limpieza.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [AuthModule, UsuariosModule, ClasesModule, AdministradorModule, EmpleadoModule, InstructorModule, RecepcionistaModule, AdmLimpiezaModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
