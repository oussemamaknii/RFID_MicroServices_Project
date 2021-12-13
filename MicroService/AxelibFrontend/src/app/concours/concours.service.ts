import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Concours } from './Concours';

@Injectable({ providedIn: 'root' })
export class ConcoursService {
  private apiServerUrl = 'http://localhost:4646/api';

  constructor(private httpClient: HttpClient) {}

  public getConcours(): Observable<Concours[]> {
    return this.httpClient.get<Concours[]>(`${this.apiServerUrl}/concours`);
  }

  public addConcours(Concours: Concours): Observable<Concours> {
    return this.httpClient.post<Concours>(
      `${this.apiServerUrl}/concours`,
      Concours
    );
  }

  public updateConcours(Concours: Concours): Observable<Concours> {
    return this.httpClient.put<Concours>(
      `${this.apiServerUrl}/concours/${Concours.id}`,
      Concours
    );
  }

  public deleteConcours(ConcoursId: string | undefined): Observable<Concours> {
    console.log(ConcoursId);

    return this.httpClient.delete<any>(
      `${this.apiServerUrl}/concours/${ConcoursId}`
    );
  }
}
