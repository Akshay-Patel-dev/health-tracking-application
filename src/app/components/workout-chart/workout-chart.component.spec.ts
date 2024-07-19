import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutChartComponent } from './workout-chart.component';
import { ActivatedRoute, provideRouter } from '@angular/router';

describe('WorkoutChartComponent', () => {
  let component: WorkoutChartComponent;
  let fixture: ComponentFixture<WorkoutChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutChartComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { params: {} } } },
        provideRouter([])
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkoutChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
