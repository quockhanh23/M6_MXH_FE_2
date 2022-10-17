import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LifeEvents} from "../models/life-events";

const API_URL = environment.apiUrl + "/events";

@Injectable({
  providedIn: 'root'
})
export class LifeEventsService {

  constructor(private httpClient: HttpClient) {
  }

  createLifeEvents(lifeEvents: LifeEvents, idUser: string): Observable<LifeEvents> {
    return this.httpClient.post<LifeEvents>(API_URL + `/createLifeEvents?idUser=${idUser}`, lifeEvents);
  }

  editLifeEvents(idUser: string, idEvent: string, lifeEvents: LifeEvents): Observable<LifeEvents> {
    return this.httpClient.put<LifeEvents>(API_URL + `/edit?idUser=${idUser}&idEvent=${idEvent}`, lifeEvents);
  }

  findListByIdUser(idUser: string): Observable<LifeEvents[]> {
    return this.httpClient.get<LifeEvents[]>(API_URL + `/findListByIdUser?idUser=${idUser}`);
  }

  getOne(idUser: string, idEvent: string): Observable<LifeEvents> {
    return this.httpClient.get<LifeEvents>(API_URL + `/getOne?idUser=${idUser}&idEvent=${idEvent}`);
  }
}
