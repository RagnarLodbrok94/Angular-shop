import { Injectable } from "@angular/core";
import { FormControl, NgForm, FormGroupDirective } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

@Injectable()

export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState( control: FormControl, form: NgForm | FormGroupDirective | null ) {
    return control && control.invalid && control.touched;
  }
}