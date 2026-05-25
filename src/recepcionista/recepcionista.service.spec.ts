import { Test, TestingModule } from '@nestjs/testing';
import { RecepcionistaService } from './recepcionista.service';
import { PrismaService } from '../prisma/prisma.service';

describe('RecepcionistaService', () => {
  let service: RecepcionistaService;

  const mockPrismaService = {
    recepcionista: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecepcionistaService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<RecepcionistaService>(RecepcionistaService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => expect(service).toBeDefined());

  it('findAll returns list', async () => {
    mockPrismaService.recepcionista.findMany.mockResolvedValue([]);
    const res = await service.findAll();
    expect(res).toEqual([]);
    expect(mockPrismaService.recepcionista.findMany).toHaveBeenCalled();
  });
});
