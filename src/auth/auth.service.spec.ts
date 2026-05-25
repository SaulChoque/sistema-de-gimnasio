import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;

  const mockPrismaService = {
    usuario: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    sesion: {
      create: jest.fn(),
      findFirst: jest.fn(),
      deleteMany: jest.fn(),
      update: jest.fn(),
    },
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('AuthService', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should throw error if email already exists', async () => {
      const registerDto = {
        nombre: 'John Doe',
        correo: 'john@example.com',
        passwordHash: 'password123',
      };

      mockPrismaService.usuario.findUnique.mockResolvedValue({
        idUsuario: 1,
        correo: 'john@example.com',
      });

      await expect(service.register(registerDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw error for invalid credentials', async () => {
      const loginDto = {
        correo: 'john@example.com',
        passwordHash: 'wrongpassword',
      };

      mockPrismaService.usuario.findUnique.mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should logout a user', async () => {
      const idUsuario = 1;

      await service.logout(idUsuario);

      expect(mockPrismaService.sesion.deleteMany).toHaveBeenCalledWith({
        where: { idUsuario },
      });
    });

    it('should throw error for invalid refresh token', async () => {
      mockPrismaService.sesion.findFirst.mockResolvedValue(null);

      await expect(service.refreshToken('invalid_token')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
