import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userData: User[] = [
    {
      id: 1,
      name: 'John Doe',
      workouts: [
        { type: 'Running', minutes: 30 },
        { type: 'Cycling', minutes: 45 }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      workouts: [
        { type: 'Swimming', minutes: 60 },
        { type: 'Running', minutes: 20 }
      ]
    },
    {
      id: 3,
      name: 'Mike Johnson',
      workouts: [
        { type: 'Yoga', minutes: 50 },
        { type: 'Cycling', minutes: 40 }
      ]
    },
    {
      id: 4,
      name: 'Mikdsflje Johnson',
      workouts: [
        { type: 'Running', minutes: 50 },
        { type: 'Cycling', minutes: 40 }
      ]
    },
    {
      id: 5,
      name: 'ushan Johnson',
      workouts: [
        { type: 'Swimming', minutes: 50 },
        { type: 'Cycling', minutes: 40 }
      ]
    },
  ]
  constructor() { }

  getUsers(): User[] {
    return this.userData;
  }

  addUser(user: User) {
    this.userData.push(user);
  }

  updateUser(updatedUser: User) {
    const index = this.userData.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      this.userData[index] = updatedUser;
    }
  }


}