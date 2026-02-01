import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    ReactiveFormsModule,
  CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginComponent {

  form!: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
     private fb: FormBuilder,
  ) {

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  login() {
    
    this.auth.login(this.form.value['email']).then((res) => {
      this.auth.setToken(res)
      this.snackBar.open('Login Correcto', 'Cerrar', {
        duration: 3000
      });
      this.router.navigate(['/tasks']);
    }).catch(err => {
      console.log("err", err)

      this.snackBar.open('Problemas al ingresar', 'Cerrar', {
        duration: 3000
      });
    })


    
  }
  email(email: any) {
    throw new Error('Method not implemented.');
  }
}
