import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { RequestResponse } from '../../services/models/request-response';
import { LocalStorageUtils } from '../../utils/localstorage';
import { UserNotificationService } from '../../components/user-notification/services/user-notification.service';
import { UserNotificationModel } from '../../components/user-notification/models/user-notification-model';
import { NotificationType } from '../../components/user-notification/enums/notification-type.enum';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [AccountService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private userNotificationService: UserNotificationService
  ) {
    const localStorageUtils = new LocalStorageUtils();
    const userToken = localStorageUtils.getUserToken();
    if (userToken) {
      router.navigate(['']);
    }

    this.loginForm = new FormGroup({
      email: new FormControl(),
      senha: new FormControl('20'),
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
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  login(): void {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.user = Object.assign({}, this.user, this.loginForm.value);
    }

    this.accountService.login(this.user).subscribe({
      next: (response: any) => this.loginSuccess(response),
      error: (response: any) => this.loginError(response.error),
      //complete: () => console.log('END')
    });
  }

  loginSuccess(response: any) {
    this.accountService.LocalStorage.saveLocalUserData(response);

    this.userNotificationService.addNotification(new UserNotificationModel("Login success! ", ["User logged with success"], NotificationType.Success));

    this.router.navigate(['']).then(() => {
      window.location.reload();
    });
  }

  loginError(response: RequestResponse){
    this.userNotificationService.addNotification(new UserNotificationModel("Login fail. ", response.errors, NotificationType.Danger));
  }
}
