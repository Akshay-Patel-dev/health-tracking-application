export class User {
  constructor(
    public id: number,
    public name: string,
    public workouts: { type: string; minutes: number }[]
  ) {}
}