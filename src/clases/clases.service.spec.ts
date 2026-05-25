import { Test, TestingModule } from '@nestjs/testing';
import { ClasesService } from './clases.service';
import { ClasesController } from './clases.controller';
import { PrismaService } from '../prisma/prisma.service';

describe('ClasesService', () => {
  let service: ClasesService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    clases: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    asiste: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClasesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ClasesService>(ClasesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all clases', async () => {
      const clases = [
        {
          idClases: 1,
          nombre: 'Yoga',
          horario: '10:00 AM',
        },
      ];

      mockPrismaService.clases.findMany.mockResolvedValue(clases);

      const result = await service.findAll();

      expect(result).toEqual(clases);
      expect(mockPrismaService.clases.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single clase', async () => {
      const clase = {
        idClases: 1,
        nombre: 'Yoga',
        horario: '10:00 AM',
      };

      mockPrismaService.clases.findUnique.mockResolvedValue(clase);

      const result = await service.findOne(1);

      expect(result).toEqual(clase);
      expect(mockPrismaService.clases.findUnique).toHaveBeenCalledWith({
        where: { idClases: 1 },
        include: { instructor: true, asistencias: true },
      });
    });
  });

  describe('create', () => {
    it('should create a new clase', async () => {
      const createClaseDto = {
        idInstructor: 1,
        nombre: 'Yoga',
        horario: '10:00 AM',
      };

      const clase = {
        idClases: 1,
        ...createClaseDto,
      };

      mockPrismaService.clases.create.mockResolvedValue(clase);

      const result = await service.create(createClaseDto);

      expect(result).toEqual(clase);
      expect(mockPrismaService.clases.create).toHaveBeenCalled();
    });
  });

  describe('agregarAsistencia', () => {
    it('should add attendance to a clase', async () => {
      const asistencia = {
        idClases: 1,
        idCliente: 1,
        fecha: new Date(),
      };

      mockPrismaService.asiste.create.mockResolvedValue(asistencia);

      const result = await service.agregarAsistencia(1, 1);

      expect(result).toEqual(asistencia);
      expect(mockPrismaService.asiste.create).toHaveBeenCalled();
    });
  });

  describe('obtenerAsistencias', () => {
    it('should get all attendances for a clase', async () => {
      const asistencias = [
        {
          idClases: 1,
          idCliente: 1,
          fecha: new Date(),
        },
      ];

      mockPrismaService.asiste.findMany.mockResolvedValue(asistencias);

      const result = await service.obtenerAsistencias(1);

      expect(result).toEqual(asistencias);
      expect(mockPrismaService.asiste.findMany).toHaveBeenCalled();
    });
  });
});
