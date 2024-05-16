import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RequestResponse } from '../../services/models/request-response';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { LocalStorageUtils } from '../../utils/localstorage';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [AccountService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit, AfterViewInit {
  signupForm: FormGroup;
  user: User;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {
    const localStorageUtils = new LocalStorageUtils();
    const userToken = localStorageUtils.getUserToken();
    if (userToken) {
      router.navigate(['']);
    }

    this.signupForm = new FormGroup({
      nome: new FormControl('10'),
      email: new FormControl(),
      senha: new FormControl('20'),
      senhaConfirmacao: new FormControl('20'),
    });

    this.user = {
      id: '',
      nome: '',
      email: '',
      senha: '',
      senhaConfirmacao: '',
    };
  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(3)]],
      senhaConfirmacao: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngAfterViewInit(): void {}

  addAccount(): void {
    if (this.signupForm.dirty && this.signupForm.valid) {
      this.user = Object.assign({}, this.user, this.signupForm.value);
    }

    const formValidationErrors = this.getFormValidationErrors();
    if (formValidationErrors.length > 0) {
      this.processarFalhaValidationErrors(formValidationErrors);
      return;
    }

    this.accountService.registrarUsuario(this.user).subscribe({
      next: (response: any) => this.processarSucesso(response),
      error: (response: any) => this.processarFalha(response.error),
      //complete: () => console.log('FIM')
    });
  }

  getFormValidationErrors(): string[] {
    const invalid = [];
    const controls = this.signupForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

  processarSucesso(response: any) {
    this.signupForm.reset;
    this.accountService.LocalStorage.saveLocalUserData(response);

    this.router.navigate(['']);
  }

  processarFalha(response: RequestResponse) {}

  processarFalhaValidationErrors(errors: string[]) {}
}
