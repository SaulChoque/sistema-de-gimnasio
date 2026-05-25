import { Test, TestingModule } from '@nestjs/testing';
import { EmpleadoService } from './empleado.service';
import { PrismaService } from '../prisma/prisma.service';

describe('EmpleadoService', () => {
  let service: EmpleadoService;

  const mockPrismaService = {
    empleado: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmpleadoService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<EmpleadoService>(EmpleadoService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => expect(service).toBeDefined());

  it('findOne calls prisma.findUnique with correct where', async () => {
    const empleado = { idEmpleado: 1, salario: 1000 };
    mockPrismaService.empleado.findUnique.mockResolvedValue(empleado);
    const res = await service.findOne(1);
    expect(res).toEqual(empleado);
    expect(mockPrismaService.empleado.findUnique).toHaveBeenCalledWith({ where: { idEmpleado: 1 }, include: { usuario: true } });
  });
});
