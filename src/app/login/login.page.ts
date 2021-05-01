import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public form: FormGroup;
  public submitted = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) return;

    const userData = this.form.value;

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
  }

  createForm() {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get f() {
    return this.form.controls;
  }

  public errorMessages = {
    email: [
      { type: 'required', message: 'The email is required' },
      { type: 'email', message: 'Must be a valid email' },
    ],
    password: [{ type: 'required', message: 'The password is required' }],
  };
}
