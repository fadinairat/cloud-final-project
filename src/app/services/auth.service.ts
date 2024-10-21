import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey: string = environment.token_key;
  private loginButtonShow = new BehaviorSubject<boolean>(true);
  currentButtonText = this.loginButtonShow.asObservable();

  constructor(private _httpClient: HttpClient) { }

  saveToken(token: string, username: string){
    //Trigger event to show the logout button, this event detected by navigation component
    this.loginButtonShow.next(false);

    if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(this.tokenKey, token)
        localStorage.setItem("username", username)
    }
  }

  getToken(): [string | null, string | null]{
    if (typeof window !== 'undefined' && window.localStorage) {
        return [localStorage.getItem("username"), localStorage.getItem(this.tokenKey)]
    }
    else return [null, null];
  }

  deleteToken(): void{
    //This line will change the value of showLogin button, and trigger this change to the navigation component
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(this.tokenKey)
      localStorage.removeItem("username")
    }
  }

  userLogin(username: string, password: string):Observable<any>{
      const headers = new HttpHeaders({
          'Content-Type': "application/json"
      });

      const data = {action:"login", email: username, password: password}
      return this._httpClient.post<any>(`${environment.serviceHost}`,data, {headers})
  }

  checkAuthentication():boolean{
      if(typeof window!=='undefined' && window.localStorage){
          if(localStorage.getItem(this.tokenKey)) return true
          else return false
      }
      else return false
  }
}
