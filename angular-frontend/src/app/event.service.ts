import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Event } from './event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private baseURL = "http://localhost:8080/api/v1/events";

  constructor(private httpClient: HttpClient) { }

  getEventList(): Observable<Event[]>{
    return this.httpClient.get<Event[]>(`${this.baseURL}`);
  }

  createEvent(event: Event): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, event);
  }

  getEventById(id: number): Observable<Event>{
    return this.httpClient.get<Event>(`${this.baseURL}/${id}`);
  }

  updateEvent(id: number, event: Event): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, event);
  }

  deleteEvent(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
