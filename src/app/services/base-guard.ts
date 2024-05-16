import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageUtils } from '../utils/localstorage';
import { inject } from '@angular/core';

export const BaseGuard: CanActivateFn = (route, state) => {
  const localStorageUtils = new LocalStorageUtils();

  const router = inject(Router);

  const userToken = localStorageUtils.getUserToken();

  if (!userToken) {
    router.navigate(['/account/login/'], {
      queryParams: { returnUrl: router.url },
    });
  }

  let user = localStorageUtils.getUser();

  let claim: any = route.data[0];
  if (claim !== undefined) {
    let claim = route.data[0]['claim'];

    if (claim) {
      if (!user.claims) {
        router.navigate(['/acesso-negado']);
      }

      let userClaims = user.claims.find((x: any) => x.type === claim.nome);

      if (!userClaims) {
        router.navigate(['/acesso-negado']);
      }

      let valoresClaim = userClaims.value as string;

      if (!valoresClaim.includes(claim.valor)) {
        router.navigate(['/acesso-negado']);
      }
    }
  }

  return true;
};
