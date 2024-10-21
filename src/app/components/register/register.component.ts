import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../interfaces/phpTypes';
import { CommonModule, NgFor } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
    @ViewChild("registerForm")
    registerForm!:NgForm
    message: string = ""
    user!: User 
    alertType: string = "alert-success"
    selectedFile: File | null = null;
    showLoader: boolean = false

    constructor(private _userService: UsersService, private _http:HttpClient){
        this.user = {_id: "", name: "", username: "", password: "", profileImage: ""}
    }

    ngOnInit(): void {
    }

    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
    }

    submitForm(form:NgForm){
        this.showLoader = true
        if(this.selectedFile){
            const user: User = {_id: "",name: form.value.name, username: form.value.username, password: form.value.password, profileImage: this.selectedFile.name}
        
            this._userService.registerUser(user).subscribe(
                data=>{
                    this.showLoader = false
                    this.message = environment.registerMsg
                    this.alertType = "alert-success"
                    //Upload the image to s3
                    const profileImage = data.profileImage
                    console.log("Profile image is:"+profileImage)
                    if(profileImage && this.selectedFile){
                        // Upload the file to S3 using the pre-signed URL
                        this._userService.uploadToS3(profileImage, this.selectedFile).subscribe({
                            next: () => {
                                //this.message = 'Upload successful!';
                                console.log("Image Uploaded!")
                            },
                            error: (err) => {
                                console.error('S3 upload failed:', err);
                                //this.message = 'Upload failed. Please try again.';
                            },
                        });
                    }
                    form.reset()
                },
                error=>{
                  this.showLoader = false
                  this.message = environment.registerFailed
                  console.log(error);
                  this.alertType = "alert-danger"
                }
            )
            //console.log(form.value)
        }
        else{
            this.message = "You have to select the profile image!"
            this.alertType = "alert-danger"
        }        
    }    
}
