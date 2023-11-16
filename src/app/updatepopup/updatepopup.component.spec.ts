import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdatepopupComponent } from './updatepopup.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';

jest.mock('ngx-toastr');

describe('UpdatepopupComponent', () => {
  let component: UpdatepopupComponent;
  let fixture: ComponentFixture<UpdatepopupComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockToastr: jasmine.SpyObj<ToastrService>;
  let mockMatDialogRef: jasmine.SpyObj<MatDialogRef<UpdatepopupComponent>>;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', [
      'getuserrole',
      'GetUserbyCode',
      'updateuser',
    ]);
    mockToastr = jasmine.createSpyObj('ToastrService', ['success']);
    mockMatDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      declarations: [UpdatepopupComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: mockAuthService },
        { provide: ToastrService, useValue: mockToastr },
        { provide: MatDialogRef, useValue: mockMatDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatepopupComponent);
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

  it('should call service.getuserrole on component creation', () => {
    spyOn(component.service, 'getuserrole').and.returnValue(of([]));
    component.ngOnInit();
    expect(component.service.getuserrole).toHaveBeenCalled();
  });

  it('should call service.GetUserbyCode and load user data when usercode is provided', () => {
    spyOn(component.service, 'GetUserbyCode').and.returnValue(of({}));
    component.data = { usercode: 'testUser' };
    component.ngOnInit();
    expect(component.service.GetUserbyCode).toHaveBeenCalledWith('testUser');
  });

  it('should call service.updateuser and toastr.success on UpdateUser', () => {
    spyOn(component.service, 'updateuser').and.returnValue(of({}));
    component.UpdateUser();
    expect(component.service.updateuser).toHaveBeenCalled();
    expect(component.toastr.success).toHaveBeenCalledWith(
      'Updated successfully.'
    );
    expect(component.dialogref.close).toHaveBeenCalled();
  });
});
