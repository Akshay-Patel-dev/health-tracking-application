import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { UserFormComponent } from './user-form.component'; 
import { UserService } from '../../services/user.service'; 
import { NgModule } from '@angular/core';

@NgModule({ 
  declarations: [],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: UserService, useValue: jasmine.createSpyObj('UserService', ['getUsers', 'addUser', 'updateUser']) },
    { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigateByUrl']) }
  ]
})
export class TestModule {} 

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TestModule ] 
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error messages on invalid form submission', () => {
    component.name.setValue('');
    component.type.setValue('');
    component.minutes.setValue(''); 

    component.onSubmit();

    expect(component.nameError()).toBe('Name is required.');
    expect(component.typeError()).toBe('Workout type is required.');
    expect(component.minutesError()).toBe('Minutes is required.');
  });
});
