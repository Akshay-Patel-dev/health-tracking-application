import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { NgFor } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgFor
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator:any = MatPaginator;

  selectedType: string = 'one';
  displayedColumns: string[] = ['id', 'name', 'workoutTypes', 'totalMinutes'];
  workoutTypes: string[] = ['Yoga', 'Running', 'Lifting', 'Pilates'];
  searchName: string = '';
  dataSource = new MatTableDataSource<User>([]);

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadUsers() {
    this.applyFilters();
  }

  applyFilters() {
    let filteredData = this.userService.getUsers();

    if (this.searchName) {
      filteredData = filteredData.filter(user =>
        user.name.toLowerCase().includes(this.searchName.toLowerCase())
      );
    }

    if (this.selectedType !== 'one') {
      filteredData = filteredData.filter(user =>
        user.workouts.some(workout => workout.type === this.selectedType)
      );
    }

    this.dataSource.data = filteredData;
  }

  onSearchNameChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchName = input.value;
    this.applyFilters();
  }

  onWorkoutTypeChange(type: string) {
    this.selectedType = type;
    this.applyFilters();
  }

  getTotalWorkoutMinutes(workouts: { type: string; minutes: number }[]): number {
    return workouts.reduce((total, workout) => total + workout.minutes, 0);
  }

  getWorkoutTypes(workouts: { type: string; minutes: number }[]): string {
    return workouts.length ? workouts.map(workout => workout.type).join(', ') : 'No workouts';
  }
}
