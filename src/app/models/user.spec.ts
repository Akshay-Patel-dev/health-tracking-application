// src/app/models/user.spec.ts
import { User } from "./user"; // Ensure this path is correct

describe('User Model Usage', () => {
  it('should handle user data correctly', () => {
    // Mock user data
    const mockUser: User = {
      id: 1,
      name: 'John Doe',
      workouts: [
        { type: 'Yoga', minutes: 60 },
        { type: 'Running', minutes: 30 }
      ]
    };

    expect(mockUser).toBeTruthy();
    expect(mockUser.id).toBe(1);
    expect(mockUser.name).toBe('John Doe');
    expect(mockUser.workouts.length).toBe(2);
    expect(mockUser.workouts[0].type).toBe('Yoga');
    expect(mockUser.workouts[1].minutes).toBe(30);
  });
});
