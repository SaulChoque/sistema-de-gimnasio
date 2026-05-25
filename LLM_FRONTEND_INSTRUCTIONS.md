# Instrucciones para un LLM: Crear frontend Next.js para "Sistema de Gimnasio"

Objetivo: Generar un frontend en Next.js que consuma las APIs existentes del backend (NestJS/Prisma) y que implemente:
- Registro (register)
- Login / Logout
- Gestión de tokens (access token en memoria, refresh token en cookie httpOnly)
- Separación de roles y control de acceso (administrador, usuario, empleado) y sub-roles (instructor, recepcionista, adm_limpieza)
- Dashboards por rol con rutas protegidas
- Formularios con validación (todos los campos obligatorios)
- Integración con la colección Postman ya provista (endpoints y ejemplos)

Nota importante sobre datos obligatorios: todos los campos definidos en el esquema del backend son obligatorios. No generar páginas ni formularios que omitan campos requeridos.

--------------

1) Requisitos y dependencias

- Next.js (13+ con app router o pages router — indicar cuál se usará)
- React
- axios
- js-cookie (o cookie) para lectura ligera (solo donde sea necesario); NO guardar refreshToken en localStorage
- jwt-decode para leer payload si se desea
- react-hook-form + @hookform/resolvers + yup o zod para validación
- SWR o React Query para fetching y caching (opcional)
- ESLint / Prettier configuración básica

Recomendar instalar:
```
pnpm add axios js-cookie jwt-decode react-hook-form yup @hookform/resolvers swr
pnpm add -D eslint prettier
```

2) Estructura mínima sugerida

- /app (o /pages)
  - /login/page.tsx
  - /register/page.tsx
  - /dashboard/
    - /administrador/page.tsx
    - /usuario/page.tsx
    - /empleado/
      - /instructor/page.tsx
      - /recepcionista/page.tsx
      - /adm-limpieza/page.tsx
  - /api-client/
    - axios.ts
    - auth.ts (funciones: login, register, refresh, logout)
  - /components/
    - AuthProvider.tsx (contexto que mantiene accessToken en memoria y user)
    - PrivateRoute.tsx / withAuth HOC
    - RoleGuard.tsx (componente que muestra/oculta según roles)
    - Navbar.tsx
    - Forms/ (LoginForm, RegisterForm)

3) Flujo de autenticación y manejo de tokens

- Login:
  - Usuario envía credenciales a `POST /auth/login`.
  - Backend responde con `accessToken` y `refreshToken` (el backend ya coloca refreshToken en cookie httpOnly en los endpoints actuales). El LLM debe asumir que la cookie `refreshToken` se envía automáticamente por el navegador en solicitudes posteriores.
  - Almacenar `accessToken` **solo en memoria** (en React Context / Zustand). Evitar localStorage/sessionStorage para evitar persistencia insegura.
  - Decodificar `accessToken` para extraer `role`, `subrole`, `idUsuario` y `correo` y guardar `user` en contexto.

- Refresh automática:
  - Interceptor de `axios` detecta respuesta 401: llamar a `POST /auth/refresh` (sin cuerpo; cookie httpOnly tiene el refreshToken) para obtener nuevo `accessToken` y nuevo refreshToken (backend también renueva cookie). Actualizar contexto y reintentar la petición original.

- Logout:
  - Llamar `POST /auth/logout` con Authorization header; backend limpiará sesiones y cookie. Limpiar contexto (borrar accessToken y user).

4) Rutas protegidas y autorización por roles

- Implementar un `AuthProvider` que exponga: `user`, `accessToken`, `login()`, `logout()`, `refresh()`.
- Crear un HOC o componente `PrivateRoute` que envuelva páginas que requieran autenticación. Debe verificar que `user` exista; si no, redirigir a `/login`.
- Crear `RoleGuard` o `useHasRole(allowedRoles: string[])` que valide `user.role` y `user.subrole`.

Reglas de autorización (basadas en el diagrama):
- Administrador: acceso completo a las rutas administrativas (crear/editar/eliminar empleados, administradores, etc.). Dashboard: `/dashboard/administrador`.
- Usuario (cliente): acceso a su propio dashboard y acciones de cliente (asistencias). Dashboard: `/dashboard/usuario`.
- Empleado: rol base `empleado` con subroles:
  - `instructor`: puede ver/editar sus clases, ver lista de empleados (lectura limitada). Dashboard: `/dashboard/empleado/instructor`.
  - `recepcionista`: acceso a funciones de recepción (registro de clientes, consults). Dashboard: `/dashboard/empleado/recepcionista`.
  - `adm_limpieza`: acceso a su dashboard: `/dashboard/empleado/adm-limpieza`.

