import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userIsAuthenticate = false;

  get userIsAuthenticate() {
    return this._userIsAuthenticate;
  }

  login() {
    this._userIsAuthenticate = true;
  }

  logout() {
    this._userIsAuthenticate = false;
  }

  constructor() { }
}
