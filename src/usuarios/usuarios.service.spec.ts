import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { PrismaService } from '../prisma/prisma.service';

describe('UsuariosService', () => {
  let service: UsuariosService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    usuario: {
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
        UsuariosService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<UsuariosService>(UsuariosService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all usuarios', async () => {
      const usuarios = [
        {
          idUsuario: 1,
          nombre: 'John Doe',
          correo: 'john@example.com',
        },
      ];

      mockPrismaService.usuario.findMany.mockResolvedValue(usuarios);

      const result = await service.findAll();

      expect(result).toEqual(usuarios);
      expect(mockPrismaService.usuario.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single usuario', async () => {
      const usuario = {
        idUsuario: 1,
        nombre: 'John Doe',
        correo: 'john@example.com',
      };

      mockPrismaService.usuario.findUnique.mockResolvedValue(usuario);

      const result = await service.findOne(1);

      expect(result).toEqual(usuario);
      expect(mockPrismaService.usuario.findUnique).toHaveBeenCalledWith({
        where: { idUsuario: 1 },
      });
    });
  });

  describe('create', () => {
    it('should create a new usuario', async () => {
      const createUsuarioDto = {
        nombre: 'John Doe',
        correo: 'john@example.com',
        telefono: '77777777',
        direccion: 'Calle 1',
      };

      const usuario = {
        idUsuario: 1,
        nombre: 'John Doe',
        correo: 'john@example.com',
        passwordHash: '',
      };

      mockPrismaService.usuario.create.mockResolvedValue(usuario);

      const result = await service.create(createUsuarioDto);

      expect(result).toEqual(usuario);
      expect(mockPrismaService.usuario.create).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update a usuario', async () => {
      const updateUsuarioDto = {
        nombre: 'Jane Doe',
      };

      const usuario = {
        idUsuario: 1,
        nombre: 'Jane Doe',
        correo: 'john@example.com',
      };

      mockPrismaService.usuario.update.mockResolvedValue(usuario);

      const result = await service.update(1, updateUsuarioDto);

      expect(result).toEqual(usuario);
      expect(mockPrismaService.usuario.update).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should delete a usuario', async () => {
      const usuario = {
        idUsuario: 1,
        nombre: 'John Doe',
      };

      mockPrismaService.usuario.delete.mockResolvedValue(usuario);

      const result = await service.remove(1);

      expect(result).toEqual(usuario);
      expect(mockPrismaService.usuario.delete).toHaveBeenCalledWith({
        where: { idUsuario: 1 },
      });
    });
  });
});
