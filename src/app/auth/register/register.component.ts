import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RegisterPayload} from '../register-payload';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  registerPayload: RegisterPayload;
  private base64Avatar: any;
  avatar: any;
  element: HTMLImageElement;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.formBuilder.group({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    this.registerPayload = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      avatar: []
    };
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.registerPayload.username = this.registerForm.get('username').value;
    this.registerPayload.email = this.registerForm.get('email').value;
    this.registerPayload.password = this.registerForm.get('password').value;
    this.registerPayload.confirmPassword = this.registerForm.get('confirmPassword').value;
    this.registerPayload.avatar = this.base64Avatar;
    console.log(this.registerPayload);

    this.authService.register(this.registerPayload).subscribe(data => {
      console.log('register success');
      this.router.navigateByUrl('/register-success');
    }, error => {
      console.log(error.error.message);
      document.getElementById('feedback').innerHTML = error.error.message;
    });
  }

  public onFileChanged(event) {

    const reader = new FileReader();
    reader.readAsBinaryString(event.target.files[0]);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        this.base64Avatar = btoa(reader.result);
      }
      this.avatar = 'data:image/jpg;base64,' + this.base64Avatar;
    };


  }


}
