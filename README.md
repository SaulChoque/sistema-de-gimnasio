<p align="center">
# Sistema de Gimnasio

Sistema de gestión de gimnasio desarrollado con NestJS y Prisma ORM, con autenticación segura basada en JWT.

## Características

- **Autenticación Segura**: Implementación de JWT con refresh tokens
- **Contraseñas Hasheadas**: Uso de bcrypt para almacenamiento seguro de contraseñas
- **Cookie-based Sessions**: Gestión de sesiones con cookies HTTP-only
- **Prisma ORM**: Acceso a base de datos con type safety
- **CRUD Completo**: Operaciones de crear, leer, actualizar y eliminar para usuarios y clases
- **Pruebas Unitarias**: Cobertura completa con Jest
- **Validación de Código**: ESLint y Prettier integrados

## Configuración

### Prerrequisitos

- Node.js 18+
- pnpm o npm
- PostgreSQL 12+

### Instalación

```bash
# Instalar dependencias
pnpm install

# Crear archivo .env basado en .env.example
cp .env.example .env

# Actualizar DATABASE_URL en .env con tu conexión PostgreSQL
```

### Migraciones de Base de Datos

```bash
# Generar y aplicar migraciones de Prisma
npx prisma migrate dev --name init

# Generar cliente de Prisma
npx prisma generate
```

### Ejecutar el Proyecto

```bash
# Desarrollo (con hot reload)
npm run start:dev

# Producción
npm run build
npm run start:prod
```

### Pruebas

```bash
# Ejecutar todas las pruebas
npm run test

# Pruebas con cobertura
npm run test:cov

# Pruebas E2E
npm run test:e2e

# Pruebas en modo watch
npm run test:watch
```

### Linting y Formateo

```bash
# Ejecutar ESLint y arreglar errores
npm run lint

# Formatear código con Prettier
npm run format
```

## API Endpoints

### Autenticación
- `POST /auth/register` - Registrar nuevo usuario
- `POST /auth/login` - Iniciar sesión
- `POST /auth/logout` - Cerrar sesión (requiere JWT)
- `POST /auth/refresh` - Refrescar token de acceso
- `GET /auth/profile` - Obtener perfil del usuario (requiere JWT)

### Usuarios
- `GET /usuarios` - Obtener todos los usuarios (requiere JWT)
- `GET /usuarios/:id` - Obtener usuario por ID (requiere JWT)
- `POST /usuarios` - Crear usuario
- `PATCH /usuarios/:id` - Actualizar usuario (requiere JWT)
- `DELETE /usuarios/:id` - Eliminar usuario (requiere JWT)

### Clases
- `GET /clases` - Obtener todas las clases
- `GET /clases/:id` - Obtener clase por ID
- `POST /clases` - Crear clase (requiere JWT)
- `PATCH /clases/:id` - Actualizar clase (requiere JWT)
- `DELETE /clases/:id` - Eliminar clase (requiere JWT)
- `POST /clases/:id/asistencia` - Agregar asistencia (requiere JWT)
- `GET /clases/:id/asistencias` - Obtener asistencias de una clase

## Estructura del Proyecto

```
src/
├── auth/                 # Módulo de autenticación
│   ├── dto/             # Data Transfer Objects
│   ├── guards/          # Guards JWT
│   ├── strategies/      # Estrategias Passport
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
├── usuarios/            # Módulo de usuarios
│   ├── dto/
│   ├── usuarios.controller.ts
│   ├── usuarios.service.ts
│   └── usuarios.module.ts
├── clases/              # Módulo de clases
│   ├── dto/
│   ├── clases.controller.ts
│   ├── clases.service.ts
│   └── clases.module.ts
├── prisma/              # Servicio de Prisma
│   └── prisma.service.ts
├── app.module.ts
├── app.controller.ts
├── app.service.ts
└── main.ts

prisma/
└── schema.prisma        # Esquema de base de datos
```

## Tecnologías Utilizadas

- **NestJS** 11.0.1 - Framework Node.js
- **Prisma** 5.20.0 - ORM
- **JWT** - Autenticación
- **bcrypt** 5.1.1 - Hash de contraseñas
- **Passport** - Estrategias de autenticación
- **Jest** 30.0.0 - Testing
- **ESLint** - Linting
- **Prettier** - Formateo de código

## Variables de Entorno

```env
DATABASE_URL=postgresql://user:password@localhost:5432/gimnasio?schema=public
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRATION=3600
PORT=3000
```

## Notas Importantes

- Las contraseñas se almacenan hasheadas con bcrypt
- Los tokens JWT expiran según JWT_EXPIRATION (en segundos)
- Los refresh tokens se almacenan en cookies HTTP-only
- Todos los endpoints protegidos requieren un JWT válido
- El esquema de base de datos está definido en `prisma/schema.prisma`

## Próximos Pasos

1. Implementar la base de datos en Supabase
2. Agregar validación con class-validator
3. Implementar logging centralizado
4. Agregar rate limiting
5. Implementar CORS según necesidades

## Licencia

UNLICENSED
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
