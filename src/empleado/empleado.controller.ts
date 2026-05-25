import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';
import { EmpleadoService } from './empleado.service';
import { CreateEmpleadoDto, UpdateEmpleadoDto } from './dto/empleado.dto';
import { JwtAuthGuard } from '../auth/guards';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('Empleado')
@Controller('empleado')
export class EmpleadoController {
  constructor(private readonly service: EmpleadoService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('administrador')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Obtener todos los empleados' })
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('administrador','instructor')
  @ApiBearerAuth('bearer')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiOperation({ summary: 'Obtener empleado por ID' })
  async findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('administrador')
  @ApiBearerAuth('bearer')
  @ApiBody({ type: CreateEmpleadoDto })
  @ApiOperation({ summary: 'Crear empleado' })
  async create(@Body() dto: CreateEmpleadoDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('administrador')
  @ApiBearerAuth('bearer')
  @ApiBody({ type: UpdateEmpleadoDto })
  @ApiOperation({ summary: 'Actualizar empleado' })
  async update(@Param('id') id: string, @Body() dto: UpdateEmpleadoDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('administrador')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Eliminar empleado' })
  async remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
