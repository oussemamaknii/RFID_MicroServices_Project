import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fournisseur } from './Fournisseur';

@Injectable({ providedIn: 'root' })
export class FournisseurService {
  private apiServerUrl = 'http://localhost:9465';

  constructor(private httpClient: HttpClient) {}

  public getFournisseurs(): Observable<Fournisseur[]> {
    return this.httpClient.get<Fournisseur[]>(
      `${this.apiServerUrl}/fournisseurs`
    );
  }

  public addFournisseur(Fournisseur: Fournisseur): Observable<Fournisseur> {
    return this.httpClient.post<Fournisseur>(
      `${this.apiServerUrl}/fournisseurs`,
      Fournisseur
    );
  }

  public updateFournisseur(Fournisseur: Fournisseur): Observable<Fournisseur> {
    console.log(Fournisseur);
    return this.httpClient.put<Fournisseur>(
      `${this.apiServerUrl}/fournisseurs`,
      Fournisseur
    );
  }

  public deleteFournisseur(
    FournisseurId: string | undefined
  ): Observable<Fournisseur> {
    console.log(FournisseurId);

    return this.httpClient.delete<any>(
      `${this.apiServerUrl}/fournisseurs/${FournisseurId}`
    );
  }
}
