import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const PASSWORD = '123456789';
const PASSWORD_HASH = bcrypt.hashSync(PASSWORD, 10);

type SeedUser = {
  nombre: string;
  correo: string;
  telefono: string;
  direccion: string;
};

async function ensureUsuario(user: SeedUser) {
  const existing = await prisma.usuario.findUnique({
    where: { correo: user.correo },
  });

  if (existing) {
    return existing;
  }

  return prisma.usuario.create({
    data: {
      ...user,
      passwordHash: PASSWORD_HASH,
    },
  });
}

async function ensureAdministrador(idUsuario: number) {
  const existing = await prisma.administrador.findUnique({
    where: { idUsuario },
  });

  if (existing) {
    return existing;
  }

  return prisma.administrador.create({
    data: {
      idUsuario,
      cargo: 'Administrador General',
    },
  });
}

async function ensureCliente(idUsuario: number) {
  const existing = await prisma.cliente.findUnique({
    where: { idUsuario },
  });

  if (existing) {
    return existing;
  }

  return prisma.cliente.create({
    data: { idUsuario },
  });
}

async function ensureEmpleado(idUsuario: number, salario: number) {
  const existing = await prisma.empleado.findUnique({
    where: { idUsuario },
  });

  if (existing) {
    return existing;
  }

  return prisma.empleado.create({
    data: {
      idUsuario,
      salario,
      fechaContrato: new Date(),
    },
  });
}

async function ensureInstructor(idEmpleado: number) {
  const existing = await prisma.instructor.findUnique({
    where: { idEmpleado },
  });

  if (existing) {
    return existing;
  }

  return prisma.instructor.create({
    data: {
      idEmpleado,
      especialidad: 'General',
    },
  });
}

async function ensureRecepcionista(idEmpleado: number) {
  const existing = await prisma.recepcionista.findUnique({
    where: { idEmpleado },
  });

  if (existing) {
    return existing;
  }

  return prisma.recepcionista.create({
    data: { idEmpleado },
  });
}

async function ensureAdmLimpieza(idEmpleado: number) {
  const existing = await prisma.admLimpieza.findUnique({
    where: { idEmpleado },
  });

  if (existing) {
    return existing;
  }

  return prisma.admLimpieza.create({
    data: { idEmpleado },
  });
}

async function main() {
  const adminUser = await ensureUsuario({
    nombre: 'Admin Principal',
    correo: 'admin@sistema.local',
    telefono: '70000001',
    direccion: 'Sede Central',
  });

  const clienteUser = await ensureUsuario({
    nombre: 'Cliente Demo',
    correo: 'cliente@sistema.local',
    telefono: '70000002',
    direccion: 'Zona Norte',
  });

  const instructorUser = await ensureUsuario({
    nombre: 'Instructor Demo',
    correo: 'instructor@sistema.local',
    telefono: '70000003',
    direccion: 'Zona Sur',
  });

  const recepcionistaUser = await ensureUsuario({
    nombre: 'Recepcionista Demo',
    correo: 'recepcionista@sistema.local',
    telefono: '70000004',
    direccion: 'Zona Centro',
  });

  const limpiezaUser = await ensureUsuario({
    nombre: 'Limpieza Demo',
    correo: 'limpieza@sistema.local',
    telefono: '70000005',
    direccion: 'Zona Este',
  });

  await ensureAdministrador(adminUser.idUsuario);
  await ensureCliente(clienteUser.idUsuario);

  const instructorEmpleado = await ensureEmpleado(instructorUser.idUsuario, 3500);
  await ensureInstructor(instructorEmpleado.idEmpleado);

  const recepcionistaEmpleado = await ensureEmpleado(recepcionistaUser.idUsuario, 2500);
  await ensureRecepcionista(recepcionistaEmpleado.idEmpleado);

  const limpiezaEmpleado = await ensureEmpleado(limpiezaUser.idUsuario, 2200);
  await ensureAdmLimpieza(limpiezaEmpleado.idEmpleado);

  console.log('Seed completado');
  console.log('Credenciales base para todas las cuentas:');
  console.log('Password:', PASSWORD);
  console.log('Admin:', adminUser.correo);
  console.log('Cliente:', clienteUser.correo);
  console.log('Instructor:', instructorUser.correo);
  console.log('Recepcionista:', recepcionistaUser.correo);
  console.log('AdmLimpieza:', limpiezaUser.correo);
}

main()
  .catch((error) => {
    console.error('Error ejecutando seed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
