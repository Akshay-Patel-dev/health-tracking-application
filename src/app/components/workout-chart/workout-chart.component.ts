import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SelectionModel } from '@angular/cdk/collections';
import { NgFor, CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { ChartModule } from 'primeng/chart';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-workout-chart',
  standalone: true,
  imports: [MatCardModule, MatListModule, CommonModule, NgFor, ChartModule],
  templateUrl: './workout-chart.component.html',
  styleUrl: './workout-chart.component.css'
})
export class WorkoutChartComponent {
  users: User[] = [];
  selection = new SelectionModel<User>(false, []);
  chartData: any;

  chartColors = ['#42A5F5', '#FFCE56', '#9CCC65', '#D7CCC8'];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.users = this.userService.getUsers();
    this.selection.select(this.users[0]); 
    this.updateChartData();
  }

  onUserSelect(user: User): void {
    this.selection.toggle(user);
    this.updateChartData();
  }

  updateChartData() {
    const selectedUsers = this.selection.selected;

    const workoutData = selectedUsers.flatMap(user => user.workouts);

    const labels = workoutData.map(workout => workout.type);
    const data = workoutData.map(workout => workout.minutes);

    this.chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Workout Minutes',
          data: data,
          backgroundColor: this.chartColors, 
          borderColor: '#1E88E5',
          borderWidth: 1
        }
      ]
    };
  }

  chartOptions: any = {
    responsive: true, 
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Workout Types' 
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Workout Minutes'
        }
      }
    },
    legend: { 
      position: 'bottom' 
    }
  };
}
