import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFormComponent } from './user-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../../services/user.service';
import { ChangeDetectorRef } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UserService', ['getUsers', 'addUser', 'updateUser']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        NoopAnimationsModule,
        UserFormComponent
      ],
      providers: [
        { provide: UserService, useValue: spy },
        ChangeDetectorRef
      ]
    }).compileComponents();

    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form controls', () => {
    expect(component.minutes).toBeTruthy();
    expect(component.name).toBeTruthy();
    expect(component.type).toBeTruthy();
  });

  it('should validate name input', () => {
    const nameControl = component.name;
    nameControl.setValue('');
    expect(nameControl.valid).toBeFalsy();
    expect(component.getControlErrorMessage(nameControl, 'Name')).toContain('required');

    nameControl.setValue('A');
    expect(nameControl.valid).toBeFalsy();
    expect(component.getControlErrorMessage(nameControl, 'Name')).toContain('minimum length');

    nameControl.setValue('John123');
    expect(nameControl.valid).toBeFalsy();
    expect(component.getControlErrorMessage(nameControl, 'Name')).toContain('valid');

    nameControl.setValue('John Doe');
    expect(nameControl.valid).toBeTruthy();
  });

  it('should validate minutes input', () => {
    const minutesControl = component.minutes;
    minutesControl.setValue('');
    expect(minutesControl.valid).toBeFalsy();
    expect(component.getControlErrorMessage(minutesControl, 'Minutes')).toContain('required');

    minutesControl.setValue('0');
    expect(minutesControl.valid).toBeFalsy();
    expect(component.getControlErrorMessage(minutesControl, 'Minutes')).toContain('valid range');

    minutesControl.setValue('121');
    expect(minutesControl.valid).toBeFalsy();
    expect(component.getControlErrorMessage(minutesControl, 'Minutes')).toContain('valid range');

    minutesControl.setValue('30');
    expect(minutesControl.valid).toBeTruthy();
  });

  it('should validate workout type input', () => {
    const typeControl = component.type;
    typeControl.setValue('');
    expect(typeControl.valid).toBeFalsy();
    expect(component.getControlErrorMessage(typeControl, 'Workout type')).toContain('required');

    typeControl.setValue('Running');
    expect(typeControl.valid).toBeTruthy();
  });

  it('should add a new user when form is valid and user does not exist', () => {
    userServiceSpy.getUsers.and.returnValue([]);
    component.name.setValue('New User');
    component.minutes.setValue('30');
    component.type.setValue('Running');

    component.onSubmit();

    expect(userServiceSpy.addUser).toHaveBeenCalledWith(jasmine.objectContaining({
      name: 'New User',
      workouts: [{ type: 'Running', minutes: 30 }]
    }));
  });

  it('should update existing user when form is valid and user exists', () => {
    const existingUser = { id: 1, name: 'Existing User', workouts: [] };
    userServiceSpy.getUsers.and.returnValue([existingUser]);
    component.name.setValue('Existing User');
    component.minutes.setValue('45');
    component.type.setValue('Yoga');

    component.onSubmit();

    expect(userServiceSpy.updateUser).toHaveBeenCalledWith(jasmine.objectContaining({
      id: 1,
      name: 'Existing User',
      workouts: [{ type: 'Yoga', minutes: 45 }]
    }));
  });

  it('should not submit form when inputs are invalid', () => {
    component.name.setValue('');
    component.minutes.setValue('0');
    component.type.setValue('');

    component.onSubmit();

    expect(userServiceSpy.addUser).not.toHaveBeenCalled();
    expect(userServiceSpy.updateUser).not.toHaveBeenCalled();
  });

  it('should update error messages when form controls change', () => {
    component.name.setValue('');
    component.minutes.setValue('0');
    component.type.setValue('');

    component.updateErrorMessages();

    expect(component.nameError()).toContain('required');
    expect(component.minutesError()).toContain('valid range');
    expect(component.typeError()).toContain('required');
  });
});