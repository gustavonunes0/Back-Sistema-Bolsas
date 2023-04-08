import { Module } from '@nestjs/common';
import { UserProcessesService } from './user-processes.service';
import { UserProcessesController } from './user-processes.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [UserProcessesController],
  providers: [UserProcessesService, PrismaService]
})
export class UserProcessesModule {}
