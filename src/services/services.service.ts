import { Injectable, NotFoundException } from '@nestjs/common';
import { Service } from './service.entity';

@Injectable()
export class ServicesService {
  private services: Service[] = [
    // Mock data - replace with actual database calls
    {
      id: 1,
      name: 'Regular Wash',
      description: 'Standard washing service for everyday clothes',
      category: 'wash',
      duration: 60,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: 'Dry Cleaning',
      description: 'Professional dry cleaning for delicate fabrics',
      category: 'dry-clean',
      duration: 120,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  async findAll(category?: string, isActive?: boolean): Promise<Service[]> {
    let result = this.services;

    // Filter by category if provided
    if (category) {
      result = result.filter(service => service.category === category);
    }

    // Filter by active status if provided
    if (isActive !== undefined) {
      result = result.filter(service => service.isActive === isActive);
    }

    // TODO: Replace with actual database query
    return result;
  }

  async findOne(id: number): Promise<Service> {
    const service = this.services.find(s => s.id === id);
    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    // TODO: Replace with actual database query
    return service;
  }

  async create(createServiceDto: any): Promise<Service> {
    const newService = new Service({
      id: Math.max(...this.services.map(s => s.id)) + 1,
      ...createServiceDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.services.push(newService);
    
    // TODO: Replace with actual database insert
    return newService;
  }

  async update(id: number, updateServiceDto: any): Promise<Service> {
    const serviceIndex = this.services.findIndex(s => s.id === id);
    if (serviceIndex === -1) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }

    this.services[serviceIndex] = {
      ...this.services[serviceIndex],
      ...updateServiceDto,
      updatedAt: new Date(),
    };

    // TODO: Replace with actual database update
    return this.services[serviceIndex];
  }

  async remove(id: number): Promise<void> {
    const serviceIndex = this.services.findIndex(s => s.id === id);
    if (serviceIndex === -1) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }

    this.services.splice(serviceIndex, 1);
    // TODO: Replace with actual database delete
  }

  async findByCategory(category: string): Promise<Service[]> {
    const services = this.services.filter(s => s.category === category);
    // TODO: Replace with actual database query
    return services;
  }

  async toggleStatus(id: number): Promise<Service> {
    const service = await this.findOne(id);
    return this.update(id, { isActive: !service.isActive });
  }
}
