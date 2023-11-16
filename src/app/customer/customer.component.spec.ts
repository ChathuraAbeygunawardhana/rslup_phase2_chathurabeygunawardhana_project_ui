import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CustomerComponent } from './customer.component';
import { AuthService } from '../service/auth.service';

describe('CustomerComponent', () => {
  let component: CustomerComponent;
  let fixture: ComponentFixture<CustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerComponent],
      imports: [
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [AuthService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call LoadCustomer on initialization', () => {
    spyOn(component, 'LoadCustomer');
    component.ngOnInit();
    expect(component.LoadCustomer).toHaveBeenCalled();
  });

  it('should set access permissions on initialization', () => {
    spyOn(component, 'SetAccesspermission');
    component.ngOnInit();
    expect(component.SetAccesspermission).toHaveBeenCalled();
  });

  // Add more tests for your component methods and interactions

  it('should render table with data', () => {
    component.customerlist = [
      { id: 1, name: 'Customer1', Creditlimit: 1000 },
      { id: 2, name: 'Customer2', Creditlimit: 2000 },
    ];
    component.LoadCustomer();
    fixture.detectChanges();
    const tableRows = fixture.nativeElement.querySelectorAll('tr.mat-row');
    expect(tableRows.length).toBe(2);
  });

  it('should display a warning when trying to edit without permission', () => {
    spyOn(component.toastr, 'warning');
    component.haveedit = false;
    component.updatePassenger(1);
    expect(component.toastr.warning).toHaveBeenCalled();
  });

  it('should navigate to the login page when unauthorized', () => {
    spyOn(component.router, 'navigate');
    component.accessdata = [];
    component.SetAccesspermission();
    expect(component.router.navigate).toHaveBeenCalledWith(['']);
  });
});
