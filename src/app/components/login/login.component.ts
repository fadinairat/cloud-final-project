import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
    username: string = ""
    password: string = ""
    message: string = ""
    alertType: string = "alert success"
    showMessage: boolean = false
    showLogin:boolean = true
    showLoader: boolean = false

    constructor(private _auth: AuthService, private _router: Router){}

    ngOnInit(): void {
        //Check If user already logged-IN
    }

    doLogin(form: NgForm){
        this.showLoader = true
        this._auth.userLogin(form.value.username, form.value.password).subscribe(response=>{
            this.message = "You have been logged in successfully..."
            console.log("User logged in");
            this.showMessage = true
            this.alertType = "alert-success"
            this.showLoader = false
            //Save the Token in the Local Storage
            console.log(response);
            if(response.token){
                this._auth.saveToken(response.token, form.value.username)
                this._router.navigate(['/profile']);
                this.showLogin = false
            }
        }, 
        error =>{
            this.showLoader = false
            this.alertType = "alert-danger"
            this.message = "Failed to login! Wrong username or password...."
            this.showMessage = true
        })
    }
}
