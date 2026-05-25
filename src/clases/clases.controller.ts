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
import { ClasesService } from './clases.service';
import { CreateClaseDto, UpdateClaseDto } from './dto';
import { JwtAuthGuard } from '../auth/guards';

@Controller('clases')
export class ClasesController {
  constructor(private readonly clasesService: ClasesService) {}

  @Get()
  async findAll() {
    return this.clasesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.clasesService.findOne(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createClaseDto: CreateClaseDto) {
    return this.clasesService.create(createClaseDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateClaseDto: UpdateClaseDto,
  ) {
    return this.clasesService.update(+id, updateClaseDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return this.clasesService.remove(+id);
  }

  @Post(':id/asistencia')
  @UseGuards(JwtAuthGuard)
  async agregarAsistencia(
    @Param('id') id: string,
    @Body('idCliente') idCliente: number,
  ) {
    return this.clasesService.agregarAsistencia(+id, idCliente);
  }

  @Get(':id/asistencias')
  async obtenerAsistencias(@Param('id') id: string) {
    return this.clasesService.obtenerAsistencias(+id);
  }
}
