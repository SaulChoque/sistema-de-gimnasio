import { Test, TestingModule } from '@nestjs/testing';
import { AdministradorService } from './administrador.service';
import { PrismaService } from '../prisma/prisma.service';

describe('AdministradorService', () => {
  let service: AdministradorService;

  const mockPrismaService = {
    administrador: {
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
        AdministradorService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<AdministradorService>(AdministradorService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => expect(service).toBeDefined());

  it('findAll calls prisma.findMany', async () => {
    mockPrismaService.administrador.findMany.mockResolvedValue([]);
    const res = await service.findAll();
    expect(res).toEqual([]);
    expect(mockPrismaService.administrador.findMany).toHaveBeenCalled();
  });
});
