import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit{
    showLogin: boolean = true //Show the Login Button

    //constructor(private _authService: AuthService, private _router: Router){}
    constructor(private _authService: AuthService, private _router: Router){}

    ngOnInit(): void {
        this._authService.currentButtonText.subscribe(text => this.showLogin = text);

        const token = this._authService.getToken()
        if(token){
            this.showLogin = false
        }
        else {
          this.showLogin = true
        }
    }

    goLogin(){
      this._router.navigate(['/login']);
    }

    doLogout(){
        this._authService.deleteToken()
        this.showLogin = true
        this._router.navigate(['/home']);
    }
}
