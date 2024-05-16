export class LocalStorageUtils {
  public getUser() {
    if (localStorage['auth.user']) {
      return JSON.parse(localStorage.getItem('auth.user') ?? '');
    }

    return '';
  }

  public saveLocalUserData(response: any) {
    this.limparDadosLocaisUsuario();
    this.salvarUserToken(response.accessToken, response.expiresIn);
    this.salvarUsuario(response.userToken);
  }

  public limparDadosLocaisUsuario() {
    localStorage.removeItem('auth.token');
    localStorage.removeItem('auth.tokenExpirationDate');
    localStorage.removeItem('auth.user');
  }

  public getUserToken() {
    this.removeTokenIfExpired();

    return localStorage.getItem('auth.token');
  }

  //   public getUserTokenExpirationDate(): Date {
  //     this.removeTokenIfExpired();

  //     const expirationDate: any = localStorage.getItem(
  //       'auth.tokenExpirationDate'
  //     );

  //     return expirationDate ? new Date(expirationDate) : new Date(0);
  //   }

  private removeTokenIfExpired() {
    const expirationDate: any = localStorage.getItem(
      'auth.tokenExpirationDate'
    );

    if (!expirationDate || new Date(expirationDate) < new Date()) {
      this.limparDadosLocaisUsuario();
    }
  }

  private salvarUserToken(token: string, expiresIn: number) {
    localStorage.setItem('auth.token', token);

    let dateExpire: Date = new Date();
    dateExpire.setSeconds(dateExpire.getSeconds() + expiresIn);

    localStorage.setItem('auth.tokenExpirationDate', dateExpire.toString());
  }

  private salvarUsuario(user: string) {
    localStorage.setItem('auth.user', JSON.stringify(user));
  }
}
