import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../../login/services/auth.service';
import { Router } from '@angular/router';
import { TaskInterface } from '../../models/task.models';
import { firstValueFrom, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { ConfirmModalComponent } from '../../../shared/modals/confirm-modal.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [  FormsModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatTableModule,
    MatSnackBarModule,
  CommonModule ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TaskComponent implements OnInit {

  tasks$!: Observable<TaskInterface[]>;
  tituloTask = '';
  descripcionTask= ''
  displayedColumns: string[] = ['titulo', 'descripcion', 'completado', 'createdAt', 'acciones'];
  dataSource = new MatTableDataSource<TaskInterface>([]);

  constructor(
    private taskService: TaskService,
    private auth: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.tasks$ = this.taskService.getTasks();
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id)
    .then(res => {
      this.snackBar.open('Tarea eliminada exitosamente', 'Cerrar', {
        duration: 3000
      });
    }).catch(err => {
      this.snackBar.open('Error en la solicitud, comunicate con soporte', 'Cerrar', {
        duration: 3000
      });
    });;
    this.tasks$ = this.taskService.getTasks();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result: TaskInterface) => {
      if (result) {
          this.tasks$ = this.taskService.getTasks();
      }
    });
  }

  confirmComplete(task: any): void {
  const dialogRef = this.dialog.open(ConfirmModalComponent, {
    width: '400px',
    data: {
      message: '¿Estás seguro de marcar esta tarea como completada?'
    }
  });

  dialogRef.afterClosed().subscribe(confirmed => {
    if (confirmed) {
      this.completeTask(task);
    }
  });
}

completeTask(task: any): void {
  this.taskService.updateTask({...task, completado: true})
  .then(res => {
    this.snackBar.open('Tarea actualizada exitosamente', 'Cerrar', {
        duration: 3000
      });
  }).catch(err => {
    this.snackBar.open('Error en la solicitud, comunicate con soporte', 'Cerrar', {
        duration: 3000
      });
  });
  this.tasks$ = this.taskService.getTasks();
}

confirmDelete(task: any): void {
  const dialogRef = this.dialog.open(ConfirmModalComponent, {
    width: '400px',
    data: {
      message: '⚠️ ¿Estás seguro de eliminar esta tarea? Esta acción no se puede deshacer.'
    }
  });

  dialogRef.afterClosed().subscribe(confirmed => {
    if (confirmed) {
      this.deleteTask(task);
    }
  });
}
}
