import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { CustomErrorStateMatcher } from 'src/app/shared/services/error-matcher.service';
import { ConfirmPasswordValidator } from 'src/app/shared/validators/confirm-password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  hide: boolean = true;
  submitted: boolean = false;
  errorMatcher = new CustomErrorStateMatcher();

  constructor(
    public auth: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength( 6 )
      ]],
      confirmPassword: ['', Validators.required ]
    }, { validator: ConfirmPasswordValidator.MatchPassword } )
  }

  submit() {
    if( this.form.invalid ) return

    this.submitted = true;

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }
    
    this.auth.register( user ).subscribe( () => {
      this.form.reset();
      this.router.navigate( [ '/auth', 'login' ] );
    } );

    this.submitted = false;
  }

  goToLogin() {
    this.router.navigate( [ '/auth', 'login' ] )
  }
}
