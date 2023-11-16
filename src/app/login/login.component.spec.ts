import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { of } from 'rxjs';

jest.mock('ngx-toastr');

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockToastr: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['GetUserbyCode']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockToastr = jasmine.createSpyObj('ToastrService', [
      'success',
      'error',
      'warning',
    ]);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        { provide: ToastrService, useValue: mockToastr },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.loginform.value.id).toBe('');
    expect(component.loginform.value.password).toBe('');
  });

  it('should call service.GetUserbyCode and navigate when valid credentials are provided', () => {
    const mockUser = {
      id: 'testUser',
      password: 'testPassword',
      isactive: true,
      role: 'user',
    };
    mockAuthService.GetUserbyCode.and.returnValue(of(mockUser));

    component.loginform.setValue({ id: 'testUser', password: 'testPassword' });
    component.proceedlogin();

    expect(mockAuthService.GetUserbyCode).toHaveBeenCalledWith('testUser');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['']);
    expect(mockToastr.success).toHaveBeenCalled();
  });

  it('should display an error message when the user is inactive', () => {
    const mockUser = {
      id: 'testUser',
      password: 'testPassword',
      isactive: false,
      role: 'user',
    };
    mockAuthService.GetUserbyCode.and.returnValue(of(mockUser));

    component.loginform.setValue({ id: 'testUser', password: 'testPassword' });
    component.proceedlogin();

    expect(mockAuthService.GetUserbyCode).toHaveBeenCalledWith('testUser');
    expect(mockRouter.navigate).not.toHaveBeenCalled();
    expect(mockToastr.error).toHaveBeenCalledWith(
      'Please contact Admin',
      'InActive User'
    );
  });

  it('should display an error message when invalid credentials are provided', () => {
    mockAuthService.GetUserbyCode.and.returnValue(of(null));

    component.loginform.setValue({
      id: 'invalidUser',
      password: 'invalidPassword',
    });
    component.proceedlogin();

    expect(mockAuthService.GetUserbyCode).toHaveBeenCalledWith('invalidUser');
    expect(mockRouter.navigate).not.toHaveBeenCalled();
    expect(mockToastr.error).toHaveBeenCalledWith('Invalid credentials');
  });

  it('should display a warning message when the form is invalid', () => {
    component.loginform.setValue({ id: '', password: '' });
    component.proceedlogin();

    expect(mockAuthService.GetUserbyCode).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
    expect(mockToastr.warning).toHaveBeenCalledWith('Please enter valid data.');
  });
});
