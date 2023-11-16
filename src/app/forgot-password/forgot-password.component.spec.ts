import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ForgotPasswordComponent } from './forgot-password.component';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForgotPasswordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title and description', () => {
    const title = fixture.debugElement.query(By.css('h1')).nativeElement;
    const description = fixture.debugElement.query(By.css('p')).nativeElement;

    expect(title.textContent).toContain('Forgot Password');
    expect(description.textContent).toContain(
      "Enter your email address and we'll send you a password reset link."
    );
  });

  it('should have an email input and a submit button', () => {
    const emailInput = fixture.debugElement.query(
      By.css('input[type="email"]')
    );
    const submitButton = fixture.debugElement.query(
      By.css('button[type="submit"]')
    );

    expect(emailInput).toBeTruthy();
    expect(submitButton).toBeTruthy();
  });

  it('should have a form element', () => {
    const form = fixture.debugElement.query(By.css('form'));
    expect(form).toBeTruthy();
  });

  it('should emit an event on form submission', () => {
    const form = fixture.debugElement.query(By.css('form'));

    form.triggerEventHandler('submit', null);
    fixture.detectChanges();

    expect(component.onSubmit).toHaveBeenCalled();
  });
});
