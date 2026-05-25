import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';
import { InstructorService } from './instructor.service';
import { CreateInstructorDto, UpdateInstructorDto } from './dto/instructor.dto';
import { JwtAuthGuard } from '../auth/guards';

@ApiTags('Instructor')
@Controller('instructor')
export class InstructorController {
  constructor(private readonly service: InstructorService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Obtener todos los instructores' })
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('bearer')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiOperation({ summary: 'Obtener instructor por ID' })
  async findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('bearer')
  @ApiBody({ type: CreateInstructorDto })
  @ApiOperation({ summary: 'Crear instructor' })
  async create(@Body() dto: CreateInstructorDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('bearer')
  @ApiBody({ type: UpdateInstructorDto })
  @ApiOperation({ summary: 'Actualizar instructor' })
  async update(@Param('id') id: string, @Body() dto: UpdateInstructorDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Eliminar instructor' })
  async remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
