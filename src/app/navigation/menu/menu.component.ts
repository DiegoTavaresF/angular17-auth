import { Component } from '@angular/core';
import { LocalStorageUtils } from '../../utils/localstorage';
import { Router, RouterLink } from '@angular/router';
import { MenuLoginComponent } from '../menu-login/menu-login.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, MenuLoginComponent, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  userAuthenticated: boolean = false;
  localStorageUtils = new LocalStorageUtils();

  public isCollapsed: boolean;

  constructor(private router: Router) {
    this.isCollapsed = true;

    if(this.localStorageUtils.getUserToken()) {
      this.userAuthenticated = true;
    }
  }
}
