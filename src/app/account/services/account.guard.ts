import { Injectable } from '@angular/core';
import { CanDeactivate, CanActivate, Router } from '@angular/router';
import { SignupComponent } from '../signup/signup.component';
import { LocalStorageUtils } from '../../utils/localstorage';


@Injectable()
export class AccountGuard implements CanDeactivate<SignupComponent>, CanActivate {
    
    localStorageUtils = new LocalStorageUtils();

    constructor(private router: Router){}
    
    canDeactivate(component: SignupComponent) {
        // if(component.mudancasNaoSalvas) {
        //     return window.confirm('Tem certeza que deseja abandonar o preenchimento do formulario?');
        // }  

        return true
    }

    canActivate() {
        if(this.localStorageUtils.getUserToken()){
            this.router.navigate(['/home']);
        }

        return true;
    }
    
}