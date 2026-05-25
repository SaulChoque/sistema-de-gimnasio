import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user as any;
    if (!user) return false;

    // user.role expected (e.g., 'administrador', 'empleado', 'usuario')
    // user.subrole may be 'instructor' | 'recepcionista' | 'adm_limpieza'
    const userRole = user.role;
    const userSubrole = user.subrole;

    // If any required role matches user role or subrole, allow
    for (const role of requiredRoles) {
      if (role === userRole) return true;
      if (role === userSubrole) return true;
    }
    return false;
  }
}
