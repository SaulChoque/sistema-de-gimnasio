import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';
import { RecepcionistaService } from './recepcionista.service';
import { CreateRecepcionistaDto } from './dto/recepcionista.dto';
import { JwtAuthGuard } from '../auth/guards';

@ApiTags('Recepcionista')
@Controller('recepcionista')
export class RecepcionistaController {
  constructor(private readonly service: RecepcionistaService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Obtener todos los recepcionistas' })
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('bearer')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiOperation({ summary: 'Obtener recepcionista por ID' })
  async findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('bearer')
  @ApiBody({ type: CreateRecepcionistaDto })
  @ApiOperation({ summary: 'Crear recepcionista' })
  async create(@Body() dto: CreateRecepcionistaDto) {
    return this.service.create(dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Eliminar recepcionista' })
  async remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
