import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import { ClasesService } from './clases.service';
import { CreateClaseDto, UpdateClaseDto } from './dto';
import { JwtAuthGuard } from '../auth/guards';

@ApiTags('Clases')
@Controller('clases')
export class ClasesController {
  constructor(private readonly clasesService: ClasesService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las clases' })
  @ApiResponse({ status: 200, description: 'Lista de clases' })
  async findAll() {
    return this.clasesService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiOperation({ summary: 'Obtener clase por ID' })
  @ApiResponse({ status: 200, description: 'Clase encontrada' })
  @ApiResponse({ status: 404, description: 'Clase no encontrada' })
  async findOne(@Param('id') id: string) {
    return this.clasesService.findOne(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Crear nueva clase' })
  @ApiBody({ type: CreateClaseDto })
  @ApiResponse({ status: 201, description: 'Clase creada' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async create(@Body() createClaseDto: CreateClaseDto) {
    return this.clasesService.create(createClaseDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('bearer')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiOperation({ summary: 'Actualizar clase' })
  @ApiBody({ type: UpdateClaseDto })
  @ApiResponse({ status: 200, description: 'Clase actualizada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Clase no encontrada' })
  async update(
    @Param('id') id: string,
    @Body() updateClaseDto: UpdateClaseDto,
  ) {
    return this.clasesService.update(+id, updateClaseDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('bearer')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiOperation({ summary: 'Eliminar clase' })
  @ApiResponse({ status: 200, description: 'Clase eliminada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Clase no encontrada' })
  async remove(@Param('id') id: string) {
    return this.clasesService.remove(+id);
  }

  @Post(':id/asistencia')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('bearer')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiOperation({ summary: 'Registrar asistencia en clase' })
  @ApiBody({
    schema: { example: { idCliente: 1 } },
  })
  @ApiResponse({ status: 200, description: 'Asistencia registrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async agregarAsistencia(
    @Param('id') id: string,
    @Body('idCliente') idCliente: number,
  ) {
    return this.clasesService.agregarAsistencia(+id, idCliente);
  }

  @Get(':id/asistencias')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiOperation({ summary: 'Obtener asistencias de una clase' })
  @ApiResponse({ status: 200, description: 'Lista de asistencias' })
  @ApiResponse({ status: 404, description: 'Clase no encontrada' })
  async obtenerAsistencias(@Param('id') id: string) {
    return this.clasesService.obtenerAsistencias(+id);
  }
}
