import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['Getall']);
    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      declarations: [UserComponent],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: mockAuthService },
        { provide: MatDialog, useValue: mockMatDialog },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call service.Getall on component creation', () => {
    spyOn(component.service, 'Getall').and.returnValue(of([]));
    component.ngOnInit();
    expect(component.service.Getall).toHaveBeenCalled();
  });

  it('should call OpenDialog when updateuser is called', () => {
    component.updateuser('testUser');
    expect(component.OpenDialog).toHaveBeenCalled();
  });

  it('should open MatDialog with the correct parameters', () => {
    spyOn(component.dialog, 'open').and.returnValue({
      afterClosed: () => of(null),
    });
    component.OpenDialog('1000ms', '600ms', 'testUser');
    expect(component.dialog.open).toHaveBeenCalledWith(jasmine.any(Function), {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '600ms',
      width: '30%',
      data: {
        usercode: 'testUser',
      },
    });
  });
});
