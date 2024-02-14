import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Comment } from '../Comment';
import { Response } from '../Response';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}api/moments/comments` /* Criação da url para a baseapiurl, vinculando ao caminho para puxar os comentarios */


  constructor(private http: HttpClient) { } /* Chamada do HTTP para fazer o request*/

  /* Método que para fazer a inserção do comentário no sistema */
  createComment(data: Comment): Observable<Response<Comment>>{ /*Observable espera a response que puxa o comentário feito do usuario.*/ 
    return this.http.post<Response<Comment>>(this.apiUrl, data);
  }
}
