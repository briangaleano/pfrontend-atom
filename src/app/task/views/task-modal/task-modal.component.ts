import { Component } from '@angular/core';
import { Validators, FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { TaskService } from '../../services/task.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [MatTableModule,
MatDialogModule,
MatButtonModule,
MatIconModule,
MatFormFieldModule,
MatInputModule,
ReactiveFormsModule,
MatSnackBarModule],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.scss'
})
export class TaskModalComponent {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskModalComponent>,
    private taskService: TaskService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  save(): void {
    this.taskService.createTask(this.form.value['titulo'], this.form.value['descripcion'])
    .then(res => {
      console.log("res", res)
      this.snackBar.open('Tarea creada exitosamente', 'Cerrar', {
        duration: 3000
      });
      this.dialogRef.close(this.form.value);
    }).catch(err => {
      this.snackBar.open('Error en la solicitud, comunicate con soporte', 'Cerrar', {
        duration: 3000
      });
    });
  }
}
