import { Module } from '@nestjs/common';
import { ProcessesService } from './processes.service';
import { ProcessesController } from './processes.controller';
import { PrismaService } from '../../database/PrismaService';

@Module({
  controllers: [ProcessesController],
  providers: [ProcessesService, PrismaService]
})
export class ProcessesModule {}
