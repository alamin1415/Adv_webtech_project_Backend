import { Controller, Post, Body, Param, ParseIntPipe, Get, Put, UseGuards,Request } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

@Put()
async updateManager(){
  
}
 
}
