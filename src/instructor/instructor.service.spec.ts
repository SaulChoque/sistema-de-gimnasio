import { Test, TestingModule } from '@nestjs/testing';
import { InstructorService } from './instructor.service';
import { PrismaService } from '../prisma/prisma.service';

describe('InstructorService', () => {
  let service: InstructorService;

  const mockPrismaService = {
    instructor: {
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
        InstructorService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<InstructorService>(InstructorService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => expect(service).toBeDefined());

  it('create calls prisma.create', async () => {
    const dto = { idEmpleado: 1, especialidad: 'Yoga' };
    const created = { idInstructor: 1, ...dto };
    mockPrismaService.instructor.create.mockResolvedValue(created);
    const res = await service.create(dto);
    expect(res).toEqual(created);
    expect(mockPrismaService.instructor.create).toHaveBeenCalled();
  });
});