Ejemplo de uso del decorador Roles en frontend:
- `useHasRole(['administrador'])` => true si `user.role === 'administrador'` o `user.subrole === 'administrador'`.

5) Dashboards y vistas principales

- Dashboard Administrador:
  - Vista general (estadísticas): número de usuarios, empleados, clases.
  - Gestión de empleados/administradores: CRUD (consumir endpoints creados).

- Dashboard Usuario (cliente):
  - Perfil, clases inscritas, historial de asistencias.

- Dashboard Instructor:
  - Lista de clases que imparte, CRUD de clases (si permitido), ver asistencias.

- Dashboard Recepcionista:
  - Registrar clientes, ver agenda, buscar usuarios por correo/ID.

- Dashboard Adm_Limpieza:
  - Información operativa mínima (puede ser un tablero simple con datos asignados por admin).

6) Formularios: validación y requisitos

- RegisterForm: campos obligatorios según backend `RegisterDto`:
  - `nombre` (string, min 2)
  - `correo` (email)
  - `passwordHash` (string, min 6) — campo `password` en UI, el frontend enviará como `passwordHash` en body (backend espera `passwordHash` en DTO actual)
  - `telefono` (string, min 7)
  - `direccion` (string)

- LoginForm: `correo`, `passwordHash` (campo password)

Validación: usar `react-hook-form` + `yup` o `zod` para mostrar errores inline; todos los campos obligatorios.

7) Seguridad y cookies

- No exponer `refreshToken` en JS. El backend ya envía cookie httpOnly; confiar en que el navegador la incluirá en requests a la misma origin.
- `accessToken` en memoria; para persistencia entre refrescos, el frontend puede intentar un `refresh` al cargar la app si existe cookie (llamar `POST /auth/refresh` en mount).
- Cross-origin: si el frontend está en otro dominio, configurar `withCredentials: true` en axios y asegurarse que backend permita `credentials` en CORS.

8) Integración con Postman y pruebas

- Añadir requests en Postman para los flujos: register, login, refresh, logout, y endpoints protegidos con Authorization header `Bearer {{accessToken}}`.
- Proveer ejemplos de payloads para cada rol en Postman (crear usuario + asignar roles mediante endpoints admin o manual en DB para pruebas).

9) Tests e2e (opcional pero recomendado)

- Usar Playwright o Cypress para automatizar:
  - Registro -> Login -> navegar a dashboard adecuado -> verificar elementos propios del rol.
  - Prueba negativa: intentar acceder a ruta admin con user role `usuario` y verificar redirección/403.

10) Consideraciones para LLM (prompts sugeridos)

- Entregar contexto mínimo al LLM:
  - URL del backend y endpoints relevantes (ej: `POST /auth/login`, `POST /auth/register`, `POST /auth/refresh`, `GET /empleado`, etc.).
  - Formato del JWT: payload incluye `idUsuario`, `correo`, `role`, `subrole`.
  - Todos los campos del register son obligatorios.

- Prompt ejemplo:
  > "Genera un frontend Next.js que implemente autenticación JWT usando accessToken en memoria y refreshToken en cookie httpOnly. Crea páginas de `/login`, `/register` y dashboards por rol: administrador, usuario, empleado(instructor/recepcionista/adm_limpieza). Protege rutas y componentes según roles. Usa axios con interceptor para refresh token. Valida todos los campos como obligatorios. Estructura el proyecto como se indica y proporciona comandos para ejecutar y probar."

11) Entregables que debe generar el LLM

- Proyecto Next.js inicializado con las dependencias.
- Implementación de `AuthProvider`, `PrivateRoute`, `RoleGuard`.
- Páginas: `/login`, `/register`, `/dashboard/*` para cada rol.
- Servicios HTTP (`/api-client`) con lógica de refresh y manejo de cookies.
- Formularios con validación y mensajes de error.
- README con instrucciones para ejecutar y variables de entorno necesarias (`NEXT_PUBLIC_API_URL`, etc.).

--------------

Variables de entorno sugeridas:
- `NEXT_PUBLIC_API_URL` (ej: http://localhost:3000)
- `NEXT_PUBLIC_JWT_PAYLOAD_FIELDS` (opcional, documentar role/subrole)

Comandos sugeridos para el desarrollador:
```
pnpm install
pnpm dev
pnpm build
pnpm start
```

Fin de instrucción. Generar el código con pruebas e2e si es posible y documentar cualquier suposición que se haga sobre el backend.
