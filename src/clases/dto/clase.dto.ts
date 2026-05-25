export class CreateClaseDto {
  idInstructor: number;
  nombre: string;
  horario: string;
}

export class UpdateClaseDto {
  nombre?: string;
  horario?: string;
}
