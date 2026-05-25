import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    register: jest.fn(),
    login: jest.fn(),
    logout: jest.fn(),
    refreshToken: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should call register with correct data', async () => {
      const registerDto: RegisterDto = {
        nombre: 'John Doe',
        correo: 'john@example.com',
        passwordHash: 'password123',
        telefono: '77777777',
        direccion: 'Calle 1',
      };

      const mockResponse = {
        json: jest.fn().mockReturnThis(),
        cookie: jest.fn().mockReturnThis(),
      };

      mockAuthService.register.mockResolvedValue({
        accessToken: 'access_token',
        refreshToken: 'refresh_token',
        usuario: {
          idUsuario: 1,
          nombre: 'John Doe',
          correo: 'john@example.com',
        },
      });

      await controller.register(registerDto, mockResponse);

      expect(mockAuthService.register).toHaveBeenCalledWith(registerDto);
      expect(mockResponse.cookie).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should call login with correct credentials', async () => {
      const loginDto: LoginDto = {
        correo: 'john@example.com',
        passwordHash: 'password123',
      };

      const mockResponse = {
        json: jest.fn().mockReturnThis(),
        cookie: jest.fn().mockReturnThis(),
      };

      mockAuthService.login.mockResolvedValue({
        accessToken: 'access_token',
        refreshToken: 'refresh_token',
        usuario: {
          idUsuario: 1,
          nombre: 'John Doe',
          correo: 'john@example.com',
        },
      });

      await controller.login(loginDto, mockResponse);

      expect(mockAuthService.login).toHaveBeenCalledWith(loginDto);
      expect(mockResponse.cookie).toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    it('should call logout', async () => {
      const mockRequest = {
        user: { idUsuario: 1 },
      };

      const mockResponse = {
        json: jest.fn().mockReturnThis(),
        clearCookie: jest.fn().mockReturnThis(),
      };

      mockAuthService.logout.mockResolvedValue(undefined);

      await controller.logout(mockRequest, mockResponse);

      expect(mockAuthService.logout).toHaveBeenCalledWith(1);
      expect(mockResponse.clearCookie).toHaveBeenCalled();
    });
  });
});
