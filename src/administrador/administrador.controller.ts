import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';
import { AdministradorService } from './administrador.service';
import { CreateAdministradorDto, UpdateAdministradorDto } from './dto/administrador.dto';
import { JwtAuthGuard } from '../auth/guards';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('Administrador')
@Controller('administrador')
export class AdministradorController {
  constructor(private readonly service: AdministradorService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('administrador')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Obtener todos los administradores' })
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('administrador')
  @ApiBearerAuth('bearer')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiOperation({ summary: 'Obtener administrador por ID' })
  async findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('administrador')
  @ApiBearerAuth('bearer')
  @ApiBody({ type: CreateAdministradorDto })
  @ApiOperation({ summary: 'Crear administrador' })
  async create(@Body() dto: CreateAdministradorDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('administrador')
  @ApiBearerAuth('bearer')
  @ApiBody({ type: UpdateAdministradorDto })
  @ApiOperation({ summary: 'Actualizar administrador' })
  async update(@Param('id') id: string, @Body() dto: UpdateAdministradorDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('administrador')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Eliminar administrador' })
  async remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
