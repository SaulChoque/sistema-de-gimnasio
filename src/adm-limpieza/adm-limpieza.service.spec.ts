import { Test, TestingModule } from '@nestjs/testing';
import { AdmLimpiezaService } from './adm-limpieza.service';
import { PrismaService } from '../prisma/prisma.service';

describe('AdmLimpiezaService', () => {
  let service: AdmLimpiezaService;

  const mockPrismaService = {
    admLimpieza: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdmLimpiezaService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<AdmLimpiezaService>(AdmLimpiezaService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => expect(service).toBeDefined());

  it('create calls prisma.create', async () => {
    const dto = { idEmpleado: 1 };
    const created = { idLimpieza: 1, ...dto };
    mockPrismaService.admLimpieza.create.mockResolvedValue(created);
    const res = await service.create(dto);
    expect(res).toEqual(created);
    expect(mockPrismaService.admLimpieza.create).toHaveBeenCalled();
  });
});
