import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post2} from "../models/post2";
import {LikePost} from "../models/likePost";
import {DisLikePost} from "../models/dis-like-post";
import {IconHeart} from "../models/icon-heart";
import {environment} from "../../environments/environment";

const API_URL = environment.apiUrl + "/refs";

@Injectable({
  providedIn: 'root'
})
export class LikePostService {

  constructor(private httpClient: HttpClient) {
  }

  getAllLike(idPost: string): Observable<Post2[]> {
    return this.httpClient.get<Post2[]>(API_URL + `/getAllLike?id=${idPost}`);
  }

  createLike(likePost: LikePost, idPost: string, idUser: string): Observable<LikePost> {
    return this.httpClient.post<LikePost>(API_URL + `/createLike?idPost=${idPost}&idUser=${idUser}`, likePost);
  }

  createDisLike(likePost: DisLikePost, idPost: string, idUser: string): Observable<DisLikePost> {
    return this.httpClient.post<DisLikePost>(API_URL + `/createDisLike?idPost=${idPost}&idUser=${idUser}`, likePost);
  }

  createHeart(iconHeart: IconHeart, idPost: string, idUser: string): Observable<IconHeart> {
    return this.httpClient.post<IconHeart>(API_URL + `/createHeart?idPost=${idPost}&idUser=${idUser}`, iconHeart);
  }
}
