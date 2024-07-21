import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { User } from '../models/user';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUsers', () => {
    it('should return all users', () => {
      const users = service.getUsers();
      expect(users.length).toBe(3);
      expect(users[0].name).toBe('John Doe');
      expect(users[1].name).toBe('Jane Smith');
      expect(users[2].name).toBe('Mike Johnson');
    });
  });

  describe('addUser', () => {
    it('should add a new user', () => {
      const newUser: User = {
        id: 4,
        name: 'Alice Brown',
        workouts: [{ type: 'Running', minutes: 25 }]
      };
      service.addUser(newUser);
      const users = service.getUsers();
      expect(users.length).toBe(4);
      expect(users[3]).toEqual(newUser);
    });
  });

  describe('updateUser', () => {
    it('should update an existing user', () => {
      const updatedUser: User = {
        id: 2,
        name: 'Jane Smith-Updated',
        workouts: [{ type: 'Swimming', minutes: 70 }]
      };
      service.updateUser(updatedUser);
      const users = service.getUsers();
      expect(users[1]).toEqual(updatedUser);
    });

    it('should not update if user id does not exist', () => {
      const nonExistentUser: User = {
        id: 99,
        name: 'Non-existent User',
        workouts: []
      };
      service.updateUser(nonExistentUser);
      const users = service.getUsers();
      expect(users.length).toBe(3);
      expect(users.find(u => u.id === 99)).toBeUndefined();
    });
  });
});