import { Component } from '@angular/core';
import { LocalStorageUtils } from '../../utils/localstorage';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-login',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './menu-login.component.html',
  styleUrl: './menu-login.component.css'
})
export class MenuLoginComponent {
  userAuthenticated: boolean = false;
  localStorageUtils = new LocalStorageUtils();
  userName: string = "";

  constructor(private router: Router) {
    if(this.localStorageUtils.getUserToken()) {
      this.userAuthenticated = true;
      this.userName = this.localStorageUtils.getUser()?.userName;
    }
  }

  logout() {
    this.localStorageUtils.limparDadosLocaisUsuario();    

    this.router.navigate(['/account/login']).then(() => {
      window.location.reload();
    });
  }
}
