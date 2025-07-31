export class Service {
  id: number;
  name: string;
  description: string;
  category: string;
  duration: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial?: Partial<Service>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
