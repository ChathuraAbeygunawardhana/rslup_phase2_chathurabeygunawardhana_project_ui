import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { of } from 'rxjs';

jest.mock('ngx-toastr');

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockToastr: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['RegisterUser']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockToastr = jasmine.createSpyObj('ToastrService', ['success', 'warning']);

    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
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
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.registerform.value.id).toBe('');
    expect(component.registerform.value.name).toBe('');
    expect(component.registerform.value.password).toBe('');
    expect(component.registerform.value.email).toBe('');
    expect(component.registerform.value.gender).toBe('male');
    expect(component.registerform.value.role).toBe('');
    expect(component.registerform.value.isactive).toBe(false);
  });

  it('should call service.RegisterUser and navigate when valid registration data is provided', () => {
    const mockUserData = {
      id: 'testUser',
      name: 'Test User',
      password: 'Test@123',
      email: 'test@example.com',
      gender: 'male',
      role: '',
      isactive: false,
    };

    mockAuthService.RegisterUser.and.returnValue(of(null));

    component.registerform.setValue(mockUserData);
    component.proceedregister();

    expect(mockAuthService.RegisterUser).toHaveBeenCalledWith(mockUserData);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['login']);
    expect(mockToastr.success).toHaveBeenCalledWith(
      'Please contact admin for enable access.',
      'Registered successfully'
    );
  });

  it('should display a warning message when the form is invalid', () => {
    component.registerform.setValue({
      id: '',
      name: '',
      password: '',
      email: '',
      gender: 'male',
      role: '',
      isactive: false,
    });
    component.proceedregister();

    expect(mockAuthService.RegisterUser).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
    expect(mockToastr.warning).toHaveBeenCalledWith('Please enter valid data.');
  });
});
