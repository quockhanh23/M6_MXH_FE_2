import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post2} from "../models/post2";
import {environment} from "../../environments/environment";

const API_URL = environment.apiUrl + "/posts";

@Injectable({
  providedIn: 'root'
})

export class PostService {

  constructor(private httpClient: HttpClient) {
  }

  allPost(): Observable<Post2[]> {
    return this.httpClient.get<Post2[]>(API_URL + '/allPostPublic')
  }

  getAllPostByUser(id: string): Observable<Post2[]> {
    return this.httpClient.get<Post2[]>(API_URL + `/findAllPostByUser?id=${id}`);
  }

  findById(id: String): Observable<Post2> {
    return this.httpClient.get<Post2>(API_URL + `/${id}`)
  }

  createPost(post2: Post2, idUser: string): Observable<Post2> {
    return this.httpClient.post<Post2>(API_URL + `/createPost?idUser=${idUser}`, post2);
  }
}
