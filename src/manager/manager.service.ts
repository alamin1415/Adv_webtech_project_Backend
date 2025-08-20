import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManagerInfo } from './manager.entity';
import { AdminInfo } from 'src/admin/admin.entity';

@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(ManagerInfo) private managerRepo: Repository<ManagerInfo>,
    @InjectRepository(AdminInfo) private adminRepo: Repository<AdminInfo>,
  ) {}
/*
  async createManager(managerData: CreateManagerDto, adminId: number): Promise<ManagerInfo> {
    const admin = await this.adminRepo.findOne({ where: { id: adminId } });
    if (!admin) throw new NotFoundException('Admin not found');

    const manager = this.managerRepo.create({ ...managerData, admin });
    return await this.managerRepo.save(manager);
  }

  async getManagersByAdmin(adminId: number): Promise<ManagerInfo[]> {
    const admin = await this.adminRepo.findOne({
      where: { id: adminId },
      relations: ['managers'],
    });
    if (!admin) throw new NotFoundException('Admin not found');
    return admin.managers;
  }*/
}
