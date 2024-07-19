// src/app/components/user-form/user-form.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFormComponent } from './user-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { of } from 'rxjs';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers', 'addUser', 'updateUser']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        UserFormComponent
      ],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
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

  it('should submit valid form', () => {
    component.name.setValue('John Doe');
    component.type.setValue('Yoga');
    component.minutes.setValue('60');  // Set as string

    const mockUser = {
      id: 1,
      name: 'John Doe',
      workouts: [{ type: 'Yoga', minutes: 60 }]
    };

    userService.getUsers.and.returnValue([mockUser]);
    userService.addUser.and.returnValue();  // If `addUser` returns void
    userService.updateUser.and.returnValue();  // If `updateUser` returns void

    component.onSubmit();

    expect(userService.addUser).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/users');
  });

  it('should display error messages on invalid form submission', () => {
    // Set invalid form values
    component.name.setValue('');
    component.type.setValue('');
    component.minutes.setValue('');  // Set as string

    component.onSubmit();

    expect(component.nameError()).toBe('Name is required.');
    expect(component.typeError()).toBe('Workout type is required.');
    expect(component.minutesError()).toBe('Minutes are required.');
  });
});
