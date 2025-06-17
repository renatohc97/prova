import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/usuarios';

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }
  createUsuario(usuario: Usuario) {
  return this.http.post<Usuario>(this.apiUrl, usuario);
}
getUsuarioById(id: number) {
  return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
}

updateUsuario(usuario: Usuario) {
  return this.http.put<Usuario>(`${this.apiUrl}/${usuario.id}`, usuario);
}
deleteUsuario(id: number) {
  return this.http.delete(`${this.apiUrl}/${id}`);
}


}
