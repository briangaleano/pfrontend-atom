import { Injectable } from '@angular/core';
import { ApiService } from '../../../api/api.service';
import { AuthInterface } from '../models/auth.model';
import { API_ENDPOINTS } from '../../../api/api.endpoints';
import { Auth, signInWithCustomToken } from '@angular/fire/auth';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private TOKEN_KEY = 'token';

  
  constructor(private api: ApiService,private auth: Auth) {}
  
  async login(email:string){
    const authToken =  firstValueFrom( this.api.post<AuthInterface>(
          API_ENDPOINTS.auth.login,
          { email }
        ))
    const cred = await signInWithCustomToken(this.auth, (await authToken).token);
    //const idToken = await ;
    return cred.user.getIdToken()
  }

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
