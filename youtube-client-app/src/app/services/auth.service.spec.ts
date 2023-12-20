import 'jest';
import { TestBed } from '@angular/core/testing';
import { AUTH_PAGE_ROUTE } from '@core/consts';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthService, FormBuilder,],
    });
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should initialize loginForm correctly', () => {
    expect(authService.loginForm.get('login')).toBeTruthy();
    expect(authService.loginForm.get('password')).toBeTruthy();
  });

  it('should set and get token correctly', () => {
    authService.setToken('test-token');
    expect(authService.getToken()).toBe('test-token');
  });

  it('should set and get login correctly', () => {
    authService.loginForm.controls.login.setValue('test-login');
    authService.setToken('test-token');
    expect(authService.getLogin()).toBe('test-login');
  });

  it('should check authentication correctly', () => {
    const isLoggedInSpy = jest.spyOn(authService.isLoggedIn, 'next');
    const iloginFormSpy = jest.spyOn(authService.loginForm, 'setValue');
    authService.setToken('test-token');
    authService.checkAuth();
    expect(isLoggedInSpy).toHaveBeenCalledWith(true);
    expect(iloginFormSpy).toHaveBeenCalledWith({
      login: authService.getLogin(),
      password: '',
    });
  });

  it('should set isLoggedIn to true on login', () => {
    const isLoggedInSpy = jest.spyOn(authService.isLoggedIn, 'next');
    authService.onLogin();
    expect(isLoggedInSpy).toHaveBeenCalledWith(true);
  });

  it('should clear local storage and navigate to auth page on logout', () => {
    const setValueSpy = jest.spyOn(authService.loginForm, 'setValue');
    const isLoggedInSpy = jest.spyOn(authService.isLoggedIn, 'next');
    const localStorageSpy = jest.spyOn(Storage.prototype, 'clear')
    const routerSpy = jest.spyOn(router, 'navigate');
    authService.logout();
    expect(isLoggedInSpy).toHaveBeenCalledWith(false);
    expect(localStorageSpy).toHaveBeenCalled();
    expect(setValueSpy).toHaveBeenCalledWith({
      login: '',
      password: '',
    });
    expect(routerSpy).toHaveBeenCalledWith([AUTH_PAGE_ROUTE]);
  });
});