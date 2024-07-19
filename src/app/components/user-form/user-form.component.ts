import { Component, ChangeDetectionStrategy, ChangeDetectorRef, signal } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent {
  workoutTypes: string[] = ['Yoga', 'Running', 'Lifting', 'Pilates'];
  selectedType: string = 'Running';
  showSuccessMessage = false;
  submitted = false;

  readonly minutes = new FormControl('', [
    Validators.required,
    Validators.min(1),
    Validators.max(120),
    Validators.pattern('^[0-9]*$')
  ]);

  readonly name = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.pattern('^[a-zA-Z ]*$')
  ]);

  readonly type = new FormControl('', [Validators.required]);

  minutesError = signal('');
  nameError = signal('');
  typeError = signal('');

  constructor(
    private userService: UserService,
    private changeDetector: ChangeDetectorRef,
    private router: Router
  ) {
    merge(
      this.minutes.statusChanges, this.minutes.valueChanges,
      this.type.statusChanges, this.type.valueChanges,
      this.name.statusChanges, this.name.valueChanges
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessages());
  }

  onWorkoutTypeChange(type: string) {
    this.selectedType = type;
  }

  updateErrorMessages() {
    this.minutesError.set(this.getControlErrorMessage(this.minutes, 'Minutes'));
    this.nameError.set(this.getControlErrorMessage(this.name, 'Name'));
    this.typeError.set(this.getControlErrorMessage(this.type, 'Workout type'));
  }

  getControlErrorMessage(control: FormControl, fieldName: string): string {
    if (control.invalid) {
      if (control.hasError('required')) {
        return `${fieldName} is required.`;
      } else if (control.hasError('pattern')) {
        return `${fieldName} must be valid.`;
      } else if (control.hasError('min') || control.hasError('max')) {
        return `${fieldName} must be within the valid range.`;
      } else if (control.hasError('minlength')) {
        return `${fieldName} must be at least the minimum length.`;
      }
    }
    return '';
  }

  onSubmit() {
    if (this.formIsValid()) {
      const existingUser = this.userService.getUsers().find(user => user.name === this.name.value);

      if (existingUser) {
        existingUser.workouts.push({
          type: this.type.value as string,
          minutes: Number(this.minutes.value)
        });
        this.userService.updateUser(existingUser);
        console.log('Existing user updated with new workout:', existingUser);
      } else {
        const newId = this.userService.getUsers().length > 0 ? 
          Math.max(...this.userService.getUsers().map(user => user.id)) + 1 : 1;
        const newUser: User = {
          id: newId,
          name: this.name.value as string,
          workouts: [
            {
              type: this.type.value as string,
              minutes: Number(this.minutes.value)
            }
          ]
        };
        this.userService.addUser(newUser);
        this.showSuccessMessage = true;
        this.submitted = true;
        this.router.navigateByUrl('/users');
      }
    } else {
      this.updateErrorMessages();
    }
  }

  formIsValid(): boolean {
    return this.name.valid && this.type.valid && this.minutes.valid;
  }
}
