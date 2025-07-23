export class Service {
  id: number;
  name: string;
  description: string;
  category: string; // e.g., 'wash', 'dry-clean', 'iron', 'fold'
  duration: number; // in minutes
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial?: Partial<Service>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
