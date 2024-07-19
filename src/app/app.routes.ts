import { Routes } from '@angular/router';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { WorkoutChartComponent } from './components/workout-chart/workout-chart.component';

export const routes: Routes = [
    { path: '', component: UserFormComponent }, 
    { path: 'users', component: UserListComponent }, 
    { path: 'usersprogress', component: WorkoutChartComponent }
];
