import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/phpTypes';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {  
  constructor(private _http: HttpClient, private _auth: AuthService) { }

  registerUser(user: User):Observable<any>{
    const headers = new HttpHeaders({
        'Content-Type': 'application/json'
    })
    const data = {action: "signup", "name": user.name, email: user.username, password: user.password, profileImage: user.profileImage}
    
    return this._http.post<string>(`${environment.serviceHost}`,data,{headers})
  }

  getUserDetails():Observable<any>{
    const userObj = this._auth.getToken();
    if(userObj && userObj[0]){
      const headers = new HttpHeaders({
          'Content-Type': 'application/json'
      })
      const data = {action: "userDetails", email: userObj[0]}
      return this._http.post<any>(`${environment.serviceHost}`,data,{headers})
    }
    else{
      return of(null); 
    }   
  }

  updateUserProfile(username: string, profileImage: string): Observable<any> {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json'
    })
    const data = {action: "updateProfileImage", email: username, profileImage: profileImage}
    
    return this._http.post<string>(`${environment.serviceHost}`,data,{headers})
  }


  uploadToS3(uploadURL: string, file: File): Observable<any> {
      return this._http.put(uploadURL, file, {
          headers: { 'Content-Type': file.type },
      });
  }
}
