import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiTokenRes } from '../models/interfaces/users';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment';
const { baseUrl } = environment;


@Injectable({
  providedIn: 'root'
})
export class TokenrefreshService {
constructor(private readonly http: HttpClient) {}



getAccessToken(refreshToken:string):Observable<IApiTokenRes>{
  const httpOptions = {
    headers:new HttpHeaders({
      Authorization: `Bearer ${refreshToken}`,
      'Bypass-Interceptor':'true'
    })
  }

  console.log(refreshToken,`refresh token from get access token`);


  return this.http.get<IApiTokenRes>(`${baseUrl}token`, httpOptions);

}}
