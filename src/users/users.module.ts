import {  Module } from '@nestjs/common';
import { userController } from './users.controller';
import { service } from './users.service';

@Module({
    controllers: [userController],
    providers: [service]
})
export class UserModule{


}