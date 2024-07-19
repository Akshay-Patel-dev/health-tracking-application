import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserListComponent } from '../../components/user-list/user-list.component';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { WorkoutChartComponent } from '../../components/workout-chart/workout-chart.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterOutlet,RouterLink,UserListComponent,UserFormComponent,WorkoutChartComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

}
