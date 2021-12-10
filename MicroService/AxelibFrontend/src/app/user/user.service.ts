import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './User';

@Injectable({ providedIn: 'root' })
export class UserService {
  private ZuulServerUrl = 'http://localhost:8763/user-service';
  private apiServerUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {}

  public getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiServerUrl}/User`);
  }

  public addUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.apiServerUrl}/User`, user);
  }

  public updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(
      `${this.apiServerUrl}/User/${user.userId}`,
      user
    );
  }

  public deleteUser(userId: number | undefined): Observable<User> {
    console.log(userId);

    return this.httpClient.delete<any>(`${this.apiServerUrl}/User/${userId}`);
  }
}
