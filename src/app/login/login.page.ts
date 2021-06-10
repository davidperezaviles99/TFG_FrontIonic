import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { JwtHandlerService } from 'src/app/services/jwt-handler.service';
import { ILogin, IUser, Response } from '../interfaces/interfaces';
import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;
  public user: ILogin;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private jwtservice: JwtHandlerService
  ) {}

  ngOnInit() {
    this.createForm();
    if (this.jwtservice.getJWT()!= null){
      this.loginForm.reset();
      this.router.navigateByUrl('/login')
    }
  }

  /*onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) return;

    const userData = this.loginForm.value;

    this._userService.login(userData).subscribe(
      (resp) => {
        this.submitted = false;
        // Add form.reset
        this._router.navigateByUrl('/tabs')
      },
      (err) => {
        console.log(err);
      }
    );
  }*/

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required,]],
      password: ['', [Validators.required]],
    });
  }

  //trae el email
  get email() {
    return this.loginForm.get('email');
  }

  //trae la contraseña
  get password(){
    return this.loginForm.get('password')
  }

  //Valida que los tanto el email como la contraseña estén introducidos y que el email sea tipo email (@)
  validationMessages = {
    'email': [
      { type: 'required', message: 'The email is required' },
      { type: 'email', message: 'Must be a valid email' },
    ],
    'password': [
      { type: 'required', message: 'The password is required' }],
  };


  //metodo login
  login(): void{
    if(this.loginForm.invalid) return 
    const data = this.loginForm.value;
    this.user = { email: data.email, password: data.password}
    this.userService.login(this.user).subscribe( resp => {
      console.log(resp)
      if (resp.text){
      this.jwtservice.saveJWT(resp.text);
      this.router.navigateByUrl('/tabs');

      }

    },er =>{
      console.log(er.error.text)
      if (er.error.text.startsWith("ey")){
      this.jwtservice.saveJWT(er.error.text);
      this.router.navigateByUrl('/tabs');

      }

    })
  }
}
