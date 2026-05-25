import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';
import { EmpleadoService } from './empleado.service';
import { CreateEmpleadoDto, UpdateEmpleadoDto } from './dto/empleado.dto';
import { JwtAuthGuard } from '../auth/guards';

@ApiTags('Empleado')
@Controller('empleado')
export class EmpleadoController {
  constructor(private readonly service: EmpleadoService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Obtener todos los empleados' })
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('bearer')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiOperation({ summary: 'Obtener empleado por ID' })
  async findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('bearer')
  @ApiBody({ type: CreateEmpleadoDto })
  @ApiOperation({ summary: 'Crear empleado' })
  async create(@Body() dto: CreateEmpleadoDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('bearer')
  @ApiBody({ type: UpdateEmpleadoDto })
  @ApiOperation({ summary: 'Actualizar empleado' })
  async update(@Param('id') id: string, @Body() dto: UpdateEmpleadoDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Eliminar empleado' })
  async remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
