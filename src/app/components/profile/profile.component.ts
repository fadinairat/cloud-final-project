import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/phpTypes';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  @ViewChild("registerForm")
  registerForm!:NgForm
  message: string = ""
  user!: User 
  img: string = ""
  alertType: string = "alert-success"
  selectedFile: File | null = null;
  
  constructor(private _userService: UsersService,private _auth: AuthService){
      //      
      this.user = {_id: "", name: "", username: "", password: "", profileImage: ""}
  }

  ngOnInit(): void {
    this._userService.getUserDetails().subscribe(data=>{      
        console.log(data) 
        this.img = data.user.profileImage.S
        this.user = {_id: "", name: data.user.name.S, username: data.user.email.S, password: "", profileImage: data.user.profileImage.S}
    },
    error=>{
       console.log("NOT FOUND USER", error);
    });
  }
  onFileSelected(event: any) {
      this.selectedFile = event.target.files[0];
  }

  submitForm(form:NgForm){
    if(this.selectedFile){
        this._userService.updateUserProfile(this.user.username, this.selectedFile.name).subscribe(
          data=>{
              this.message = "Profile image updated!"
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
                          this.img = profileImage;
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
            this.message = "Updating profile image failed..."
            this.alertType = "alert-danger"
          }
      )
      console.log(form.value)
    }
    else{
      this.message = "Select the image to update!"
      this.alertType = "alert-danger"
    }
    
  }
}
