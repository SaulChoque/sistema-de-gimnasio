import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';
import { AdmLimpiezaService } from './adm-limpieza.service';
import { CreateAdmLimpiezaDto } from './dto/adm-limpieza.dto';
import { JwtAuthGuard } from '../auth/guards';

@ApiTags('AdmLimpieza')
@Controller('adm-limpieza')
export class AdmLimpiezaController {
  constructor(private readonly service: AdmLimpiezaService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Obtener todos los administradores de limpieza' })
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('bearer')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiOperation({ summary: 'Obtener adm limpieza por ID' })
  async findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('bearer')
  @ApiBody({ type: CreateAdmLimpiezaDto })
  @ApiOperation({ summary: 'Crear adm limpieza' })
  async create(@Body() dto: CreateAdmLimpiezaDto) {
    return this.service.create(dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Eliminar adm limpieza' })
  async remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
