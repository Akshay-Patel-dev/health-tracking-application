// src/app/models/user.spec.ts
import { User } from './user';

describe('User', () => {
  it('should create an instance of User', () => {
    const user = new User(1, 'John Doe', [
      { type: 'Yoga', minutes: 60 }
    ]);

    expect(user).toBeTruthy();
    expect(user.id).toBe(1);
    expect(user.name).toBe('John Doe');
    expect(user.workouts).toEqual([
      { type: 'Yoga', minutes: 60 }
    ]);
  });

  it('should set id, name, and workouts properties', () => {
    const id = 2;
    const name = 'Jane Doe';
    const workouts = [
      { type: 'Running', minutes: 30 },
      { type: 'Lifting', minutes: 45 }
    ];
    
    const user = new User(id, name, workouts);

    expect(user.id).toBe(id);
    expect(user.name).toBe(name);
    expect(user.workouts).toEqual(workouts);
  });
});

