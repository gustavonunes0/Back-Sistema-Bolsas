import { Controller, Headers, Res, Post, Get } from '@nestjs/common';
import { UserProcessesService } from './user-processes.service';
import { Response } from 'express';

@Controller('userProcesses')
export class UserProcessesController {
  constructor(private readonly userProcessesService: UserProcessesService) { }
  
  @Post()
  async create(@Headers("authorization") token: string, @Headers("processId") processId: string, @Res() res: Response) {
    const query = await this.userProcessesService.create(token, processId)
    res.statusCode = query.status;
    res.json(query).send();
  }

  @Get()
  async indexAll(@Headers("authorization") token: string, @Res() res: Response) {
    const query = await this.userProcessesService.indexAll(token)
    res.statusCode = query.status;
    res.json(query).send();
  }

  @Get()
  async index(@Headers("authorization") token: string, @Res() res: Response) {
    const query = await this.userProcessesService.index(token)
    res.statusCode = query.status;
    res.json(query).send();
  }
}
