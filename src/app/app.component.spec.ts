import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize isadmin based on the role in sessionStorage', () => {
    expect(component.isadmin).toBe(false);
    sessionStorage.setItem('role', 'admin');
    component.ngDoCheck();
    expect(component.isadmin).toBe(true);
  });

  it('should update isMenuVisible based on the current route', () => {
    spyOn(component.route, 'url').and.returnValue('/login');
    component.ngDoCheck();
    expect(component.isMenuVisible).toBe(false);

    spyOn(component.route, 'url').and.returnValue('/user');
    component.ngDoCheck();
    expect(component.isMenuVisible).toBe(true);
  });

  it('should update isadmin based on the role in sessionStorage', () => {
    expect(component.isadmin).toBe(false);
    sessionStorage.setItem('role', 'admin');
    component.ngDoCheck();
    expect(component.isadmin).toBe(true);

    sessionStorage.setItem('role', 'user');
    component.ngDoCheck();
    expect(component.isadmin).toBe(false);
  });
});
