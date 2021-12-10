import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fournisseur } from './Fournisseur';

@Injectable({ providedIn: 'root' })
export class FournisseurService {
  private apiServerUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {}

  public getFournisseurs(): Observable<Fournisseur[]> {
    return this.httpClient.get<Fournisseur[]>(
      `${this.apiServerUrl}/Fournisseur`
    );
  }

  public addFournisseur(Fournisseur: Fournisseur): Observable<Fournisseur> {
    return this.httpClient.post<Fournisseur>(
      `${this.apiServerUrl}/Fournisseur`,
      Fournisseur
    );
  }

  public updateFournisseur(Fournisseur: Fournisseur): Observable<Fournisseur> {
    return this.httpClient.put<Fournisseur>(
      `${this.apiServerUrl}/Fournisseur/${Fournisseur.fournisseurId}`,
      Fournisseur
    );
  }

  public deleteFournisseur(
    FournisseurId: number | undefined
  ): Observable<Fournisseur> {
    console.log(FournisseurId);

    return this.httpClient.delete<any>(
      `${this.apiServerUrl}/Fournisseur/${FournisseurId}`
    );
  }
}
