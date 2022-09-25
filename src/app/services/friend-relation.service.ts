import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user";
import {FriendRelation} from "../models/friend-relation";
import {environment} from "../../environments/environment";

const API_URL = environment.apiUrl + "/friends";

@Injectable({
  providedIn: 'root'
})
export class FriendRelationService {

  constructor(private httpClient: HttpClient) {
  }

  sendRequestFriend(idUser: any, idFriend: any): Observable<FriendRelation> {
    return this.httpClient.delete<FriendRelation>(API_URL + `/sendRequestFriend?idUser=${idUser}&idFriend=${idFriend}`);
  }

  listRequestSend(idUser: any): Observable<any> {
    return this.httpClient.get<any>(API_URL + `/findAllListRequestAddFriendById?idUser=${idUser}`);
  }

  listRequest(idUser: any): Observable<any> {
    return this.httpClient.get<any>(API_URL + `/listRequest?idUser=${idUser}`);
  }

  listFriend(idUser: any): Observable<FriendRelation[]> {
    return this.httpClient.get<FriendRelation[]>(API_URL + `/listFriend?idUser=${idUser}`);
  }

  friendCheck(idUser: any): Observable<FriendRelation[]> {
    return this.httpClient.get<FriendRelation[]>(API_URL + `/friendCheck?idUser=${idUser}`);
  }

  everyone(idUser: any): Observable<any> {
    return this.httpClient.get<any>(API_URL + `/everyone?idUser=${idUser}`);
  }

  getAllNotFriend(id: string): Observable<User[]> {
    return this.httpClient.get<User[]>(API_URL + `/notFriend/${id}`);
  }

  addFriend(idU: string, idFriend: string): Observable<any> {
    return this.httpClient.post<FriendRelation>(API_URL + `/${idU}/${idFriend}`, {});
  }

  acceptFriend(idUser: any, idFriend: any): Observable<FriendRelation> {
    return this.httpClient.delete<FriendRelation>(API_URL + `/acceptRequestFriend?idUser=${idUser}&idFriend=${idFriend}`);
  }

  unfriend(idUser: any, idFriend: any): Observable<FriendRelation> {
    return this.httpClient.delete<FriendRelation>(API_URL + `/deleteFriendRelation?idUser=${idUser}&idFriend=${idFriend}`);
  }

  listMutualFriend(idUser: any, idFriend: any): Observable<FriendRelation[]> {
    return this.httpClient.get<FriendRelation[]>(API_URL + `/listMutualFriend?idUser=${idUser}&idFriend=${idFriend}`);
  }

  agree(idFriend: any, idLogin: any): Observable<FriendRelation[]> {
    return this.httpClient.get<FriendRelation[]>(API_URL + `/agree?idFriend=${idFriend}&idLogin=${idLogin}`);
  }

  friend(idFriend: any, idLogin: any): Observable<FriendRelation[]> {
    return this.httpClient.get<FriendRelation[]>(API_URL + `/friend?idFriend=${idFriend}&idLogin=${idLogin}`);
  }
}
