export interface TaskInterface {
  id: string;
  title: string;
  descripcion: string;
  completado?: boolean;
  createdAt?: Date;
}
