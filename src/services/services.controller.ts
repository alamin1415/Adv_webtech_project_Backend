import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ServicesService } from './services.service';
import { Service } from './service.entity';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  async findAll(
    @Query('category') category?: string,
    @Query('isActive') isActive?: boolean,
  ): Promise<Service[]> {
    return this.servicesService.findAll(category, isActive);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Service> {
    return this.servicesService.findOne(+id);
  }

  @Post()
  async create(@Body() createServiceDto: any): Promise<Service> {
    return this.servicesService.create(createServiceDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateServiceDto: any,
  ): Promise<Service> {
    return this.servicesService.update(+id, updateServiceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.servicesService.remove(+id);
  }

  @Get('category/:category')
  async findByCategory(@Param('category') category: string): Promise<Service[]> {
    return this.servicesService.findByCategory(category);
  }

  @Put(':id/toggle-status')
  async toggleStatus(@Param('id') id: string): Promise<Service> {
    return this.servicesService.toggleStatus(+id);
  }
}
