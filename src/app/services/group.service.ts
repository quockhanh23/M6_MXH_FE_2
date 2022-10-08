import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TheGroup} from "../models/the-group";
import {environment} from "../../environments/environment";
import {User} from "../models/user";

const API_URL = environment.apiUrl + "/groups";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private httpClient: HttpClient) {
  }

  allGroup(): Observable<TheGroup[]> {
    return this.httpClient.get<TheGroup[]>(API_URL + '/allGroup')
  }

  createGroup(theGroup: TheGroup, idUser: string): Observable<TheGroup> {
    return this.httpClient.post<TheGroup>(API_URL + `/createGroup?idUser=${idUser}`, theGroup);
  }

  createGroupParticipant(idUser: any, idTheGroup: any): Observable<any> {
    return this.httpClient.get<any>(API_URL + `/createGroupParticipant?idUser=${idUser}&idTheGroup=${idTheGroup}`);
  }

  check(idUser: any, idGroup: any): Observable<any> {
    return this.httpClient.get<any>(API_URL + `/check?idUser=${idUser}&idGroup=${idGroup}`);
  }

  findById(idGroup: any): Observable<TheGroup> {
    return this.httpClient.get<TheGroup>(`http://localhost:8080/api/groups/${idGroup}`);
  }
}
