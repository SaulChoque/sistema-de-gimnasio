import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Response,
  Get,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { JwtAuthGuard } from './guards';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar nuevo usuario' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    status: 201,
    description: 'Usuario registrado exitosamente',
    schema: {
      example: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        usuario: { idUsuario: 1, nombre: 'Juan', correo: 'juan@example.com' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos o correo duplicado',
  })
  async register(@Body() registerDto: RegisterDto, @Response() res) {
    const result = await this.authService.register(registerDto);
    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.json(result);
  }

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Login exitoso',
    schema: {
      example: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        usuario: { idUsuario: 1, nombre: 'Juan', correo: 'juan@example.com' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  async login(@Body() loginDto: LoginDto, @Response() res) {
    const result = await this.authService.login(loginDto);
    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.json(result);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Cerrar sesión' })
  @ApiResponse({ status: 200, description: 'Sesión cerrada' })
  @ApiResponse({ status: 401, description: 'Token inválido o expirado' })
  async logout(@Request() req, @Response() res) {
    await this.authService.logout(req.user.idUsuario);
    res.clearCookie('refreshToken');
    return res.json({ message: 'Logged out successfully' });
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refrescar access token' })
  @ApiResponse({
    status: 200,
    description: 'Token refrescado',
    schema: {
      example: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        usuario: { idUsuario: 1, nombre: 'Juan', correo: 'juan@example.com' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Refresh token inválido' })
  async refresh(@Request() req, @Response() res) {
    const refreshToken = req.cookies.refreshToken;
    const result = await this.authService.refreshToken(refreshToken);
    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.json(result);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Obtener perfil del usuario actual' })
  @ApiResponse({
    status: 200,
    description: 'Perfil del usuario',
    schema: { example: { idUsuario: 1, correo: 'juan@example.com' } },
  })
  @ApiResponse({ status: 401, description: 'Token inválido' })
  getProfile(@Request() req) {
    return req.user;
  }
}
